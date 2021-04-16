import {Flex, Text} from "@chakra-ui/layout";

const CustomLabel = ({x, y, value, width}) => {
  const height = width / 2,
    padding = (width * 1) / 10;

  console.log(y, height);

  return (
    <Flex as="g">
      {height > y ? (
        <>
          <rect
            x={x + padding / 2}
            y={y}
            rx={8}
            ry={8}
            width={width - padding}
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
            fill="#000"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ${value}
          </Text>
        </>
      ) : (
        <>
          <rect
            x={x + padding / 2}
            y={y - height / 2}
            rx={8}
            ry={8}
            width={width - padding}
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
            y={y}
            fill="#000"
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
