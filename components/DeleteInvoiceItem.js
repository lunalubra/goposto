import {Button} from "@chakra-ui/button";
import {DeleteIcon} from "@chakra-ui/icons";

const DeleteInvoiceItem = ({callback, itemObj}) => {
  return (
    <Button
      aria-label="Delete this invoice item"
      size="sm"
      bg="red"
      colorScheme="white"
      leftIcon={<DeleteIcon />}
      onClick={() => callback(itemObj)}
      _hover={{opacity: "0.60"}}
      _active={{
        opacity: "0.80",
        transform: "scale(0.85)",
      }}
    >
      Delete Item
    </Button>
  );
};

export default DeleteInvoiceItem;
