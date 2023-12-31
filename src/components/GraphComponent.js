import React, { useRef } from "react";
import {
  VictoryBar,
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
} from "victory-native";
import { Box, HStack, ScrollView, VStack } from "native-base";
import { Dimensions } from "react-native";
import millify from "millify";
import { useSelector } from "react-redux";

import { GraphFilters } from "./home/GraphFilters";
import { Loader } from "./Loader";

const { height, width } = Dimensions.get("window");

const BAR_WIDTH = 25;
const BAR_GAP = 20;
const CHART_HEIGHT = (height * 36) / 100;
const PADDING = 10;

const GraphComponent = ({ activeFilter, onFilterPress, isLoading }) => {
  const scrollRef = useRef();
  const scrollToEnd = () => scrollRef.current.scrollToEnd({ animated: false });

  const {
    fitnessRecord: {
      graph: { graph, graphClone, axisLabels },
    },
  } = useSelector((state) => state.user);

  const chartWidth = graph.length * BAR_WIDTH + graph.length * BAR_GAP;

  if (isLoading) {
    return <Loader boxProps={{ h: CHART_HEIGHT }} />;
  }

  return (
    <VStack>
      <GraphFilters onFilterPress={onFilterPress} activeFilter={activeFilter} />

      <ScrollView
        ref={scrollRef}
        onContentSizeChange={scrollToEnd}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <HStack>
          <Box>
            <VictoryChart
              minWidth={width}
              width={chartWidth < width ? width : chartWidth}
              height={CHART_HEIGHT}
              padding={{
                bottom: PADDING * 3,
                left: PADDING * 3,
                right: PADDING * 3,
                top: PADDING * 2,
              }}
            >
              <VictoryStack colorScale={["tomato", "rgba(255, 200, 200, 0.2)"]}>
                <VictoryBar
                  barWidth={BAR_WIDTH}
                  cornerRadius={{ bottom: 5 }}
                  style={{
                    data: {
                      fill: ({ datum }) => {
                        if (datum.y >= 500) {
                          return "#4ade80";
                        } else if (datum.y >= 50) {
                          return "#fbbf24";
                        } else {
                          return "#ef4444";
                        }
                      },
                    },
                    labels: {
                      fontSize: 10,
                      fill: "#3F84AB",
                      fontWeight: "bold",
                    },
                  }}
                  data={graph}
                  theme={VictoryTheme.material}
                  labels={({ datum }) => millify(datum.y)}
                  x="x"
                  y="y"
                  alignment="middle"
                />

                <VictoryBar
                  cornerRadius={{ top: 5 }}
                  barWidth={BAR_WIDTH}
                  style={{
                    labels: {
                      fontSize: 10,
                      fill: "#3F84AB",
                      fontWeight: "bold",
                    },
                  }}
                  data={graphClone}
                  theme={VictoryTheme.material}
                  x="x"
                  y="y"
                  alignment="middle"
                />
              </VictoryStack>
              <VictoryAxis
                ixLabelOverlap={true}
                offsetY={26}
                tickValues={axisLabels}
                style={{
                  axis: {
                    stroke: "#dedede",
                  },
                  ticks: { stroke: "#DEDEDE", size: 5 },
                  tickLabels: {
                    fontSize: 12,
                    padding: 5,
                  },
                }}
                standalone={false}
                theme={VictoryTheme.material}
                tickFormat={(t) => t}
              />
            </VictoryChart>
          </Box>
        </HStack>
      </ScrollView>
    </VStack>
  );
};

export default GraphComponent;
