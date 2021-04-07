import { getUserInvoices } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async function (req, res) {
    try {
        const { uid } = await auth.verifyIdToken(req.headers.token);
        const { invoices } = await getUserInvoices(uid);

        res.status(200).json({ invoices });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
