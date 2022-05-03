import React, {useState} from 'react';
import {AppBar, Container, MenuItem, Select, SelectChangeEvent, Toolbar, Typography} from "@mui/material";
import {currencyType} from "../../api/api";


type HeaderPropsType = {
    currencyData: currencyType[]
}

export const Header: React.FC<HeaderPropsType> = ({currencyData}) => {


    const [currentCurrency, setCurrentCurrency] = useState<string>(currencyData[0].ccy);

    const selectChangeHandler = (e: SelectChangeEvent) => {
        setCurrentCurrency(e.target.value)
    }


    return (
        <AppBar position="static">
            <Container maxWidth={"lg"} fixed>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        Currency Exchange
                    </Typography>
                    <p style={{marginRight: '20px', fontSize: '20px', cursor: "default" }}>
                        { currentCurrency === 'USD'
                            ? currencyData.map( el => {
                            if(el.ccy === 'USD')
                                return `$ ${+Number(el.buy).toFixed(2)} / ${+Number(el.sale).toFixed(2)}`
                        })
                            : currencyData.map( el => {
                                if(el.ccy === 'EUR')
                                    return `€ ${+Number(el.buy).toFixed(2)} / ${+Number(el.sale).toFixed(2)}`
                            }) }

                    </p>
                    <Select
                        value={currentCurrency}
                        onChange={selectChangeHandler}
                        style={{color: 'white'}}
                    >
                        {
                            currencyData.map((el, id) => {
                                if( el.ccy === 'USD' || el.ccy === 'EUR' ) {
                                    return <MenuItem key={`${el}_${id}`} value={el.ccy}>{el.ccy}</MenuItem>
                                }
                            })
                        }
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
    );
};