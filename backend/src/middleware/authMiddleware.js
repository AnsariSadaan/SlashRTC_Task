import jwt from 'jsonwebtoken';


export const authToken = async (req, res, next)=> {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token: Authorization denied" })
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(err) return res.status(403).json({message: "Invalid Token"});
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(401).json({message: "Token is not valid"});
    }
}