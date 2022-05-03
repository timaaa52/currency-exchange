import React, {useState} from 'react';
import {Container, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {currencyType} from "../../api/api";

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


    const [firstCurrencySelect, setFirstCurrencySelect] = useState(currencyNames[0])
    const [secondCurrencySelect, setSecondCurrencySelect] = useState(currencyNames[2])
    const [firstInputCurrency, setFirstInputCurrency] = useState<string>('')
    const [secondInputCurrency, setSecondInputCurrency] = useState<string>('')

    const firstChangeSelectHandler = (e: SelectChangeEvent) => {
        setFirstCurrencySelect(e.target.value);
    }
    const secondChangeSelectHandler = (e: SelectChangeEvent) => {
        setSecondCurrencySelect(e.target.value);
    }

    const helperFunc = (arg: string) => {
        let value = arg
        if(value === '') {
            setFirstInputCurrency('')
            setSecondInputCurrency('')
        }
        if(!isFinite(+value)) return false
        return true
    }

    const firstInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!helperFunc(e.currentTarget.value)) return
        setFirstInputCurrency(e.currentTarget.value)
        setSecondInputCurrency(countCurrency(e.currentTarget.value, firstCurrencySelect, secondCurrencySelect, currencyData))
    }
    const secondInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!helperFunc(e.currentTarget.value)) return
        setSecondInputCurrency(e.currentTarget.value)
        setFirstInputCurrency(countCurrency(e.currentTarget.value, secondCurrencySelect, firstCurrencySelect, currencyData))
    }


    const countCurrency = (value: string, currNameOn: string, currNameIn: string, currencyData: currencyType[]) => {
        switch (currNameOn){
            case CURRENCY_NAME.UAH: {
                let res = ''
                if(currNameIn === CURRENCY_NAME.USD){
                    let currencyRate = currencyData.find(el => el.ccy === CURRENCY_NAME.USD)
                    res = (+Number(value).toFixed(2) / +currencyRate!.sale).toFixed(2)
                }
                if(currNameIn === CURRENCY_NAME.EUR){
                    let currencyRate = currencyData.find(el => el.ccy === CURRENCY_NAME.EUR)
                    res = (+Number(value).toFixed(2) / +currencyRate!.sale).toFixed(2)
                }
                return res
            }
            case CURRENCY_NAME.EUR: {
                let res = ''
                if(currNameIn === CURRENCY_NAME.UAH){
                    let currencyRate = currencyData.find(el => el.ccy === CURRENCY_NAME.EUR)
                    res = (+Number(value).toFixed(2) * +currencyRate!.buy).toFixed(2)
                }
                if(currNameIn === CURRENCY_NAME.USD){
                    let currencyRateEUR = currencyData.find(el => el.ccy === CURRENCY_NAME.EUR)
                    let currencyRateUSD = currencyData.find(el => el.ccy === CURRENCY_NAME.USD)
                    res = (+Number(value).toFixed(2) * (+currencyRateEUR!.sale / +currencyRateUSD!.sale)).toFixed(2)
                }
                return res
            }
            case CURRENCY_NAME.USD: {
                let res = ''
                if(currNameIn === CURRENCY_NAME.UAH){
                    let currencyRate = currencyData.find(el => el.ccy === CURRENCY_NAME.USD)
                    res = (+Number(value).toFixed(2) * +currencyRate!.buy).toFixed(2)
                }
                if(currNameIn === CURRENCY_NAME.EUR){
                    let currencyRateEUR = currencyData.find(el => el.ccy === CURRENCY_NAME.EUR)
                    let currencyRateUSD = currencyData.find(el => el.ccy === CURRENCY_NAME.USD)
                    res = (+Number(value).toFixed(2) * (+currencyRateUSD!.sale / +currencyRateEUR!.sale)).toFixed(2)
                }
                return res
            }
            default: return ''
        }
    }


    // useEffect(() => {
    //         setInput1(countCurrency(f,s, 4, 5))
    // }, [firstCurrency ])

    // useEffect(() => {
    //     setInput(countCurrency(s,f, 5, 4))
    // }, [secondCurrency ])


    //const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {

    //    let value = e.currentTarget.value;
    //    if (!isFinite(+value)) return
    //    let trigger: string = e.currentTarget.id
    //    if (trigger === '1') {
    //        if (e.currentTarget.name === 'UAH') {
    //           if (secondCurrency === 'USD') {
    //                let currencyRate = currency.find(el => el.ccy === 'USD')
    //                dispatch(changeCurrencyFields(value, (+Number(value).toFixed(2) / +currencyRate!.sale).toFixed(2)))
    //            }
    //             if (secondCurrency === 'EUR') {
    //                let currencyRate = currency.find(el => el.ccy === 'EUR')
    //                dispatch(changeCurrencyFields(value, (+Number(value).toFixed(2) / +currencyRate!.sale).toFixed(2)))
    //            }
    //        }
    //        if(e.currentTarget.name === 'USD') {
    //            if (secondCurrency === 'UAH') {
    //                let currencyRate = currency.find(el => el.ccy === 'USD')
    //                dispatch(changeCurrencyFields(value, (+Number(value).toFixed(2) * +currencyRate!.buy).toFixed(2)))
    //            }
    //            if (secondCurrency === 'EUR') {
    //                let currencyRate = currency.find(el => el.ccy === 'EUR')
    //                 let curentCurrencyrate = currency.find( el => el.ccy === e.currentTarget.name)
    //                let fin = +curentCurrencyrate!.sale / +currencyRate!.sale;
    //                dispatch(changeCurrencyFields(value, (+Number(value).toFixed(2) * fin).toFixed(2)))
    //             }
    //          }
    //      } else {
//
    //           dispatch(changeCurrencyFields((+Number(value).toFixed(2) * 33.18).toFixed(2), value))
    //      }
    //  }


    return (
        <Container maxWidth={"sm"}>
            <div className={'currency'}>
                <h2>Currency Exchange</h2>
                <div className={'fields'}>
                    <label>
                        <TextField value={firstInputCurrency}
                                   onChange={firstInputHandler}
                        />
                        <Select
                            value={firstCurrencySelect}
                            onChange={firstChangeSelectHandler}
                        >
                            {
                                currencyNames && currencyNames.map((el, id) => {
                                    return <MenuItem key={`${el}_${id}`} disabled={el === secondCurrencySelect}
                                                     value={el}>{el}</MenuItem>
                                })
                            }
                        </Select>
                    </label>
                    <label>
                        <TextField value={secondInputCurrency}
                                   onChange={secondInputHandler}
                        />
                        <Select
                            value={secondCurrencySelect}
                            onChange={secondChangeSelectHandler}
                        >
                            {
                                currencyNames && currencyNames.map((el, id) => {
                                    return <MenuItem key={`${el}_${id}`} disabled={el === firstCurrencySelect}
                                                     value={el}>{el}</MenuItem>
                                })
                            }
                        </Select>
                    </label>
                </div>
            </div>
        </Container>
    );
};