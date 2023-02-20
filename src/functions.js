import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Libros from './libros.json'

var libros = new Array()

export function show_alert(mensaje,icono,foco=''){
    onfocus(foco)
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:mensaje,
        icon:icono
    });
}

function onfocus(foco){
    if(foco !== ''){
        document.getElementById(foco).focus();
    }
}

export function inicializar() {
    libros=Libros
    console.log('header', libros)
}

export function getLibrosDb(){
    console.log('functions',libros)
    return libros
}

export function agregarLibroDb(libro){
    console.log('functions',libro)
    libros.push(libro)
    console.log('functions2',libros)
    return libros
}