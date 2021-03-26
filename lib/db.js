import firebase from "./firebase";

const firestore = firebase.firestore();
const app = firebase.app();

export function createUser(uid, data) {
    return firestore
        .collection("users")
        .doc(uid)
        .set({ uid, ...data }, { merge: true });
}

export function createInvoice(data) {
    try {
        const { id } = firestore.collection("invoices").doc();
        firestore
            .collection("invoices")
            .doc(id)
            .set({ id, ...data }, { merge: true });
        return { id };
    } catch (error) {
        return { error };
    }
}

export function updateInvoice(data, id) {
    try {
        firestore.collection("invoices").doc(id).set(data);
        return { id };
    } catch (error) {
        return { error };
    }
}
