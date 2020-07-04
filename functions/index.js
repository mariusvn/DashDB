const admin = require('firebase-admin');
const functions = require('firebase-functions');
const gauth = require('./google-auth.json');

const runtimeOpt = {
  timeoutSeconds: 20,
  memory: '1GB'
};

const func = functions.runWith(runtimeOpt).region('europe-west1').https;

admin.initializeApp({
  credential: admin.credential.cert(gauth),
  databaseURL: "https://dashdb-b6d19.firebaseio.com",
});


const cors = (res, req) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Access-Control-Max-Age", "600");
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return true;
  }
  return false;
}

exports.getAllUsers = functions.runWith({
  timeoutSeconds: 60,
  memory: '1GB'
}).region('europe-west1').https.onRequest(async (req, res) => {
  if (cors(res, req)) {
    return {};
  }

  /** @type {Promise[]} */
  let promises = [
    admin.auth().listUsers(50),
    admin
    .firestore()
    .collection('society-data')
    .doc('data')
    .get()
  ];
  const buf = await Promise.all(promises);
  const users = buf[0];
  const society = buf[1];
  const userArray = [];

  console.log(users);
  const admins = society.data().admins;

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
  res.json({data: {users: userArray, time: new Date().getTime()}});
});

exports.addAdmin = func.onRequest(async (req, res) => {
  if (cors(res, req)) {
    return {};
  }
  if (!req.body.data.uid) {
    return res.json({
      data: {
        success: false,
        reason: 'Missing user id',
        time: new Date().getTime()
      }
    });
  }
  const admins = (
    await admin
      .firestore()
      .collection('society-data')
      .doc('data')
      .get()
  ).data().admins;
  if (admins.includes(req.body.data.uid)) {
    return res.json({
      data: {
        success: false,
        reason: 'User is already admin',
        time: new Date().getTime()
      }
    });
  }
  admins.push(req.body.data.uid);
  const dataref = admin
    .firestore()
    .collection('society-data')
    .doc('data');
  await dataref.update({
    admins
  });
  res.json({
    data: {
      success: true,
      reason: undefined,
      time: new Date().getTime()
    }
  });
});

exports.removeAdmin = func.onRequest(async (req, res) => {
  if (cors(res, req)) {
    return {};
  }
  if (!req.body.data.uid) {
    return res.json({
      data: {
        success: false,
        reason: 'Missing user id',
        time: new Date().getTime()
      }
    });
  }
  let admins = (
    await admin
      .firestore()
      .collection('society-data')
      .doc('data')
      .get()
  ).data().admins;
  if (!admins.includes(req.body.data.uid)) {
    return res.json({
      data: {
        success: false,
        reason: 'User is not admin',
        time: new Date().getTime()
      }
    });
  }
  const idx = admins.indexOf(req.body.data.uid);
  admins.splice(idx, 1);
  const dataref = admin
    .firestore()
    .collection('society-data')
    .doc('data');
  await dataref.update({
    admins
  });
  res.json({
    data: {
      success: true,
      reason: undefined,
      time: new Date().getTime()
    }
  });
});

exports.addUser = func.onRequest(async (req, res) => {
  if (cors(res, req)) {
    return {};
  }
  try {
    res.json({data: {success: true, data: await admin.auth().createUser(req.body.data), time: new Date().getTime()}});
  } catch (e) {
    res.json({data: {success: false, data: e.code, time: new Date().getTime()}});
  }
});

exports.deleteUser = func.onRequest(async (req, res) => {
  if (cors(res, req)) {
    return {};
  }
  if (!req.body.data.uid) {
    return res.json({
      data: {
        success: false,
        reason: 'Please specify user id',
        time: new Date().getTime()
      }
    })
  }
  try {
    await admin.auth().deleteUser(req.body.data.uid);
    return res.json({
      data: {
        success: true,
        reason: undefined,
        time: new Date().getTime()
      }
    })
  } catch (err) {
    return res.json({
      data: {
        success: false,
        reason: err.code,
        time: new Date().getTime()
      }
    })
  }
});
