drop database if exists hamazon;
create database hamazon;
use hamazon;

create table category (
	categoryId varchar(25),
    categoryName varchar(12),
    constraint PK_category primary key(categoryId)
);

create table shop (
	shopId int(11),
    shopName varchar(25),
    shopUrl1 varchar(45),
    shopUrl2 varchar(45),
    constraint PK_shop primary key(shopId)
);

create table product (
	productId bigint(20),
    productName varchar(255),
    categoryId varchar(25),
    description varchar(4000),
    favourableDecl1 varchar(255),
    favourableDecl2 varchar(255), 
    originalPrice decimal(12, 2),
    reallyPrice decimal(12, 2),
    shopId int(11),
    imgUrl varchar(255),
    constraint PK_product primary key(productId),
    constraint FK_product_categoryId foreign key(categoryId) references category(categoryId),
    constraint FK_product_shopId foreign key(shopId) references shop(shopId)
);

create table address (
	addrId int(11),
    addr varchar(255),
    constraint PK_address primary key(addrId)
);

create table userInfo (
	userId int(10) auto_increment,
    userName varchar(25),
    nickname varchar(25),
    email varchar(25),
    passwd varchar(50),
    isLogin int,
    defaultAddrId int(11),
    constraint PK_userInfo primary key(userId),
    constraint FK_userInfo foreign key(defaultAddrId) references address(addrId)
);
alter table userInfo modify column userId int(10) auto_increment;

create table orderStatus (
	statusId int,
    statusText varchar(25),
    constraint PK_orderStatus primary key(statusId)
);

create table orders (
	orderId bigint(20),
    userId int(10),
    productId bigint(20),
    addrId int(11),
    shopId int(11),
    statusId int,
    constraint PK_orders primary key(orderId),
    constraint FK_orders_userId foreign key(userId) references userInfo(userId),
    constraint FK_orders_productId foreign key(productId) references product(productId),
    constraint FK_orders_addrId foreign key(addrId) references address(addrId),
    constraint FK_orders_shopId foreign key(shopId) references shop(shopId),
    constraint FK_orders_statusId foreign key(statusId) references orderStatus(statusId)
);

insert into orderStatus values(1, "买家未付款");
insert into orderStatus values(2, "买家取消订单");
insert into orderStatus values(3, "买家已付款，卖家未发货");
insert into orderStatus values(4, "卖家已发货");
insert into orderStatus values(5, "运输中");
insert into orderStatus values(6, "买家已收货");
insert into orderStatus values(7, "交易关闭");

create view ProductView
as
select productId, productName, description, favourableDecl1, favourableDecl2, imgUrl, originalPrice, reallyPrice, categoryName, shopName, shopUrl1, shopUrl2
from product, shop, category
where product.shopId = shop.shopId 
and product.categoryId = category.categoryId;

create view OrderView
as
select orderId, productName, shopName, userName, addr, statusText
from orders, product, shop, userInfo, address, orderStatus
where orders.productId = product.productId 
and orders.shopId = shop.shopId 
and orders.userId = userInfo.userId 
and orders.addrId = address.addrId
and orders.statusId = orderStatus.statusId;