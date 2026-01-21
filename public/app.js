const modeButtons = document.querySelectorAll(".toggle-btn");
const metricGrid = document.getElementById("metricGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const fundamentalSearch = document.getElementById("fundamentalSearch");
const fundamentalCards = document.getElementById("fundamentalCards");
const fundamentalTableBody = document.getElementById("fundamentalTableBody");
const valuationForm = document.getElementById("valuationForm");
const resetCalc = document.getElementById("resetCalc");
const saveCalc = document.getElementById("saveCalc");
const savedList = document.getElementById("savedList");
const clearSaved = document.getElementById("clearSaved");
const saveNameInput = document.getElementById("calcSaveName");
const liveStatus = document.getElementById("liveStatus");
const fundamentalsStatus = document.getElementById("fundamentalsStatus");
const refreshButton = document.getElementById("refreshData");
const autoRefreshToggle = document.getElementById("autoRefresh");
const silverModelForm = document.getElementById("silverModelForm");
const silverReset = document.getElementById("silverReset");
const silverAiscSample = document.getElementById("silverAiscSample");
const silverMarginTable = document.getElementById("silverMarginTable");
const silverDistribution = document.getElementById("silverDistribution");

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

const formatChange = (value) => {
  if (!Number.isFinite(value)) {
    return "--";
  }
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

const parseStooqCsv = (text) => {
  const lines = text.trim().split("\n");
  if (lines.length < 2) {
    return null;
  }
  const headers = lines[0].split(",");
  const values = lines[1].split(",");
  const row = {};
  headers.forEach((header, index) => {
    row[header.toLowerCase()] = values[index];
  });
  return row;
};

const proxySources = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://cors.isomorphic-git.org/${url}`,
  (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

const fetchWithFallbacks = async (url) => {
  try {
    const directResponse = await fetch(url, { mode: "cors" });
    if (directResponse.ok) {
      return { text: await directResponse.text(), source: "direct" };
    }
  } catch (error) {
    // Ignore and try proxies.
  }

  for (const buildProxy of proxySources) {
    try {
      const proxyUrl = buildProxy(url);
      const response = await fetch(proxyUrl);
      if (response.ok) {
        return { text: await response.text(), source: new URL(proxyUrl).hostname };
      }
    } catch (error) {
      // Try next proxy.
    }
  }
  throw new Error("All proxies failed");
};

const fetchStooqQuote = async (symbol) => {
  const endpoint = `https://stooq.com/q/l/?s=${symbol}&f=sd2t2ohlcv&h&e=csv`;
  const { text, source } = await fetchWithFallbacks(endpoint);
  return { quote: parseStooqCsv(text), source };
};

const updateLiveData = async () => {
  const stooqMap = {
    XAU: "xauusd",
    XAG: "xagusd",
    CL: "cl",
    HG: "hg",
    NG: "ng",
    SPX: "spx",
    NDX: "ndx",
    DXY: "usdx",
    EEM: "eem",
  };
  const symbols = Object.values(stooqMap);
  let quoteBySymbol = {};
  let dataSource = null;
  try {
    const results = await Promise.allSettled(symbols.map((symbol) => fetchStooqQuote(symbol)));
    results.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value?.quote) {
        quoteBySymbol[symbols[index]] = result.value.quote;
        dataSource = result.value.source || dataSource;
      }
    });
  } catch (error) {
    quoteBySymbol = {};
  }

  fundamentals.forEach((item) => {
    const stooqSymbol = stooqMap[item.symbol];
    const quote = quoteBySymbol[stooqSymbol];
    if (!quote) {
      return;
    }
    const close = Number(quote.close);
    const open = Number(quote.open);
    const high = Number(quote.high);
    const low = Number(quote.low);
    const dayChange = open ? ((close - open) / open) * 100 : 0;
    const rangeChange = low ? ((high - low) / low) * 100 : 0;
    item.price = Number.isFinite(close) ? close.toFixed(2) : item.price;
    item.day = formatChange(dayChange);
    item.week = formatChange(rangeChange);
    item.trend = dayChange >= 0 ? "up" : "down";
    item.driver = `Live move ${formatChange(dayChange)} vs open`;
    item.highlights = [
      `Session range ${formatChange(rangeChange)}`,
      `High ${Number.isFinite(high) ? high.toFixed(2) : "--"}`,
      `Low ${Number.isFinite(low) ? low.toFixed(2) : "--"}`,
    ];
  });

  metrics.premium = metrics.premium.map((metric) => {
    const lookup = {
      "Spot Gold": "XAU",
      "Comex Volume": "CL",
      "ETF Flows": "EEM",
      "Sentiment Score": "SPX",
    };
    const symbol = lookup[metric.label];
    const stooqSymbol = stooqMap[symbol];
    const quote = quoteBySymbol[stooqSymbol];
    if (!quote) {
      return metric;
    }
    const close = Number(quote.close);
    const open = Number(quote.open);
    const dayChange = open ? ((close - open) / open) * 100 : 0;
    return {
      ...metric,
      value: Number.isFinite(close) ? close.toFixed(2) : metric.value,
      delta: formatChange(dayChange),
      trend: dayChange >= 0 ? "up" : "down",
    };
  });

  const now = new Date();
  const success = Object.keys(quoteBySymbol).length > 0;
  if (liveStatus) {
    liveStatus.textContent = success
      ? `Last updated: ${now.toLocaleTimeString()} (${dataSource || "proxy"})`
      : "Live data unavailable (check connection)";
  }
  if (fundamentalsStatus) {
    fundamentalsStatus.textContent = success
      ? `Updated at ${now.toLocaleTimeString()} (${dataSource || "proxy"})`
      : "Live feed unavailable";
  }
  renderMetrics(document.querySelector(".toggle-btn.active")?.dataset.mode || "premium");
  renderFundamentals();
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

const defaultAiscSample = [
  18.98, 21.11, 23.88, 13.06, 12.03, 19.7, 24.75, 26.01, 24.3, 20.57, 24.15,
  28.13,
];

const parseAiscSample = (value) => {
  const parsed = value
    .split(/[\n,]+/)
    .map((entry) => Number(entry.trim()))
    .filter((entry) => Number.isFinite(entry) && entry > 0);
  return parsed.length ? parsed : [...defaultAiscSample];
};

const quantile = (arr, q) => {
  const sorted = [...arr].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
};

const randTriangular = (min, mode, max) => {
  const u = Math.random();
  const c = (mode - min) / (max - min);
  if (u < c) {
    return min + Math.sqrt(u * (max - min) * (mode - min));
  }
  return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
};

const randUniform = (min, max) => min + Math.random() * (max - min);

const normInv = (p) => {
  const a1 = -39.6968302866538;
  const a2 = 220.946098424521;
  const a3 = -275.928510446969;
  const a4 = 138.357751867269;
  const a5 = -30.6647980661472;
  const a6 = 2.50662827745924;
  const b1 = -54.4760987982241;
  const b2 = 161.585836858041;
  const b3 = -155.698979859887;
  const b4 = 66.8013118877197;
  const b5 = -13.2806815528857;
  const c1 = -7.78489400243029e-3;
  const c2 = -0.322396458041136;
  const c3 = -2.40075827716184;
  const c4 = -2.54973253934373;
  const c5 = 4.37466414146497;
  const c6 = 2.93816398269878;
  const d1 = 7.78469570904146e-3;
  const d2 = 0.32246712907004;
  const d3 = 2.445134137143;
  const d4 = 3.75440866190742;
  const pLow = 0.02425;
  const pHigh = 1 - pLow;
  let q;
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
    );
  }
  if (p <= pHigh) {
    q = p - 0.5;
    const r = q * q;
    return (
      (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
      (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
    );
  }
  q = Math.sqrt(-2 * Math.log(1 - p));
  return (
    -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
    ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
  );
};

const formatDollars = (value) => {
  if (!Number.isFinite(value)) {
    return "$--";
  }
  return formatCurrency(value);
};

const updateMarginTable = (sample) => {
  if (!silverMarginTable) {
    return;
  }
  const p10 = quantile(sample, 0.1);
  const median = quantile(sample, 0.5);
  const p90 = quantile(sample, 0.9);
  const priceDecks = [55, 70, 90, 110];
  silverMarginTable.innerHTML = "";
  priceDecks.forEach((price) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${formatDollars(price)}</td>
      <td>${formatDollars(price - p10)}</td>
      <td>${formatDollars(price - median)}</td>
      <td>${formatDollars(price - p90)}</td>
    `;
    silverMarginTable.appendChild(row);
  });
};

const drawDistribution = (values, spotPrice) => {
  if (!silverDistribution) {
    return;
  }
  const ctx = silverDistribution.getContext("2d");
  if (!ctx) {
    return;
  }
  const width = silverDistribution.width;
  const height = silverDistribution.height;
  ctx.clearRect(0, 0, width, height);

  const min = Math.min(...values);
  const max = Math.max(...values);
  const bins = 24;
  const step = (max - min) / bins || 1;
  const counts = new Array(bins).fill(0);
  values.forEach((value) => {
    const index = Math.min(bins - 1, Math.floor((value - min) / step));
    counts[index] += 1;
  });
  const maxCount = Math.max(...counts, 1);
  const padding = 20;
  const chartHeight = height - padding * 2;
  const barWidth = (width - padding * 2) / bins;

  ctx.fillStyle = "rgba(57, 255, 20, 0.2)";
  ctx.strokeStyle = "rgba(57, 255, 20, 0.6)";
  counts.forEach((count, index) => {
    const barHeight = (count / maxCount) * chartHeight;
    const x = padding + index * barWidth;
    const y = height - padding - barHeight;
    ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
  });

  if (Number.isFinite(spotPrice)) {
    const clamped = Math.min(Math.max(spotPrice, min), max);
    const spotX = padding + ((clamped - min) / (max - min || 1)) * (width - padding * 2);
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 208, 77, 0.9)";
    ctx.moveTo(spotX, padding);
    ctx.lineTo(spotX, height - padding);
    ctx.stroke();
  }
};

const runSilverModel = () => {
  const sample = parseAiscSample(silverAiscSample?.value || "");
  const qMin = Number(document.getElementById("silverQuantileMin").value);
  const qMax = Number(document.getElementById("silverQuantileMax").value);
  const settleMin = Number(document.getElementById("silverSettleMin").value);
  const settleMode = Number(document.getElementById("silverSettleMode").value);
  const settleMax = Number(document.getElementById("silverSettleMax").value);
  const driftMin = Number(document.getElementById("silverDriftMin").value) / 100;
  const driftMax = Number(document.getElementById("silverDriftMax").value) / 100;
  const multMin = Number(document.getElementById("silverMultMin").value);
  const multMode = Number(document.getElementById("silverMultMode").value);
  const multMax = Number(document.getElementById("silverMultMax").value);
  const squeezeFast = Number(document.getElementById("silverSqueezeFast").value);
  const squeezeSlow = Number(document.getElementById("silverSqueezeSlow").value);
  const identityProb = Number(document.getElementById("silverIdentityProb").value);
  const spotPrice = Number(document.getElementById("silverSpotPrice").value);
  const median = quantile(sample, 0.5);
  const p90 = quantile(sample, 0.9);
  const mu = Math.log(median);
  const sigma = (Math.log(p90) - mu) / normInv(0.9);
  const simulations = 5000;
  const prices = [];
  const basePrices = [];

  for (let i = 0; i < simulations; i += 1) {
    const quant = randUniform(qMin, qMax);
    const costBase = Math.exp(mu + sigma * normInv(quant));
    const settleTime = randTriangular(settleMin, settleMode, settleMax);
    const drift = randUniform(driftMin, driftMax);
    const cost = costBase * Math.exp(drift * settleTime);
    const multiplierBase = randTriangular(multMin, multMode, multMax);
    let multiplier = multiplierBase;
    const squeezeProb = settleTime <= 3 ? squeezeFast : squeezeSlow;
    const draw = Math.random();
    if (draw < squeezeProb) {
      multiplier *= randUniform(1.3, 1.8);
    } else if (draw < squeezeProb + identityProb) {
      multiplier *= randUniform(2.0, 4.0);
    }
    basePrices.push(cost * multiplierBase);
    prices.push(cost * multiplier);
  }

  const medianPrice = quantile(prices, 0.5);
  const meanPrice = prices.reduce((sum, value) => sum + value, 0) / prices.length;
  const p05 = quantile(prices, 0.05);
  const p95 = quantile(prices, 0.95);
  const p99 = quantile(prices, 0.99);
  const baseMedian = quantile(basePrices, 0.5);

  document.getElementById("silverMedian").textContent = formatDollars(medianPrice);
  document.getElementById("silverMean").textContent = formatDollars(meanPrice);
  document.getElementById("silverBand").textContent = `${formatDollars(p05)} – ${formatDollars(p95)}`;
  document.getElementById("silverP99").textContent = formatDollars(p99);
  document.getElementById("silverBaseMedian").textContent = formatDollars(baseMedian);
  const spotDelta =
    Number.isFinite(spotPrice) && spotPrice > 0
      ? ((medianPrice - spotPrice) / spotPrice) * 100
      : 0;
  const spotLabel = Number.isFinite(spotPrice)
    ? `${spotDelta >= 0 ? "+" : ""}${spotDelta.toFixed(1)}% vs spot`
    : "--";
  document.getElementById("silverSpotDelta").textContent = spotLabel;
  document.getElementById("silverSpotNote").textContent = Number.isFinite(spotPrice)
    ? `Spot ${formatDollars(spotPrice)} vs median`
    : "Spot price unavailable";
  updateMarginTable(sample);
  drawDistribution(prices, spotPrice);
};

const resetSilverModel = () => {
  if (silverAiscSample) {
    silverAiscSample.value = defaultAiscSample.join("\n");
  }
  runSilverModel();
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
  const fcfMultipleInput = Number(document.getElementById("calcFcfMultiple").value);

  const margin = price - cost;
  const annualCashflow = margin * production;
  const annualRevenue = price * production;
  const tierDefaults = {
    junior: 5,
    mid: 8,
    major: 12,
  };
  const fcfMultiple = fcfMultipleInput > 0 ? fcfMultipleInput : tierDefaults[tier] || 8;
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
  const currentMcap = shares > 0 ? currentPrice * shares : 0;
  const futureMcap = shares > 0 ? perShare * shares : 0;
  const tierByMcap = (mcap) => {
    if (mcap >= 10_000_000_000) {
      return "Major (>$10B)";
    }
    if (mcap >= 2_000_000_000) {
      return "Mid-tier ($2B-$10B)";
    }
    return "Junior (<$2B)";
  };
  const tierNow = tierByMcap(currentMcap);
  const tierNext = tierByMcap(futureMcap);

  document.getElementById("resultCashflow").textContent = formatCurrency(annualCashflow);
  document.getElementById("resultFcf").textContent = formatCurrency(annualFcf);
  document.getElementById("resultNpv").textContent = formatCurrency(npvAfterDebt);
  document.getElementById("resultEvMultiple").textContent = formatCurrency(evFromMultiple);
  document.getElementById("resultPerShare").textContent = formatCurrency(perShare);
  document.getElementById("resultUpsideMultiple").textContent = `${upsideMultiple.toFixed(2)}x`;
  document.getElementById(
    "resultUpsidePercent"
  ).textContent = `${upsidePercent >= 0 ? "+" : ""}${upsidePercent.toFixed(1)}%`;
  document.getElementById("resultCurrentMcap").textContent = formatCurrency(currentMcap);
  document.getElementById("resultFutureMcap").textContent = formatCurrency(futureMcap);
  document.getElementById("resultTierNow").textContent = tierNow;
  document.getElementById("resultTierNext").textContent = `Potential: ${tierNext}`;
};

const readCalcInputs = () => {
  return {
    tier: document.getElementById("calcTier").value,
    price: Number(document.getElementById("calcPrice").value),
    production: Number(document.getElementById("calcProduction").value),
    cost: Number(document.getElementById("calcCost").value),
    mineLife: Number(document.getElementById("calcMineLife").value),
    discountRate: Number(document.getElementById("calcDiscount").value),
    shares: Number(document.getElementById("calcShares").value),
    debt: Number(document.getElementById("calcDebt").value),
    currentPrice: Number(document.getElementById("calcCurrentPrice").value),
    fcfMultiple: Number(document.getElementById("calcFcfMultiple").value),
  };
};

const readCalcOutputs = () => {
  return {
    cashflow: document.getElementById("resultCashflow").textContent,
    fcf: document.getElementById("resultFcf").textContent,
    npv: document.getElementById("resultNpv").textContent,
    evMultiple: document.getElementById("resultEvMultiple").textContent,
    perShare: document.getElementById("resultPerShare").textContent,
    upsideMultiple: document.getElementById("resultUpsideMultiple").textContent,
    upsidePercent: document.getElementById("resultUpsidePercent").textContent,
    currentMcap: document.getElementById("resultCurrentMcap").textContent,
    futureMcap: document.getElementById("resultFutureMcap").textContent,
    tierNow: document.getElementById("resultTierNow").textContent,
    tierNext: document.getElementById("resultTierNext").textContent,
  };
};

const loadSavedResults = () => {
  if (!savedList) {
    return;
  }
  const saved = JSON.parse(localStorage.getItem("savedCalculations") || "[]");
  savedList.innerHTML = "";
  saved.forEach((entry, index) => {
    const item = document.createElement("li");
    item.className = "saved-item";
    item.innerHTML = `
      <div>
        <strong>${entry.label}</strong>
        <span>${entry.summary}</span>
      </div>
      <button class="btn ghost small" data-index="${index}">Load</button>
    `;
    savedList.appendChild(item);
  });
};

const saveCalculation = () => {
  const inputs = readCalcInputs();
  const outputs = readCalcOutputs();
  const saved = JSON.parse(localStorage.getItem("savedCalculations") || "[]");
  const customName = saveNameInput ? saveNameInput.value.trim() : "";
  const label = customName || `${inputs.tier.toUpperCase()} • ${outputs.perShare}`;
  const summary = `Upside ${outputs.upsidePercent} | Multiple ${outputs.upsideMultiple}`;
  saved.unshift({
    createdAt: new Date().toISOString(),
    label,
    summary,
    inputs,
    outputs,
  });
  localStorage.setItem("savedCalculations", JSON.stringify(saved.slice(0, 10)));
  if (saveNameInput) {
    saveNameInput.value = "";
  }
  loadSavedResults();
};

const loadCalculation = (index) => {
  const saved = JSON.parse(localStorage.getItem("savedCalculations") || "[]");
  const entry = saved[index];
  if (!entry) {
    return;
  }
  document.getElementById("calcTier").value = entry.inputs.tier;
  document.getElementById("calcPrice").value = entry.inputs.price;
  document.getElementById("calcProduction").value = entry.inputs.production;
  document.getElementById("calcCost").value = entry.inputs.cost;
  document.getElementById("calcMineLife").value = entry.inputs.mineLife;
  document.getElementById("calcDiscount").value = entry.inputs.discountRate;
  document.getElementById("calcShares").value = entry.inputs.shares;
  document.getElementById("calcDebt").value = entry.inputs.debt;
  document.getElementById("calcCurrentPrice").value = entry.inputs.currentPrice;
  document.getElementById("calcFcfMultiple").value = entry.inputs.fcfMultiple;
  updateCalculator();
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

if (silverModelForm) {
  silverModelForm.addEventListener("submit", (event) => {
    event.preventDefault();
    runSilverModel();
  });
}

if (resetCalc) {
  resetCalc.addEventListener("click", () => {
    valuationForm.reset();
    updateCalculator();
  });
}

if (silverReset) {
  silverReset.addEventListener("click", resetSilverModel);
}

if (saveCalc) {
  saveCalc.addEventListener("click", saveCalculation);
}

if (clearSaved) {
  clearSaved.addEventListener("click", () => {
    localStorage.removeItem("savedCalculations");
    loadSavedResults();
  });
}

if (savedList) {
  savedList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");
    if (!button) {
      return;
    }
    loadCalculation(Number(button.dataset.index));
  });
}

renderMetrics("premium");
renderFundamentals();
updateCalculator();
resetSilverModel();
loadSavedResults();

let refreshTimer = null;
const startAutoRefresh = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
  refreshTimer = setInterval(updateLiveData, 300000);
};

if (refreshButton) {
  refreshButton.addEventListener("click", () => {
    updateLiveData();
  });
}

if (autoRefreshToggle) {
  autoRefreshToggle.addEventListener("change", () => {
    if (autoRefreshToggle.checked) {
      startAutoRefresh();
    } else if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  });
}

updateLiveData();
startAutoRefresh();
