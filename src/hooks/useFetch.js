import { useState, useEffect, useInsertionEffect } from "react";
import Libros from '../data/libros.json'


export const useFetchData = (peticion) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        setData(Libros)
    }, [peticion]);
    return data
}
