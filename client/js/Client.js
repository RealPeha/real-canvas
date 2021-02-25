import { width, height } from './init.js'

class Client {
    constructor(id, data) {
        this.id = id
        this.color = data.color
        this.prevMouse = {
            x: data.mouse.x || width / 2,
            y: data.mouse.y || height / 2,
        }
        this.mouse = {
            x: data.mouse.x || width / 2,
            y: data.mouse.y || height / 2,
        }
        this.strokes = data.strokes || []
    }

    serialize() {
        return {
            id: this.id,
            color: this.color,
            strokes: this.strokes,
            mouse: this.mouse
        }
    }
}

export default Client
