let listaNumerosSorteados = [];
let numeroLimite = 10;
let tentativas = 1;

const exibirTextoNaTela = function(tag, texto) {
    document.querySelector(tag).innerHTML=texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.25});
}

const exibirMensagemInicial = function() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

const gerarNumeroAleatorio = function() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeNumerosNaLista = listaNumerosSorteados.length;

    quantidadeNumerosNaLista == numeroLimite ? listaNumerosSorteados = [] : null;

    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

const checarChute = function() {
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('h1', 'Parabéns!');
        exibirTextoNaTela('p', `Você Descobriu o Número Secreto com ${tentativas} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('h1', 'Não foi desta vez!');
            exibirTextoNaTela('p', `O número secreto é menor do que ${chute}...`);
        } else {
            exibirTextoNaTela('h1', 'Não foi desta vez!');
            exibirTextoNaTela('p', `O número secreto é maior do que ${chute}...`);
        }
        tentativas++;
        limparCampo();
    }
}

const limparCampo = function() {
    chute = document.querySelector('input').value = '';
}

const reiniciarJogo = function() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();

    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

exibirMensagemInicial();

let numeroSecreto = gerarNumeroAleatorio();


