const router = require('express').Router();
const q = require('../databases/dbConnections');

router.post('/addNote',(req,res)=>{
    const {title,description,date} = req.body;
    q.execute(`INSERT INTO notes (title,description,date) values('${title}','${description}', '${date}')`);
    res.json({message:"success"});
})
module.exports = router;
