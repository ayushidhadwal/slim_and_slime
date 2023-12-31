// Imperial 60.0 - 660 lb

const ImperialWeight = [];
const ImperialWeightDecimal = [];

let a = 60;
while (a < 660) {
  ImperialWeight.push({ id: String(a), value: String(a) });
  a++;
}

let b = 0;
while (b <= 9) {
  ImperialWeightDecimal.push({
    id: String(b),
    value: String(b),
    label: `.${b} lb`,
  });
  b++;
}

// Metric 60.0 - 300.9 KG

const MetricWeight = [];
const MetricWeightDecimal = [];

let c = 60;
while (c < 300) {
  MetricWeight.push({ id: String(c), value: String(c) });
  c++;
}

let d = 0;
while (d <= 9) {
  MetricWeightDecimal.push({
    id: String(d),
    value: String(d),
    label: `.${d} kg`,
  });
  d++;
}

export {
  ImperialWeight,
  ImperialWeightDecimal,
  MetricWeight,
  MetricWeightDecimal,
};
