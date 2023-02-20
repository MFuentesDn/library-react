
import { Routes, Route, useNavigate } from 'react-router-dom';
import Usuarios from '../data/usuarios.json'
import { useEffect, useState } from "react";
import './Usuario.css';

const initialUsuarios = Usuarios

export const Usuario = () => {
  const [usuarios, setUsuarios] = useState(initialUsuarios);
  const [dataToEdit, setDataToEdit] = useState(null); //funcion que permite saber actualizacion o creacion
  const [showComponent, setShowComponent] = useState(1);

  useEffect(() => {
    if (dataToEdit) {
      setShowComponent(2);
    } else {
      setShowComponent(1);
    }
  }, [dataToEdit])

  const createData = (data) => {
    data.id = usuarios.length + 1
    setUsuarios([...usuarios, data])
    setShowComponent(1)
  };

  const updateData = (data) => {
    let nuevosUsuarios = usuarios.map(usuario => usuario.id === data.id ? data : usuario);
    setUsuarios(nuevosUsuarios);
  };

  const deleteData = (id) =>{
    let nuevosUsuarios = usuarios.filter(usuario => usuario.id !== id);
    setUsuarios(nuevosUsuarios);
  };

  return(
    <div>
      {showComponent == 1
      ? <ListarUsuarios usuarios={usuarios} deleteData={deleteData} setDataToEdit={setDataToEdit} setShowComponent={setShowComponent}/>
      : <AgregarUsuario createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} setShowComponent={setShowComponent} />
      }
    </div>
  );
}

export const ListarUsuarios = ({usuarios, deleteData, setDataToEdit, setShowComponent}) => {

    return (
      <div class="container">
        <div class="titulo_boton">
          <p class="fs-1">Usuarios</p>
          <button type="button" onClick={() => setShowComponent(2)}  class="btn btn-secondary">Agregar Usuario</button>
        </div>
  
  
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nonbre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Edad</th>
            </tr>
          </thead>
          <tbody>
          {usuarios && usuarios.map((usuario, indexUsuario) => (
            <tr key={indexUsuario}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.edad}</td>
              <td>
              <button onClick={()=> setDataToEdit(usuario)} className='btn btn-info btn-sm'>
                <i className='fa-solid fa-edit'></i>
              </button>
              <button onClick={()=> deleteData(usuario.id)} className='btn btn-danger btn-sm'>
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
  id : null,
  nombre:'',
  apellido:'',
  edad:0
};
export const AgregarUsuario = ({createData, updateData, dataToEdit, setDataToEdit, setShowComponent}) => {

  const [form,setForm]= useState(initialForm)

  useEffect(() => {
    console.log('dataToEdit',dataToEdit)
    if (dataToEdit){
      setForm(dataToEdit);
    }else{
      setForm(initialForm)
    }
  }, [dataToEdit])

  const handleClick = (event) => {
    event.preventDefault();
    if(!form.nombre || !form.apellido || !form.edad){
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

  const handleChange =(event)=>{
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }
  const handleReset =(event)=>{
    setForm(initialForm);
    setDataToEdit(null)
  }

  return (
    <div class="container">
      <p class="fs-1">{dataToEdit ? "Editar usuario" : "Agregar usuario"}</p>
      <form onSubmit={handleClick}>
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input type="text" class="form-control" name="nombre" value={form.nombre} onChange={handleChange} aria-describedby="emailHelp"></input>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Apellido</label>
          <input type="text" class="form-control" name="apellido" value={form.apellido} onChange={handleChange}></input>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Edad</label>
          <input type="text" class="form-control" name="edad" value={form.edad} onChange={handleChange}></input>
        </div>
        <button type="submit" class="btn btn-primary m-2" onClick={handleClick}>{dataToEdit ? "Editar" : "Agregar"}</button>
        <button type="button" class="btn btn-outline-secondary m-2" onClick={() => setShowComponent(1)} >Cancelar</button>
      </form>
    </div>
  );
}
