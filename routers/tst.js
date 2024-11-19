const express = require('express');
const mongoose = require('mongoose');
const tstController = require('../controllers/tst');

const router = express.Router();


router.post('/postTest',(req,res,next)=>{
    console.log("PostTest");
    return res.status(200).json({
        message: "Post Test"
     });
});

router.post('/pTst',tstController.tstCheck);

router.get('/getTest',tstController.getAlltst);

router.delete('/deleteTest/:uid',(req,res,next)=>{
    console.log("Delete Test");
    return res.status(200).json({
        message: "Delete Test: "+ req.params.uid
     });
});


module.exports = router;

