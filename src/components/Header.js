import './Header.css';

function Header() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Biblioteca</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/libros">Libros</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/usuarios">Usuarios</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/prestamos">Prestamos</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
