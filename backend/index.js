import express from "express";
import jokes from "./jokes.js";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());

app.get("/health" , (req,res) => {
    res.status(200).json({ status : "ok"});
})

app.get("/" , (req,res) =>{
    return res.status(200).json({ message : "hello from docker "})
})

app.get("/api/jokes", async (req, res) => {
    await new Promise( (resolve) => setTimeout(resolve, 2000) );
    const random = jokes[Math.floor(Math.random() * jokes.length)];
    res.status(200).json({"joke" : random});
})


//Why 0.0.0.0? A server listening only on localhost inside a container may not accept traffic coming from outside that container.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});