import React, { useState } from 'react';
import ItemModel from "../types/item.d";
import icon from '../assets/icons/delete-white.svg';
import axios, { AxiosRequestConfig } from "axios";

const Item = ({ _id, name, checked }: ItemModel) => {
    const [stateChecked, setStateChecked] = useState(checked);

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    const onChangeCheckbox = (value: boolean) => {
        setStateChecked(value);

        const item: ItemModel = {
            _id: _id,
            name: name,
            checked: value,
        }

        axios.put(`${baseUrl}/items`, { item })
            .then((response: AxiosRequestConfig) => {
                if (!response.data.ok) {
                    // rollback
                    setStateChecked(!value);
                }
            });
    }

    return (
        <div className={'item-row'}>
            <input type="checkbox"
                   defaultChecked={checked}
                   onChange={(event) => onChangeCheckbox(event.target.checked)}
            />
            <span className={stateChecked ? 'checked-item' : ''}>
                {name}
            </span>
            <img src={icon}
                 alt={'remove item'}
                 className={'remove-icon'}
            />
        </div>
    )
}

export default Item;
