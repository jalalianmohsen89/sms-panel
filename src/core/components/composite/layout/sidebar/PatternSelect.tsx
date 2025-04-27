// import { theme as themeContent } from "antd";
import { Flex, Image } from "@/core/components/base";
import { patterns } from "@/core/content";
import { usePattern } from "@/core/context/PatternContext.tsx";
import useStore from "@/core/store";
import { useStyles } from "./styled";

const PatternSelect = () => {
  // ---------------------- variables ---------------------
  const { theme } = useStore();
  const { currentPattern, changePattern } = usePattern();
  const { styles } = useStyles();

  // ---------------------- render ---------------------

  return (
    <Flex align={"center"} gap={20} className={styles.patternContainer}>
      <div
        className={`shellTheme__item shellTheme__default
         ${patterns.default.id === currentPattern.id && "active"}`}
        style={{
          borderColor: theme === "dark" ? "white" : "#333",
          backgroundColor:
            theme === "dark" ? "rgba(256,256,256,0.09)" : "rgba(0,0,0,0.09)",
        }}
        onClick={() => changePattern("default")}
      />
      {Object.values(patterns)
        .filter(
          (item) =>
            item.useOnOriginalTheme === theme ||
            item.useOnOriginalTheme === "both",
        )
        .map((item, index) => (
          <Flex
            className={`shellTheme__item ${item.id === currentPattern.id && "active"}`}
            key={index}
            style={{
              borderColor: theme === "dark" ? "white" : "#333",
              backgroundColor:
                theme === "dark"
                  ? "rgba(256,256,256,0.09)"
                  : "rgba(0,0,0,0.09)",
            }}
            onClick={() => changePattern(item.id)}
          >
            <Image
              src={item.pattern}
              width={"100%"}
              height={"100%"}
              preview={false}
            />
          </Flex>
        ))}
    </Flex>
  );
};

export default PatternSelect;
