import React from 'react';
import {MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";


type CurrencyFieldPropTypes = {
    valueInputCurrency: string
    inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    valueSelectCurrency: string
    selectHandler: (e: SelectChangeEvent) => void
    currencyNames: string[]
}

export const CurrencyField: React.FC<CurrencyFieldPropTypes> = ({
                                                                    valueInputCurrency,
                                                                    valueSelectCurrency,
                                                                    inputHandler,
                                                                    selectHandler,
                                                                    currencyNames
                                                                }) => {
    return (
        <label>
            <TextField value={valueInputCurrency}
                       onChange={inputHandler}
            />
            <Select
                value={valueSelectCurrency}
                onChange={selectHandler}
            >
                {
                    currencyNames && currencyNames.map((el, id) => {
                        return <MenuItem key={`${el}_${id}`}
                                         value={el}>{el}
                        </MenuItem>
                    })
                }
            </Select>
        </label>
    )
}
