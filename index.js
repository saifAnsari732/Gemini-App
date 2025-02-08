// Craete server
const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());
app.use(bodyParser.json());

app.post("/getresponce", async (req, res) => {
  try {
    // res.send(req.body.question);
  const genAI = new GoogleGenerativeAI("AIzaSyAxFdBUkZdNi94vtv2dVu7XfHD6UQgF3VU");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Explain how AI works";

  const result = await model.generateContent(req.body.question);
  console.log(result.response.text());
  answer= result.response.text()
  res.status(200).json({
    answer: answer
  })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


