import firebase, { serverTimestamp } from "./firebase";

const firestore = firebase.firestore();
const app = firebase.app();

export function createUser(uid, data) {
    return firestore
        .collection("users")
        .doc(uid)
        .set({ uid, ...data }, { merge: true });
}

export function createClient(data) {
    try {
        const { id } = firestore.collection("clients").doc();
        firestore
            .collection("clients")
            .doc(id)
            .set({ ...data, createdAt: serverTimestamp() });
        return { id };
    } catch (error) {
        return { error };
    }
}

export function createInvoice(data) {
    try {
        const { id } = firestore.collection("invoices").doc();
        firestore
            .collection("invoices")
            .doc(id)
            .set({ ...data, createdAt: serverTimestamp() });
        return { id };
    } catch (error) {
        return { error };
    }
}

export function deleteClient(id) {
    try {
        return firestore.collection("clients").doc(id).delete();
    } catch (error) {
        return { error };
    }
}

export function deleteInvoice(id) {
    try {
        return firestore.collection("invoices").doc(id).delete();
    } catch (error) {
        return { error };
    }
}

export function updateClient(id, data) {
    try {
        return firestore.collection("clients").doc(id).update(data);
    } catch (error) {
        console.log(error);
        return { error };
    }
}

export function updateInvoice(id, data) {
    try {
        return firestore.collection("invoices").doc(id).update(data);
    } catch (error) {
        console.log(error);
        return { error };
    }
}
