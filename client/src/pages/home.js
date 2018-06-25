import React, { Component } from 'react';
import Drawer from '../components/Drawer';
import Client from "../Client";
import {auth} from '../routes';

const column = ['productId', 'productName', 'description', 'originalPrice', 'reallyPrice', 'imgUrl', 'categoryName', 'shopId', 'shopName'];

class App extends Component{
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: [],
        };
        Client.getProducts(column, products => {
            this.setState({
                data: products.slice(0, 50)
            });
        });
    }

    render() {
        return (
            <div>
                <Drawer data={this.state.data} user={auth.user} addresses={auth.addresses} />
            </div>
        );
    }
}

export default App;