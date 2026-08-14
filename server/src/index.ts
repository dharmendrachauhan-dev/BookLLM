import express from "express";
import "dotenv/config"
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import cors from "cors"
import { registerRoutes } from "./routes";
import { errorHandler } from "./middleware/handler-middleware";

const app = express();
const PORT = process.env.PORT
const clientUrl = process.env.CLIENT_URL ?? "http://localhost:3000"

app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    })
)

app.all("/api/auth/{*key}", toNodeHandler(auth));
// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.get("/", (req, res) => {
    res.send("halo World")
})


registerRoutes(app)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

