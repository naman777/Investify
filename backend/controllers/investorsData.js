import Investors from "../models/investors.js";

export const addInvestor = async (req, res) => {
    try {
        const { name, description, stocks, investedAmount, yearlyChange, quaterlyChange } = req.body;
        
        // Create a new Investor instance
        const newInvestor = new Investors({
            name,
            description,
            stocks,
            investedAmount,
            yearlyChange,
            quaterlyChange
        });

        // Save the new Investor to the database
        const savedInvestor = await newInvestor.save();

        res.status(201).json(savedInvestor);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const sendInvestor = async (req,res) => {
    const investors = req.body;
    const name = investors.name;

    const investorData = await Investors.findOne({name:name});

    res.json(investorData);
}