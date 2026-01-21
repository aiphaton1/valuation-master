const modeButtons = document.querySelectorAll(".toggle-btn");
const metricGrid = document.getElementById("metricGrid");

const metrics = {
  standard: [
    { label: "Spot Gold", value: "$2,412.18", delta: "+0.82%", trend: "up" },
    { label: "Comex Volume", value: "167K", delta: "-4% vs avg", trend: "down" },
    { label: "ETF Flows", value: "+0.9T", delta: "Neutral", trend: "up" },
    { label: "Sentiment Score", value: "62", delta: "Cautious", trend: "down" },
  ],
  premium: [
    { label: "Spot Gold", value: "$2,412.18", delta: "+0.82%", trend: "up" },
    { label: "Comex Volume", value: "227K", delta: "+12% vs avg", trend: "up" },
    { label: "ETF Flows", value: "+3.1T", delta: "Bullish", trend: "up" },
    { label: "Sentiment Score", value: "78", delta: "Risk-on", trend: "up" },
  ],
};

const renderMetrics = (mode) => {
  const data = metrics[mode];
  metricGrid.innerHTML = "";
  data.forEach((metric) => {
    const card = document.createElement("div");
    card.className = "metric";
    card.innerHTML = `
      <span>${metric.label}</span>
      <strong>${metric.value}</strong>
      <em class="${metric.trend}">${metric.delta}</em>
    `;
    metricGrid.appendChild(card);
  });
};

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderMetrics(button.dataset.mode);
  });
});

renderMetrics("premium");
