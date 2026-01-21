const modeButtons = document.querySelectorAll(".toggle-btn");
const metricGrid = document.getElementById("metricGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const fundamentalSearch = document.getElementById("fundamentalSearch");
const fundamentalCards = document.getElementById("fundamentalCards");
const fundamentalTableBody = document.getElementById("fundamentalTableBody");
const valuationForm = document.getElementById("valuationForm");
const resetCalc = document.getElementById("resetCalc");

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

const fundamentals = [
  {
    category: "commodity",
    name: "Gold Spot",
    symbol: "XAU",
    price: "$2,412",
    day: "+0.8%",
    week: "+1.9%",
    trend: "up",
    driver: "Real yields falling, ETF inflows",
    highlights: ["Real yield -1.2%", "ETF flows +3.1T", "Central banks bid"],
  },
  {
    category: "commodity",
    name: "Silver Spot",
    symbol: "XAG",
    price: "$29.84",
    day: "+1.4%",
    week: "+3.7%",
    trend: "up",
    driver: "Industrial demand rebound",
    highlights: ["Solar demand +6%", "Gold/silver ratio 81x", "Inventories tight"],
  },
  {
    category: "commodity",
    name: "WTI Crude",
    symbol: "CL",
    price: "$82.10",
    day: "-0.6%",
    week: "+2.1%",
    trend: "down",
    driver: "SPR refill pace slows",
    highlights: ["OPEC+ cuts extend", "US stocks -4.2mb", "Refinery runs 93%"],
  },
  {
    category: "commodity",
    name: "Copper",
    symbol: "HG",
    price: "$4.21",
    day: "+0.3%",
    week: "+4.8%",
    trend: "up",
    driver: "Grid capex cycle",
    highlights: ["China demand +5%", "Mine disruptions", "LME spreads backward"],
  },
  {
    category: "commodity",
    name: "Natural Gas",
    symbol: "NG",
    price: "$2.58",
    day: "+0.1%",
    week: "-2.9%",
    trend: "down",
    driver: "Storage above 5y avg",
    highlights: ["LNG exports steady", "Power burn soft", "Shoulder season"],
  },
  {
    category: "index",
    name: "S&P 500",
    symbol: "SPX",
    price: "5,312",
    day: "+0.4%",
    week: "+1.1%",
    trend: "up",
    driver: "Earnings breadth widening",
    highlights: ["Forward EPS +7%", "Volatility 14", "Tech leadership"],
  },
  {
    category: "index",
    name: "NASDAQ 100",
    symbol: "NDX",
    price: "18,940",
    day: "+0.7%",
    week: "+2.4%",
    trend: "up",
    driver: "AI capex tailwinds",
    highlights: ["Mega-cap margins", "Semis strength", "Risk-on flows"],
  },
  {
    category: "index",
    name: "DXY Dollar Index",
    symbol: "DXY",
    price: "103.4",
    day: "-0.2%",
    week: "-0.6%",
    trend: "down",
    driver: "Rate-cut pricing builds",
    highlights: ["Real rates lower", "FX vol muted", "Carry demand"],
  },
  {
    category: "index",
    name: "MSCI EM",
    symbol: "EEM",
    price: "42.18",
    day: "+0.2%",
    week: "+0.5%",
    trend: "up",
    driver: "China stimulus +FX tailwind",
    highlights: ["Credit easing", "Commodity beta", "USD softness"],
  },
];

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

const getFilteredFundamentals = () => {
  const active = document.querySelector(".filter-btn.active");
  const category = active ? active.dataset.category : "all";
  const query = fundamentalSearch ? fundamentalSearch.value.trim().toLowerCase() : "";
  return fundamentals.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.symbol.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
};

const renderFundamentals = () => {
  if (!fundamentalCards || !fundamentalTableBody) {
    return;
  }
  const data = getFilteredFundamentals();
  fundamentalCards.innerHTML = "";
  fundamentalTableBody.innerHTML = "";

  data.slice(0, 6).forEach((item) => {
    const card = document.createElement("article");
    card.className = "dashboard-card";
    card.innerHTML = `
      <div class="dashboard-header">
        <div>
          <h3>${item.name}</h3>
          <span class="ticker">${item.symbol}</span>
        </div>
        <span class="pill ${item.trend}">${item.category}</span>
      </div>
      <div class="dashboard-price">
        <strong>${item.price}</strong>
        <em class="${item.trend}">${item.day} 1D</em>
      </div>
      <ul>
        ${item.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
      </ul>
    `;
    fundamentalCards.appendChild(card);
  });

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.category}</td>
      <td>${item.name} <span class="ticker">${item.symbol}</span></td>
      <td>${item.price}</td>
      <td class="${item.trend}">${item.day}</td>
      <td class="${item.trend}">${item.week}</td>
      <td><span class="pill ${item.trend}">${item.trend}</span></td>
      <td>${item.driver}</td>
    `;
    fundamentalTableBody.appendChild(row);
  });
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
};

const updateCalculator = () => {
  const tier = document.getElementById("calcTier").value;
  const price = Number(document.getElementById("calcPrice").value);
  const production = Number(document.getElementById("calcProduction").value);
  const cost = Number(document.getElementById("calcCost").value);
  const mineLife = Number(document.getElementById("calcMineLife").value);
  const discountRate = Number(document.getElementById("calcDiscount").value) / 100;
  const shares = Number(document.getElementById("calcShares").value) * 1_000_000;
  const debt = Number(document.getElementById("calcDebt").value) * 1_000_000;
  const currentPrice = Number(document.getElementById("calcCurrentPrice").value);

  const margin = price - cost;
  const annualCashflow = margin * production;
  const annualRevenue = price * production;
  const tierDefaults = {
    junior: 5,
    mid: 8,
    major: 12,
  };
  const fcfMultiple = tierDefaults[tier] || 8;
  const marginRatio = annualRevenue > 0 ? Math.max(margin / price, 0) : 0;
  const fcfMargin = Math.min(marginRatio * 0.75, 0.45);
  const annualFcf = annualRevenue * fcfMargin;
  const evFromMultiple = annualFcf * fcfMultiple;
  let npv = 0;
  if (discountRate > 0) {
    npv = annualCashflow * ((1 - Math.pow(1 + discountRate, -mineLife)) / discountRate);
  } else {
    npv = annualCashflow * mineLife;
  }
  const npvAfterDebt = npv - debt;
  const equityFromMultiple = evFromMultiple - debt;
  const blendedEquity = (npvAfterDebt + equityFromMultiple) / 2;
  const perShare = shares > 0 ? blendedEquity / shares : 0;
  const upsideMultiple = currentPrice > 0 ? perShare / currentPrice : 0;
  const upsidePercent = currentPrice > 0 ? (perShare / currentPrice - 1) * 100 : 0;

  document.getElementById("resultCashflow").textContent = formatCurrency(annualCashflow);
  document.getElementById("resultFcf").textContent = formatCurrency(annualFcf);
  document.getElementById("resultNpv").textContent = formatCurrency(npvAfterDebt);
  document.getElementById("resultEvMultiple").textContent = formatCurrency(evFromMultiple);
  document.getElementById("resultPerShare").textContent = formatCurrency(perShare);
  document.getElementById("resultUpsideMultiple").textContent = `${upsideMultiple.toFixed(2)}x`;
  document.getElementById(
    "resultUpsidePercent"
  ).textContent = `${upsidePercent >= 0 ? "+" : ""}${upsidePercent.toFixed(1)}%`;
};

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderMetrics(button.dataset.mode);
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderFundamentals();
  });
});

if (fundamentalSearch) {
  fundamentalSearch.addEventListener("input", renderFundamentals);
}

if (valuationForm) {
  valuationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateCalculator();
  });
}

if (resetCalc) {
  resetCalc.addEventListener("click", () => {
    valuationForm.reset();
    updateCalculator();
  });
}

renderMetrics("premium");
renderFundamentals();
updateCalculator();
