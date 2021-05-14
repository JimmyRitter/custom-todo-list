import React from "react";
import { AxiosRequestConfig } from "axios";
import axios from 'axios';
import Item from './item.single';
import ItemCreate from "./item.create";
import { ItemModel } from "../types/item";

export class ItemList extends React.Component<{}, { items: ItemModel[] }> {
    constructor(props: any) {
        super(props);
        this.state = {
            items: []
        }
    }

    baseUrl = process.env.REACT_APP_API_BASE_URL;

    componentDidMount() {
        axios.get(`${this.baseUrl}/items`)
            .then((response: AxiosRequestConfig) => {
                this.setState({
                    items: response.data
                });
            });
    }

    handleCreateItem = (newItem: ItemModel) => {
        this.setState({
            items: [...this.state.items, newItem]
        });
    }

    handleDeleteItem = (id: string) => {
        this.setState({
            items: this.state.items.filter((x: ItemModel) => x._id !== id)
        });
    }

    handleClearCheckedItems = () => {
        if (this.state.items.every((x: ItemModel) => !x.checked)) return false;

        axios.post(`${this.baseUrl}/items/clear`)
            .then((response: AxiosRequestConfig) => {
                if (response.data.ok) {
                    this.setState({
                        items: this.state.items.filter((x: ItemModel) => !x.checked),
                    });
                }
            });
    }

    handleItemChecked = (id: string, value: boolean) => {
        this.state.items.find((x: ItemModel) => x._id === id)!.checked = value;
    }

    render() {
        const { items } = this.state;
        return (
            <>
                <h2>To do list:</h2>
                {items.length > 0 && (
                    <>
                        {items.map((item: ItemModel) => (
                            <Item key={item._id}
                                  _id={item._id}
                                  name={item.name}
                                  checked={item.checked}
                                  onCheck={(id, value) => this.handleItemChecked(id, value)}
                                  onDelete={(id: string) => this.handleDeleteItem(id)}
                            />
                        ))}
                        <button onClick={this.handleClearCheckedItems}
                                type={'button'}>
                            Clear marked items
                        </button>
                    </>

                )}


                {items.length === 0 && (
                    <>
                        <i>The list is empty.</i>
                        <br />
                        <i>Start adding an item</i>
                    </>
                )}
                <ItemCreate onCreateItem={(item: ItemModel) => this.handleCreateItem(item)} />
            </>
        )
    }
}
