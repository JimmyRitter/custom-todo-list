import React, { useState } from 'react';
import { ItemModel, ItemActions } from "../types/item";
import icon from '../assets/icons/delete-white.svg';
import axios, { AxiosRequestConfig } from "axios";

const Item = ({ _id, name, checked, onCheck, onDelete }: ItemModel & ItemActions) => {
    const [stateChecked, setStateChecked] = useState(checked);

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    const onChangeCheckbox = (value: boolean) => {
        setStateChecked(value);
        onCheck!(_id, value);

        const item: ItemModel = {
            _id: _id,
            name: name,
            checked: value,
        }

        axios.put(`${baseUrl}/items`, { item })
            .then((response: AxiosRequestConfig) => {
                if (!response.data.ok) {
                    // rollback
                    onCheck!(_id, !value);
                    setStateChecked(!value);
                }
            });
    }

    const onDeleteItem = () => {
        axios.delete(`${baseUrl}/items/${_id}`)
            .then((response: AxiosRequestConfig) => {
                if (response.data.ok) {
                    onDelete!(_id);
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
                 onClick={onDeleteItem}
            />
        </div>
    )
}

export default Item;
