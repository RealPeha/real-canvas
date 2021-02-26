import onceEventListener from './utils/onceEventListener.js'

const popupsContainer = document.querySelector('#popups')
const blackout = document.querySelector('#blackout')

class Popup {
    static close(id) {
        const popup = document.getElementById(id)

        popup.classList.remove('show')
        blackout.classList.remove('show')
    }

    static open(id) {
        const popup = document.getElementById(id)

        popup.classList.add('show')
        blackout.classList.add('show')

        popup.querySelector('input[data-focus]').focus()

        onceEventListener(blackout, 'click', () => Popup.close(id))
    }

    static create(title, content = '') {
        const popup = document.createElement('div')
        const popupBody = document.createElement('div')
        const popupHeader = document.createElement('div')
        const popupContent = document.createElement('div')

        blackout.classList.toggle('show')

        popup.classList.add('popup')
        popupBody.classList.add('popup-body')
        popupHeader.classList.add('popup-header')
        popupContent.classList.add('popup-content')

        popupHeader.innerHTML = title
        popupContent.innerHTML = content

        popupBody.appendChild(popupHeader)
        popupBody.appendChild(popupContent)
        popup.appendChild(popupBody)

        popupsContainer.appendChild(popup)
    }
}

export default Popup
