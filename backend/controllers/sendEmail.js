import nodemailer from 'nodemailer';

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Investify</title>
<style>
    /* Styling for the email */
    body {
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
        color: #333333;
        text-align: center;
    }
    p {
        color: #666666;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 20px;
    }
    .usp {
        font-weight: bold;
        color: #009688;
    }
</style>
</head>
<body>
<div class="container">
    <h1>Welcome to Investify!</h1>
    <p>Dear <span id="userName"></span>,</p>
    <p>Thank you for joining Investify! We are thrilled to have you on board.</p>
    <p>At Investify, our mission is simple: to democratize investing. With our innovative platform, we empower teens like you to invest in the future by offering fractional stocks. No matter your budget, you can now invest in your favorite companies and be part of their success story.</p>
    <p><span class="usp">Invest in progress, invest in fractions.</span> That's our motto. We believe in breaking down barriers and making investing accessible to everyone, regardless of age or financial background.</p>
    <p>We're excited to see you embark on your investment journey with us. Stay tuned for exciting updates, investment tips, and exclusive opportunities!</p>
    <p>Happy investing!</p>
    <p>Best regards,<br>Team Investify</p>
</div>
</body>
</html>
`;

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user:  "investifyteam@gmail.com",
      pass:  'wropugqeyiaahzsp',
    },
});

const mailOptions = {
    from: {
        name: "Team Investify",
        address: "investifyteam@gmail.com",
    },
    to: "namankundra7@gmail.com", 
    subject: "Welcome to Investify", 
    text: "Welcome", 
    html: htmlContent, 
}

const sendMail = async (user) => {
    try {
        // Replace the user's name in the HTML content
        const personalizedHtmlContent = htmlContent.replace('<span id="userName"></span>', user.name);
        mailOptions.html = personalizedHtmlContent;
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent");
    } catch (error) {
        console.log(error);
    }
};

// Example user object

sendMail(user);

export default sendMail;
