const router = require('express').Router();
const q = require('../databases/dbConnections');

router.put('/update',(req,res)=>{
    const {id,title,description,date} = req.body;
    q.execute(`UPDATE notes SET title = '${title}', description = '${description}', date='${date}' WHERE id = ${id}`);
    res.json({message:"success"});
})
module.exports = router;
