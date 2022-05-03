import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
})

export const currencyApi = {
    getCurrency () {
        return instance.get<Array<currencyType>>('')
    }
}


export type currencyType = {
    base_ccy: string
    buy: string
    ccy: string
    sale: string
}
