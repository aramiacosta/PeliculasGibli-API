//DOM
const contenedorPeliculas = document.getElementById('contenedorPeliculas')
const urlPeliculas = 'https://ghibliapi.vercel.app/films'

//Boton Búsqueda
const inputBuscar = document.getElementById('textoBuscar')
const botonBuscar = document.getElementById('botonBuscar')

//Función exclusiva para mostrar las tarjetas
function mostrarPeliculas(arrayPeliculas) {
    contenedorPeliculas.innerHTML = ""
    //Si la busqueda no coincide sale el mensaje
    if(arrayPeliculas.length === 0){
        contenedorPeliculas.innerHTML = "<p>No se han encontrado películas con ese título.</p>"
        return;
    }

    // Recorre el array y crea el HTML
    arrayPeliculas.forEach(pelicula => {
        contenedorPeliculas.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${pelicula.image}" class="card-img-top" alt="${pelicula.title}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${pelicula.title}</h5>
                <p class="card-text">
                    <strong>Director:</strong> ${pelicula.director} <br>
                    <strong>Año:</strong> ${pelicula.release_date} <br>
                    <strong>Puntuación:</strong> ${pelicula.rt_score}/100
                </p>
            </div>
        </div>`;
    });
}

//Cargar todas las peliculas
function cargarPeliculas() {
    fetch(urlPeliculas)
        .then(respuesta => respuesta.json())
        .then(datos =>{
            mostrarPeliculas(datos) //Llamada a la funcion de las tarjetas
        })
            
                
}

//funcion de filtrado de peliculas por titulo
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

cargarPeliculas()

botonBuscar.addEventListener('click', ()=>{
    const termino = inputBuscar.value
    buscarPelicula(termino)
})
