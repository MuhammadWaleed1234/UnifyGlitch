const mongoose = require('mongoose');
const users = require('../models/users');
const admin = require('../models/admin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.users_signup =  (req, res, next) => {
    users.find({ email: req.body.email })
    .exec()
    .then(result=>{
        if(result.length >0)
        {
            return res.status(422).json({
               message: "Email exists"
            });
        }
        const hash = bcrypt.hash(req.body.password,10,(err,hashed)=>
        {
            if(err)
            {
                console.log("bcrypt: ",err);
                return res.status(500).json(
                    {
                        error:err
                    }
                );
            }
            console.log("----------hash",hashed);
            const user = new users({
            _id :new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hashed
        });

        user.save().then(resultt=>{
            console.log("-----------",resultt);
            res.status(200).json({
                message: "User Added"
            });
        })
        .catch(err=>{
            console.log(err);
            return res.status(500).json({
                error:err
            });
        });
        })
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json({
            error:err
        });
    });
};

exports.users_login = (req,res,next)=>{
    users.find({email:req.body.email})
    .exec()
    .then(result=>{
        console.log("result  ",result);
        if(result.length<1)
        {
            return res.status(409).json("Auth failed");
        }
        
        bcrypt.compare(req.body.password,result[0].password,(err,valid)=>{
            if(!valid)
            {
                return res.status(409).json("Auth failed");
            }
            console.log("_id : ",result[0]._id)
            admin.find({user_id:result[0]._id}).exec().then(check=> {
                let admin = true;
                console.log("check : ",check);
                if(check.length< 1)
                {
                    admin = false;
                }
                else
                {
                    admin = true;
                }
                const token = jwt.sign({
                    _id : result[0]._id,
                    name: result[0].name,
                    email: result[0].email,
                    admin: admin
                }, process.env.JWT_secretKey,{
                    expiresIn:"1h"
                })
                return res.status(200).json({
                    message:"Auth Successful",
                    name: result.name,
                    admin: admin,
                    token: token
                })
            }).catch(err=>{
                console.log(err);
                return res.status(500).json({
                    error:err
                });
            });
            
        })
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json({
            error:err
        });
    });
};


exports.user_getAllUsers = (req,res,next)=>
{
    users.find({})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json({
            error:err
        });
    });
};

exports.users_deleteUserById = (req,res,next)=>{
    users.deleteMany({_id: req.params.uid})
    .exec()
    .then(result=>{
        if(result.deletedCount >= 1)
        {
            res.status(200).json({
                message: "Deleted Successfully",
                data: result
            })
        }
        else{
            res.status(404).json({
                message:"User not found",
                data: result
            })
        }
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json({
            error:err
        });
    });

};


