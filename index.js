const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const cors=require("cors")
require("dotenv").config();
const app = express();


const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY
});
app.use(cors())
app.use(express.json())

const openai = new OpenAIApi(configuration)

app.use(express.json());


app.get("/",(req,res)=>{
  res.send("hello")
})


app.post("/news/:data",async (req,res)=>{
  let {data} = req.params
 
  try {
   
      const completion = await openai.createCompletion({
        model:"text-davinci-003",
        prompt:`please generate a  5 random ${data} news line by line `,
        max_tokens: 2048,
      });
      res.send(completion.data.choices[0].text);
    
  } catch (error) {
    res.send(
      error
    )
  }
})


app.listen(process.env.port, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});