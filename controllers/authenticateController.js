import user from "../models/userModel.js";

 const loginController= async (req,res)=>{
      const {email,password}=req.body;
      const existingUser = await user.findOne({ email: email });
       try{
            if(!existingUser){
                return res.status(409).send({ message: 'please register first', success: false });
            }
            else{
                if(existingUser.password===password){
                    return res.status(200).send({ message: 'User successfully logged in', success: true,token:'token',userId:existingUser._id ,username:existingUser.username});
                }
                else{
                    return res.status(409).send({ message: 'password not matched', success: false });
                }
            }
       }
       catch(err){
        console.log('Error in signin:', err);
        return res.status(500).send({ message: 'Internal server error', success: false });
       }
}


const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

      
        const existingUser = await user.findOne({ email: email });

        if (existingUser) {
            return res.status(409).send({ message: 'User already registered', success: false });
        } else {
            
            const newUser = new user({
                username: username,
                email: email,
                password: password 
            });

        
            await newUser.save();

            return res.status(200).send({ message: 'User successfully registered', success: true });
        }
    } catch (err) {
        console.log('Error in saving:', err);
        return res.status(500).send({ message: 'Internal server error', success: false });
    }
};





export {loginController,registerController}