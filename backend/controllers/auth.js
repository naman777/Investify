import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

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
    <p><span class="usp">Invest in progress, Invest in fractions.</span> That's our motto. We believe in breaking down barriers and making investing accessible to everyone, regardless of age or financial background.</p>
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

const mailOptions = (user) => ({
    from: {
        name: "Team Investify",
        address: "investifyteam@gmail.com",
    },
    to: user.email, 
    subject: "Welcome to Investify", 
    text: "Welcome", 
    html: htmlContent.replace('<span id="userName"></span>', user.name),
});

const sendMail = async (user) => {
    try {
        await transporter.sendMail(mailOptions(user));
        console.log("Email has been sent");
    } catch (error) {
        console.log(error);
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            phone,
            password: passwordHash,
            cashinHand: 5000
        });

        const savedUser = await newUser.save();

        sendMail({ name, email }); // Call sendMail with user's details
        
        res.status(201).json("Registered Success");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const login = async (req,res) => {
   

    try {
        const {
            email,
            password,
        } = req.body;

        const user = await User.findOne({ email:email});

        if(!user){
            return res.status(400).json({msg:"User does not exist. "});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(400).json({ msg:"Invalid credentials" });
        }
        
        delete user.password;

        const payload={
            email:user.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "3d"});
        
        res.status(200).cookie("token", token, {
            httpOnly: true,
        }).json({
            "token":token,
            "msg":"logined",
        });


        

        
    } catch (error) {
       res.status(500).json({ error: error.message });        
    }
}



