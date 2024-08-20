import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generatetokenandsetcookie from "../utils/generatetokens.js";
export const signup = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const { fullname, username, password, confirmpassword, gender } = req.body;

        // Validate all required fields
        if (!fullname || !username || !password || !confirmpassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate profile picture URL
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create and save the new user
        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,  // Use the hashed password here
            gender,
            profilepic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        if(newUser){
            generatetokenandsetcookie(newUser._id,res)
            await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,  // Corrected from 'newUser.name' to 'newUser.fullname'
            profilepic: newUser.profilepic
        });
        }
        else{
            res.status(400).json({error:"Invalid user"});
        }

    } catch (error) {
        console.log("Error in setting signup:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("signup");
};
export const login=async (req,res)=>{
try{
const {username,password}=req.body
const user=await User.findOne({username});
const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
if(!user||!isPasswordCorrect){
    return res.status(400).json({error:"Invalid username or password"});
}
generatetokenandsetcookie(user_id,res);
res.status(200).json({
    _id:user._id,
    fullname:user.fullname
})
}
catch{
console.log("Error in login controller",error.message);
res.status(500).json({error:"Internal error"});
}
    console.log("login");
}
export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    }
    catch(error){
        console.log("Error in logout controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
    console.log("logout");
}