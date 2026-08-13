import express from "express";
import "dotenv/config"
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";

const app = express();
const PORT = process.env.PORT


app.all("/api/auth/{*key}", toNodeHandler(auth));
// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.get("/", (req, res) => {
    res.send("halo World")
})


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

