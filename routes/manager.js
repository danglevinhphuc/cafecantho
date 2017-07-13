var express = require("express");
var manager_get = require("./post_menager/get");
var manager_post = require("./post_menager/post");
var manager = express();
manager.use(manager_get);
manager.use(manager_post);

module.exports = manager;