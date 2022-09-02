const q = require('../databases/dbConnections');
const router = require('express').Router();

router.get('/getAllNotes',(req,res)=>{
    q.execute(`SELECT * FROM notes`,(err,result)=>{
        res.json({message:'success',result});
    });
})

module.exports = router;