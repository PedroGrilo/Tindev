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

        logggedDev.dislikes.push(targetDev._id);
        await logggedDev.save();
        
        return res.json(logggedDev)
    }
}