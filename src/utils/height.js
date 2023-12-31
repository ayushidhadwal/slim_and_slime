const getImperialHeight = () => {
  const height = [];

  let i = 1;
  let x = 7;

  let iLimit = 8;
  let xLimit = 9;

  while (i <= iLimit) {
    for (let j = x; i <= xLimit; j++) {
      height.push({
        id: `${i}-${j}`,
        label: `${i}ft ${j}in`,
        value: `${i}.${j}`,
      });

      if (j === 9) {
        x = 0;
        break;
      }
    }

    i++;
  }

  return height;
};

const getMetricHeight = () => {
  const height = [];

  for (let i = 50; i <= 300; i++) {
    height.push({
      id: `${i}`,
      label: `${i} cm`,
      value: `${i}`,
    });
  }

  return height;
};

const ImperialHeight = getImperialHeight();
const MetricHeight = getMetricHeight();

export { ImperialHeight, MetricHeight };
