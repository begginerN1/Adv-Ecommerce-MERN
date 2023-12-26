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

export function calculateAverageRating(ratings){
    if (!Array.isArray(ratings) || ratings.length === 0) {
        return 0
    }

    let totalStars = 0;
    for(let i=0; i< ratings.length; i++){
        let rating = ratings[i];
        if (rating.hasOwnProperty("star")) {
            totalStars += rating.star;
        }
    };
    return totalStars / ratings.length;
}