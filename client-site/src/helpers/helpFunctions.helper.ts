export function generateRandomString (length: number = 10): string {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < length; ++i) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }

    return result;
}

export function parseFromLocalStorage(key: string) {
    const notParsedString = localStorage.getItem(key);

    if (notParsedString) {
        const parsedData = JSON.parse(notParsedString);

        return parsedData;
    }

    return null;
}