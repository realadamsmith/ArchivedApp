const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

const stripe = require("stripe")(
  "nope"
);
const shippo = require("shippo")(
  "nope"
);
const createdDate = new Date();

app.use(cors({ origin: true }));
app.use(express.json());




app.post("/create-account-hosted", async (req, res) => {
  // try {
  const { countryData } = req.body;

  var account = await stripe.accounts.create({
    type: "express",
    requested_capabilities: ["card_payments", "transfers"],
    business_type: "company",
    country: countryData,
  });

  var accountLink = await stripe.accountLinks.create({
    account: account.id,
    success_url: "https://Lagruni.com",
    failure_url: "https://Lagruni.com",
    type: "account_onboarding",
  });
  res.json({ account: account.id, accountLink: accountLink.url });
  // } catch(error) {
  //   const err = JSON.stringify(error);
  //   res.status(500).send(`Request error. ${err}`);
  // }
});

app.post("/payments/create", async (req, res) => {
  try {
    const {
      amount,
      shipping,
      //  vendors,
      confirmationEmail,
      referralID,
      // theincrements,
      discounted,
    } = req.body;
    // {discounted ? res.json(discounted) : (res.json(discounted + "Nope"))}

    const paymentIntent = await (discounted
      ? stripe.paymentIntents.create({
          shipping,
          amount: discounted * 100,
          currency: "usd",
          payment_method_types: ["card"],
          receipt_email: confirmationEmail,
          metadata: { referral: referralID },
          // webhooks detect the referralID
        })
      : stripe.paymentIntents.create({
          shipping,
          amount,
          currency: "usd",
          payment_method_types: ["card"],
          receipt_email: confirmationEmail,
          metadata: { referral: referralID },
        }));

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
});

app.post("/sellerConf", async (req, res) => {
  const { testing } = req.body;

  try {
    let mailTransporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "@outlook.com",
        pass: ""
      }
    });
  
    let details = {
      from: "seller-updates@outlook.com",
      to: "",
      bcc: "",
      // to: variable1,
      subject: "Lagruni Seller Order Confirmation " + createdDate,
      text: "You have a new order, please check your order details in your Seller Account.",
      // attachments: [ { filename: 'records.txt', content: 'Hello world!' } ]
    }
    
    mailTransporter.sendMail(details, function(err, data) {
      if(err) {
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });
    res.json("Email sent successfully");
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
    }
  });



// ------- Transfers after

app.post("/transfers", async (req, res) => {
  const {
    sellers,
    // charges
  } = req.body;
  // const piChargeID = charges.data
  try {
    console.log(sellers);

    const transfers = Object.entries(sellers).map(([vendorId, cut]) => {
      const transfer = stripe.transfers.create({
        amount: cut * 85,
        currency: "usd",
        destination: vendorId,
        // source_transaction: piChargeID
      });
      console.log(vendorId, cut);
      return transfer;
    });
    res.json(transfers);
  } catch (err) {
    res.json(err);
  }
});

// ------- Express Login Link

app.post("/login_links", async (req, res) => {
  const { productHeroSellerID } = req.body;
  const loginLink = await stripe.accounts.createLoginLink(productHeroSellerID);
  try {
    res.json(loginLink);
  } catch (err) {
    res.json(err.message);
  }
});

// ------- SHIPPO API
app.post("/shippoValidateTo", async (req, res) => {
  const {
    senderName,
    company2,
    email2,
    phone2,
    line2,
    line22,
    city2,
    state2,
    zip2,
    // productLength, productWidth, productHeight, productOunces,
  } = req.body;

  shippo.address.create(
    {
      name: senderName,
      company: company2,
      phone: phone2,
      email: email2,
      street1: line2,
      street2: line22,
      city: city2,
      state: state2,
      zip: zip2,
      country: "US",
      validate: true,
    },
    function (err, validateAddressTo) {
      res.json(validateAddressTo);
      // asynchronously called
    }
  );
});

app.post("/shippoValidateFrom", async (req, res) => {
  const {
    recipientName,
    company1,
    email1,
    line1,
    line11,
    phone1,
    city1,
    state1,
    zip1,
  } = req.body;

  shippo.address.create(
    {
      name: recipientName,
      company: company1,
      phone: phone1,
      email: email1,
      street1: line1,
      street2: line11,
      city: city1,
      state: state1,
      zip: zip1,
      country: "US",
      validate: true,
    },
    function (err, validateAddressFrom) {
      res.json(validateAddressFrom);
      // asynchronously called
    }
  );
});

app.post("/shipposhipment", async (req, res) => {
  const { vF, vT, productLength, productWidth, productHeight, productOunces } =
    req.body;

  const parcel = {
    length: productLength,
    width: productWidth,
    height: productHeight,
    distance_unit: "in",
    weight: productOunces,
    mass_unit: "oz",
  };

  shippo.shipment
    .create({
      address_from: vF,
      address_to: vT,
      parcels: [parcel],
      async: false,
    })
    .then(function (shipment) {
      res.json(shipment);
    });
});

// ------- Charge for Ship Labels

app.post("/v1/charges", async (req, res) => {
  const { amount, SellerHeroID } = req.body;
  const charge = await stripe.charges.create({
    amount: amount * 100,
    currency: "usd",
    source: SellerHeroID,
  });
  res.json(charge);
});

app.post("/shippoTransaction", async (req, res, next) => {
  const { desiredLabel } = req.body;
  const transaction = await shippo.transaction.create({
    rate: desiredLabel,
    label_file_type: "PDF",
    async: false,
  });
  return res.json(transaction);
});



// app.post("/lagruniNetwork8", async (req, res, next) => {
//   https://developers.facebook.com/docs/instagram-api/reference/ig-user/media_publish
 //  const step1container = fetch('https://graph.facebook.com/v2.8/me/media?access_token=${access_token}')
//   const { desiredLabel } = req.body;
//   const transaction = await shippo.transaction.create({
//     rate: desiredLabel,
//     label_file_type: "PDF",
//     async: false,
//   });
//   return res.json(transaction);
// });

// app.post("/lagruniNetwork9", async (req, res, next) => {
//   https://open-api.tiktok.com/share/video/upload/

//   const { desiredLabel } = req.body;
//   const transaction = await shippo.transaction.create({
//     rate: desiredLabel,
//     label_file_type: "PDF",
//     async: false,
//   });
//   return res.json(transaction);
// });

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// app.post("/shippoTransaction", async (req, res, next) => {
//   const { desiredLabel } = req.body;
//   const transaction = await shippo.transaction.create({
//         "rate": desiredLabel,
//         "label_file_type": "PDF",
//         "async": false
//     })
//   res.json(transaction)
// })

// All on POST now

exports.api = functions.https.onRequest(app);
