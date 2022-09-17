// const request = require("supertest")
// const {genreModel} = require("../../model/genreModel")
// const {userModel} = require("../../model/createAccount")
// let server


// describe("/api/login",()=>{
//     beforeEach(()=>{
//         server = require("../../index");

//     })
//     afterEach(async ()=>{
//         server.close()
 
//     })

    // describe("POST/ account", () => { 
    //     it("it should create account", async()=>{
          
    //       const res = await  request(server).post("/api/createAccount").send({name:"kingsley", email:"kingsley019@yahoo.com",password:"23456789"})
    //       expect(res.status).toBe(401);     
    //       console.log(res.body)  
     
    //     })   
    // })
    
    //     it("it should login", async()=>{
          
    //       const res = await  request(server).post("/api/login").send({email:"kingsley019@yahoo.com",password:"23456789"})
    //       expect(res.status).toBe(200);   
    //       console.log(res.body)   
     
       // })

//remember to remove the auth middleware since you can`t get jwt using supertest
//wow, you can set it but it was not used for this test, kindly remove auth middlewarwe or rewrite the tests
    
// })   