import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CreateParticipationRequestBody, Participation, ValidateResultRequestBody, CreateParticipationResponse, ValidationResultResponse, UploadSolutionRequestBody, Challenge, SubmitSolutionResponse, LeaderboardEntry } from '../../../shared/types';
import * as cors from 'cors';
import challenges from './challenges/index';
import { IResultValidator } from './challenges/IResultValidator';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const c = cors({ origin: true });
admin.initializeApp();

export const createParticipation =
  functions
    .region('europe-west2')
    .https
    .onRequest(async (request, response) => {
      return c(request, response, async () => {
        const data = request.body as CreateParticipationRequestBody;
        console.log('STARTING CREATE_PARTICIPATION');

        const inputFilePath = getInputFilePath(data.challengeId, data.userId);

        if (!challenges[data.challengeId]) {
          response.status(400).send('Challenge has no generator');
          return;
        }

        const input = challenges[data.challengeId].generator.generate() as string;

        // create input
        const file = getBucket().file(inputFilePath);

        await file.save(input);
        const urls = await file.getSignedUrl({
          action: 'read',
          expires: '01-01-2500',
        });

        console.log('saved file to ', urls[0]);

        const participation = {
          challengeId: `${data.challengeId}`,
          userId: `${data.userId}`,
          userName: data.userName,
          start: admin.firestore.Timestamp.fromDate(new Date()),
          inputUrl: urls[0],
        } as Participation;

        const participationRef = await admin
          .firestore()
          .collection('participations')
          .add(participation);

        console.log('created participations');
        response.status(200).send({
          success: true,
          participationId: participationRef.id,
          inputUrl: participation.inputUrl
        } as CreateParticipationResponse);
      });
    });

export const validateResult = functions
  .region('europe-west2')
  .https
  .onRequest((request, response) => {
    return c(request, response, async () => {
      console.log('STARTING VALIDATE_RESULT');

      const data = request.body as ValidateResultRequestBody;

      if (!challenges[data.challengeId]) {
        console.log('No challenge validator found');
        response.status(400).send({ isValid: false, error: 'Not challenge found' });
        return;
      }

      const inputFilePath = getInputFilePath(data.challengeId, data.userId);
      const participation = await retrieveParticipation(data.challengeId, data.userId);

      if (!participation) {
        console.log('no valid participation found');
        response.status(400).send({ isValid: false, error: 'No participation found' } as ValidationResultResponse);
        return;
      }

      const file = await getBucket().file(inputFilePath).download();

      if (!file) {
        console.log('File not found');
        response.status(400).send({ isValid: false, error: 'No file found' } as ValidationResultResponse);
        return;
      }

      const inputData = file.toString();
      const validator = challenges[data.challengeId].validator as IResultValidator;

      const isValid = await validator.validate(inputData, data.result);

      if (!isValid) {
        console.log('result is NOT valid');
        response.status(200).send({ isValid: false } as ValidationResultResponse);
      } else {
        console.log('result is valid')
        participation.end = admin.firestore.Timestamp.fromDate(new Date());
        participation.result = data.result;
        participation.points = await calculatePointsForChallenge(data.challengeId);

        // @ts-ignore
        const [_, leaderboardSnapshot] = await Promise.all([
          admin.firestore()
            .collection('participations')
            .doc(participation.id)
            .set(participation),
          admin.firestore().collection('leaderboard').doc(data.userId).get()
        ]);

        if (leaderboardSnapshot.exists) {
          const leaderboardEntry = leaderboardSnapshot.data() as LeaderboardEntry;
          leaderboardEntry.points += participation.points;
          await leaderboardSnapshot.ref.update({
            points: leaderboardEntry.points
          });
        } else {
          await leaderboardSnapshot.ref.set({
            userName: participation.userName,
            points: participation.points,
          } as LeaderboardEntry);
        }

        response.status(200).send({ isValid: true, participation: participation } as ValidationResultResponse);
      }
    });
  });

export const uploadSolution = functions
  .region('europe-west2')
  .https
  .onRequest((request, response) => {
    return c(request, response, async () => {
      console.log('STARTING UPDATING_SOLUTION');

      const data = request.body as UploadSolutionRequestBody;

      if (!data.participationId || !data.solutionUrl || data.solutionUrl.length < 5) {
        console.log('INVALID REQUEST BODY');
        response.status(400).send();
        return;
      }

      const participation = (await admin
        .firestore()
        .collection('participations')
        .doc(data.participationId)
        .get()).data() as Participation;

      if (!participation || participation === undefined) {
        console.log('PARTICIPATION NOT FOUND');
        response.status(400).send();
        return;
      }

      if (!participation.points) {
        console.log('PARTICIPATION HAS NO POINTS');
        response.status(400).send();
        return;
      }

      const extraPoints = 1;

      participation.points += extraPoints;

      // @ts-ignore
      const [_, leaderboardSnapshot] = await Promise.all([
        admin.firestore().collection('participations').doc(data.participationId).update({
          solutionUrl: data.solutionUrl,
          points: participation.points + 1,
        }),
        admin.firestore().collection('leaderboard').doc(participation.userId).get()
      ]);

      if (leaderboardSnapshot.exists) {
        const leaderboardEntry = leaderboardSnapshot.data() as LeaderboardEntry;
        leaderboardEntry.points += extraPoints;
        await leaderboardSnapshot.ref.update({
          points: leaderboardEntry.points
        });
      }

      console.log('UPDATED PARTICIPATION WITH SOLUTION URL');
      response.status(200).send({ points: participation.points } as SubmitSolutionResponse);
    });
  });

async function calculatePointsForChallenge(challengeId: string): Promise<number> {
  const challenge = await admin.firestore().collection('challenges').doc(challengeId).get();
  return ((challenge.data() as Challenge).difficulty + 1) * 3;
}

async function retrieveParticipation(challengeId: string, userId: string): Promise<Participation | null> {
  const querySnapshot = await admin.firestore()
    .collection('participations')
    .where('userId', '==', `${userId}`)
    .where('challengeId', '==', `${challengeId}`)
    .get();

  if (!querySnapshot) {
    return null;
  }

  let participation = null;

  querySnapshot.forEach((doc) => {
    participation = doc.data();
    participation.id = doc.id;
  });

  return participation;
}

function getInputFilePath(challengeId: string, userId: string) {
  return `/${userId}/${challengeId}/input.txt`;
}

function getBucket() {
  return admin.storage().bucket('challenge-83ceb.appspot.com');
}