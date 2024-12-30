const WebSocket = require("ws");

const notificationSocket = (server) => {
    const wss = new WebSocket.Server({ server, path: "/notifications" });

    wss.on("connection", (ws) => {
        console.log("WebSocket подключен");

        ws.on("message", (message) => {
            console.log("Получено сообщение:", message);
        });

        ws.on("close", () => {
            console.log("WebSocket отключён");
        });

        ws.send("Соединение установлено");
    });
};

module.exports = notificationSocket;
