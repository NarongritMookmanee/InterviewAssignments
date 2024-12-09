import DBModelConnection from "../models/dbModelConnection.js"
import ArrayUtils from "../utils/array/arrayUtils.js";

export default class UsersController extends DBModelConnection {
    async #isUserBodyValid(body) {
        return new Promise(async (resolve, reject) => {
            const keys = Object.keys(body)
            const targetKeys = ['email', 'password', 'username', 'role']
            const array = new ArrayUtils(keys)
            await array.betweenIncludes(targetKeys, (isValid) => {
                if (isValid && keys.length === targetKeys.length)
                    resolve(true)
                else
                    reject('invalid arguments')
            })
        })
    }

    getUsers = async (req, res, next) => {
        try {
            res.status(200).json(await super._getUsers(req.pool))
        } catch (e) {
            res.status(500).json({
                status: 'failed',
                message: e.message
            })
        }
    }

    getUserById = async (req, res, next) => {
        const id = req.params.id
        if (!isFinite(id)) {
            res.status(403).json({
                message: 'ID must be number'
            })
        } else {
            try {
                res.status(200).json(await super._getUserById(req.pool, id))
            } catch (e) {
                res.status(500).json({
                    status: 'failed',
                    message: e.message
                })
            }
        }
    }

    createUser = async (req, res, next) => {
        const body = req.body
        await this.#isUserBodyValid(body)
            .then(async () => {
                try {
                    const returned = await super._createUser(req.pool, body)
                    res.status(200).json({
                        status: 'succeeded',
                        message: returned
                    })
                } catch (e) {
                    res.status(500).json({
                        status: 'failed',
                        message: e.message
                    })
                    console.error(e)
                }
            })
            .catch(e => {
                res.status(500).json({
                    status: 'failed',
                    message: e
                })
            })
    }

    updateUser = async (req, res, next) => {
        const id = req.params.id
        const body = req.body

        await this.#isUserBodyValid(body)
            .then(async () => {
                try {
                    const returned = await super._updateUser(req.pool, id, body)
                    res.status(200).json({
                        status: 'succeeded',
                        message: returned
                    })
                } catch (e) {
                    res.status(500).json({
                        status: 'failed',
                        message: e.message
                    })
                    console.error(e)
                }
            })
            .catch(e => {
                res.status(500).json({
                    status: 'failed',
                    message: e
                })
            })
    }

    deleteUser = async (req, res, next) => {
        const id = req.params.id
        try {
            const returned = await super._deleteUser(req.pool, id)
            res.status(200).json({
                status: 'succeeded',
                message: returned
            })
        } catch (e) {
            res.status(500).json({
                status: 'failed',
                message: e.message
            })
            console.error(e)
        }
    }
}