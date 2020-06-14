//const express = require("express")
const OrderModel = require("../schema/product_schema")
//const Model=require("./schemaCall")


const Express = require("express");
const app = Express.Router()
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");

//var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


app.post("/Order", async (request, response) => {
    try {
        var order = new OrderModel(request.body);
        var result = await order.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/Order", async (request, response) => {
    try {
        var result = await UserModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})


app.get("/Order/:id", async (request, response) => {
    try {
        var order = await OrderModel.findById(request.params.id).exec();
        response.send(order);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.put("/Order/:id", async (request, response) => {
    try {
        var order = await OrderModel.findById(request.params.id).exec();
        order.set(request.body);
        var result = await order.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


app.delete("/Order/:id", async (request, response) => {
    try {
        var result = await OrderModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


module.exports=app;