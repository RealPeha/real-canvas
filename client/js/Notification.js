const notificationContainer = document.querySelector('#notifications')

class Notification {
    static create(message = '', timeout = 2000) {
        const notification = document.createElement('div')

        notification.classList.add('notification')
        notification.innerHTML = message

        notificationContainer.appendChild(notification)

        window.getComputedStyle(notification, null).getPropertyValue('left')

        setTimeout(() => notification.style.left = '0px')

        setTimeout(() => {
            notification.style.left = '200px'
            setTimeout(() => notification.remove(), 150)
        }, timeout)
    }
}

export default Notification
