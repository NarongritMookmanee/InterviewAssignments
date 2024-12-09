import dotenv from "dotenv"

export default class {
    _init() {
        if (process.env.NODE_ENV === 'production') {
            dotenv.config({ path: './.env.production' })
        } else {
            dotenv.config()
        }
    }
}