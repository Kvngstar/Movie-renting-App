const { absolute } = require("./lib");

describe("text",()=>{


    test(" to have object",()=>{
        expect(absolute("kk")).toEqual({name:"kingsley"})
        
    })
    test(" to throw",()=>{
        expect(()=>{ absolute(Null) }).toThrow()
        
    })
})