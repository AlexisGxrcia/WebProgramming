const calculate  = (num1, num2, type) => {
    switch(type) {
        case 'suma':
            return num1 + num2;
        case 'resta':
            return num1 - num2;
        case 'multiplicacion':
            return num1 * num2;
        case 'division':
            return (num2 !== 0) ? num1 / num2 : 'No puedes dividir entre 0 ';
        default:
            return 'No seleccionaste ningun tipo valido';
    }
}

const numbers = [Number.parseInt(prompt('Ingrese el primer numero')), Number.parseInt(prompt('Ingrese el segundo numero'))];
const type = prompt('Ingrese el tipo\n- suma\n- resta\n- multiplicacion\n- division', 'suma');
const result = calculate(numbers[0], numbers[1], type);

console.log(result)
document.write(result)