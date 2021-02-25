const randomColor = require('./utils/randomColor')

let id = 0

class Client {
    constructor(socket) {
        this.id = id++
        this.color = randomColor()
        this.strokes = []
        this.mouse = {}
        this.socket = socket
        this.lastTime = 0
    }

    send(data) {
        const now = Date.now()

        this.socket.send(JSON.stringify({ ...data, t: now - this.lastTime }))

        this.lastTime = now
    }

    serialize() {
        return {
            id: this.id,
            color: this.color,
            strokes: this.strokes,
            mouse: this.mouse,
        }
    }
}

module.exports = Client
