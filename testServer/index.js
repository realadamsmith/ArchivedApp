const nodemailer = require("nodemailer");
const createdDate = new Date();

let mailTransporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "Caspi",
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
