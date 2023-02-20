import { Routes, Route, useNavigate } from 'react-router-dom';
import Usuarios from '../data/usuarios.json'
import Libros from '../data/libros.json'
import Prestamos from '../data/prestamos.json'
import { useEffect, useState } from "react";
import './Prestamo.css';


const initialUsuarios = Usuarios
const initialLibros = Libros
const initialPrestamos = Prestamos


export const Prestamo = () => {
    const [usuarios, setUsuarios] = useState(initialUsuarios);
    const [libros, setLibros] = useState(initialLibros);
    const [prestamos, setPrestamos] = useState(initialPrestamos);
    const [prestamosAllInfo, setPrestamosAllInfo] = useState(initialPrestamos);
    const [dataToEdit, setDataToEdit] = useState(null); //funcion que permite saber actualizacion o creacion
    const [showComponent, setShowComponent] = useState(1);

    useEffect(() => {
        if (dataToEdit) {
            setShowComponent(2);
        } else {
            setShowComponent(1);
        }
    }, [dataToEdit])

    useEffect(() => {
        var newPrestamos = []
        prestamos.forEach(prestamo => {
            let newPrestamo = {
                id: prestamo.id,
                libroId: prestamo.libroId,
                libroNombre: libros.find(libro => libro.id == parseInt(prestamo.libroId)).nombre,
                libroIsbn: libros.find(libro => libro.id == parseInt(prestamo.libroId)).isbn,
                usuarioId: prestamo.usuarioId,
                usuarioNombre: usuarios.find(usuario => usuario.id === parseInt(prestamo.usuarioId)).nombre,
                fechaPrestamo: prestamo.fechaPrestamo,
                fechaDevolucionEsperada: prestamo.fechaDevolucionEsperada,
                fechaDevolucion: prestamo.fechaDevolucion ? prestamo.fechaDevolucion : ''
            };
            newPrestamos.push(newPrestamo);
        });
        setPrestamosAllInfo(newPrestamos);
        console.log(newPrestamos)
    }, [prestamos])

    const createData = (data) => {
        data.id = prestamos.length + 1
        setPrestamos([...prestamos, data])
    };

    const updateData = (data) => {
        let nuevosPrestamos = prestamos.map(prestamo => prestamo.id === data.id ? data : prestamo);
        setPrestamos(nuevosPrestamos)
    };

    const deleteData = (id) => {
        let nuevosPrestamos = prestamos.filter(prestamo => prestamo.id !== id);
        setPrestamos(nuevosPrestamos);
    };

    return (
        <div>
            {showComponent == 1
                ? <ListarPrestamos prestamos={prestamosAllInfo} deleteData={deleteData} setDataToEdit={setDataToEdit} setShowComponent={setShowComponent}/>
                : <AgregarPrestamo libros={libros} usuarios={usuarios} createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} setShowComponent={setShowComponent}/>
            }
        </div>
    );
}

export const ListarPrestamos = ({ prestamos, deleteData, setDataToEdit, setShowComponent}) => {

    return (
        <div class="container">
            <div class="titulo_boton">
                <p class="fs-1">Prestamos</p>
                <button type="button" onClick={() => setShowComponent(2)} class="btn btn-secondary">Agregar Prestamo</button>
            </div>


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Libro</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Fecha prestamo</th>
                        <th scope="col">Fecha esperada devolucion</th>
                        <th scope="col">Fecha devolucion</th>
                    </tr>
                </thead>
                <tbody>
                    {prestamos && prestamos.map((prestamo, indexPrestamo) => (
                        <tr key={indexPrestamo}>
                            <td>{prestamo.libroNombre}</td>
                            <td>{prestamo.usuarioNombre}</td>
                            <td>{prestamo.fechaPrestamo}</td>
                            <td>{prestamo.fechaDevolucionEsperada}</td>
                            <td>{prestamo.fechaDevolucion ? prestamo.fechaDevolucion : '-'}</td>
                            <td>
                                <button onClick={() => setDataToEdit(prestamo)} className='btn btn-info btn-sm'>
                                    <i className='fa-solid fa-edit'></i>
                                </button>
                                <button onClick={() => deleteData(prestamo.id)} className='btn btn-danger btn-sm'>
                                    <i className='fa-solid fa-trash'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const initialForm = {
    id: null,
    nombreUsuario: '',
    usuarioId: 0,
    nombreLibro: '',
    libroId: 0,
    fechaPrestamo: '',
    fechaDevolucionEsperada: '',
    fechaDevolucion: '',
};
export const AgregarPrestamo = ({ libros, usuarios, createData, updateData, dataToEdit, setDataToEdit, setShowComponent }) => {

    const [form, setForm] = useState(initialForm)

    useEffect(() => {
        console.log('dataToEdit', dataToEdit)
        if (dataToEdit) {
            setForm(dataToEdit);

            //disabled data
            document.getElementById("usuarios").setAttribute("disabled", "disabled");
            document.getElementById("libros").setAttribute("disabled", "disabled");
            document.getElementById("fechaPrestamo").setAttribute("disabled", "disabled");
        } else {
            setForm(initialForm)
            //enable data 
            document.getElementById("usuarios").removeAttribute("disabled");
            document.getElementById("libros").removeAttribute("disabled");
            document.getElementById("fechaPrestamo").removeAttribute("disabled");
        }
    }, [dataToEdit])

    const handleClick = (event) => {
        event.preventDefault();
        console.log('form', form)
        if (!form.usuarioId || !form.libroId || !form.fechaPrestamo || !form.fechaDevolucionEsperada) {
            alert("Datos incompletos");
            return;
        }
        if (form.id === null) {
            createData(form)
        } else {
            updateData(form)
        }
        handleReset();
    }

    const handleChange = (event) => {
        console.log('event', event.target.name, ' ', event.target.value)
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }
    const handleReset = (event) => {
        setForm(initialForm);
        setDataToEdit(null)
    }

    return (
        <div class="container">
            <p class="fs-1">{dataToEdit ? "Devolver libro" : "Agregar prestamo"}</p>
            <form onSubmit={handleClick}>
                <div class="mb-3">
                    <label for="exampleFormControlSelect1">Usuarios</label>
                    <select class="form-control" id="usuarios" name="usuarioId" value={form.usuarioId} onChange={handleChange} >
                        <option key={0}>-</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>{usuario.nombre + ' ' + usuario.apellido}</option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlSelect2">Libros</label>
                    <select class="form-control" id="libros" name="libroId" value={form.libroId} onChange={handleChange}>
                        <option key={0}>-</option>
                        {libros.map((libro) => (
                            <option key={libro.id} value={libro.id}>{libro.isbn + '-' + libro.nombre}</option>
                        ))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Fecha prestamo</label>
                    <input type="date" class="form-control" id="fechaPrestamo" name="fechaPrestamo" value={form.fechaPrestamo} onChange={handleChange}></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Fecha esperada devolucion</label>
                    <input type="date" class="form-control" name="fechaDevolucionEsperada" value={form.fechaDevolucionEsperada} onChange={handleChange}></input>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Fecha Devolucion</label>
                    <input type="date" class="form-control" name="fechaDevolucion" value={form.fechaDevolucion} onChange={handleChange}></input>
                </div>
                <button type="submit" class="btn btn-primary m-2" onClick={handleClick}>{dataToEdit ? "Editar" : "Agregar"}</button>
                <button type="button" class="btn btn-outline-secondary m-2" onClick={() => setShowComponent(1)} >Cancelar</button>
            </form>
        </div>
    );
}
