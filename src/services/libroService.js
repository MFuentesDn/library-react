import axios from "axios";

const BASE_API = "http://localhost:8080/books";
const BASE_API_OP = "http://localhost:8081/books";

const clientOp = axios.create({
  baseURL: "http://localhost:8081/books" 
});

export const getBooks = async () => {
    try{
        const response = await fetch(BASE_API)
        console.log('response', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};

export const createBook = async (data) => {
    try{
        const response = await fetch(BASE_API_OP, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
        })
        console.log('responsePOST', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};

export const updateBook = async (data) => {
    try{
        const response = await fetch(BASE_API_OP +  '/' + data.bookId, {
            //mode: 'no-cors',
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                //'Access-Control-Allow-Credentials': true,
                //'Access-Control-Allow-Headers': 'Content-Type',
                //'Access-Control-Allow-Methods': 'PUT',
                "Content-Type": "application/json",
                Accept: "application/json",
              },
        })
        console.log('responsePUT', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};

export const deleteBook = async (id) => {
    try{
        const url = BASE_API_OP +  '/' + id
        const response = await fetch(url, {
            method: 'DELETE'
        })
        console.log('responsePUT', response.statusText)
        const responseJSON = await response.json()
        return responseJSON
    } catch (error) {
        console.error(error);
    }
};