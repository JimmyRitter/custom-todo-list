import React from "react";
import { AxiosRequestConfig } from "axios";
import axios from 'axios';
import ItemModel from "../types/item.d";
import Item from './item.single';
import ItemCreate from "./item.create";

export class ItemList extends React.Component<{}, { items: ItemModel[] }> {
    constructor(props: any) {
        super(props);
        this.handleCreateItem.bind(this);
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
            }
        )
    }

    render() {
        const { items } = this.state;
        return (
            <>
                <h2>To do list:</h2>
                {items.map((item: ItemModel) => (
                    <Item key={item._id}
                          _id={item._id}
                          name={item.name}
                          checked={item.checked}
                    />
                ))}
                <ItemCreate onCreateItem={(item: ItemModel) => this.handleCreateItem(item)} />
            </>
        )
    }

}