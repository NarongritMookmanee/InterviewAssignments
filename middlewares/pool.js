import DBModelConnection from "../models/dbModelConnection.js";

export default async function poolMiddleware(req, res, next) {
    const pool = new DBModelConnection()
    req.pool = await pool._init_poolConnection()
    next()
};