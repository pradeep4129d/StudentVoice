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
router.put('/updateadmin',verifyToken,async(req, res) => {
    try {
        const {password}=req.body;
        const admin=await adminmodel.findOne({_id:req.userId})
        if(admin){
            admin.password=password;
        }
        await user.save();
        res.status(200).json({ success: true ,message:'updated successfull',data:admin});
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
});
router.put('/updateuser',verifyToken,async(req, res) => {
    try {
        const {password}=req.body;
        console.log(password)
        const user=await usermodel.findOne({_id:req.userId})
        if(user){
            user.password=password;
            await user.save()
            res.status(200).json({ success: true ,message:'updated successfull',data:user});
        }
    } catch (error) {
        res.status(400).send({success:false,message:error.message})
    }
});
router.put('/updateconcern',async(req, res) => {
    try {
        const Id=req.body.Id
        const state=req.body.state
        console.log(state)
        const user=await usermodel.findOne({'concerns._id':Id});
        const index = user.concerns.findIndex(concern => {
            return concern._id.toString() === Id
        });
        if(user){
            user.concerns[index].state=state;
        }
        await user.save()
        res.status(200).json({ success: true ,message:'updated successfull',data:user});
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
});
router.post('/blockconcern',verifyToken,async(req, res)=>{
    try {
        const {block}=req.body;
        console.log(block)
        const users=await usermodel.find()
        const blockConcerns=[]
        for(let i=0; i<users.length; i++) {
            for(j=0;j<users[i].concerns.length; j++) {
                if(users[i].concerns[j].block===block){
                    blockConcerns.push({username:users[i].username,concern:users[i].concerns[j]})
                }
            }
        }
        res.status(200).send({success:true,concerns:blockConcerns})
    } catch (error) {
        res.status(500).send({success:false,message:error.message})
    }
})
router.get('/getsolvedconcern',async(req,res)=>{
    try {
        const users=await usermodel.find()
        const concerns=[]
        for(let i=0; i<users.length; i++) {
            for(j=0;j<users[i].concerns.length; j++) {
                if(users[i].concerns[j].state==='Solved'){
                    concerns.push(users[i].concerns[j])
                }
            }
        }
        console.log(concerns)
        res.status(200).send({success:true,concerns:concerns})
    }
    catch (err) {
        res.status(500).send({success:false,message:error.message})
    }
})
router.get('/getconcerns',async(req,res)=>{
    try {
        const users=await usermodel.find()
        const concerns=[]
        for(let i=0; i<users.length; i++) {
            for(j=0;j<users[i].concerns.length; j++) {
                if(users[i].concerns[j].public){
                    concerns.push(users[i].concerns[j])
                }
            }
        }
        console.log(concerns)
        res.status(200).send({success:true,concerns:concerns})
    }
    catch (err) {
        res.status(500).send({success:false,message:error.message})
    }
})
router.put('/editconcern', upload.any(),verifyToken, async(req, res) => {
    try {
        const {title,description,block,location,concernId,index}=JSON.parse(req.body.details)
        console.log(index,concernId)
        const images=[]
        for(let i=0;i<req.files.length;i++) {
            images.push(req.files[i].buffer)
        };
        const user=await usermodel.findOne({'concerns._id':concernId})
        user.concerns[index].title=title;
        user.concerns[index].description=description;
        user.concerns[index].block=block;
        user.concerns[index].location=location;
        user.concerns[index].images=images;
        await user.save()
        res.status(200).json({ success: true ,message:'updated successfull',data:user});
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
});
router.post('/getlikecount',async(req,res)=>{
    try {
        const userdata=await usermodel.findOne({'concerns._id': req.body.Id })
        if(!userdata){
            res.status(404).send({success:false,msg:'user not found'})
        }
        const userlikedIndex = userdata.liked.findIndex(likedConcernId => {
            return likedConcernId.toString() === req.body.Id;
        });
        res.status(200).send({success:true,likecount:userdata.concerns[userlikedIndex].likeCount})
    } catch (error) {
        res.status(500).send({success:false,msg:error.message})
    }})
    router.post('/getadmindata',verifyToken,async(req,res)=>{
        try {
            const admindata=await adminmodel.findOne({_id:req.userId})
            if(!admindata){
                res.status(404).send({success:false,msg:'admin not found'})
            }
            res.status(200).send({success:true,data:admindata})
        } catch (error) {
            res.status(500).send({success:false,msg:error.message})
        }
    })
router.post('/getuserdata',verifyToken,async(req,res)=>{
    try {
        const userdata=await usermodel.findOne({_id:req.userId})
        if(!userdata){
            res.status(404).send({success:false,msg:'user not found'})
        }
        res.status(200).send({success:true,data:userdata})
    } catch (error) {
        res.status(500).send({success:false,msg:error.message})
    }
})
router.put('/likeupdate', verifyToken, async (req, res) => {
    try {
        const concernId = req.body.concernId;
        const userId = req.userId;
        const userdata = await usermodel.findById(userId);
        if (!userdata) {
            return res.status(404).send({ success: false, msg: 'User not found' });
        }
        const userlikedIndex = userdata.liked.findIndex(likedConcernId => {
            return likedConcernId.toString() === concernId;
        });
        if (userlikedIndex === -1) {
            userdata.liked.push(concernId);
            await userdata.save();
            const postUser = await usermodel.findOne({ 'concerns._id': concernId });
            const concernIndex = postUser.concerns.findIndex(concern => {
                return concern._id.toString() === concernId;
            });
            postUser.concerns[concernIndex].likeCount += 1;
            await postUser.save();
            return res.status(200).json({ success: true, message: 'liked', likecount: postUser.concerns[concernIndex].likeCount });
        } else { 
            userdata.liked.splice(userlikedIndex, 1);
            await userdata.save();
            const postUser = await usermodel.findOne({ 'concerns._id': concernId });
            const concernIndex = postUser.concerns.findIndex(concern => {
                return concern._id.toString() === concernId;
            });
            postUser.concerns[concernIndex].likeCount -= 1;
            await postUser.save();
            return res.status(200).json({ success: true, msg: 'like undo', likecount: postUser.concerns[concernIndex].likeCount });
        }

    } catch (error) {
        return res.status(400).send({ success: false, msg: error.message });
    }
});
router.delete('/deleteconcern', async(req, res) => {
    const concern_id=req.body.Id
    const userdata=await usermodel.findOne({'concerns._id':concern_id});
    if(!userdata)
    return res.status(404).send({success:false,msg:'User not found'})
    const concernIndex = userdata.concerns.findIndex(concern => {
        return concern._id.toString() === concern_id;
    });
    if (concernIndex === -1){
        return res.status(200).json({message:'failed to delete'});}
    userdata.concerns.splice(concernIndex, 1);
    await userdata.save();
    res.status(200).json({success:true, message:'deleted successfully',data:userdata});
})
router.put('/addconcern', upload.any(),verifyToken, async(req, res) => {
    try {
        const {title,description,block,location,public}=JSON.parse(req.body.details)
        const images=[]
        for(let i=0;i<req.files.length;i++) {
            images.push(req.files[i].buffer)
        }
        const updateduser= await usermodel.findOneAndUpdate(
            { _id:req.userId },
            {  $push: { concerns:{title,description,block,location,public,images}} },
            { new: true }
        );
        if (!updateduser) {
            return res.status(404).json({success:false, error: 'user not found' });
        }
        res.status(200).json({ success: true,message:'added Successfullly',data:updateduser});
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