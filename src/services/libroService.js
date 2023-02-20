const BASE_API = "localhost:8762/library-browser/books";


export const getBooks = async () => {
    const response = await fetch(BASE_API)
    console.log(response.statusText)
};