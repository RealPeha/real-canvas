const WebSocket = require('ws')

class Room {
    constructor(id) {
        this.id = id
        this.clients = new Set()
    }

    broadcast(broadcaster, type, data) {
        for (const client of this.clients) {
            if (client !== broadcaster && client.socket.readyState === WebSocket.OPEN) {
                client.send({ type, data, id: broadcaster.id })
            }
        }
    }

    broadcastEvery(broadcaster, type, data) {
        for (const client of this.clients) {
            if (client.socket.readyState === WebSocket.OPEN) {
                client.send({ type, data, id: broadcaster.id })
            }
        }
    }
}

module.exports = Room
