// Variables básicas de la calculadora
var currentTotal = 0
var displayNumber = "0"
var previusOperator = null

// El display de la calculadora donde se da el resultado
const result = document.querySelector(".result")

/* Registrar cada click, dentro mando a una funcion para saber que tipo es, si simbolo o número. Tambien ya que el event es una tabla entonces le digo
que solo quiero el HTML */
document.querySelector('.buttonsCalculator').addEventListener("click",function(event) {
    onButtonClick(event.target.innerHTML)
});

// Funciones

function onButtonClick(input) {
    if(isNaN(parseFloat(input))){
        itsSymbol(input)
    } else {
        itsNumber(input)
    }
    refreshDisplay()
}

// Si es un número entonces que se escriba a la variable donde se muestra en pantalla
function itsNumber(input) {
    if(displayNumber == '0') {
        displayNumber = input
    } else {
        displayNumber += input
    }
}


// Si es un simbolo con un switch detecta que tipo de simbolo es y hace una funcion u otra
function itsSymbol(input) {
    switch(input.toLowerCase()) {
        case "ac":
            currentTotal = 0
            displayNumber = '0'
            previusOperator = null
            break
        case "←":
            if (displayNumber.length == 1) {
                displayNumber = '0'
            } else {
                displayNumber = displayNumber.substring(0, displayNumber.length - 1)
            }
            break
        case "%": 
            if (previusOperator) {
                return console.log("Operator NOT NULL")
            }

            displayNumber /= 100
            break
        case ".":
            if (displayNumber.indexOf(".") >= 1) {
                return console.log("Already a comma '.'")
            }
            displayNumber += input
            break
        case "=":
            if (previusOperator == null) {
                return console.log("Operator NULL")
            }

            doOperations(parseFloat(displayNumber))
            displayNumber = "" + currentTotal
            previusOperator = null
            currentTotal = 0
            break
        default:
            operations(input)
            break
    }
}


// Aquí coniverte en número en FLOAT y lo pasa para que se haga la operación
function operations(input) {
    var displayNumberFloat = parseFloat(displayNumber)
    if (currentTotal == 0) {
        currentTotal = displayNumberFloat
    } else {
        doOperations(displayNumberFloat)
    }

    previusOperator = input

    displayNumber = "0"
}


// Se hace la operación dependiendo del simbolo
function doOperations(value) {
    if (previusOperator == '+') {
        currentTotal += value
    } else if (previusOperator == '-') {
        currentTotal -= value
    } else if (previusOperator == 'x') {
        currentTotal *= value
    } else if (previusOperator == '÷') {
        currentTotal /= value
    } else {
        console.log("DEBUG: Error with value: " + value)
    }
}


// Esto es para refrescar el display cada vez que pulso un botón
function refreshDisplay() {
    result.value = displayNumber;
}
