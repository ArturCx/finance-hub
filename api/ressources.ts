import { geckoBaseRoute } from "./constants"

export const getCgTrendingRoute = () : string => {
    return `${geckoBaseRoute}search/trending`
}

export const getCgCategoriesRoute = () : string => {
    return `${geckoBaseRoute}coins/categories/list`
}

export const getCgCoinsListRoute = () : string => {
    return `${geckoBaseRoute}coins/markets?vs_currency=usd&per_page=250&sparkline=true&price_change_percentage=7d`
}

export const getCgCoinsListByCateRoute = (cate:string) : string => {
    return `${geckoBaseRoute}coins/markets?vs_currency=usd&category=${cate}&per_page=250&sparkline=true&price_change_percentage=7d`
}

export const getCgCoinsMarketChartRoute = (
    coinId: string
) : string => {
    return `${geckoBaseRoute}coins/${coinId}/market_chart?vs_currency=usd&days=365&precision=1`
}

export const getCgCoinsDataRoute = (coinId: string) : string => {
    return `${geckoBaseRoute}coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
}

export const getCmcOngoingAidropsDataRoute = () : string => {
    return `https://pro-api.coinmarketcap.com/v1/cryptocurrency/airdrops?limit=300&status="ONGOING"`
}

export const getCmcUpcomingAidropsDataRoute = () : string => {
    return `https://pro-api.coinmarketcap.com/v1/cryptocurrency/airdrops?limit=300&status="UPCOMING"`
}