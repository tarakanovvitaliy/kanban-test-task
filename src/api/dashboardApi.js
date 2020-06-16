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

export const itemsListener = (fetchItems) => {
  db.collection('items').orderBy('createdAt', 'asc').onSnapshot(snap => {
    const items = [];
    snap.forEach(el => items.push({ ...el.data(), id: el.id }));
    fetchItems(items);
  });
};

export const addColumn = (colName) => {
  return db.collection('columns').add({
    name: colName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};

export const deleteColumn = async (id) => {
  const items = await db.collection('items').where("columnId", "==", id).get();
  const itemIds = []; items.forEach(el => itemIds.push(el.id));
  await Promise.all(itemIds.map(id => db.collection('items').doc(id).delete()));
  await db.collection('columns').doc(id).delete();
};

export const addItem = (itemName, columnId) => {
  return db.collection('items').add({
    columnId,
    name: itemName,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
};
