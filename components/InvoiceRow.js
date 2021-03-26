import { Box } from "@chakra-ui/layout";
import { Td } from "./Table";

const InvoiceRow = ({ id, name, date, amount, status }) => {
    return (
        <Box as="tr">
            <Td>{id}</Td>
            <Td>{name}</Td>
            <Td>{date}</Td>
            <Td>{amount}</Td>
            <Td>{status}</Td>
        </Box>
    );
};

export default InvoiceRow;
