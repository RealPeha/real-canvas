const jsonSafeParse = (json, fallback = {}) => {
    try {
        return JSON.parse(json)
    } catch {
        return fallback
    }
}

export default jsonSafeParse
