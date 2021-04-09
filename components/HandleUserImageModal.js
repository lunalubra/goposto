import {Button} from "@chakra-ui/button";
import {Divider, Flex, SimpleGrid, Text} from "@chakra-ui/layout";
import {useEffect, useState} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import {useDisclosure} from "@chakra-ui/hooks";
import {Image} from "@chakra-ui/image";
import {storage} from "@/lib/firebase";
import {useAuth} from "@/lib/auth";
import ImageUploader from "./UploadImageButton";
import ImageSquare from "./ImageSquare";

const HandleUserImageModal = ({callback, prevImageUrl}) => {
  const [imageUrl, setImageUrl] = useState(prevImageUrl || null);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [imagesUrls, setImagesUrls] = useState([]);
  const {user} = useAuth();

  const getUserImages = async () => {
    const imagesNotProcesed = await storage
      .ref(`uploads/${user.uid}`)
      .listAll();

    return imagesNotProcesed._delegate.items.map(image => {
      console.log(
        image._location.path.split(`${user.uid}/`).pop().split(".").pop()
      );
      return storage
        .ref(image._location.path)
        .getDownloadURL()
        .then(url => {
          setImagesUrls(prevState => [...prevState, url]);
        })
        .catch(error => console.log(error));
    });
  };

  const deleteImage = async url => {
    setImagesUrls(prevState => [
      ...prevState.filter(imageUrl => imageUrl !== url),
    ]);
    setImageUrl(prevState => (prevState === url ? null : prevState));
    const imageName = url.split(`${user.uid}%2F`).pop().split("?").shift();
    return await storage.ref(`uploads/${user.uid}/${imageName}`).delete();
  };

  useEffect(() => {
    getUserImages();
    return () => {};
  }, []);

  const getSelectedImage = newImageUrl => {
    setImageUrl(newImageUrl);
    return callback(newImageUrl);
  };

  if (!imagesUrls) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Button
        onClick={e => {
          onOpen();
        }}
      >
        Images
      </Button>

      <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {imageUrl ? (
              <Image src={imageUrl} width="100px" height="100px" alt="image" />
            ) : (
              <Text fontSize="lg" fontWeight="semibold">
                Select an image!
              </Text>
            )}
            <Divider />
            <SimpleGrid columns={3} spacing={5}>
              {imagesUrls.map(image => {
                return (
                  <ImageSquare
                    key={image}
                    image={image}
                    callback={getSelectedImage}
                    deleteImage={deleteImage}
                  />
                );
              })}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <ImageUploader callback={callback} />
            <Flex direction="row">
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Save
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HandleUserImageModal;
