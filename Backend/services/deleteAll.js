const router = require('express').Router();
const q = require('../databases/dbConnections');


router.delete('/deleteAll',(req,res)=>{
    q.execute('DELETE FROM notes');
    res.json({message:'success'});
})

module.exports = router