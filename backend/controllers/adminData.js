import Admin from "../models/adminModel.js";

 export const adminLogin = async (req,res) =>{
    try {
        const{
            email,
            password,
        }= req.body;

        if(email === process.env.ADMINEMAIL && password=== process.env.ADMINPASSWORD){

            const admin = await Admin.findOne({email:email}) 

            res.status(200).json(admin)
        }
    } catch (error) {
        console.log(error);        
    }
 }

 export const adminLoginPost = async (req,res) =>{
    try {
        const{
            email,
            stocks,
        }= req.body;

        const newUser = new Admin({
            email,
            stocks,
        });

        const savedUser = await  newUser.save();
        res.status(201).json("Registered Success");

    } catch (error) {
        console.log(error);        
    }
 }