import axios from "axios";


export const instance = axios.create({
    baseURL: "https://www.cbr-xml-daily.ru/daily_json.js",
});

// api
export const currencyAPI = {
    fetchAll() {
        return instance.get(``, {});
    }
};

//
// // types
// export type CoinType = {
//     id: string,
//     rank: string,
//     symbol: string,
//     name: string,
//     supply: string,
//     maxSupply: string,
//     marketCapUsd: string,
//     volumeUsd24Hr:  string,
//     priceUsd: string,
//     changePercent24Hr: string,
//     vwap24Hr: string,
//     explorer: string
// };
//
// export type HistoryCoinType = {
//     priceUsd: string,
//     time: number,
//     date: string
// }
//
