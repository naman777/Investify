import User from "../models/user.js";
import jwt from "jsonwebtoken";
import symbolDataMap from "../models/stocksData.js";
import getLTP from "../webSockets/stockPriceAPI.js";

export const getUserDetails = async(req, res) => {
    try {
        let token = req.headers.authorization;

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email: payload.email.toString() });

        const symbols = [];
        const buyPrices = [];
        const quantity = [];
        user.stocks.forEach(stock => {
            symbols.push(stock.symbol);
            buyPrices.push(stock.buyPrice);
            quantity.push(stock.quantity);
        });

        function calculateInvestedAmount(stocks) {
            let amount = 0;
            stocks.forEach(stock => {
                amount += stock.buyPrice * stock.quantity;
            });
            return amount;
        }

        let investedAmount = calculateInvestedAmount(user.stocks);
        let currentAmount = 0;

        for (let i = 0; i < symbols.length; i++) {
            const q = parseInt(quantity[i]);
        
            try {
                const ans = await getLTP(symbols[i].toString(), symbolDataMap.get(symbols[i])[1]);
                console.log("Price for", symbols[i], ":", ans);
        
                currentAmount += ans * q;
            } catch (error) {
                console.error("Error fetching current price for", symbols[i], ":", error);
            }
        }
        

        res.status(200).json({
            "email": user.email,
            "stocks": user.stocks,
            "investedAmount": investedAmount,
            "currentAmount": currentAmount,
            "cashinHand": user.cashinHand
        });

    } catch (error) {
        res.status(404).json({ "message": "Page not found " });
        console.log(error);
    }
};
