import { WebSocketServer } from "ws"
const port = process.env.WS_PORT
export default class {
    _init_() {
        const wss = new WebSocketServer({ port })
        wss.on('connection', (ws) => {
            console.log('ws => listend a port:', port)

            ws.on('message', (data) => {
                try {
                    const { userId, username, text } = JSON.parse(data)
                    console.log(`USRID: ${userId} | ${username} => ${text}`)
                } catch (e) {
                    console.error({
                        "WebSocket ERROR": e.message
                    })
                }
            })

            ws.on('close', () => {
                console.log('ws => connection closed')
            });
        })
    }
}