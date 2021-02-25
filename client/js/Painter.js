class Painter {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.isDrawing = false
        this.strokes = []
        this.currentStroke = { points: [] }

        canvas.addEventListener('mousedown', this.handleMouseDown.bind(this))
        canvas.addEventListener('mouseup', this.handleMouseUp.bind(this))
        canvas.addEventListener('mousemove', this.handleMouseMove.bind(this))
    }

    handleMouseDown(e) {
        this.isDrawing = true
        this.currentStroke = {
            points: [this.point(e)],
        }
        this.strokes.push(this.currentStroke)

        this.onMouseDown && this.onMouseDown(e)
    }

    handleMouseUp(e) {
        this.isDrawing = false

        this.onMouseUp && this.onMouseUp(e)
    }

    handleMouseMove(e) {
        if (this.isDrawing) {
            this.currentStroke.points.push(this.point(e))
        }

        this.onMouseMove && this.onMouseMove(e)
    }

    point(e) {
        return { x: e.pageX, y: e.pageY }
    }
}

export default Painter
