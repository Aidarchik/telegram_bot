import React from 'react';
import './Form.css'
import { useState, useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
    const [country, setCountry] = useState('');
    const [sity, setSity] = useState('');
    const [subject, setSubject] = useState('physical');
    const { tg } = useTelegram();


    useEffect(() => {
        tg.MainButton.setParam({
            text: 'Отправить данные',
        })
    }, []);
    useEffect(() => {
        if (!street || !country) {
            tg.MainButton.hide();
        } else { tg.MainButton.show(); }
    }, [])

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    }
    const onChangeSity = (e) => {
        setSity(e.target.value);
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                type="text"
                className={"input"}
                placeholder={'Страна'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                type="text"
                className={"input"}
                placeholder={'Улица'}
                value={sity}
                onChange={onChangeSity}
            />
            <select value={subject} onChange={onChangeSubject} className={"select"}>
                <option value={'physical'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    );
};

export default Form;