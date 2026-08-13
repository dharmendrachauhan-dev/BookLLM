import express from "express";
import "dotenv/config"

const app = express();

const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("halo World")
})


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

