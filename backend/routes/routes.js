const mongoose=require('mongoose')
const router=require('express').Router()
const {adminmodel,usermodel}=require('../models/models.js')
const multer = require('multer');
const upload = multer();
const jwt=require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(403).send({ login: false, message: 'No token provided.' });
    jwt.verify(token,'studentvoice', (err, decoded) => {
    if (err)
        return res.status(500).send({ login: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
    });
};
router.put('/addconcern', upload.any(),verifyToken, async(req, res) => {
    try {
        const {title,description,block,location}=JSON.parse(req.body.details)
        const images=[]
        for(let i=0;i<req.files.length;i++) {
            images.push(req.files[i].buffer)
        }
        const updateduser= await usermodel.findOneAndUpdate(
            { _id:req.userId },
            {  $push: { concerns:{title,description,block,location,images}} },
            { new: true }
        );
        if (!updateduser) {
            return res.status(404).json({success:false, error: 'user not found' });
        }
        res.status(200).json({ success: true});
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
});
router.post('/getconcern',verifyToken,async(req,res)=>{
    try {
        const userdata=await usermodel.findOne({_id:req.userId})
        if(userdata){
            console.log(userdata)
        return res.status(200).send({success:true,data:userdata.concerns})}
        else
        return res.status(404).send({success:false})
    } catch (error) {
        res.status(500).send({success:false,msg:error.message})
    }
})
router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
        try {
            const  userdata=await usermodel.findOne({username, password});
            console.log(userdata);
            if (userdata){
                const token=jwt.sign({id:userdata._id},'studentvoice')
                res.status(200).send({login:true,admin:false,data:{token:token,data:userdata}})
            }
            else{
                const  admindata=await adminmodel.findOne({username, password});
                if (admindata){
                    const token=jwt.sign({id:admindata._id},'studentvoice')
                    res.status(200).send({login:true,admin:true,data:{token:token,data:admindata}})
                }
                else{
                    res.status(200).send({login:false,msg:'Invalid credentials'})
                }
            }
        } catch (error) {
            res.status(404).send({login:false,msg:error.message})
        }
}
)

module.exports=router