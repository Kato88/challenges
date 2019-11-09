import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CreateParticipationRequestBody, Participation } from '../../../shared/types';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const helloWorld = functions.region('europe-west1').https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const createParticipation =
    functions
        .region('europe-west2')
        .https
        .onRequest(async (request, response) => {
            const data = request.body as CreateParticipationRequestBody;

            // create input
            const file = admin.storage().bucket('challenge-83ceb.appspot.com').file(`/${data.userId}/${data.challengeId}/input.txt`);

            await file.save('THIS IS A TEST');
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

            return 0;
        });
