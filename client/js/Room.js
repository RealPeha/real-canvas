class Room {
    static goto(roomId) {
        window.location.href = `#${roomId}`
        window.location.reload()
    }
}

export default Room
