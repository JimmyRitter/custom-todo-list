import React from "react";
import { AxiosRequestConfig } from "axios";
import axios from 'axios';
import Item from "../types/item.d";

export class ItemList extends React.Component<{}, { items: any }> {
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

    render() {
        const { items } = this.state;
        return (
            <>
                <h2>Items from backend:</h2>
                {items.map((item: Item) => (
                    <span key={item._id}>{item.name}</span>
                ))}
            </>
        )
    }
}