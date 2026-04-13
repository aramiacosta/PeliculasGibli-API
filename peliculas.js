//DOM
const contenedorPeliculas = document.getElementById('contenedorPeliculas')
const urlPeliculas = 'https://ghibliapi.vercel.app/films'

//Boton Búsqueda
const inputBuscar = document.getElementById('textoBuscar')
const botonBuscar = document.getElementById('botonBuscar')

//Boton Favoritos
const contenedorFavoritas = document.getElementById('contenedorFavoritas');
let peliculasFavoritas = [];

//Recuperación de favoritas
const favoritasGuardadas = localStorage.getItem("favoritas");
if (favoritasGuardadas) {
    peliculasFavoritas = JSON.parse(favoritasGuardadas);
}

//Función mostrar favoritas
function mostrarFavoritas() {
    contenedorFavoritas.innerHTML = "";

    if (peliculasFavoritas.length === 0) {
        contenedorFavoritas.innerHTML = "<p>No tienes películas en tu lista.</p>";
        return;
    }

    peliculasFavoritas.forEach(pelicula => {
        contenedorFavoritas.innerHTML += `
        <div class="card bg-black text-white border-danger shadow h-100" style="width: 18rem;">
            <img src="${pelicula.imagen}" class="card-img-top" alt="${pelicula.titulo}" style="height: 350px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-danger">${pelicula.titulo}</h5>
                <p class="card-text">
                    <strong>Director:</strong> ${pelicula.director} <br>
                    <strong>Año:</strong> ${pelicula.anio} <br>
                    <strong>Puntuación:</strong> ${pelicula.puntuacion}/100
                </p>
                <div class="mt-auto d-flex">
                    <button class="btn btn-secondary flex-fill" onclick="eliminarFavorita('${pelicula.id}')">Quitar de mi lista</button>
                </div>
            </div>
        </div>`;
    });
}

//Función Guardar y eliminar en Favoritos
function guardarFavorita(id, titulo, imagen, director, anio, puntuacion) {
    // Comprueba si la película ya está en el array
    const yaExiste = peliculasFavoritas.some((pelicula) => pelicula.id === id);

    if (!yaExiste) {
        // Si no existe, la añade al array
        peliculasFavoritas.push({
            id: id,
            titulo: titulo,
            imagen: imagen,
            director: director,
            anio: anio,
            puntuacion: puntuacion
        });

        // Guarda el array actualizado en localStorage y la actualiza
        localStorage.setItem("favoritas", JSON.stringify(peliculasFavoritas));
        mostrarFavoritas();
    }
}

function eliminarFavorita(id) {
    // Filtra el array quitando la que coincida con el ID
    peliculasFavoritas = peliculasFavoritas.filter((pelicula) => pelicula.id !== id);
    // Guarda el nuevo array y lo actualiza
    localStorage.setItem("favoritas", JSON.stringify(peliculasFavoritas));
    mostrarFavoritas();
}

//Función exclusiva para mostrar las tarjetas
function mostrarPeliculas(arrayPeliculas) {
    contenedorPeliculas.innerHTML = ""
    //Si la busqueda no coincide sale el mensaje
    if(arrayPeliculas.length === 0){
        contenedorPeliculas.innerHTML = "<p class='text-white'>No se han encontrado películas con ese título.</p>"
        return;
    }

    // Recorre el array y crea el HTML
    arrayPeliculas.forEach(pelicula => {

        //Limpiar el título de las comillas
        const tituloBueno = pelicula.title.replace(/'/g, "\\'");

        contenedorPeliculas.innerHTML += `
        <div class="card text-white border-secondary h-100" style="width: 18rem;">
            <img src="${pelicula.image}" class="card-img-top" alt="${pelicula.title}" style="height: 350px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title text-danger">${pelicula.title}</h5>
                <p class="card-text">
                    <strong>Director:</strong> ${pelicula.director} <br>
                    <strong>Año:</strong> ${pelicula.release_date} <br>
                    <strong>Puntuación:</strong> ${pelicula.rt_score}/100
                </p>

                <div class="mt-auto d-flex">
                    <button class="btn btn-danger flex-fill fw-bold" 
                    onclick="guardarFavorita('${pelicula.id}', '${tituloBueno}', '${pelicula.image}', '${pelicula.director}', '${pelicula.release_date}', '${pelicula.rt_score}')">
                        + Añadir a Favoritas
                    </button>
                </div>
            </div>
        </div>`
    })
}

//Cargar todas las peliculas
function cargarPeliculas() {
    fetch(urlPeliculas)
        .then(respuesta => respuesta.json())
        .then(datos =>{
            mostrarPeliculas(datos) //Llamada a la funcion de las tarjetas
        })
            
                
}

//Funcion de filtrado de peliculas por titulo
function buscarPelicula(termino) {
    fetch(urlPeliculas)
        .then(respuesta => respuesta.json())
        .then(datos => {
            // Filtrado del array ignorando mayúsculas
            const peliculasFiltradas = datos.filter(pelicula => 
                pelicula.title.toLowerCase().includes(termino.toLowerCase())
            )
            
            mostrarPeliculas(peliculasFiltradas); // Se muestran solo las filtradas
        })
}

//Inicio de carga página
mostrarFavoritas()
cargarPeliculas()

botonBuscar.addEventListener('click', ()=>{
    const termino = inputBuscar.value
    buscarPelicula(termino)
})
