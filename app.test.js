const request = require("supertest");

const app = require('./app');

describe("GET /",() => {

    it("GET / => Array of products", () => {
        return request(app).get("/")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(String),
                            name: expect.any(String),
                            inStock: expect.any(Boolean)
                        })
                    ])
                )
            })
    })

    it("GET /id => get product by id", () => {
        return request(app).get("/1")
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(String),
                        name: expect.any(String),
                        inStock: expect.any(Boolean)
                    })
                )
            })
    })

    it("GET /id => 404 if product not found",() => {
        return request(app).get("/10010001")
            .expect(404);
    });

    it("POST / => add a new product",() => {
        return request(app).post("/")
            .send({
                name: "X Box 360"
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        name: "X Box 360",
                        inStock: false
                    })
                )
            })
    })

    it("POST / => 404 if cannot add new product", () => {
        return request(app).post("/")
            .send({
                name: 123243
            })
            .expect(400)
    })
});

