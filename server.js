const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const app = express();

app.set('port', process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const host = 'localhost';
const user = 'root';
const pswd = 'zjh2416256HG';
const dbname = 'Hamazon';

/* ------------------------- config db ------------------------- */
const con = mysql.createConnection({
    host: host,
    user: user,
    password: pswd,
    port: '3306',
    database: dbname
});

con.connect(err => {
    if (err) throw err;
    console.log("Connected");
});

app.get('/', (req, res) => {
    res.json("Welcome to Hamazon server");
});

app.get('/api/product', (req, res) => {
    const columns = req.query.c;

    if (!columns) {
        const sql = `select * from productView`;
        con.query(sql, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        });
    }
    else {
        const sql = `select ${columns.join(",")} from productView`;
        con.query(sql, (err, result, fields) => {
            if (err)
                res.json([]);
            else
                res.json(result);
        });
    }
});

app.get('/api/user/login', (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    if (!(email && password)) {
        res.json([{
            response: {
                code: 1,
                responseText: "Fields cannot be empty",
            },
            user: {},
            addresses: [],
        }]);
        return;
    }
    const sql = `select * from userInfo where email=${email} and passwd=${password}`;
    con.query(sql, (err, result, fields) => {
        console.log(sql);
        if (err)
            res.json([{
                response: {
                    code: 1,
                    responseText: err.toString(),
                },
                user: {},
                addresses: [],
            }]);
        else {
            const user = result[0];
            const addrSql = `select * from address where userId=${user.userId}`;
            con.query(addrSql, (err, result, fields) => {
               const addresses = result;
               console.log(addresses);
                res.json([{
                    response: {
                        code: 0,
                        responseText: "success",
                    },
                    user: user,
                    addresses: addresses,
                }]);
            });
        }
    });
});

app.get('/api/user/signup', (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    const nickname = req.query.nickname;
    const username = req.query.username;
    console.log(res.query);
    if (!(email && password && nickname && username)) {
        res.json([{
            response: {
                code: 1,
                responseText: "Fields cannot be empty",
            }
        }]);
        return;
    }
    const sql = `insert into userInfo(email, nickname, userName, passwd) values("${email}", "${nickname}", "${username}", "${password}")`;
    con.query(sql, (err, result, fields) => {
        console.log(sql);
        if (err)
            res.json([{
                response: {
                    code: 1,
                    responseText: err.toString(),
                }
            }]);
        else
            res.json([{
                response: {
                    code: 0,
                    responseText: "success",
                }
            }]);
    });
});

app.get('/api/order/add', (req, res) => {
   const userId = req.query.userId;
   const productId = req.query.productId;
   const addrId = req.query.addrId;
   const shopId = req.query.shopId;
    if (!(userId && productId && addrId && shopId)) {
        res.json([{
            response: {
                code: 1,
                responseText: "Fields cannot be empty",
            }
        }]);
        return;
    }
    const sql = `insert into orders(userId, productId, addrId, shopId) values(${userId}, ${productId}, ${addrId}, ${shopId})`;
    con.query(sql, (err, result, fields) => {
        console.log(sql);
        if (err)
            res.json([{
                response: {
                    code: 1,
                    responseText: err.toString(),
                }
            }]);
        else
            res.json([{
                response: {
                    code: 0,
                    responseText: "success",
                }
            }]);
    });
});

app.get('/api/order/query', (req, res) => {
    const userId = req.query.userId;
    if (!(userId)) {
        const sql = `select * from OrderView`;
        con.query(sql, (err, result, fields) => {
            console.log(result);
            if (err)
                res.json([{
                    response: {
                        code: 1,
                        responseText: err.toString(),
                    }
                }]);
            else
                res.json([{
                    response: {
                        code: 0,
                        responseText: "success",
                    },
                    order: result,
                }]);
        });
        return;
    }
    const sql = `select * from OrderView where userId=${userId}`;
    con.query(sql, (err, result, fields) => {
        console.log(result);
        if (err)
            res.json([{
                response: {
                    code: 1,
                    responseText: err.toString(),
                }
            }]);
        else
            res.json([{
                response: {
                    code: 0,
                    responseText: "success",
                },
                order: result,
            }]);
    });
});

app.get('/api/order/send', (req, res) => {
    const orders = req.query.orderId;
    console.log(orders);
    for(let i=0; i<orders.length; i++) {
        const orderId = orders[i];
        const sql = `update orders set statusId=4 where orderId=${orderId}`;
        con.query(sql, (err, result, fields) => {
            console.log(result);
            if (err) {
                res.json([{
                    response: {
                        code: 1,
                        responseText: err.toString(),
                    }
                }]);
                return;
            }
        });
    }
    res.json([{
        response: {
            code: 1,
            responseText: "success",
        }
    }]);
});

app.get('/api/shop/query', (req, res) => {
    const sql = `select * from shop`;
    con.query(sql, (err, result, fields) => {
        console.log(result);
        if (err)
            res.json([{
                response: {
                    code: 1,
                    responseText: err.toString(),
                }
            }]);
        else
            res.json([{
                response: {
                    code: 0,
                    responseText: "success",
                },
                shop: result,
            }]);
    });
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
