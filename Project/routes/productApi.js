
const Express = require("express");
const app = Express.Router()

const ProductModel = require("../schema/product_schema")

const BodyParser = require("body-parser");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


app.post("/", async (request, response) => {
    try {
        var produtPost = new productModel(request.body);
        var result = await produtPost.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/", async (request, response) => {
    try {
        var result = await productModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})


app.get("/:id", async (request, response) => {
    try {
        var ProductGet = await productModel.findById(request.params.id).exec();
        response.send(ProductGet);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.put("/Product/:id", async (request, response) => {
    try {
        var ProductPut = await productModel.findById(request.params.id).exec();
        ProductPut.set(request.body);
        var result = await ProductPut.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


app.delete("/Product/:id", async (request, response) => {
    try {
        var result = await ProductModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


module.exports=app;