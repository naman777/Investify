import User from "../models/user.js";
import Admin from "../models/adminModel.js";

export const stocksToAdd = async (req, res) => {
  try {
    const userData = req.body;
    const userEmail = userData.email;
    const stocksData = userData.stocks.map(stock => ({
      symbol: stock.symbol,
      quantity: stock.quantity,
      buyPrice: stock.buyPrice,
      date: new Date()
    }));

    const user = await User.findOne({ email: userEmail });
    const admin = await Admin.findOne({ email: process.env.ADMINEMAIL });

    if (!user || !admin) {
      throw new Error('User or Admin not found');
    }

    let totalAmount = 0; // Initialize total amount

    for (const stockData of stocksData) {
      const existingUserStock = user.stocks.find(stock => stock.symbol === stockData.symbol);
      if (existingUserStock) {
        existingUserStock.quantity += stockData.quantity;
      } else {
        user.stocks.push(stockData);
      }
      totalAmount += stockData.quantity * stockData.buyPrice; // Calculate total amount
    }

    // Update admin stocks
    for (const stockData of stocksData) {
      const existingAdminStock = admin.stocks.find(stock => stock.symbol === stockData.symbol);
      if (existingAdminStock) {
        existingAdminStock.quantity += stockData.quantity;
      } else {
        admin.stocks.push(stockData);
      }
    }
    // Deduct total amount from user's cashInHand if it's defined and not NaN
if (user && !isNaN(user.cashinHand)) {
  const newCashInHand = (user.cashinHand || 0) - totalAmount; // Default to 0 if cashInHand is undefined
  user.cashinHand = newCashInHand;
}

await user.save();
await admin.save();

res.status(200).json({
  message: "Stocks added successfully.",
  totalAmount: totalAmount.toFixed(2),
  remainingCashInHand: user.cashinHand !== undefined ? user.cashinHand.toFixed(2) : "N/A"
});

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

