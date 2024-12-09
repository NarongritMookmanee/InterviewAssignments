import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

export default function auth(req, res, next) {
    console.log(`${req.method} ${req.originalUrl}`)
    if (req.path === '/login') {
        return next() // excepted when direct to "/login"
    }
    // const token = req.cookie.auth_token
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(401).json({
            status: 'Failed',
            message: 'No token provided'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        console.error(e)
        res.status(401).json({ message: e.message });
    }
}