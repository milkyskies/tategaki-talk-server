"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const PORT = Number(process.env.PORT) || 8082;
const wss = new ws_1.default.Server({ port: PORT });
// インメモリでデータを保持
const chatBoard = [];
wss.on('connection', (ws) => {
    ws.on('message', (response) => {
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
            };
            client.send(JSON.stringify(payload));
        });
    });
    // TODO: Simplify this
    const payload = {
        method: "update",
        data: chatBoard,
    };
    ws.send(JSON.stringify(payload));
});
