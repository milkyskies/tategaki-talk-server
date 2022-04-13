export const getUsername = (): string => {
    let username = localStorage.getItem('tategaki-talk-username')
    if (username) {
        return username
    }
    return ""
}
