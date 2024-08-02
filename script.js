// Función para borrar la pantalla de la calculadora
// Esta función limpia el contenido del campo de texto 'pantalla'
function borrarPantalla() {
    document.getElementById('pantalla').value = '';
}

// Función para añadir valores a la pantalla de la calculadora
// Esta función añade el valor pasado como argumento al campo de texto 'pantalla'
function añadirPantalla(valor) {
    document.getElementById('pantalla').value += valor;
}

// Función para calcular el resultado de la expresión en la pantalla
// Esta función evalúa la expresión matemática ingresada y muestra el resultado en 'pantalla'
// Además, maneja la conversión de operadores especiales como la raíz cuadrada y la potencia
function calcular() {
    const pantalla = document.getElementById('pantalla');
    let expresion = pantalla.value;

    // Verificar si la expresión está vacía para evitar errores de evaluación
    if (expresion.trim() === '') {
        return;
    }

    // Reemplaza la raíz cuadrada (√) con la función correspondiente de JavaScript (Math.sqrt)
    expresion = expresion.replace(/√/g, 'Math.sqrt');
    // Reemplaza el exponente (^) con el operador de potencia de JavaScript (**)
    expresion = expresion.replace(/\^/g, '**');

    try {
        // Calcula el resultado de la expresión usando eval
        const resultado = eval(expresion);
        // Muestra el resultado en la pantalla
        pantalla.value = resultado;
        // Agrega la operación y el resultado al historial de cálculos
        añadirAlHistorial(`${expresion} = ${resultado}`);
    } catch (error) {
        // Muestra un mensaje de error en la pantalla si la evaluación falla
        pantalla.value = 'Error';
    }
}

// Función para agregar una entrada al historial
// Esta función añade la entrada proporcionada como un nuevo elemento en la lista del historial
function añadirAlHistorial(entrada) {
    const listaHistorial = document.getElementById('historial');
    const elementoLista = document.createElement('li');
    // Establece el texto del nuevo elemento de la lista
    elementoLista.textContent = entrada;
    // Agrega el nuevo elemento al final de la lista del historial
    listaHistorial.appendChild(elementoLista);
}

// Función para borrar el historial de cálculos
// Esta función limpia todos los elementos de la lista del historial
function borrarHistorial() {
    const listaHistorial = document.getElementById('historial');
    // Elimina todo el contenido de la lista del historial
    listaHistorial.innerHTML = '';
}

// Función para manejar las entradas del teclado
// Esta función permite el uso del teclado para interactuar con la calculadora
function manejarTeclado(event) {
    const tecla = event.key;
    const pantalla = document.getElementById('pantalla');

    // Mapa de teclas a sus correspondientes valores en la calculadora
    const teclasValores = {
        'Enter': '=',
        'Backspace': 'borrar',
        'Delete': 'borrar',
        'Escape': 'borrar',
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '.': '.',
        '/': '/',
        '*': '*',
        '-': '-',
        '+': '+',
        '^': '^',
        '√': '√'
    };

    // Verifica si la tecla presionada está en el mapa de teclas
    if (teclasValores[tecla] !== undefined) {
        if (tecla === 'Enter') {
            // Calcula el resultado si se presiona Enter
            calcular();
        } else if (tecla === 'Backspace') {
            // Elimina el último carácter de la pantalla si se presiona Backspace
            pantalla.value = pantalla.value.slice(0, -1);
        } else if (tecla === 'Delete' || tecla === 'Escape') {
            // Borra la pantalla si se presiona Delete o Escape
            borrarPantalla();
        } else {
            // Añade el valor correspondiente a la pantalla
            añadirPantalla(teclasValores[tecla]);
        }
    }
}

// Añade un manejador de eventos para capturar las teclas presionadas
document.addEventListener('keydown', manejarTeclado);
