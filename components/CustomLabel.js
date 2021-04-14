import {Flex, Text} from "@chakra-ui/layout";
import {useEffect} from "react";

const CustomLabel = ({x, y, value, width, index, callback}) => {
  const height = width / 2,
    padding = (width * 1) / 10;
  useEffect(() => {
    if (index === 0) {
      callback(width);
    }
  }, [index]);

  return (
    <Flex as="g">
      {value > 1000 ? (
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
            color="#000"
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
            y={y - height}
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
            color="#000"
            fontWeight="semibold"
            fontSize={["md", "2xl"]}
            x={x + width / 2}
            y={y - height / 2}
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
