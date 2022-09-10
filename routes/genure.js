const express = require("express");
const router = express.Router();
const {genreInputValidation, genreModel}  = require("../model/genreModel")



router.post("/",(req,res) => {
    const postRequest = req.body;
     
    const {error} = genreInputValidation(postRequest);
    if(error){return res.status(400).send(error.details[0].message)};

    async function createGenure(){

        try{

            
            const createGenure = await genreModel.create({name: req.body.name})
            
            createGenure.save();

            res.status(200).send(createGenure);
            
        }
        catch(er){
            console.log(er)
        }
    }
    createGenure()
    




})
router.get("/",async (req,res)=>{
    const getAllGenres = await genreModel.find({})
    .sort("name");
    res.status(200).send(getAllGenres)


})

module.exports = router;