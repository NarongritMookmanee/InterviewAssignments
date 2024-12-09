import DBModelConnection from "../models/dbModelConnection.js"
import ArrayUtils from "../utils/array/arrayUtils.js"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

export default class LoginController extends DBModelConnection {
    login = async (req, res, next) => {
        const body = req.body
        const keys = Object.keys(body)
        const targetKeys = ['username', 'password']
        try {
            const array = new ArrayUtils(keys)
            await array.betweenIncludes(targetKeys, async (isValid) => {
                if (isValid && keys.length === targetKeys.length) {
                    let user = await super._getUsers(req.pool)
                    user = user.find(element => element.username === body.username && element.password === body.password)
                    if (user) {
                        // JWT sign performed
                        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                        // res.cookie('auth_token', token, { httpOnly: true, secure: false })
                        res.json({ token });
                    } else {
                        res.status(401).json({
                            status: 'Failed',
                            message: 'Invalid credentials'
                        })
                    }
                } else {
                    res.status(400).json({
                        status: 'Failed',
                        message: 'Invalid arguments'
                    })
                }
            })

        } catch (e) {
            res.status(500).json({
                status: 'Failed',
                message: e.message
            })
        }
    }
}