import { db } from "./firebase-admin";

export async function getUserInvoices(uid) {
    const snapshot = await db
        .collection("invoices")
        .where("authorId", "==", uid)
        .get();

    const invoices = [];

    snapshot.forEach((doc) => {
        invoices.push({ id: doc.id, ...doc.data() });
    });

    return { invoices };
}
