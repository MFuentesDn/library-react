import { Routes, Route, useNavigate } from 'react-router-dom';
import './Libro.css';
import { useEffect, useState } from "react";
import { HooksPersonalizados } from './HooksCustom';
import { getBooks, createBook, updateBook, deleteBook} from '../services/libroService'

export const Libro = () => {
  const [dataInitial, setDataInitial] = useState();
  const [dataInitialType, setDataInitialType] = useState("libros");
  const [libros, setLibros] = useState();
  const [dataToEdit, setDataToEdit] = useState(null); //funcion que permite saber actualizacion o creacion
  const [showComponent, setShowComponent] = useState(1);

  /*useEffect(() => {
    //setLibros(dataInitial)
    setLibros(getBooks())
  })*/
  const fetchData = () => {
    (async () => {
      const data = await getBooks();
      setLibros(data);
   })();
  }

  useEffect(() => {
    fetchData()
  }, [dataInitial]);

 /* useEffect(() => {
    //setLibros(dataInitial)
    console.log('---',getBooks())
    setLibros(getBooks())
  }, [dataInitial])*/

  useEffect(() => {
    if (dataToEdit) {
      setShowComponent(2);
    } else {
      setShowComponent(1);
    }
  }, [dataToEdit])

  const createData = (dataToSave) => {
    //data.id = libros.length + 1
    //setLibros([...libros, data])
    //setShowComponent(1)
    (async () => {
      const data = await createBook(dataToSave);
      fetchData()
      setShowComponent(1)
    })();
  };

  const updateData = (dataToSave) => {
    //let nuevosLibros = libros.map(libro => libro.id === data.id ? data : libro);
    //setLibros(nuevosLibros);
    (async () => {
      const data = await updateBook(dataToSave);
      fetchData()
    })();
  };

  const deleteData = (id) => {
    //let nuevosLibros = libros.filter(libro => libro.id !== id)
    //setLibros(nuevosLibros)
    (async () => {
      console.log('id delete', id)
      const data = await deleteBook(id);
      fetchData()
    })();
  };

  return (
    <div>
      <HooksPersonalizados setDataInitial={setDataInitial} dataInitialType={dataInitialType}/>
      {showComponent == 1
        ? <ListarLibros libros={libros} deleteData={deleteData} setDataToEdit={setDataToEdit} setShowComponent={setShowComponent} />
        : <AgregarLibro createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} setShowComponent={setShowComponent}  />
      }
    </div>
  );
}

export const ListarLibros = ({ libros, deleteData, setDataToEdit, setShowComponent }) => {
  const [libro, setLibroDetalle] = useState()
  const openModal = (libro) => {
    setLibroDetalle(libro);
    window.setTimeout(function () {
      document.getElementById('nombre').focus();
    }, 500)
  }
  return (
    <div>
      <div class="container">
        <div class="titulo_boton">
          <p class="fs-1">Libros</p>
          <button type="button" onClick={() => setShowComponent(2)} class="btn btn-secondary">Agregar Libro</button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">ISBN</th>
              <th scope="col">Autor</th>
            </tr>
          </thead>
          <tbody>
            {libros && libros.map((libro, index) => (
              <tr key={index}>
                <td>{libro.name}</td>
                <td>{libro.isbn}</td>
                <td>{libro.author} </td>
                <td>
                  <button type="button" onClick={() => openModal(libro)} className='btn btn-outline-info btn-sm'
                    data-bs-toggle='modal' data-bs-target='#modalLibros'>
                    <i className='fa-solid fa-circle-info'></i>
                  </button>
                  <button type="button" onClick={() => setDataToEdit(libro)} className='btn btn-info btn-sm'>
                    <i className='fa-solid fa-edit'></i>
                  </button>
                  <button type="button" onClick={() => deleteData(libro.bookId)} className='btn btn-danger btn-sm'>
                    <i className='fa-solid fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id='modalLibros' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'></label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
            </div>
            <div className='modal-body'>
              <div class="card mb-15">
                <h5 class="card-header">{libro ? libro.nombre : ''}</h5>
                <div class="card-body">
                  <h5 class="card-title">ISBN {libro ? libro.isbn : ''}</h5>
                  <div>
                    <div>
                      <img src={libro ? libro.image : ''} alt="..." class="img-thumbnail"></img>
                    </div>
                    <div>
                      <p><b>Autor:</b>{libro ? libro.author:''}</p>
                      <p><b>Año publicación:</b>{libro ? libro.publicationYear:0}</p>
                      <p><b>Sinopsis:</b>{libro ? libro.synopsis:''}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setDataToEdit(libro)} data-bs-toggle='modal' data-bs-target='#modalLibros' className='btn btn-info btn-sm'>
                    <i className='fa-solid fa-edit'></i>
                  </button>
                  <button type="button" onClick={() => deleteData(libro.bookId)} className='btn btn-danger btn-sm'>
                    <i className='fa-solid fa-trash'></i>
                  </button>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const initialForm = {
  id: null,
  name: '',
  isbn: '',
};

export const AgregarLibro = ({ createData, updateData, dataToEdit, setDataToEdit, setShowComponent }) => {

  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    console.log('dataToEdit', dataToEdit)
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm)
    }
  }, [dataToEdit])

  const handleClick = (event) => {
    event.preventDefault();
    if (!form.name || !form.isbn) {
      alert("Datos incompletos");
      return;
    }
    if (form.id === null) {
      console.log('Agregar libro')
      createData(form)
    } else {
      updateData(form)
    }
    handleReset();
  }

  const handleChange = (event) => {
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
      <p class="fs-1">{dataToEdit ? "Editar libro" : "Agregar libro"}</p>
      <form onSubmit={handleClick}>
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input type="text" class="form-control" name="name" value={form.name} onChange={handleChange} aria-describedby="emailHelp"></input>
        </div>
        <div class="mb-3">
          <label class="form-label">ISBN</label>
          <input type="text" class="form-control" name="isbn" value={form.isbn} onChange={handleChange}></input>
        </div>
        <div class="mb-3">
          <label class="form-label">Autor</label>
          <input type="text" class="form-control" name="author" value={form.author} onChange={handleChange}></input>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Año publicación</label>
          <input type="number" class="form-control" name="publicationYear" value={form.publicationYear} onChange={handleChange}></input>
        </div>
        <div class="mb-3">
          <label class="form-label">Sinopsis</label>
          <input type="text" class="form-control" name="synopsis" value={form.synopsis} onChange={handleChange}></input>
        </div>
        <button type="submit" class="btn btn-primary m-2" onClick={handleClick}>{dataToEdit ? "Editar" : "Agregar"}</button>
        <button type="button" class="btn btn-outline-secondary m-2" onClick={() => setShowComponent(1)} >Cancelar</button>
      </form>
    </div>
  );
}

