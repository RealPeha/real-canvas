const onceEventListener = (element, type, listener) => {
    const handler = () => {
        listener()

        element.removeEventListener(type, handler)
    }

    element.addEventListener(type, handler)
}

export default onceEventListener
