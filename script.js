let altura= window.innerHeight
let largura= window.innerWidth

function ajustarTamanhoPalco(){
    let altura= window.innerHeight
    let largura= window.innerWidth
}

ajustarTamanhoPalco()

window.addEventListener('resize',ajustarTamanhoPalco)


//script selecionar nivel
let select= document.getElementById('selecionarNivel')
let botaoIniciar= document.getElementById('iniciar')

select.addEventListener('change',function(){
    if(select.value!='Selecione o nível de dificuldade'){
        botaoIniciar.removeAttribute('disabled')
        botaoIniciar.addEventListener('click', iniciar)
    }
})


let intervalo;
let cronometro;
let tempo= 20

//script selecionar dificuldade e iniciar jogo
let painel= document.getElementById('painel')
let painelInicial= document.getElementById('painelInicial')

function iniciar(){
    painel.classList.remove('d-none')
    painelInicial.classList.add('d-none')

    clearInterval(intervalo);
    clearInterval(cronometro);

    if(select.value=='facil'){
        intervalo =setInterval(posicaoRandom, 1300)
        tempo=20
        cronometro= setInterval(contagemRegresiva,1000)
    }
    else if(select.value=='medio'){
        intervalo =setInterval(posicaoRandom, 1000)
        tempo=30
        cronometro= setInterval(contagemRegresiva,1000)
    }
    else if(select.value=='dificil'){
        intervalo =setInterval(posicaoRandom, 800)
        tempo=30
        cronometro= setInterval(contagemRegresiva,1000)
    }
}


//defina e posiçao do mosquito aleatoriamente
function posicaoRandom(){
    let coracoesCheio=document.querySelectorAll('.coracao_cheio')
    if (document.querySelectorAll('#mosquito').length>0){
        if(document.querySelector('#mosquito').classList.contains('morto')){
            document.querySelector('#mosquito').remove()
        }
        else{
            if(coracoesCheio.length>0){
                document.querySelector('#mosquito').remove()
                coracoesCheio[coracoesCheio.length - 1].setAttribute('src', 'img/coracao_vazio.png')
                coracoesCheio[coracoesCheio.length-1].classList.remove('coracao_cheio')
            }
            else{
                document.getElementById('mosquito').removeEventListener('click',matarMosquito)
                clearInterval(intervalo)
                window.location.href='gameOver.html'
            }
        }
    }
    else{
        let posicaox= Math.floor(Math.random()* largura)-90 // gera numero em um intervalo de 0 ate a largura do navegador
    let posicaoy= Math.floor(Math.random() * altura)-90 // gera numero em um intervalo de 0 ate a altura do navegador

    posicaox =posicaox <0 ? 0: posicaox
    posicaoy = posicaoy<0 ? 0: posicaoy

    //adicionar novos mosquito
    let newmosquito=document.createElement('img')
    newmosquito.src='img/mosca.png'
    newmosquito.classList.add(`mosquito${tamanhoAleatorio()}`)
    newmosquito.classList.add(`${ladoAleatorio()}`)
    newmosquito.style.left=posicaox+'px'
    newmosquito.style.top=posicaoy+'px'
    newmosquito.id='mosquito'
    newmosquito.addEventListener('click',matarMosquito)
    document.body.appendChild(newmosquito)
    }
}



//script para definir o tamanho do mosquito
function tamanhoAleatorio(){
    let classe= Math.ceil(Math.random()*3)
    return classe
}


//script para o lado em que o mosquitovai estar virado
function ladoAleatorio(){
    let lado= Math.ceil(Math.random()*2)

    switch(lado){
        case  1 :
            return 'ladoA'
        case 2:
            return 'ladoB'
    }
}


//script matar o mosquito
function matarMosquito(){
    document.querySelector('#mosquito').src='img/splash.png'
    document.querySelector('#mosquito').classList.add('morto')
}



//script cronometro
let elementoCronometro=document.getElementById('cronometro')
function contagemRegresiva(){
    if(tempo>=1){
        tempo--
    }
    else{
        clearInterval(cronometro);
        window.location.href='gameWin.html'
    }
    elementoCronometro.innerHTML=tempo
}
