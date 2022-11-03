import {valida} from './validacao.js'

const inputs = document.querySelectorAll('input'); //captura todos os inputs do formulário
// console.log(inputs);

inputs.forEach(input => {
    input.addEventListener('blur', (event) => { 
        valida(event.target);
    }) // para cada input do form, quando perder o foco, chamar a função valida com o <elemento> do input como atibuto
})