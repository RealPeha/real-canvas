const randomColor = require('./utils/randomColor')

let id = 0

class Client {
    constructor(socket) {
        this.id = id++
        this.color = randomColor()
        this.strokes = []
        this.mouse = {}
        this.socket = socket
    }

    send(data) {
        this.socket.send(JSON.stringify(data))
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
