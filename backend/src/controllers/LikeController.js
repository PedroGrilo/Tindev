const Dev = require('../models/Dev');


module.exports={
   async store(req,res){
        const {devId} = req.params;
        const {user} = req.headers;

        const logggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({error: 'Dev not exists'})
        }

        if(targetDev.likes.includes(logggedDev._id)){
            console.log("DEU MATCH!!");
        }

        logggedDev.likes.push(targetDev._id);
        await logggedDev.save();
        
        return res.json(logggedDev)
    }
}