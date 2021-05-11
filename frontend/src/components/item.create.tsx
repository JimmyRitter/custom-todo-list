import React, { useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios';

const ItemCreate = ({ onCreateItem }: any) => {

    const [itemName, setItemName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    const onSubmitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!itemName.trim()) {
            setErrorMessage('text can not be empty');
            return;
        }
        createItem();
        setItemName('');
    }

    const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);
        setErrorMessage('');
    }

    const createItem = () => {
        axios.post(`${baseUrl}/items/create`, { itemName })
            .then((response: AxiosRequestConfig) => {
                if (response.data.ok) {
                    onCreateItem(response.data.item);
                }
            });
    }

    return (
        <form>
            <input type={"text"}
                   placeholder={"enter text"}
                   onChange={(e) => onChangeInputValue(e)}
                   value={itemName}
            />
            <button type={"submit"}
                    onClick={(e) => onSubmitForm(e)}>
                Add
            </button>
            {errorMessage !== '' && (
                <>
                    <br />
                    <span>{errorMessage}</span>
                </>
            )}
        </form>
    )
}

export default ItemCreate;