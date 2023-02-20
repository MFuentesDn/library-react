import React from 'react'
import {useFetchData} from "../hooks/useFetch"

export function HooksPersonalizados({setDataInitial}) {
    let data = useFetchData();
    setDataInitial(data)
    return(
        <></>
    );
}
