const activos = 'http://198.251.74.213:10012/api/equipos';
const marcas = 'http://198.251.74.213:10012/api/equipos/marcas';
const categorias = 'http://198.251.74.213:10012/api/equipos/categorias';
const departamentos = 'http://198.251.74.213:10012/api/departamentos';

const listaEquipos = document.querySelector('.lista-equipos');
const opcionesCategoria = document.querySelector('#opciones-categoria');
const opcionesMarca = document.querySelector('#opciones-marca');
const opcionesDepartamento = document.querySelector('#opciones-departamento');

const estado = {
    status1: 'Sin Asignar',
    status2: 'Asignado/Instalado',
    status3: 'Dañado',
    status4: 'Dado de Baja'
}
// Buscador por filtros
const datosBusqueda = {
    categoria: '',
    marca: '',
    departamento: '',
}

document.addEventListener('DOMContentLoaded', () => {
    cargarEquipos();
    cargarMarcas();
    cargarCategorias();
    cargarDepartamentos();
});

const filtroCategorias = document.querySelector('#categorias');
filtroCategorias.addEventListener('change', (e) => {
    datosBusqueda.categoria = e.target.value;

})
const filtroMarcas = document.querySelector('#marcas');
filtroMarcas.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarEquipo();
})
const filtroDepartamentos = document.querySelector('#departamentos');
filtroDepartamentos.addEventListener('change', (e) => {
    datosBusqueda.departamento = e.target.value;
})
console.log(datosBusqueda);

// API Equipos
function cargarEquipos() {
    fetch(activos)
    .then(respuesta => respuesta.json())
    .then(equipos => {
        mostarEquipos(equipos);
    })
    .catch(err => console.log(err))
}

// API Departamentos
function cargarDepartamentos() {
    fetch(departamentos)
    .then(respuesta => respuesta.json())
    .then(departamentos => {
        departamentos.forEach(departamento => {
            const optDepartamento = document.createElement('option');
            optDepartamento.setAttribute('value', departamento.id);
            optDepartamento.innerHTML = `${departamento.name}`;

            opcionesDepartamento.appendChild(optDepartamento);
        })
    })
    .catch(err => console.log(err))
}

// API Categorías
function cargarCategorias() {
    fetch(categorias)
    .then(respuesta => respuesta.json())
    .then(categorias => {
        categorias.forEach(categoria => {
            const optCategoria = document.createElement('option');
            optCategoria.setAttribute('value', categoria.id);
            optCategoria.innerHTML = `${categoria.name}`;

            opcionesCategoria.appendChild(optCategoria);
        })
    })
    .catch(err => console.log(err));
}

// API Marcas
function cargarMarcas() {
    fetch(marcas)
    .then(respuesta => respuesta.json())
    .then(marcas => {
        marcas.forEach(marca => {
            const optMarca = document.createElement('option');
            optMarca.setAttribute('value', marca.id);
            optMarca.innerHTML = `${marca.name}`;

            opcionesMarca.appendChild(optMarca);
        })
    })
    .catch(err => console.log(err));
}


//Funcion para mostrar equipos
function mostarEquipos(equipos) {
    limpiarHTML();
    
    equipos.forEach(equipo => {     

            const contenido = document.createElement('DIV');
            contenido.setAttribute('id', equipo.id);
            contenido.innerHTML = ` 
            
            <div class="row">
            <div class="col s12 m6 l4">
                <div class="card grey lighten-5">
                <div class="card-content">
                    <h3>${equipo.code}</h3>
                    <span class="card-title truncate center-align">${equipo.name}</span>
                    <p id="categoria">${equipo.category_id[1]}</p>
                    <p id="departamento">${equipo.department_id[1]}</p>
                    <p id="marca" class="oculto">${equipo.x_studio_marca[1]}</p>
                    <p id="empleado" class="oculto">${equipo.employee_id[1]}</p>
                </div>
                </div>
            </div>
            </div>          
            `;

            contenido.addEventListener('click', function() {
                Swal.fire(`
                <div class="swal">
                <h3>${equipo.code}</h3>
                <h4>${equipo.name}</h3>
                <span>Categoría:</span> ${equipo.category_id[1]}
                <span>Marca:</span> ${equipo.x_studio_marca[1]}
                <span>Modelo:</span> ${equipo.model}
                <span>Serie:</span> ${equipo.serial_no}
                <input type="button" class="boton ${equipo.x_studio_selection_field_shlje}" value="${estado[equipo.x_studio_selection_field_shlje]}"">
                
                <h3>Información de uso</h3>
                <span>Asignado a:</span> ${equipo.employee_id[1]}
                <span>Departamento:</span> ${equipo.department_id[1]}
                <span>Unicación:</span> ${equipo.x_studio_ubicacion[1]}
                </div>
                `)
            });

            listaEquipos.appendChild(contenido);
        })
}

function limpiarHTML() {
    while(listaEquipos.firstChild) {
        listaEquipos.removeChild(listaEquipos.firstChild);
    }
}

function filtrarEquipo() {
    fetch(activos)
    .then(respuesta => respuesta.json())
    .then(equipos => {
        const resultado = equipos.filter( equipo => {
            if( equipo.x_studio_marca ) { 
                return equipo.x_studio_marca[0] === parseInt(datosBusqueda.marca);
            }
            return equipo;
        })
        mostarEquipos(resultado);
    })
    .catch(err => console.log(err))
}
