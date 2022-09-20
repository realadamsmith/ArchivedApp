const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// fetch(virtserver.swaggerhub.com/mitymaus/channel_integration_api_spec/1.5)

// Onboarding of a seller
app.post("/v1/warehouses", async (req, res, next) => {
    // Called immediately after OAuth from user Signup is completed
    // Deliverr calls the API to create and record warehouse ID
    })

app.get("/v1/products", async (req, res, next) => {
    // Deliverr begins import of product catalog, to complete asynchronously
    })

app.get("/v1/orders", async (req, res, next) => {
    // Deliverr begins import of order history, to complete asynchronously
    })

// Ongoing calls
app.get("/v1/shipmentrequests", async (req, res, next) => {
    // Deliverr polls continuously (~5 minutes) for new shipment requests...
    const {item} = req.body
    const result = someAction(item)

    res.json(result)
    })
app.post("/v1/shipmentrequests/{id}/acknowledge", async (req, res, next) => {
    // ...and calls back to acknowledge each imported shipmentrequest
})
app.get("/v1/products", async (req, res, next) => {
    // Deliverr polls continuously for newly created products
    // 
    })
app.post("/v1/products/{id}/inventory", async (req, res, next) => {
    // Deliverr supplies inventory updates as events occur
    })
app.post("/v1/shipmentrequests/{id}/shipment", async (req, res, next) => {
    // Deliverr supplies shipment data as events occur
    })
app.post("/v1/shipmentrequests/{id}/cancel", async (req, res, next) => {
    // Deliverr cancels shipment requests upon internal cancellation
    })


exports.deliverr = functions.https.onRequest(app);

    