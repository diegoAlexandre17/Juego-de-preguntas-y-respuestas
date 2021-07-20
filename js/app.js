const preguntasContainer = document.querySelector('.preguntas-container'),
    btnEnviar = document.querySelector('button'),
    template = document.querySelector('#template').content,
    fragment = document.createDocumentFragment();

let contador = 0;
let respuestasCorrectas = 0;
let respuestasIncorrectas = 0;


const preguntas = [
    {
        id: 1,
        pregunta: '¿Quien gano el mundial 2014?',
        opciones: ['Alemania', 'España', 'Francia'],
        respuesta: 'a',
        img: 'img/mundial-2014.jpg'
    },
    {
        id: 2,
        pregunta: '¿Quien gano la Eurocopa del 2016?',
        opciones: ['Francia', 'Portugal', 'Holanda'],
        respuesta: 'b',
        img: 'img/eurocopa.png'
    },
    {
        id: 3,
        pregunta: '¿Que equipo es el mayor ganador de la champions?',
        opciones: ['Barcelona', 'Real Madrid', 'AC Milan'],
        respuesta: 'b',
        img: 'img/champions.png'
    }
];

/* -----FUNCIONES----- */

const pintarPreguntas = (numeroDePregunta) => {

    const clone = template.cloneNode(true);

    clone.querySelector('#titulo-pregunta').innerHTML = preguntas[numeroDePregunta].pregunta;

    clone.querySelector('img').src = preguntas[numeroDePregunta].img

    clone.querySelector('#a').innerHTML += preguntas[numeroDePregunta].opciones[0];

    clone.querySelector('#b').innerHTML += preguntas[numeroDePregunta].opciones[1];

    clone.querySelector('#c').innerHTML += preguntas[numeroDePregunta].opciones[2];


    fragment.appendChild(clone);

    preguntasContainer.appendChild(fragment)

};

const validarFinalDelJuego = () => {
    if (contador >= preguntas.length) {
        /*         preguntasContainer.innerHTML = `<div class='animacion'>Se termino el juego!! Acertaste ${respuestasCorrectas} preguntas y no acertaste ${respuestasIncorrectas}!</div>`; */

        const h2Result = document.createElement('h2');

        h2Result.textContent = `Se termino el juego!! Acertaste ${respuestasCorrectas} preguntas y no acertaste ${respuestasIncorrectas} !`;

        h2Result.classList.add('h2Result');

        preguntasContainer.appendChild(h2Result);

        document.querySelector('button').style.display = 'none';
    } else {
        pintarPreguntas(contador);
    }
};

const validarRespuesta = () => {

    let respuestaCorrecta = document.querySelector(`#${preguntas[contador].respuesta}`);

    if (respuestaCorrecta.querySelector('input').checked) {
        respuestasCorrectas++;
        preguntasContainer.innerHTML = '';
        contador++;
        validarFinalDelJuego();
    } else {
        respuestasIncorrectas++;
        preguntasContainer.innerHTML = '';
        contador++;
        validarFinalDelJuego()
    }
};

const marcarRespSeleccionada = (e) => {
    const respuestas = document.querySelectorAll('.label')
    respuestas.forEach(item => {
        if (item.matches('.toggle-label')) {
            item.classList.remove('toggle-label')
        }
    })

    e.target.classList.add('toggle-label');
}

/* ----------------------- */

pintarPreguntas(contador);

btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();

    validarRespuesta();
});


preguntasContainer.addEventListener('click', (e) => {
    if (e.target.matches('.label')) {
        marcarRespSeleccionada(e)
    }
});