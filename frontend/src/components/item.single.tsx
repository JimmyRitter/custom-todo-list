import React, { useState } from 'react';
import ItemModel from "../types/item.d";
import icon from '../assets/icons/delete-white.svg';

const Item = ({ _id, name, checked }: ItemModel) => {
    const [stateChecked, setStateChecked] = useState(checked);

    const onChangeCheckbox = (value: boolean) => {
        setStateChecked(value);
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