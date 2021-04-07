import { db } from "./firebase-admin";

export async function getUserClients(uid) {
    const snapshot = await db
        .collection("clients")
        .where("authorId", "==", uid)
        .orderBy("createdAt", "desc")
        .get();

    const clients = [];

    snapshot.forEach((doc) => {
        clients.push({ id: doc.id, ...doc.data() });
    });

    return { clients };
}

export async function getUserInvoices(uid) {
    const snapshot = await db
        .collection("invoices")
        .where("authorId", "==", uid)
        .orderBy("createdAt", "desc")
        .get();

    const invoices = [];

    snapshot.forEach((doc) => {
        invoices.push({ id: doc.id, ...doc.data() });
    });

    return { invoices };
}
