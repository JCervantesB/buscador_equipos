const url = 'http://198.251.74.213:10012/api/equipos';
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

const datosBusqueda = {
    categoria: '',
    marca: '',
    empleado: '',
    departamento: '',
    estado: '',
}

// Select filtro
const filtro = document.querySelector('#filtro');
filtro.addEventListener('change', (e) => {
    console.log(e.target.value);
});


// API Equipos
fetch(url)
.then(respuesta => respuesta.json())
.then(equipos => {
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
})
.catch(err => console.log(err))

// API Departamentos
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

// API Categorías
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

// API Marcas
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