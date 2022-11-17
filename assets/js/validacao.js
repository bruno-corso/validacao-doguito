export function valida(input){ //função responsável descobrir o tipo do input que o usário está interagindo
    const tipoInput = input.dataset.tipo; //armezena o tipo do input de acordo com data-set do input que está interagindo

    if(validadores[tipoInput]){ //busca se existe o tipo de input no array 'validadores'
        validadores[tipoInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    }
    else{
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostrarMensagemDeErro(tipoInput, input);
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];

const mensagensDeErro = {
    nome:{
        valueMissing: 'O campo precisa ser preenchido.'
    },

    email:{
        valueMissing: 'O campo precisa ser preenchido.',
        typeMismatch: 'O email não é válido'
    },


    senha:{
        valueMissing: 'O campo precisa ser preenchido.',
        patternMismatch: 'A senha deve conter entre 6 e 12 caracteres, deve conter pelo menos uma letra maíuscula, um número e não deve conter símbolos.'
    },

    dataNascimento:{
        valueMissing: 'O campo precisa ser preenchido.',
        typeMismatch: 'A data não é válida',
        customError: 'Você deve ser maior que 18 anos para se cadastrar'
    },

    cpf:{
        valueMissing: 'O campo precisa ser preenchido.',
        customError: 'Este CPF não é válido'
    }
}


function mostrarMensagemDeErro(tipoDoInput, input) {
    let mensagem = '';
    
    tiposDeErro.forEach((erro)=>{
        if(input.validity[erro]){
            mensagem = mensagensDeErro[tipoDoInput][erro]
        }
    })

    return mensagem;
}

const validadores = {
    dataNascimento:input => validaDataNasc(input),
    cpf:input => ValidaCpf(input)
}

const dataNasc = document.querySelector('#nascimento'); //busca <elemento> HTML e nomeia dataNasc
// console.log(dataNasc); //exibe console o <elemento> 

dataNasc.addEventListener('blur', (event) => {
    // console.log(event);
    validaDataNasc(event.target); //chama a função validaDataNasc com o <elemento> como atributo
})

function validaDataNasc(data){
    // console.log(data)
    const dataRecebida = new Date(data.value); //converte o valor do input para uma data e armezana na const 'dataRecebida'
    // console.log(dataRecebida);
    let msg = ''; //cria variável para mensagem
    if (!verificaIdade(dataRecebida)) { //chama a funçao verificaIdade para ver se é maior que 18 como a dataRecebida como atributo
        msg = "Você deve ser maior que 18 anos.";
    } 
    // console.log(verificaIdade(dataRecebida));
    // console.log(msg);

    data.setCustomValidity(msg); //adiciona a mensagem no 'customValidity' do <elemento>
}

function verificaIdade(date){
    const dataHoje = new Date(); //joga a data atual para uma variavel
    const dataMais18 = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDay()); //adiciona 18 anos na dataRecebida como atributo

    return dataMais18 <= dataHoje; //retorna True ou False 
}

function ValidaCpf(input) {
    const CpfAjustado = input.value.replace(/\D/g, '');
    let mensagem = '';

    if(!ValidaCpfRepetido(CpfAjustado)){
        mensagem = 'Esse CPF não é válido.';
    }

    input.setCustomValidity(mensagem);
}

function ValidaCpfRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido = true;

    valoresRepetidos.forEach((a) => {
        if(a == cpf){
            cpfValido = false;
        }
    });

    return cpfValido;
}