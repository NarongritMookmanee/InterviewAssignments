import Env from "./env.js"
import express from "express"
import verifyToken from "./middlewares/verifyToken.js"
import pool from "./middlewares/pool.js"
import userRoutes from "./routes/userRoutes.js"
import loginRoutes from "./routes/loginRoutes.js"
import Broadcast from "./websockets/broadcast.js"

const env = new Env()
const chatService = new Broadcast()

chatService._init_()
env._init()

const app = express()
const port = process.env.PORT

app.use(express.json()); // using for JSON payload
app.use(express.urlencoded({ extended: true }))
app.use(verifyToken)
app.use('/login', pool, loginRoutes)
app.use('/api/users', pool, userRoutes)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});