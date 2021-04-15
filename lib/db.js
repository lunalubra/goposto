import {serverTimestamp, firestore} from "./firebase";

export async function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({uid, ...data}, {merge: true});
}

export function createClient(data) {
  try {
    const {id} = firestore.collection("clients").doc();
    firestore
      .collection("clients")
      .doc(id)
      .set({...data, createdAt: serverTimestamp()});
    return {id};
  } catch (error) {
    return {error};
  }
}

export function createInvoice(data) {
  try {
    const {id} = firestore.collection("invoices").doc();
    firestore
      .collection("invoices")
      .doc(id)
      .set({...data, createdAt: serverTimestamp()});
    return {id};
  } catch (error) {
    return {error};
  }
}

export async function deleteClient(id) {
  try {
    firestore.collection("clients").doc(id).delete();

    const snapshot = await firestore
      .collection("invoices")
      .where("clientObj.id", "==", id)
      .get();

    const batch = firestore.batch();

    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  } catch (error) {
    console.log(error);
    return {error};
  }
}

export function deleteInvoice(id) {
  try {
    return firestore.collection("invoices").doc(id).delete();
  } catch (error) {
    return {error};
  }
}

export function updateClient(id, data) {
  try {
    return firestore.collection("clients").doc(id).update(data);
  } catch (error) {
    console.log(error);
    return {error};
  }
}

export function updateInvoice(id, data) {
  try {
    return firestore.collection("invoices").doc(id).update(data);
  } catch (error) {
    console.log(error);
    return {error};
  }
}
