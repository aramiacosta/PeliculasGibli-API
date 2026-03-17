//DOM
const contenedorPeliculas = document.getElementById('contenedorPeliculas')
const urlPeliculas = 'https://ghibliapi.vercel.app/films'

function cargarPeliculas() {
    fetch(urlPeliculas)
        .then(respuesta => respuesta.json())
        .then(datos => {
            contenedorPeliculas.innerHTML = ""
            datos.forEach(pelicula => {
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
                </div>`
            })
        })
}

cargarPeliculas()