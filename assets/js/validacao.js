export function valida(input){ //função responsável descobrir o tipo do input que o usário está interagindo
    const tipoInput = input.dataset.tipo; //armezena o tipo do input de acordo com data-set do input que está interagindo
    console.log(tipoInput);

    if(validadores[tipoInput]){ //busca se existe o tipo de input no array 'validadores'
        validadores[tipoInput](input);
        console.log(validadores[tipoInput](input));
        console.log(validadores[tipoInput]);

    }
}

const validadores = {
    dataNascimento:input => validaDataNasc(input),

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
    console.log(verificaIdade(dataRecebida));
    console.log(msg);

    data.setCustomValidity(msg); //adiciona a mensagem no 'customValidity' do <elemento>
}

function verificaIdade(date){
    const dataHoje = new Date(); //joga a data atual para uma variavel
    const dataMais18 = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDay()); //adiciona 18 anos na dataRecebida como atributo

    return dataMais18 <= dataHoje; //retorna True ou False 
}