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
const silverTooltip = document.getElementById("silverTooltip");
const ratioGoldPlatinum = document.getElementById("ratioGoldPlatinum");
const targetGoldPlatinum = document.getElementById("targetGoldPlatinum");
const upsideGoldPlatinum = document.getElementById("upsideGoldPlatinum");
const oneToOneGoldPlatinum = document.getElementById("oneToOneGoldPlatinum");
const ratioGoldSilver = document.getElementById("ratioGoldSilver");
const targetGoldSilver = document.getElementById("targetGoldSilver");
const upsideGoldSilver = document.getElementById("upsideGoldSilver");
const oneToOneGoldSilver = document.getElementById("oneToOneGoldSilver");
const oneToOnePlatinumSilver = document.getElementById("oneToOnePlatinumSilver");
const ratioPlatinumSilver = document.getElementById("ratioPlatinumSilver");
const targetPlatinumSilver = document.getElementById("targetPlatinumSilver");
const upsidePlatinumSilver = document.getElementById("upsidePlatinumSilver");
const metalchartsXagStatus = document.getElementById("metalchartsXagStatus");
const metalchartsXagBody = document.getElementById("metalchartsXagBody");
const silverTrackerStatus = document.getElementById("silverTrackerStatus");
const shanghaiPrice = document.getElementById("shanghaiPrice");
const shanghaiPriceNote = document.getElementById("shanghaiPriceNote");
const shanghaiPremium = document.getElementById("shanghaiPremium");
const shanghaiPremiumNote = document.getElementById("shanghaiPremiumNote");
const londonInventory = document.getElementById("londonInventory");
const londonInventoryNote = document.getElementById("londonInventoryNote");
const crossMarketFlows = document.getElementById("crossMarketFlows");
const crossMarketFlowsNote = document.getElementById("crossMarketFlowsNote");
const cmeStocks = document.getElementById("cmeStocks");
const cmeStocksNote = document.getElementById("cmeStocksNote");
const kwhForm = document.getElementById("kwhForm");
const kwhReset = document.getElementById("kwhReset");
const kwhWarnings = document.getElementById("kwhWarnings");
const kwhPowerTable = document.getElementById("kwhPowerTable");
const kwhSave = document.getElementById("kwhSave");
const kwhSaveName = document.getElementById("kwhSaveName");
const kwhSavedList = document.getElementById("kwhSavedList");
const kwhClearSaved = document.getElementById("kwhClearSaved");

let lastHistogram = null;

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
    name: "Platinum Spot",
    symbol: "XPT",
    price: "$945",
    day: "+0.6%",
    week: "+1.2%",
    trend: "up",
    driver: "Auto catalyst demand steady",
    highlights: ["ETF holdings stable", "Supply tightness", "Substitution watch"],
  },
  {
    category: "commodity",
    name: "Uranium Spot",
    symbol: "URA",
    price: "$30.12",
    day: "+0.3%",
    week: "+0.9%",
    trend: "up",
    driver: "Utility contracting cadence",
    highlights: ["Reactor restarts", "Inventory draw", "Term demand"],
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

const parseCsvRows = (text) => {
  const lines = text.trim().split("\n");
  if (lines.length < 2) {
    return [];
  }
  const headers = lines[0].split(",").map((header) => header.trim().toLowerCase());
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const row = {};
    headers.forEach((header, index) => {
      row[header] = (values[index] || "").trim();
    });
    return row;
  });
};

const formatVolume = (value) => {
  if (!Number.isFinite(value)) {
    return "--";
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}K`;
  }
  return `${Math.round(value)}`;
};

const formatTonnage = (value) => {
  if (!Number.isFinite(value)) {
    return "--";
  }
  return `${value.toFixed(1)}t`;
};

const proxySources = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://cors.isomorphic-git.org/${url}`,
  (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url) => `https://thingproxy.freeboard.io/fetch/${url}`,
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

const safeParseJson = (text) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
};

const normalizeRowKeys = (row) => {
  if (!row) {
    return {};
  }
  return Object.keys(row).reduce((acc, key) => {
    acc[key.toLowerCase()] = row[key];
    return acc;
  }, {});
};

const findRowValue = (row, keys) => {
  for (const key of keys) {
    if (row[key] !== undefined) {
      return row[key];
    }
  }
  return undefined;
};

const fetchFearGreed = async () => {
  const endpoint = "https://production.dataviz.cnn.io/index/fearandgreed/graphdata";
  const { text, source } = await fetchWithFallbacks(endpoint);
  const data = JSON.parse(text);
  const points = data?.fear_and_greed?.data || [];
  if (points.length < 2) {
    return { latest: null, previous: null, source };
  }
  const latest = points[points.length - 1]?.value;
  const previous = points[points.length - 2]?.value;
  return { latest, previous, source };
};

const fetchGldHoldings = async () => {
  const endpoint = "https://prod.cdn.spdrgoldshares.com/GLD/GLD_Holdings.csv";
  const { text, source } = await fetchWithFallbacks(endpoint);
  const lines = text.trim().split("\n");
  const headerIndex = lines.findIndex((line) => line.toLowerCase().includes("date"));
  if (headerIndex === -1) {
    return { latest: null, previous: null, source };
  }
  const rows = parseCsvRows(lines.slice(headerIndex).join("\n"));
  const totalKey =
    Object.keys(rows[0] || {}).find((key) => key.includes("total") && key.includes("ton")) ||
    Object.keys(rows[0] || {}).find((key) => key.includes("total"));
  if (!totalKey || rows.length < 2) {
    return { latest: null, previous: null, source };
  }
  const toNumber = (value) => Number(String(value || "").replace(/[^0-9.-]/g, ""));
  const latest = toNumber(rows[rows.length - 1][totalKey]);
  const previous = toNumber(rows[rows.length - 2][totalKey]);
  return { latest, previous, source };
};

const collectMetalchartsPrices = (node, results) => {
  if (!node || typeof node !== "object") {
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((entry) => collectMetalchartsPrices(entry, results));
    return;
  }
  const priceValue =
    node.price ?? node.value ?? node.last ?? node.spot ?? node.amount ?? node.rate ?? null;
  if (priceValue !== null && priceValue !== undefined) {
    const numeric = Number(String(priceValue).replace(/[^0-9.-]/g, ""));
    const label = node.label || node.name || node.title || node.metal || node.symbol;
    const unit = node.unit || node.uom || node.currency || node.measure || node.per;
    if (label && Number.isFinite(numeric)) {
      results.push({
        label: String(label),
        price: numeric,
        unit: unit ? String(unit) : "--",
      });
    }
  }
  Object.values(node).forEach((value) => collectMetalchartsPrices(value, results));
};

const fetchMetalchartsXag = async () => {
  const endpoint = "https://metalcharts.org/metals/xag";
  const { text, source } = await fetchWithFallbacks(endpoint);
  const results = [];
  const nextDataMatch = text.match(
    new RegExp('<script id="__NEXT_DATA__"[^>]*>([\\s\\S]*?)</script>', "i")
  );
  if (nextDataMatch) {
    const data = safeParseJson(nextDataMatch[1]);
    if (data) {
      collectMetalchartsPrices(data, results);
    }
  }
  const nuxtMatch = text.match(new RegExp("window\\.__NUXT__=([\\s\\S]*?)</script>", "i"));
  if (nuxtMatch) {
    const data = safeParseJson(nuxtMatch[1]);
    if (data) {
      collectMetalchartsPrices(data, results);
    }
  }
  const dataAttrMatches = [
    ...text.matchAll(new RegExp('data-label="([^"]+)"[^>]*data-price="([^"]+)"', "gi")),
  ];
  dataAttrMatches.forEach((match) => {
    const label = match[1];
    const numeric = Number(String(match[2]).replace(/[^0-9.-]/g, ""));
    if (label && Number.isFinite(numeric)) {
      results.push({ label, price: numeric, unit: "--" });
    }
  });
  const unique = [];
  const seen = new Set();
  results.forEach((item) => {
    const key = `${item.label}-${item.unit}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  });
  return { items: unique, source };
};

const buildDateString = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}${month}${day}`;
};

const fetchShanghaiSilver = async () => {
  const endpoint = "https://silverbull.club/shanghai-silver-spot-price/";
  try {
    const { text, source } = await fetchWithFallbacks(endpoint);
    const priceMatch = text.match(/Shanghai\\s+Silver\\s+Spot\\s+Price\\s*\\(CNY\\).*?([0-9]+\\.?[0-9]*)/is);
    const premiumMatch = text.match(/Shanghai\\s+Silver\\s+Premium.*?([0-9]+\\.?[0-9]*)/is);
    const dateMatch = text.match(/As\\s+of\\s+([A-Za-z]+\\s+\\d{1,2},\\s+\\d{4})/i);
    const price = priceMatch ? Number(priceMatch[1]) : null;
    const premium = premiumMatch ? Number(premiumMatch[1]) : null;
    const dateString = dateMatch ? dateMatch[1] : null;
    return {
      dateString,
      price,
      premium: Number.isFinite(premium) ? premium : null,
      source,
    };
  } catch (error) {
    return { dateString: null, price: null, premium: null, source: null };
  }
};

const fetchLbmaSilverInventory = async () => {
  const endpoint = "https://www.lbma.org.uk/api/v1/publications/vault-holdings?metal=silver";
  const { text, source } = await fetchWithFallbacks(endpoint);
  const data = safeParseJson(text);
  const rows = data?.data || data?.vault_holdings || data?.items || [];
  if (!Array.isArray(rows) || rows.length < 2) {
    return { latest: null, previous: null, source };
  }
  const getValue = (row) =>
    Number(
      row.silver ||
        row.total ||
        row.total_tonnes ||
        row.totalTonnes ||
        row.tonnes ||
        row.value
    );
  const latest = getValue(rows[rows.length - 1]);
  const previous = getValue(rows[rows.length - 2]);
  return { latest, previous, source };
};

const fetchCmeSilverStocks = async () => {
  const today = new Date();
  for (let offset = 0; offset < 5; offset += 1) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - offset);
    const dateString = buildDateString(checkDate);
    const dailyEndpoint = `https://www.cmegroup.com/ftp/pub/settle/stocks/comex_stocks_${dateString}.csv`;
    try {
      const { text, source } = await fetchWithFallbacks(dailyEndpoint);
      const rows = parseCsvRows(text);
      const silverRow = rows.find((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes("silver"))
      );
      if (silverRow) {
        const totalKey =
          Object.keys(silverRow).find((key) => key.includes("total") && key.includes("oz")) ||
          Object.keys(silverRow).find((key) => key.includes("total"));
        const latest = totalKey ? Number(silverRow[totalKey]) : null;
        return { latest: Number.isFinite(latest) ? latest : null, previous: null, source };
      }
      return { latest: null, previous: null, source };
    } catch (error) {
      // Try prior date.
    }
  }
  const endpoint = "https://www.cmegroup.com/CmeWS/mvc/Settlement/StockReport?commodity=Silver";
  const { text, source } = await fetchWithFallbacks(endpoint);
  const data = safeParseJson(text);
  if (data?.stockReport) {
    const rows = data.stockReport;
    const totalRow = rows.find((row) =>
      String(row.warehouse || row.facility || row.name || "").toLowerCase().includes("total")
    );
    const latest = Number(totalRow?.total || totalRow?.grandTotal || totalRow?.inventory);
    return { latest: Number.isFinite(latest) ? latest : null, previous: null, source };
  }
  const rows = parseCsvRows(text);
  const totalRow = rows.find((row) =>
    Object.values(row).some((value) => String(value).toLowerCase().includes("total"))
  );
  const totalKey = totalRow
    ? Object.keys(totalRow).find((key) => key.includes("total")) || null
    : null;
  const latest = totalKey ? Number(totalRow[totalKey]) : null;
  return { latest: Number.isFinite(latest) ? latest : null, previous: null, source };
};

const updateSilverTrackers = async (spotPrice) => {
  if (!silverTrackerStatus) {
    return;
  }
  const [shanghaiResult, lbmaResult, cmeResult] = await Promise.allSettled([
    fetchShanghaiSilver(),
    fetchLbmaSilverInventory(),
    fetchCmeSilverStocks(),
  ]);

  const shanghaiData = shanghaiResult.status === "fulfilled" ? shanghaiResult.value : null;
  const lbmaData = lbmaResult.status === "fulfilled" ? lbmaResult.value : null;
  const cmeData = cmeResult.status === "fulfilled" ? cmeResult.value : null;
  const shanghaiPriceValue = Number.isFinite(shanghaiData?.price)
    ? shanghaiData.price
    : Number.isFinite(spotPrice)
      ? spotPrice
      : null;

  if (shanghaiPrice) {
    shanghaiPrice.textContent = Number.isFinite(shanghaiPriceValue)
      ? formatNumber(shanghaiPriceValue, 2)
      : "--";
  }
  if (shanghaiPriceNote) {
    shanghaiPriceNote.textContent = Number.isFinite(shanghaiData?.price)
      ? `SHFE ${shanghaiData?.dateString || "latest"}`
      : Number.isFinite(spotPrice)
        ? "Spot proxy"
        : "Source unavailable";
  }
  if (shanghaiPremium) {
    const premiumValue = Number.isFinite(shanghaiData?.premium)
      ? shanghaiData.premium
      : Number.isFinite(shanghaiPriceValue) && Number.isFinite(spotPrice)
        ? shanghaiPriceValue - spotPrice
        : null;
    shanghaiPremium.textContent = Number.isFinite(premiumValue)
      ? formatNumber(premiumValue, 2)
      : "--";
  }
  if (shanghaiPremiumNote) {
    shanghaiPremiumNote.textContent = Number.isFinite(shanghaiData?.premium)
      ? "Published premium"
      : Number.isFinite(shanghaiPriceValue) && Number.isFinite(spotPrice)
        ? "Derived vs spot"
        : "Source unavailable";
  }
  if (londonInventory) {
    londonInventory.textContent = Number.isFinite(lbmaData?.latest)
      ? formatTonnage(lbmaData.latest)
      : "--";
  }
  if (londonInventoryNote) {
    const change =
      Number.isFinite(lbmaData?.latest) && Number.isFinite(lbmaData?.previous)
        ? lbmaData.latest - lbmaData.previous
        : null;
    londonInventoryNote.textContent = Number.isFinite(change)
      ? `${formatTonnage(change)} vs prior`
      : "LBMA vault holdings";
  }
  if (crossMarketFlows) {
    const premiumValue = Number.isFinite(shanghaiData?.premium)
      ? shanghaiData.premium
      : Number.isFinite(shanghaiPriceValue) && Number.isFinite(spotPrice)
        ? shanghaiPriceValue - spotPrice
        : null;
    crossMarketFlows.textContent = Number.isFinite(premiumValue)
      ? `${premiumValue >= 0 ? "Inflow" : "Outflow"}`
      : "--";
  }
  if (crossMarketFlowsNote) {
    crossMarketFlowsNote.textContent = Number.isFinite(shanghaiData?.premium)
      ? "Shanghai premium signal"
      : Number.isFinite(shanghaiPriceValue) && Number.isFinite(spotPrice)
        ? "Derived vs spot"
        : "Documentation noted";
  }
  if (cmeStocks) {
    cmeStocks.textContent = Number.isFinite(cmeData?.latest)
      ? formatTonnage(cmeData.latest)
      : "--";
  }
  if (cmeStocksNote) {
    cmeStocksNote.textContent = cmeData?.source
      ? "CME daily stocks"
      : "Source unavailable";
  }

  const sources = [shanghaiData?.source, lbmaData?.source, cmeData?.source]
    .filter(Boolean)
    .join(", ");
  silverTrackerStatus.textContent = sources
    ? `Updated ${new Date().toLocaleTimeString()} (${sources})`
    : "Live data unavailable";
};

const updateLiveData = async () => {
  const stooqMap = {
    XAU: "xauusd",
    XAG: "xagusd",
    XPT: "xptusd",
    URA: "ura",
    CL: "cl",
    HG: "hg",
    NG: "ng",
    SPX: "spx",
    NDX: "ndx",
    DXY: "usdx",
    EEM: "eem",
    GC: "gc.f",
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
    item.price = Number.isFinite(close) ? formatSpotValue(close, item.category) : item.price;
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

  const lookup = {
    "Spot Gold": "XAU",
    "Comex Volume": "GC",
  };
  const updateMetric = (metric) => {
    const symbol = lookup[metric.label];
    if (!symbol) {
      return metric;
    }
    const stooqSymbol = stooqMap[symbol];
    const quote = quoteBySymbol[stooqSymbol];
    if (!quote) {
      return metric;
    }
    if (metric.label === "Comex Volume") {
      const volume = Number(quote.vol);
      return {
        ...metric,
        value: Number.isFinite(volume) ? formatVolume(volume) : metric.value,
        delta: "GC futures",
        trend: Number.isFinite(volume) ? "up" : metric.trend,
      };
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
  };

  const [fearGreedResult, gldResult] = await Promise.allSettled([
    fetchFearGreed(),
    fetchGldHoldings(),
  ]);

  const updateSentiment = (metric) => {
    if (metric.label !== "Sentiment Score") {
      return metric;
    }
    if (fearGreedResult.status !== "fulfilled") {
      return metric;
    }
    const latest = Number(fearGreedResult.value.latest);
    const previous = Number(fearGreedResult.value.previous);
    const change = Number.isFinite(latest) && Number.isFinite(previous) ? latest - previous : 0;
    return {
      ...metric,
      value: Number.isFinite(latest) ? `${Math.round(latest)}` : metric.value,
      delta: Number.isFinite(change) ? formatChange(change) : metric.delta,
      trend: change >= 0 ? "up" : "down",
    };
  };

  const updateEtfFlows = (metric) => {
    if (metric.label !== "ETF Flows") {
      return metric;
    }
    if (gldResult.status !== "fulfilled") {
      return metric;
    }
    const latest = Number(gldResult.value.latest);
    const previous = Number(gldResult.value.previous);
    const change = Number.isFinite(latest) && Number.isFinite(previous) ? latest - previous : 0;
    return {
      ...metric,
      value: Number.isFinite(change) ? `${change >= 0 ? "+" : ""}${change.toFixed(1)}t` : metric.value,
      delta: Number.isFinite(latest) ? `${latest.toFixed(1)}t holdings` : metric.delta,
      trend: change >= 0 ? "up" : "down",
    };
  };

  metrics.premium = metrics.premium.map((metric) =>
    updateEtfFlows(updateSentiment(updateMetric(metric)))
  );
  metrics.standard = metrics.standard.map((metric) =>
    updateEtfFlows(updateSentiment(updateMetric(metric)))
  );

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
  const spotPrice = Number(quoteBySymbol[stooqMap.XAG]?.close);
  updateSilverTrackers(Number.isFinite(spotPrice) ? spotPrice : null);
  updateMetalRatios({
    gold: Number(quoteBySymbol[stooqMap.XAU]?.close),
    silver: Number(quoteBySymbol[stooqMap.XAG]?.close),
    platinum: Number(quoteBySymbol[stooqMap.XPT]?.close),
  });
  updateMetalchartsXag();
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

const parseTargetRatio = (element) => {
  if (!element) {
    return null;
  }
  const value = Number(element.textContent);
  return Number.isFinite(value) ? value : null;
};

const formatRatio = (value) => {
  if (!Number.isFinite(value)) {
    return "--";
  }
  return value.toFixed(2);
};

const updateMetalRatios = ({ gold, silver, platinum }) => {
  if (
    !ratioGoldPlatinum ||
    !ratioGoldSilver ||
    !ratioPlatinumSilver ||
    !targetGoldPlatinum ||
    !targetGoldSilver ||
    !targetPlatinumSilver ||
    !upsideGoldPlatinum ||
    !upsideGoldSilver ||
    !oneToOnePlatinumSilver ||
    !oneToOneGoldPlatinum ||
    !oneToOneGoldSilver
  ) {
    return;
  }

  const goldPlatinum =
    Number.isFinite(gold) && Number.isFinite(platinum) ? gold / platinum : null;
  const goldSilver = Number.isFinite(gold) && Number.isFinite(silver) ? gold / silver : null;
  const platinumSilver =
    Number.isFinite(platinum) && Number.isFinite(silver) ? platinum / silver : null;

  ratioGoldPlatinum.textContent = formatRatio(goldPlatinum);
  ratioGoldSilver.textContent = formatRatio(goldSilver);
  ratioPlatinumSilver.textContent = formatRatio(platinumSilver);

  const targets = {
    goldPlatinum: parseTargetRatio(targetGoldPlatinum),
    goldSilver: parseTargetRatio(targetGoldSilver),
    platinumSilver: parseTargetRatio(targetPlatinumSilver),
  };

  const calcUpside = (current, target) => {
    if (!Number.isFinite(current) || !Number.isFinite(target) || current === 0) {
      return "--";
    }
    const upside = (target / current - 1) * 100;
    return `${upside >= 0 ? "+" : ""}${upside.toFixed(1)}%`;
  };

  upsideGoldPlatinum.textContent = calcUpside(goldPlatinum, targets.goldPlatinum);
  upsideGoldSilver.textContent = calcUpside(goldSilver, targets.goldSilver);
  upsidePlatinumSilver.textContent = calcUpside(platinumSilver, targets.platinumSilver);
  oneToOneGoldPlatinum.textContent = calcUpside(goldPlatinum, 1);
  oneToOneGoldSilver.textContent = calcUpside(goldSilver, 1);
  oneToOnePlatinumSilver.textContent = calcUpside(platinumSilver, 1);
};

const updateMetalchartsXag = async () => {
  if (!metalchartsXagStatus || !metalchartsXagBody) {
    return;
  }
  metalchartsXagBody.innerHTML = "";
  try {
    const { items, source } = await fetchMetalchartsXag();
    if (!items.length) {
      metalchartsXagStatus.textContent = "No prices found";
      return;
    }
    items.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.label}</td>
        <td>${formatCurrency(item.price)}</td>
        <td>${item.unit}</td>
      `;
      metalchartsXagBody.appendChild(row);
    });
    metalchartsXagStatus.textContent = source
      ? `Updated ${new Date().toLocaleTimeString()} (${source})`
      : `Updated ${new Date().toLocaleTimeString()}`;
  } catch (error) {
    metalchartsXagStatus.textContent = "Live data unavailable";
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
};

const formatSpotValue = (value, category) => {
  if (!Number.isFinite(value)) {
    return "--";
  }
  return category === "commodity" ? formatCurrency(value) : value.toFixed(2);
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
  const dpr = window.devicePixelRatio || 1;
  const displayWidth = silverDistribution.clientWidth || 600;
  const displayHeight = silverDistribution.clientHeight || 220;
  silverDistribution.width = displayWidth * dpr;
  silverDistribution.height = displayHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const width = displayWidth;
  const height = displayHeight;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(5, 11, 5, 0.6)";
  ctx.fillRect(0, 0, width, height);

  const min = quantile(values, 0.01);
  const max = quantile(values, 0.99);
  const bins = 28;
  const step = (max - min) / bins || 1;
  const counts = new Array(bins).fill(0);
  values.forEach((value) => {
    const clamped = Math.min(Math.max(value, min), max);
    const index = Math.min(bins - 1, Math.floor((clamped - min) / step));
    counts[index] += 1;
  });
  const smoothedCounts = counts.map((_, index) => {
    let total = 0;
    let weight = 0;
    for (let offset = -1; offset <= 1; offset += 1) {
      const sampleIndex = index + offset;
      if (sampleIndex >= 0 && sampleIndex < bins) {
        total += counts[sampleIndex];
        weight += 1;
      }
    }
    return weight > 0 ? total / weight : 0;
  });
  const rawTotal = counts.reduce((sum, value) => sum + value, 0);
  const smoothTotal = smoothedCounts.reduce((sum, value) => sum + value, 0);
  const scale = smoothTotal > 0 ? rawTotal / smoothTotal : 1;
  const scaledCounts = smoothedCounts.map((value) => value * scale);
  const maxCount = Math.max(...scaledCounts, 1);
  const padding = 24;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;
  const barWidth = chartWidth / bins;

  ctx.strokeStyle = "rgba(57, 255, 20, 0.2)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  scaledCounts.forEach((count, index) => {
    const barHeight = (count / maxCount) * chartHeight;
    const x = padding + index * barWidth;
    const y = height - padding - barHeight;
    ctx.fillStyle = "rgba(57, 255, 20, 0.25)";
    ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
    ctx.strokeStyle = "rgba(57, 255, 20, 0.5)";
    ctx.strokeRect(x + 1, y, barWidth - 2, barHeight);
  });

  ctx.fillStyle = "rgba(203, 213, 245, 0.7)";
  ctx.font = "12px Manrope, sans-serif";
  const ticks = 4;
  for (let i = 0; i <= ticks; i += 1) {
    const tickX = padding + (chartWidth / ticks) * i;
    const value = min + ((max - min) / ticks) * i;
    ctx.textAlign = i === 0 ? "left" : i === ticks ? "right" : "center";
    ctx.fillText(formatDollars(value), tickX, height - 6);
  }

  if (Number.isFinite(spotPrice)) {
    const clamped = Math.min(Math.max(spotPrice, min), max);
    const spotX = padding + ((clamped - min) / (max - min || 1)) * chartWidth;
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 208, 77, 0.95)";
    ctx.lineWidth = 2;
    ctx.moveTo(spotX, padding);
    ctx.lineTo(spotX, height - padding);
    ctx.stroke();
    ctx.fillStyle = "rgba(255, 208, 77, 0.95)";
    ctx.textAlign = "center";
    ctx.fillText("Spot", spotX, padding - 6);
  }

  lastHistogram = {
    min,
    max,
    bins,
    step,
    counts: scaledCounts,
    padding,
    chartWidth,
    barWidth,
    height,
  };
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
  const premiumPct = Number(document.getElementById("silverPremiumPct").value) / 100;
  const premiumAlpha = Number(document.getElementById("silverPremiumAlpha").value);
  const policyBump = Number(document.getElementById("silverPolicyBump").value);
  const policyActive = document.getElementById("silverPolicyActive").checked;
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
    const premiumFactor = 1 + premiumPct * premiumAlpha;
    const policyFactor = policyActive ? policyBump : 0;
    const multiplierBase =
      randTriangular(multMin, multMode, multMax) * premiumFactor + policyFactor;
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

const formatNumber = (value, digits = 2) => {
  if (!Number.isFinite(value)) {
    return "--";
  }
  return value.toFixed(digits);
};

const calcKwhPerOzSimple = ({
  gradeGpt,
  recovery = 0.85,
  electricityKwhPerT = 25.0,
  powerPriceLow = 80.0,
  powerPriceBase = 150.0,
  powerPriceHigh = 250.0,
}) => {
  if (!(gradeGpt > 0)) {
    throw new Error("grade_gpt must be > 0");
  }
  if (!(recovery > 0 && recovery <= 1)) {
    throw new Error("recovery must be between 0 and 1");
  }
  if (!(electricityKwhPerT > 0)) {
    throw new Error("electricity_kwh_per_t must be > 0");
  }
  const ozPerT = gradeGpt / 31.1035;
  const recoveredOzPerT = ozPerT * recovery;
  if (recoveredOzPerT <= 0) {
    throw new Error("recovery must be > 0");
  }
  const tPerRecoveredOz = 1 / recoveredOzPerT;
  const kwhPerRecoveredOz = electricityKwhPerT * tPerRecoveredOz;
  let band = "Thermodynamic pain";
  if (kwhPerRecoveredOz < 5) {
    band = "Exceptional";
  } else if (kwhPerRecoveredOz < 12) {
    band = "Strong";
  } else if (kwhPerRecoveredOz < 25) {
    band = "Energy sensitive";
  }
  const powerCost = (price) => kwhPerRecoveredOz * (price / 1000);
  return {
    ozPerT,
    tPerRecoveredOz,
    kwhPerRecoveredOz,
    powerCosts: {
      low: powerCost(powerPriceLow),
      base: powerCost(powerPriceBase),
      high: powerCost(powerPriceHigh),
    },
    band,
  };
};

const renderKwhOzSimpleTab = ({
  gradeGpt,
  recovery,
  electricityKwhPerT,
  powerPriceLow,
  powerPriceBase,
  powerPriceHigh,
} = {}) => {
  const warnings = [];
  const inputs = {
    gradeGpt,
    recovery: recovery ?? 0.85,
    electricityKwhPerT: electricityKwhPerT ?? 25.0,
    powerPriceLow: powerPriceLow ?? 80.0,
    powerPriceBase: powerPriceBase ?? 150.0,
    powerPriceHigh: powerPriceHigh ?? 250.0,
  };
  if (recovery == null) {
    warnings.push("Using default R=0.85.");
  }
  if (electricityKwhPerT == null) {
    warnings.push("Using default E=25 kWh/t.");
  }
  const results = calcKwhPerOzSimple(inputs);
  return {
    description:
      "Translate grade into energy intensity per payable ounce. Add recovery, payable, mill power, and diesel inputs when available to refine the estimate. Heuristic ranges: heap leach 6–12 kWh/t • conventional mill 20–35 • hard/fine grind 35–60+.",
    warnings,
    inputs,
    results,
  };
};

const renderKwhWarnings = (messages) => {
  if (!kwhWarnings) {
    return;
  }
  const list = kwhWarnings.querySelector("ul");
  if (!list) {
    return;
  }
  list.innerHTML = "";
  if (messages.length === 0) {
    kwhWarnings.style.display = "none";
    return;
  }
  kwhWarnings.style.display = "block";
  messages.forEach((message) => {
    const item = document.createElement("li");
    item.textContent = message;
    list.appendChild(item);
  });
};

const resetKwhOutputs = () => {
  const targets = [
    "kwhOzPerT",
    "kwhPayableOzPerT",
    "kwhTPerOz",
    "kwhPerOzMill",
    "kwhPerOzTotal",
    "kwhBand",
  ];
  targets.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = "--";
    }
  });
  if (kwhPowerTable) {
    kwhPowerTable.innerHTML = "";
  }
};

const calculateKwh = () => {
  const warnings = [];
  const grade = Number(document.getElementById("kwhGrade").value);
  const recoveryInput = document.getElementById("kwhRecovery").value;
  const payableInput = document.getElementById("kwhPayable").value;
  const millInput = document.getElementById("kwhMill").value;
  const dieselInput = document.getElementById("kwhDiesel").value;
  const powerLowInput = document.getElementById("kwhPowerLow").value;
  const powerBaseInput = document.getElementById("kwhPowerBase").value;
  const powerHighInput = document.getElementById("kwhPowerHigh").value;

  if (!Number.isFinite(grade) || grade <= 0) {
    resetKwhOutputs();
    renderKwhWarnings(["Enter a silver grade to calculate kWh/oz."]);
    return;
  }

  const recovery = recoveryInput ? Number(recoveryInput) : 0.85;
  if (!recoveryInput) {
    warnings.push("Recovery defaulted to 0.85.");
  }
  const payable = payableInput ? Number(payableInput) : 1.0;
  if (!payableInput) {
    warnings.push("Payable defaulted to 1.0.");
  }
  const millKwh = millInput ? Number(millInput) : 25;
  if (!millInput) {
    warnings.push("Mill power defaulted to 25 kWh/t.");
  }
  const dieselL = dieselInput ? Number(dieselInput) : 0;
  if (!dieselInput) {
    warnings.push("Diesel defaulted to 0 L/t.");
  }
  const powerLow = powerLowInput ? Number(powerLowInput) : 80;
  if (!powerLowInput) {
    warnings.push("Low power price defaulted to $80/MWh.");
  }
  const powerBase = powerBaseInput ? Number(powerBaseInput) : 150;
  if (!powerBaseInput) {
    warnings.push("Base power price defaulted to $150/MWh.");
  }
  const powerHigh = powerHighInput ? Number(powerHighInput) : 250;
  if (!powerHighInput) {
    warnings.push("High power price defaulted to $250/MWh.");
  }

  const ozPerT = grade / 31.1035;
  const payableOzPerT = ozPerT * recovery * payable;
  if (payableOzPerT <= 0) {
    resetKwhOutputs();
    renderKwhWarnings(["Recovery × payable must be greater than 0."]);
    return;
  }
  const tPerPayableOz = 1 / payableOzPerT;
  const kwhPerOzMill = millKwh * tPerPayableOz;
  const dieselKwhPerT = dieselL * 10;
  const kwhPerOzTotal = (millKwh + dieselKwhPerT) * tPerPayableOz;

  let band = "Energy sensitive";
  if (kwhPerOzTotal < 5) {
    band = "Exceptional";
  } else if (kwhPerOzTotal < 12) {
    band = "Strong";
  } else if (kwhPerOzTotal < 25) {
    band = "Energy sensitive";
  } else {
    band = "Pain";
  }

  document.getElementById("kwhOzPerT").textContent = formatNumber(ozPerT, 3);
  document.getElementById("kwhPayableOzPerT").textContent = formatNumber(payableOzPerT, 3);
  document.getElementById("kwhTPerOz").textContent = formatNumber(tPerPayableOz, 2);
  document.getElementById("kwhPerOzMill").textContent = formatNumber(kwhPerOzMill, 1);
  document.getElementById("kwhPerOzTotal").textContent = formatNumber(kwhPerOzTotal, 1);
  document.getElementById("kwhBand").textContent = band;

  if (kwhPowerTable) {
    kwhPowerTable.innerHTML = "";
    const scenarios = [
      { label: "Low", price: powerLow },
      { label: "Base", price: powerBase },
      { label: "High", price: powerHigh },
    ];
    scenarios.forEach((scenario) => {
      const costPerOz = kwhPerOzMill * (scenario.price / 1000);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${scenario.label}</td>
        <td>${formatCurrency(scenario.price)}</td>
        <td>${formatCurrency(costPerOz)}</td>
      `;
      kwhPowerTable.appendChild(row);
    });
  }

  renderKwhWarnings(warnings);
  return {
    inputs: {
      grade,
      recovery,
      payable,
      millKwh,
      dieselL,
      powerLow,
      powerBase,
      powerHigh,
    },
    outputs: {
      ozPerT,
      payableOzPerT,
      tPerPayableOz,
      kwhPerOzMill,
      kwhPerOzTotal,
      band,
      costLow: kwhPerOzMill * (powerLow / 1000),
      costBase: kwhPerOzMill * (powerBase / 1000),
      costHigh: kwhPerOzMill * (powerHigh / 1000),
    },
  };
};

const loadKwhSaved = () => {
  if (!kwhSavedList) {
    return;
  }
  const saved = JSON.parse(localStorage.getItem("savedKwh") || "[]");
  kwhSavedList.innerHTML = "";
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
    kwhSavedList.appendChild(item);
  });
};

const saveKwhResult = () => {
  const result = calculateKwh();
  if (!result) {
    return;
  }
  const saved = JSON.parse(localStorage.getItem("savedKwh") || "[]");
  const customLabel = kwhSaveName?.value?.trim();
  const label = customLabel || `Grade ${formatNumber(result.inputs.grade, 1)} g/t`;
  const summary = `${formatNumber(result.outputs.kwhPerOzTotal, 1)} kWh/oz • ${result.outputs.band}`;
  saved.unshift({
    createdAt: new Date().toISOString(),
    label,
    summary,
    inputs: result.inputs,
    outputs: result.outputs,
  });
  localStorage.setItem("savedKwh", JSON.stringify(saved.slice(0, 10)));
  loadKwhSaved();
  if (kwhSaveName) {
    kwhSaveName.value = "";
  }
};

const loadKwhResult = (index) => {
  const saved = JSON.parse(localStorage.getItem("savedKwh") || "[]");
  const entry = saved[index];
  if (!entry) {
    return;
  }
  document.getElementById("kwhGrade").value = entry.inputs.grade;
  document.getElementById("kwhRecovery").value = entry.inputs.recovery;
  document.getElementById("kwhPayable").value = entry.inputs.payable;
  document.getElementById("kwhMill").value = entry.inputs.millKwh;
  document.getElementById("kwhDiesel").value = entry.inputs.dieselL;
  document.getElementById("kwhPowerLow").value = entry.inputs.powerLow;
  document.getElementById("kwhPowerBase").value = entry.inputs.powerBase;
  document.getElementById("kwhPowerHigh").value = entry.inputs.powerHigh;
  calculateKwh();
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

if (silverDistribution && silverTooltip) {
  silverDistribution.addEventListener("mousemove", (event) => {
    if (!lastHistogram) {
      return;
    }
    const rect = silverDistribution.getBoundingClientRect();
    const x = event.clientX - rect.left;
    if (x < lastHistogram.padding || x > lastHistogram.padding + lastHistogram.chartWidth) {
      silverTooltip.style.opacity = 0;
      return;
    }
    const index = Math.min(
      lastHistogram.bins - 1,
      Math.floor((x - lastHistogram.padding) / lastHistogram.barWidth)
    );
    const rangeMin = lastHistogram.min + index * lastHistogram.step;
    const rangeMax = rangeMin + lastHistogram.step;
    const count = lastHistogram.counts[index] || 0;
    const total = lastHistogram.counts.reduce((sum, value) => sum + value, 0) || 1;
    const pct = (count / total) * 100;
    silverTooltip.textContent = `${formatDollars(rangeMin)}–${formatDollars(
      rangeMax
    )} • ${pct.toFixed(1)}% (${count})`;
    silverTooltip.style.left = `${x}px`;
    silverTooltip.style.top = `${Math.max(12, event.clientY - rect.top - 20)}px`;
    silverTooltip.style.opacity = 1;
  });

  silverDistribution.addEventListener("mouseleave", () => {
    silverTooltip.style.opacity = 0;
  });
}

if (resetCalc) {
  resetCalc.addEventListener("click", () => {
    valuationForm.reset();
    updateCalculator();
  });
}

if (kwhForm) {
  kwhForm.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateKwh();
  });
}

if (kwhReset) {
  kwhReset.addEventListener("click", () => {
    kwhForm.reset();
    resetKwhOutputs();
    renderKwhWarnings([]);
  });
}

if (kwhSave) {
  kwhSave.addEventListener("click", saveKwhResult);
}

if (kwhClearSaved) {
  kwhClearSaved.addEventListener("click", () => {
    localStorage.removeItem("savedKwh");
    loadKwhSaved();
  });
}

if (kwhSavedList) {
  kwhSavedList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");
    if (!button) {
      return;
    }
    loadKwhResult(Number(button.dataset.index));
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
resetKwhOutputs();
renderKwhWarnings([]);
loadKwhSaved();
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
