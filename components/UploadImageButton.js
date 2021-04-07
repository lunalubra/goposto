import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { useState } from "react";

import { storage, STATE_CHANGED } from "@/lib/firebase";
import { useAuth } from "@/lib/auth";
import { Image } from "@chakra-ui/image";

export default function ImageUploader({ callback }) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);
    const { user } = useAuth();

    const uploadFile = async (e) => {
        const file = Array.from(e.target.files)[0];
        const extension = file.type.split("/")[1];
        const ref = storage.ref(
            `uploads/${user.uid}/${Date.now()}.${extension}`
        );
        setUploading(true);
        const task = ref.put(file);
        task.on(STATE_CHANGED, (snapshot) => {
            const pct = (
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100
            ).toFixed(0);
            setProgress(pct);
            task.then((d) => ref.getDownloadURL()).then((url) => {
                setDownloadURL(url);
                callback(url);
                setUploading(false);
            });
        });
    };

    return (
        <Box>
            {!uploading && (
                <label>
                    <Text fontSize="lg" fontWeight="semibold">
                        📸 Upload Img
                    </Text>
                    <input
                        type="file"
                        onChange={uploadFile}
                        accept="image/x-png,image/gif,image/jpeg"
                    />
                </label>
            )}
            {uploading && (
                <>
                    <Button disabled={true} isLoading>
                        Upload image
                    </Button>
                    <Text>{progress}</Text>
                </>
            )}
            {downloadURL && <Image src={downloadURL} />}
        </Box>
    );
}
