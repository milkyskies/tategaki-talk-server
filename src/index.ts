import WebSocket from "ws"
import { getUsername } from "./lib/username"

const PORT = Number(process.env.PORT) || 8082;
const wss = new WebSocket.Server({ port: PORT });

type Chat = {
    userId: string,
    sender: string,
    message: string
}

// インメモリでデータを保持
const chatBoard: Chat[] = [];

wss.on('connection', (ws) => {
    ws.on('message', (response: string) => {
        if (typeof response === 'string') {
            const payload = JSON.parse(response);

            if (payload["method"] === "chat") {
                chatBoard.push(payload["data"]);
            }
        }

        wss.clients.forEach((client) => {
            // TODO: Simplify this
            const payload = {
                method: "update",
                data: chatBoard,
            }
            client.send(JSON.stringify(payload));
        })
    });

    // TODO: Simplify this
    const payload = {
        method: "update",
        data: chatBoard,
    }
    ws.send(JSON.stringify(payload));
});
