import Painter from './Painter.js'
import WSClient from './WSClient.js'
import Popup from './Popup.js'
import Notification from './Notification.js'
import Room from './Room.js'
import lerp from './utils/lerp.js'
import { canvas, ctx, width, height } from './init.js'

window.Popup = Popup
window.Notification = Notification
window.Room = Room

const menuOpen = document.getElementById('menu-open')
const menu = document.getElementById('menu')

menuOpen.addEventListener('mouseover', () => {
    menu.style.left = 0
})

menu.addEventListener('mouseleave', () => {
    menu.style.left = '-150px'
})

document.querySelector('#room-select > form')
    .addEventListener('submit', e => {
        e.preventDefault()

        Room.goto(e.target.popupId.value)
    })

document.querySelector('#send-message > form')
    .addEventListener('submit', e => {
        e.preventDefault()

        Room.broadcast(e.target.message.value)
        Popup.close('send-message')

        e.target.message.value = ''
    })

ctx.lineWidth = 5
ctx.lineCap = 'round'
ctx.lineJoin = 'round'

const room = window.location.hash && window.location.hash.substring(1).trim()

const painter = new Painter(canvas)
const ws = new WSClient(room)

window.ws = ws

painter.onMouseDown = (e) => {
    ws.send('startDraw', {
        x: e.pageX,
        y: e.pageY,
    })
}

painter.onMouseMove = (e) => {
    ws.send('mouse', {
        x: e.pageX,
        y: e.pageY,
        isDrawing: painter.isDrawing,
    })
}

const drawStrokes = (strokes) => {
    strokes.forEach(stroke => {
        const points = stroke.points

        if (points.length > 2) {
            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)

            const to = points.length - 2

            for (let i = 1; i < to; i++) {
                const point = points[i]
                const nextPoint = points[i + 1]

                const xc = (point.x + nextPoint.x) / 2
                const yc = (point.y + nextPoint.y) / 2

                ctx.quadraticCurveTo(point.x, point.y, xc, yc)
            }

            ctx.quadraticCurveTo(points[to].x, points[to].y, points[to + 1].x, points[to + 1].y)

            ctx.stroke()
        }
    })
}

const draw = () => {
    ws.clients.forEach(client => {
        ctx.globalAlpha = .8
        ctx.fillStyle = client.colo

        ctx.beginPath()
        ctx.arc(client.mouse.x, client.mouse.y, 10, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        ctx.strokeStyle = client.color

        drawStrokes(client.strokes)
    })

    ctx.strokeStyle = ws.color || '#000'

    drawStrokes(painter.strokes)
}

const loop = () => {
    ctx.clearRect(0, 0, width, height)

    draw()

    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
