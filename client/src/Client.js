// API for product query
function getProducts(columns, cb) {
    const query = '?' + columns.map(c => {
        return 'c=' + c;
    })
        .join('&');
    console.log(query);
    return fetch(`api/product`+query, {
        accept: 'application/json'
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}
//API for user login
function login(user, cb) {
    const query = '?email=' + user.email + '&password=' + user.password;
    console.log(query);
    return fetch(`api/user/login`+query, {
        accept: 'application/json'
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function signup(user, cb) {
    const query = '?email=' + user.email + '&nickname=' + user.nickname + '&username=' + user.username + '&password=' + user.password;
    console.log(query);
    return fetch('/api/user/signup'+query, {
        accept: 'application/json'
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function addOrder(order, cb) {
    const query = '?userId=' + order.userId + '&productId=' + order.productId + '&addrId=' + order.addrId + '&shopId=' + order.shopId;
    console.log(query);
    return fetch('/api/order/add'+query, {
        accept: 'application/json'
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getOrderByUserId(userId, cb) {
    const query = '?userId=' + userId;
    console.log(query);
    return fetch('/api/order/query'+query, {
        accept: 'application/json'
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getOrders(cb) {
    return fetch('/api/order/query', {
        accept: 'application/json'
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function getShops(cb) {
    return fetch('/api/shop/query', {
        accept: 'application/json'
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function sendOrders(orders, cb) {
    const query = '?' + orders.map(c => {
        return 'orderId=' + c;
    })
        .join('&');
    console.log(query);
    return fetch(`api/order/send`+query, {
        accept: 'application/json'
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`Http Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
}

function parseJSON(response) {
    return response.json();
}

const Client = { getProducts, login, signup, addOrder, getOrderByUserId, getOrders, getShops, sendOrders };
export default Client;