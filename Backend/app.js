const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())
app.use(require('./services/allNotes'));
app.use(require('./services/addNote'));
app.use(require('./services/update'));
app.use(require('./services/delete'));
app.use(require('./services/deleteAll'));















app.listen(2500, ()=>{
    console.log('server is running ...............');
})