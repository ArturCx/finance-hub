/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  aidropsDataKey,
  categoriesKey,
  coindDatasKey,
  coinsListKey,
  marketChartKey,
} from "./constants";
import {
  AidropsData,
  CategoriesData,
  CoinListData,
  CoinsData,
  MarketChartData,
} from "./definitions";
import makeReq from "./makeReq";

function lsSetter(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
}

export const fetchCategories = async (): Promise<CategoriesData | null> => {
  const categoriesData = localStorage.getItem(categoriesKey);
  if (categoriesData) {
    return JSON.parse(categoriesData);
  }

  const data = await makeReq("GET", "/gecko/categories");
  if (data) {
    lsSetter(categoriesKey, data);
    return data;
  } else {
    return null;
  }
};

export const fetchCoinsList = async (): Promise<CoinListData | null> => {
  const coinListData = localStorage.getItem(coinsListKey);
  if (coinListData) {
    return JSON.parse(coinListData);
  }

  const data = await makeReq("GET", "/gecko/list");
  if (data) {
    lsSetter(coinsListKey, data);
    return data;
  }
  return null;
};

export const fetchCoinsListByCate = async (
  cate: string
): Promise<CoinListData | null> => {
  const coinListData = localStorage.getItem(cate);
  if (coinListData) {
    return JSON.parse(coinListData);
  }

  const data = await makeReq("GET", `/gecko/${cate}/coins`);
  if (data) {
    lsSetter(cate, data);
    return data;
  }
  return null;
};

export const fetchCoinsMarketChart = async (
  coinId: string
): Promise<MarketChartData | null> => {
  const marketChartDatas = JSON.parse(
    localStorage.getItem(marketChartKey) || "{}"
  );
  const marketChartDataExists = Object.keys(marketChartDatas).length > 0;

  if (marketChartDataExists) {
    const coinsMarketChart = marketChartDatas[coinId];
    if (coinsMarketChart) {
      return coinsMarketChart;
    }
  }

  const data = await makeReq("GET", `/gecko/chart/${coinId}`);
  if (data) {
    if (marketChartDataExists) {
      marketChartDatas[coinId] = data;
      lsSetter(marketChartKey, marketChartDatas);
    } else {
      const newMarketChart: Record<string, typeof data> = {};
      newMarketChart[coinId] = data;
      lsSetter(marketChartKey, newMarketChart);
    }
    return data;
  }

  return null;
};

export const fetchCoinsData = async (
  coinId: string
): Promise<CoinsData | null> => {
  const coinsDatas = JSON.parse(localStorage.getItem(coindDatasKey) || "{}");
  const coinsDatasExists = Object.keys(coinsDatas).length > 0;

  if (coinsDatasExists) {
    const coinsData = coinsDatas[coinId];
    if (coinsData) {
      return coinsData;
    }
  }

  const data = await makeReq("GET", `/gecko/coins/${coinId}`);
  if (data) {
    if (coinsDatasExists) {
      coinsDatas[coinId] = data;
      lsSetter(coindDatasKey, coinsDatas);
    } else {
      const newCoinsDatas: Record<string, typeof data> = {};
      newCoinsDatas[coinId] = data;
      lsSetter(coindDatasKey, newCoinsDatas);
    }
    return data;
  }

  return null;
};

export const fetchAidrops = async (): Promise<AidropsData | null> => {
  const aidropsData = localStorage.getItem(aidropsDataKey);
  if (aidropsData) {
    return JSON.parse(aidropsData);
  }

  const data = await makeReq("GET", "/cmc/aidrops");
  if (data) {
    lsSetter(aidropsDataKey, data);
    return data;
  }
  return null;
};
