const request = require("supertest")
const {genreModel} = require("../../model/genreModel")
let server




describe("/api/genre",()=>{
    beforeEach(()=>{
        server = require("../../index");

    })
    afterEach(async ()=>{
        server.close()
 
    })
    // describe("GET /", () => { 
    //     it("it should return all genre", async()=>{
    //      await   genreModel.collection.insertMany([
    //             {name: "genre1"},{name: "genre2"}
    //         ])
    //       const res = await  request(server).get("/api/genre")
    //       expect(res.status).toBe(200); 
    //       expect(res.body.some(g => g.name == "genre1" )).toBeTruthy() 
    //       expect(res.body.some(g => g.name == "genre2" )).toBeTruthy() 
     
    //     })   
    // })
    describe("GET /:id", () => { 
        it("it should return a specific genre", async()=>{
          
          const res = await  request(server).post("/api/genre/63255883125f007b73f797c6")
          expect(res.status).toBe(400);   
          console.log(res.body)  
     
        })   
    })
}) 