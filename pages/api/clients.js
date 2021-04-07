import { getUserClients } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async (req, res) => {
    try {
        const { uid } = await auth.verifyIdToken(req.headers.token);
        const { clients } = await getUserClients(uid);

        res.status(200).json({ clients });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
