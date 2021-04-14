import {DeleteIcon} from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  IconButton,
  Portal,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import {mutate} from "swr";

import {deleteInvoice} from "@/lib/db";
import {useAuth} from "@/lib/auth";

const DeleteInvoiceButton = ({invoiceId, callback}) => {
  const {onOpen, onClose, isOpen} = useDisclosure();
  const {user} = useAuth();
  const toast = useToast();

  const onDeleteInvoice = id => {
    const {error} = deleteInvoice(id);
    if (error) {
      console.log(error);
      toast({
        title: "An error ocurred while deleting the inovice...",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Successfuly deleted the invoice",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      mutate(
        ["/api/invoices", user.token],
        data => ({
          invoices: data?.invoices?.filter(invoice => invoice.id !== invoiceId),
        }),
        false
      );
      if (callback) {
        callback(null);
      }
    }
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <IconButton
          aria-label="Delete invoice"
          bg="red"
          colorScheme="white"
          _hover={{bg: "red.600"}}
          _active={{
            bg: "red.700",
            transform: "scale(0.95)",
          }}
          icon={<DeleteIcon />}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            Are you sure you want to delete this invoice?
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody alignSelf="flex-end">
            <Button
              aria-label="delete invoice"
              _hover={{bg: "red.600"}}
              _active={{
                bg: "red.700",
                transform: "scale(0.95)",
              }}
              colorScheme="red"
              onClick={() => {
                onDeleteInvoice(invoiceId);
              }}
            >
              Delete
            </Button>
            <Button
              aria-label="cancel delete invoice"
              onClick={() => onClose()}
              ml={3}
              variant="outline"
            >
              Cancel
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default DeleteInvoiceButton;
