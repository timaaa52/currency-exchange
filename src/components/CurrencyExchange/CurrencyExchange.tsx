import React, {useEffect, useState} from 'react';
import {Container, SelectChangeEvent} from "@mui/material";
import {currencyType} from "../../api/api";
import {CurrencyField} from "../CurrencyField/CurrencyField";

const currencyNames = ['UAH', 'EUR', 'USD']

type CurrencyExchangePropsType = {
    currencyData: currencyType[]
}

enum CURRENCY_NAME {
    USD = "USD",
    UAH = "UAH",
    EUR = "EUR"
}

export const CurrencyExchange: React.FC<CurrencyExchangePropsType> = ({currencyData}) => {


    // Обмен валют сделан по образцу обмена google: https://www.google.com/search?q=%D0%BE%D0%B1%D0%BC%D0%B5%D0%BD+%D0%B2%D0%B0%D0%BB%D1%8E%D1%82&rlz=1C1SQJL_ruUA921UA921&oq=%D0%BE%D0%B1%D0%BC%D0%B5%D0%BD&aqs=chrome.0.69i59l3j69i57j69i59j0i67i457j69i61l2.934j1j7&sourceid=chrome&ie=UTF-8

    const [firstCurrencySelect, setFirstCurrencySelect] = useState<string>(currencyNames[0])
    const [secondCurrencySelect, setSecondCurrencySelect] = useState<string>(currencyNames[2])
    const [firstInputCurrency, setFirstInputCurrency] = useState<string>('1')
    const [secondInputCurrency, setSecondInputCurrency] = useState<string>('')
    const firstChangeSelectHandler = (e: SelectChangeEvent) => {
        setFirstCurrencySelect(e.target.value);
    }
    const secondChangeSelectHandler = (e: SelectChangeEvent) => {
        setSecondCurrencySelect(e.target.value);
    }

    const helperFunc = (arg: string) => {
        let value = arg
        if (value === '') {
            setFirstInputCurrency('')
            setSecondInputCurrency('')
        }
        if (!isFinite(+value)) return false
        return true
    }

    const firstInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!helperFunc(e.currentTarget.value)) return
        setFirstInputCurrency(e.currentTarget.value)
        setSecondInputCurrency(countCurrency(e.currentTarget.value, firstCurrencySelect, secondCurrencySelect, currencyData))
    }
    const secondInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!helperFunc(e.currentTarget.value)) return
        setSecondInputCurrency(e.currentTarget.value)
        setFirstInputCurrency(countCurrency(e.currentTarget.value, secondCurrencySelect, firstCurrencySelect, currencyData))
    }


    const countCurrency = (value: string, currNameOn: string, currNameIn: string, currencyData: currencyType[]) => {
        switch (currNameOn) {
            case CURRENCY_NAME.UAH: {
                let res = ''
                if (currNameIn === CURRENCY_NAME.USD) {
                    let currencyRate = currencyData.find(el => el.ccy === CURRENCY_NAME.USD)
                    currencyRate
                        ? res = (+Number(value).toFixed(2) / +currencyRate.sale).toFixed(2)
                        : res = 'Please try again'

                }
                if (currNameIn === CURRENCY_NAME.EUR) {
                    let currencyRate = currencyData.find(el => el.ccy === CURRENCY_NAME.EUR)
                    currencyRate
                        ? res = (+Number(value).toFixed(2) / +currencyRate.sale).toFixed(2)
                        : res = 'Please try again'

                }
                return res
            }
            case CURRENCY_NAME.EUR: {
                let res = ''
                if (currNameIn === CURRENCY_NAME.UAH) {
                    let currencyRate = currencyData.find(el => el.ccy === CURRENCY_NAME.EUR)
                    currencyRate
                        ? res = (+Number(value).toFixed(2) * +currencyRate.buy).toFixed(2)
                        : res = 'Please try again'
                }
                if (currNameIn === CURRENCY_NAME.USD) {
                    let currencyRateEUR = currencyData.find(el => el.ccy === CURRENCY_NAME.EUR)
                    let currencyRateUSD = currencyData.find(el => el.ccy === CURRENCY_NAME.USD)
                    currencyRateEUR && currencyRateUSD
                        ? res = (+Number(value).toFixed(2) * (+currencyRateEUR.sale / +currencyRateUSD.sale)).toFixed(2)
                        : res = 'Please try again'
                }
                return res
            }
            case CURRENCY_NAME.USD: {
                let res = ''
                if (currNameIn === CURRENCY_NAME.UAH) {
                    let currencyRate = currencyData.find(el => el.ccy === CURRENCY_NAME.USD)
                    currencyRate
                        ? res = (+Number(value).toFixed(2) * +currencyRate.buy).toFixed(2)
                        : res = 'Please try again'
                }
                if (currNameIn === CURRENCY_NAME.EUR) {
                    let currencyRateEUR = currencyData.find(el => el.ccy === CURRENCY_NAME.EUR)
                    let currencyRateUSD = currencyData.find(el => el.ccy === CURRENCY_NAME.USD)
                    currencyRateUSD && currencyRateEUR
                        ? res = (+Number(value).toFixed(2) * (+currencyRateUSD.sale / +currencyRateEUR.sale)).toFixed(2)
                        : res = 'Please try again'
                }
                return res
            }
            default:
                return ''
        }
    }

    useEffect(() => {
        // следим за первым селектом, и если в нем меняется опция, то пересчитываем во втором инпуте значения
        setSecondInputCurrency(countCurrency(firstInputCurrency, firstCurrencySelect, secondCurrencySelect, currencyData))
    }, [firstCurrencySelect])


    useEffect(() => {
        // следим за вторым селектом, и если в нем меняется опция, то пересчитываем во втором инпуте значения
        setSecondInputCurrency(countCurrency(firstInputCurrency, firstCurrencySelect, secondCurrencySelect, currencyData))
    }, [secondCurrencySelect])


    return (
        <Container maxWidth={"sm"}>
            <div className={'currency'}>
                <h2>Currency Exchange</h2>
                <div className={'fields'}>
                    <CurrencyField valueInputCurrency={firstInputCurrency}
                                   inputHandler={firstInputHandler}
                                   valueSelectCurrency={firstCurrencySelect}
                                   selectHandler={firstChangeSelectHandler}
                                   currencyNames={currencyNames}
                    />
                    <CurrencyField valueInputCurrency={secondInputCurrency}
                                   inputHandler={secondInputHandler}
                                   valueSelectCurrency={secondCurrencySelect}
                                   selectHandler={secondChangeSelectHandler}
                                   currencyNames={currencyNames}
                    />
                </div>
            </div>
        </Container>
    )
}