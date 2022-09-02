const router  = require('express').Router();
const q = require('../databases/dbConnections');


router.delete('/delete',(req,res)=>{
    const {id} = req.body;
    q.execute(`DELETE FROM notes WHERE id = ${id}`);
    res.json({message:"success"});

})
module.exports = router;