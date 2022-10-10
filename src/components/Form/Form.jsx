import React from 'react';
import './Form.css'
import { useState, useEffect, useCallback } from 'react';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
    const [country, setCountry] = useState('');
    const [sity, setSity] = useState('');
    const [subject, setSubject] = useState('physical');
    const { tg } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country: country,
            sity: sity,
            subject: subject,
        }
        tg.sendData(JSON.stringify(data));
    }, [country, sity, subject]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData]);


    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные',
        })
    }, []);
    useEffect(() => {
        if (!sity || !country) {
            tg.MainButton.hide();
        } else { tg.MainButton.show(); }
    }, [sity, country])

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