console.log("Script cargado!");

// Definir el objeto para almacenar respuestas
let respuestasUsuario = {
    pregunta1: '',
    pregunta2: [],  // Array para pregunta 2 que permite múltiples respuestas
    pregunta3: ''
};

document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('aceptoTerminos');
    const btnComenzar = document.getElementById('btnComenzar');
    const acordeonBtn = document.querySelector('.acordeon-btn');
    const contenido = document.querySelector('.terminos-contenido');
    
    // Evento del checkbox
    checkbox.addEventListener('change', function() {
        btnComenzar.disabled = !this.checked;
    });

    // Evento del acordeón (separado del checkbox)
    acordeonBtn.addEventListener('click', function() {
        contenido.classList.toggle('activo');
        // Cambiar la flecha según el estado
        if (contenido.classList.contains('activo')) {
            acordeonBtn.textContent = 'Términos de participación ▼';
        } else {
            acordeonBtn.textContent = 'Términos de participación ▶';
        }
    });
});

// Funciones auxiliares para mostrar/ocultar pantallas
function mostrarPantalla(id) {
    document.getElementById(id).classList.add('activo');
}

function ocultarPantalla(id) {
    document.getElementById(id).classList.remove('activo');
}

// Función para empezar el cuestionario
function empezarCuestionario() {
    ocultarPantalla('bienvenida');
    mostrarPantalla('pregunta1');
}

// Función para seleccionar una opción
function seleccionarOpcion(numPregunta, opcion, event) {
    event = event || window.event;
    
    // Manejo especial para la pregunta 2 que permite múltiples respuestas
    if (numPregunta === 2) {
        if (!respuestasUsuario.pregunta2.includes(opcion)) {
            respuestasUsuario.pregunta2.push(opcion);
        } else {
            // Si ya está seleccionada, la quitamos
            respuestasUsuario.pregunta2 = respuestasUsuario.pregunta2.filter(r => r !== opcion);
        }
    } else {
        // Para preguntas 1 y 3, solo una respuesta
        respuestasUsuario[`pregunta${numPregunta}`] = opcion;
    }
    
    // Habilitar el botón siguiente/finalizar
    document.getElementById('btn' + numPregunta).disabled = false;
    
    // Resaltar opciones seleccionadas
    const opciones = document.querySelectorAll(`#pregunta${numPregunta} .opcion`);
    if (numPregunta === 2) {
        // Para pregunta 2, múltiples selecciones
        event.target.style.background = event.target.style.background === 'rgb(102, 126, 234)' ? '#f8f9fa' : '#667eea';
        event.target.style.color = event.target.style.color === 'rgb(255, 255, 255)' ? '#333' : 'white';
    } else {
        // Para preguntas 1 y 3, una sola selección
        opciones.forEach(op => {
            op.style.background = '#f8f9fa';
            op.style.color = '#333';
        });
        event.target.style.background = '#667eea';
        event.target.style.color = 'white';
    }
}

// Función para ir a la siguiente pregunta
function siguientePregunta(preguntaActual) {
    ocultarPantalla('pregunta' + preguntaActual);
    mostrarPantalla('pregunta' + (preguntaActual + 1));
}

// Reemplaza la función finalizarCuestionario() actual con esta versión simplificada
function finalizarCuestionario() {
    ocultarPantalla('pregunta3');
    mostrarPantalla('resultados');
    
    // Mostrar resultados en la consola
    console.log('Respuestas del usuario:');
    console.log('Pregunta 1:', respuestasUsuario.pregunta1);
    console.log('Pregunta 2:', respuestasUsuario.pregunta2);
    console.log('Pregunta 3:', respuestasUsuario.pregunta3);
}

// Función para reiniciar el cuestionario
function reiniciarCuestionario() {
    // Resetear las respuestas
    respuestasUsuario = {
        pregunta1: '',
        pregunta2: [],
        pregunta3: ''
    };
    
    // Resetear estilos de opciones
    document.querySelectorAll('.opcion').forEach(opcion => {
        opcion.style.background = '#f8f9fa';
        opcion.style.color = '#333';
    });
    
    // Deshabilitar botones
    document.querySelectorAll('.boton').forEach(boton => {
        if (boton.id !== 'btnComenzar') {
            boton.disabled = true;
        }
    });
    
    // Mostrar pantalla inicial
    document.querySelectorAll('.pantalla').forEach(pantalla => {
        pantalla.classList.remove('activo');
    });
    document.getElementById('bienvenida').classList.add('activo');
}
