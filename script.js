const formulario = document.getElementById("formBusqueda");

formulario.addEventListener("submit", function (event) { //en cuanto submit, la funcion event va a...
    event.preventDefault(); //Esto es para que no se recargue la pag
    const texto = document.getElementById("busqueda").value;
    console.log("Busqueda: ", texto);
});

const collapses = document.querySelectorAll(".collapse");

collapses.forEach(collapse => { //por cada collapse...

    const boton = document.querySelector(
        `[href="#${collapse.id}"]`
    );

    collapse.addEventListener("show.bs.collapse", function () { //aqui cuando la abre 
        boton.textContent = "Ocultar"; //en cuanto la abre cambia a "Ocultar"
    });

    collapse.addEventListener("hide.bs.collapse", function () { //aqui cuando la cierra
        boton.textContent = "Leer más";
    });

});
//Para cada sinopsis busca la clase collapse, cuando se abre la sinopsis el texto cambia a ocultar y cuando se cierra cambia a Leer más


// LOGIN / LOGOUT 

// Referencias a los contenedores
const loginContainer = document.getElementById("loginContainer");
const appContainer = document.getElementById("appContainer");

// Referencias al formulario y sus campos
const formLogin = document.getElementById("formLogin");
const inputUsuario = document.getElementById("usuario");
const inputContrasenia = document.getElementById("contrasenia");
const loginError = document.getElementById("loginError");

// alerta de validacion 
const modalAlertaEl = document.getElementById("modalAlerta");
const modalAlertaBody = document.getElementById("modalAlertaBody");
const modalAlerta = new bootstrap.Modal(modalAlertaEl);

// Credenciales
const USUARIO_VALIDO = "admin";
const CONTRASENIA_VALIDA = "12345";

// Funcion para mostrar el modal de alerta
function mostrarAlerta(mensaje) {
    modalAlertaBody.textContent = mensaje;
    modalAlerta.show();
}

formLogin.addEventListener("submit", function (event) {
    event.preventDefault(); //para que no se recargue la pag

    const usuario = inputUsuario.value.trim();
    const contrasenia = inputContrasenia.value.trim();

    // Ocultar mensaje de error previo
    loginError.classList.add("d-none");
    loginError.textContent = "";

    // Validacion de campos vacios 
    if (usuario === "" && contrasenia === "") {
        mostrarAlerta("Debes completar el Usuario y la Contraseña para continuar.");
        return;
    }

    if (usuario === "") {
        mostrarAlerta("El campo Usuario / Correo electrónico es obligatorio.");
        return;
    }

    if (contrasenia === "") {
        mostrarAlerta("El campo Contraseña es obligatorio.");
        return;
    }

    // Aqui la validacion de credenciales
    if (usuario === USUARIO_VALIDO && contrasenia === CONTRASENIA_VALIDA) {

        // Credenciales correctas
        loginContainer.style.display = "none";
        appContainer.style.display = "block";

        // Limpiar los campos
        inputUsuario.value = "";
        inputContrasenia.value = "";

    } else {
        // Credenciales incorrectas
        loginError.textContent = "Usuario o contraseña incorrectos. Inténtalo de nuevo.";
        loginError.classList.remove("d-none");
    }
});


// Cerrar sesion 

const btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", function () {

    // Revertir el estado de la pantalla
    appContainer.style.display = "none";
    loginContainer.style.display = "block";

    // Limpiar campos del login
    inputUsuario.value = "";
    inputContrasenia.value = "";
    loginError.classList.add("d-none");
    loginError.textContent = "";
});


const API_URL = "http://127.0.0.1:8000";

// Funcion para cargar los animes
async function cargarAnimes() {
    try {
        const respuesta = await fetch(`${API_URL}/animes`);

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener la lista de animes");
        }

        const animes = await respuesta.json();
        const contenedor = document.getElementById("contenedorAnimes");

        contenedor.innerHTML = animes.map(anime => `
            <div class="col-12 col-lg-3">
                <div class="card h-100">
                    <a href="/Paginashtml/${anime.slug}.html?id=${anime.id}">
                        <img src="${anime.imagen}" class="card-img-top" alt="${anime.titulo}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${anime.titulo}</h5>
                        <p class="card-text">
                            ${anime.sinopsis_corta}
                            <a class="text-primary" data-bs-toggle="collapse" href="#sinopsis${anime.id}" role="button">
                                Leer más
                            </a>
                        </p>
                        <div class="collapse mt-3" id="sinopsis${anime.id}">
                            <div class="card card-body">
                                ${anime.sinopsis_larga}
                            </div>
                        </div>
                        <a href="/Paginashtml/${anime.slug}.html?id=${anime.id}" class="btn btn-danger mt-3">Ver ahora</a>
                    </div>
                </div>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error al cargar los animes:", error);
    }
}

cargarAnimes();