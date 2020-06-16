// firebase
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const columnsListener = (fetchColumns) => {
  db.collection('columns').orderBy('createdAt', 'asc').onSnapshot(snap => {
    const columns = [];
    snap.forEach(el => columns.push({ ...el.data(), id: el.id }));
    fetchColumns(columns);
  });
};

export const addColumn = (colName) => {
  return db.collection('columns').add({
    name: colName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};

export const deleteColumn = (colId) => {};
