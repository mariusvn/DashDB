const admin = require('firebase-admin');
const functions = require('firebase-functions');
const gauth = require('./google-auth.json');

const runtimeOpt = {
  timeoutSeconds: 20,
  memory: '128MB'
};

const func = functions.runWith(runtimeOpt).region('europe-west1').https;

admin.initializeApp({
  credential: admin.credential.cert(gauth),
  databaseURL: "https://dashdb-b6d19.firebaseio.com",
});

exports.getAllUsers = func.onRequest(async (req, res) => {
  const users = await admin.auth().listUsers(1000);
  const userArray = [];

  const admins = (
    await admin
      .firestore()
      .collection('society-data')
      .doc('data')
      .get()
  ).data().admins;


  for (let i = 0; i < users.users.length; i++) {
    const usr = users.users[i];
    userArray.push({
      uid: usr.uid,
      email: usr.email,
      lastLogin: usr.metadata.lastSignInTime
        ? new Date(usr.metadata.lastSignInTime).getTime()
        : undefined,
      creationDate: new Date(usr.metadata.creationTime).getTime(),
      admin: admins.includes(usr.uid),
    });
  }
  res.json({users: userArray, time: new Date().getTime()});
});

exports.addAdmin = func.onRequest(async (req, res) => {
  if (!req.body.uid) {
    return res.json({
      success: false,
      reason: 'Missing user id',
      time: new Date().getTime()
    });
  }
  const admins = (
    await admin
      .firestore()
      .collection('society-data')
      .doc('data')
      .get()
  ).data().admins;
  if (admins.includes(req.body.uid)) {
    return res.json({
      success: false,
      reason: 'User is already admin',
      time: new Date().getTime()
    });
  }
  admins.push(req.body.uid);
  const dataref = admin
    .firestore()
    .collection('society-data')
    .doc('data');
  await dataref.update({
    admins
  });
  res.json({
    success: true,
    reason: undefined,
    time: new Date().getTime()
  });
});

exports.removeAdmin = func.onRequest(async (req, res) => {
  if (!req.body.uid) {
    return res.json({
      success: false,
      reason: 'Missing user id',
      time: new Date().getTime()
    });
  }
  let admins = (
    await admin
      .firestore()
      .collection('society-data')
      .doc('data')
      .get()
  ).data().admins;
  if (!admins.includes(req.body.uid)) {
    return res.json({
      success: false,
      reason: 'User is not admin',
      time: new Date().getTime()
    });
  }
  const idx = admins.indexOf(req.body.uid);
  admins.splice(idx, 1);
  const dataref = admin
    .firestore()
    .collection('society-data')
    .doc('data');
  await dataref.update({
    admins
  });
  res.json({
    success: true,
    reason: undefined,
    time: new Date().getTime()
  });
});

exports.addUser = func.onRequest(async (req, res) => {
  try {
    res.json({ success: true, data: await admin.auth().createUser(req.body), time: new Date().getTime()});
  } catch (e) {
    res.json({success: false, data: e.code, time: new Date().getTime()});
  }
});

exports.deleteUser = func.onRequest(async (req, res) => {
  if (!req.body.uid) {
    return res.json({
      success: false,
      reason: 'Please specify user id',
      time: new Date().getTime()
    })
  }
  try {
    await admin.auth().deleteUser(req.body.uid);
    return res.json({
      success: true,
      reason: undefined,
      time: new Date().getTime()
    })
  } catch (err) {
    return res.json({
      success: false,
      reason: err.code,
      time: new Date().getTime()
    })
  }
});
