import React from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useState, useCallback, useEffect } from 'react';
import { useTelegram } from '../../hooks/useTelegram';

const products = [
    { id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые' },
    { id: '2', title: 'Куртка', price: 5400, description: 'Из натурального дермантина' },
    { id: '3', title: 'Футболка', price: 700, description: 'С надписью под ваш выбор' },
    { id: '4', title: 'Кепка', price: 2300, description: 'Разных цветов на выбор' },
    { id: '5', title: 'Шорты', price: 500, description: 'Для игры в волейбол' },
    { id: '6', title: 'Брюки', price: 4500, description: 'Для свадьбы самое то' },
    { id: '7', title: 'Шапка', price: 1500, description: 'Осенне весенняя' },
    { id: '8', title: 'Бейсболка', price: 1200, description: 'Под цвет ваших глаз' },
]
const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price;
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const { tg, queryId } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            queryId,
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
        };
        fetch('http://94.26.224.61:3000/web-data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(data),
        });
    }, [addedItems]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData]);

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        };
        setAddedItems(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams(
                {
                    text: `Купить ${getTotalPrice(newItems)}`,
                }
            )
        }
    };

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;