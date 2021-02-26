class Room {
    static goto(roomId) {
        window.location.href = `#${roomId}`
        window.location.reload()
    }

    static broadcast(message) {
        if (message) {
            window.ws.send('chat', { text: message })

            Notification.create('Successfully sent', 500)
        }
    }
}

export default Room
