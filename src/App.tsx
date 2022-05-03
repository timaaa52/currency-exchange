import React, {useEffect, useState} from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {CurrencyExchange} from "./components/CurrencyExchange/CurrencyExchange";
import {CircularProgress} from "@mui/material";
import {currencyApi, currencyType} from "./api/api";

function App() {
    const [currencyData, setCurrencyData] = useState<currencyType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        currencyApi.getCurrency()
            .then(res => {
                setCurrencyData(res.data)
                setIsLoading(true)
            })
    }, [])

    if(!isLoading) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <>
            <Header currencyData={currencyData}/>
            <CurrencyExchange currencyData={currencyData}/>
        </>
    );
}

export default App;
