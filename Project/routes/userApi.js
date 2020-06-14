
const Express = require("express");
const app = Express.Router()
const BodyParser = require('body-parser');

const Model = require("../schema/user_schema")

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


app.post("/", async (request, response) => {
    try {
        var person = new Model(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.get("/", async (request, response) => {
    try {
        var result = await Model.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
})


app.get("/:id", async (request, response) => {
    try {
        var person = await Model.findById(request.params.id).exec();
        response.send(person);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.put("/:id", async (request, response) => {
    try {
        var person = await UserModel.findById(request.params.id).exec();
        person.set(request.body);
        var result = await person.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});


app.delete("/:id", async (request, response) => {
    try {
        var result = await Model.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports=app;