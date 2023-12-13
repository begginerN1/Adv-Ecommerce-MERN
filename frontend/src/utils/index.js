export const shortenText = (text, n) => {
    if (text.length > n) {
        const shortenedText = text.substring(0, n).concat("...")
        return shortenedText
    }
    return text
}

//validate email
export const validateEmail = (email) => {
    return email.toLowerCase().match(
        /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    )
}