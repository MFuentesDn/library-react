const BASE_API = "http://localhost:8080/books";


export const getBooks = async () => {
    const response = await fetch(BASE_API)
    console.log('response', response.statusText)
    const responseJSON = await response.json()
    return responseJSON
};