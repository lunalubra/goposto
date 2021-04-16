import {Flex, Text} from "@chakra-ui/layout";

const CustomLabel = ({x, y, value, width}) => {
  const height = width / 2;

  return (
    <Flex as="g">
      {height > y ? (
        <>
          <rect
            x={x}
            y={y}
            rx={8}
            ry={8}
            width={width}
            height={height}
            style={{
              fill: "#fff",
              opacity: "0.5",
            }}
          />
          <Text
            as="text"
            fontWeight="semibold"
            fontSize={["md", "2xl"]}
            x={x + width / 2}
            y={y + height / 2}
            fill="#fff"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ${value}
          </Text>
        </>
      ) : (
        <>
          <rect
            x={x}
            y={y - height}
            rx={8}
            ry={8}
            width={width}
            height={height}
            style={{
              fill: "#fff",
              opacity: "0.5",
            }}
          />
          <Text
            as="text"
            fontWeight="semibold"
            fontSize={["md", "2xl"]}
            x={x + width / 2}
            y={y - height / 2}
            fill="#fff"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ${value}
          </Text>
        </>
      )}
    </Flex>
  );
};

export default CustomLabel;
