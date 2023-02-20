import React from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Libro} from './components/Libro';
import { Usuario } from './components/Usuario'
import { Prestamo } from './components/Prestamo'
import { App } from './App';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route exact path="/" element={ <App/>} />
                    <Route exact path="/libros" element={ <Libro/>} />      
                    <Route exact path="/usuarios" element={ <Usuario/>} />      
                    <Route exact path="/prestamos" element={ <Prestamo/>} />      
                    <Route path="*" element={ <App/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
};
