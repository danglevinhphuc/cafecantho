var express = require("express");
var shopcart_get = require("./shopcart/get");
var shopcart_post = require("./shopcart/post");
var shopcart = express();
shopcart.use(shopcart_get);
shopcart.use(shopcart_post);

module.exports =shopcart;