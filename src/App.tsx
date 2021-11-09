import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './App.module.css'
import axios from "axios";
import {nanoid} from "nanoid"
import {IData, IValuteData} from "./types";
import {PlusSVG} from "./assets/PlusSVG";
import {MinusSVG} from "./assets/MinusSVG";

function App() {

    const initial = ['USD', 'EUR', 'BYN']
    const initialAttribute = 'USD'
    const initialValue = '1.00'


    const [data, setData] = useState<IValuteData[]>([]);
    const [dataInit, setDataInit] = useState(initial)
    const [numbers, setNumber] = useState<any>(initialValue)
    const [attribute, setAttribute] = useState<string | undefined>(initialAttribute)
    const [show, setShow] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get<IData>(
                'https://www.cbr-xml-daily.ru/daily_json.js',
            )
            setData(Object.values(result.data.Valute))
        };
        fetchData();
    }, [])


    const countInput = (event: ChangeEvent<HTMLInputElement>) => {
        setAttribute(event.target.dataset.currunsy)
        setNumber(event.target.value.replace(/[^\d.,]*/g, '')
            .replace(/,/, '.')
            .replace(/([,.])[,.]+/g, '$1')
            .replace(/^[^\d]*(\d+([.,]\d{0,2})?).*$/g, '$1'))
    }

    const actualData = data.filter(i => dataInit.includes(i.CharCode))
    const actualSelectData = data.filter(i => !dataInit.includes(i.CharCode))
    const rate = data.filter((i: any) => i.CharCode === attribute)


    const changeCurrensy = (e: ChangeEvent<HTMLSelectElement>) => {
        setDataInit([e.currentTarget.value, ...dataInit])
        setShow(false)
    }

    return (
        <div className={s.main}>
            <div className={s.container}>
                <h1>Конвертер валют</h1>
                {
                    actualData.map((i) => {
                        return <div
                            className={s.wrapper}
                            key={i.ID}>
                            {i.CharCode}
                            <div className={s.wrapper_input}>
                                <input
                                    data-currunsy={i.CharCode}
                                    value={attribute === i.CharCode ? numbers : ((numbers * rate[0].Value * i.Nominal) / i.Value).toFixed(2)}
                                    onChange={countInput}
                                    type='text'
                                />
                                <span className={s.currensy_name}>{i.Name}</span>
                            </div>

                            {!initial.includes(i.CharCode) &&
                            <div
                                className={s.wrapper_del_icon}
                                onClick={() => {
                                    setDataInit(dataInit.filter(j => j !== i.CharCode))
                                }}
                            >
                                <MinusSVG/>
                            </div>}

                        </div>
                    })
                }
                <div className={s.wrapper_add}>
                    <div
                        className={s.wrapper_add_icon}
                        onClick={() => setShow(true)}
                    ><PlusSVG/>
                        <span>Добавить валюту</span>
                    </div>
                    {show &&
                    <select
                        onBlur={() => {
                            setShow(false)
                        }}
                        onChange={changeCurrensy}>
                        {actualSelectData.map(el => {
                            return <option
                                key={nanoid()}
                                value={el.CharCode}
                            >{`${el.CharCode} ${el.Name}`}</option>
                        })
                        }
                    </select>
                    }
                </div>
            </div>
        </div>

    )
}

export default App;
