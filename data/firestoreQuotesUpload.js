const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const QUOTES = require('./quotes');

var serviceAccount = require('../secrets/secrets/serviceAccountKey.json');

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var db = getFirestore(app);

var quotes = QUOTES;

const batch = db.batch();

const uploadQuotes = async () => {
  for (let quote of quotes) {
    console.log(quote);
    const docId = db.collection('quotes').doc().id;
    const timestamp = Math.floor(Date.now() / 1000);
    batch.set(db.collection('quotes').doc(docId), {
      ...quote,
      docId: docId,
      creationTime: timestamp,
    });
    batch.set(db.collection('quotesSize').doc('quotes'), {
      count: quotes.length,
    });
    batch.set(db.collection('index').doc(`quotes/${quote.quote}`), {
      value: docId,
    });
  }
  res = await batch.commit();
  console.log(res);
};

uploadQuotes();
