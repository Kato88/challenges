import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CreateParticipationRequestBody, Participation } from '../../../shared/types';
import * as cors from 'cors';
import challenges from './challenges/index';

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
                console.log(data);

                if (!challenges[data.challengeId]) {
                    response.status(400).send('Challenge has no generator');
                    return;
                }

                const input = challenges[data.challengeId].generator.generate() as string;

                // create input
                const file = admin.storage().bucket('challenge-83ceb.appspot.com').file(`/${data.userId}/${data.challengeId}/input.txt`);

                await file.save(input);
                const urls = await file.getSignedUrl({
                    action: 'read',
                    expires: '01-01-2500',
                });

                console.log('saved file to ', urls[0]);

                const participation = {
                    challengeId: `/challenges/${data.challengeId}`,
                    userId: `/users/${data.userId}`,
                    start: admin.firestore.Timestamp.fromDate(new Date()),
                    inputUrl: urls[0],
                } as Participation;

                await admin.firestore().collection('participant').add(participation);

                console.log('created participant');
                response.status(200).send();
            });
        });
