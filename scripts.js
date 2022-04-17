// const promisseEntrar = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants ")
// const promisseMConexao = axios.get("https://mock-api.driven.com.br/api/v6/uol/status")
// const promisseBuscarMsg = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
// const promisseEnviarMsg = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
let nomes = []
let mensagens = []
let nome = prompt("Qual o seu nome?")

pegarNomes();

function pegarNomes(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    promisse.then(carregarNomes)    
}

function carregarNomes(response){
    nomes = response.data
    adicionarNome()
}

function adicionarNome(){      
    const novoNome = {
        name: nome
    }
    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", novoNome)

    promisse.then(ok)
    promisse.catch(corrigirErro)
}

function ok(){    
    pegarMensagens()
}

function corrigirErro(error){    
    if(error.response.status === 400)    
        nome = prompt("Já existe usuário com esse nome. Informe outro");      
        pegarNomes()
}

function pegarMensagens(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promisse.then(carregarMsg)    
}

function carregarMsg(response){
    mensagens = response.data
    renderizarMsg()
}

function renderizarMsg(){
    const ulMensagens = document.querySelector(".mensagens")
    ulMensagens.innerHTML = ""

    for (i=0; i<mensagens.length; i++){
        if(mensagens[i].type ==="status"){
            ulMensagens.innerHTML += `
        <li class = "msgStatus">
            (${mensagens[i].time}) <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> ${mensagens[i].text}
        </li>`
        }
        if(mensagens[i].type ==="private_message"){
            ulMensagens.innerHTML += `
        <li class = "msgReservada">
            (${mensagens[i].time}) <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> ${mensagens[i].text}
        </li>`
        }

        if(mensagens[i].type ==="message"){
            ulMensagens.innerHTML += `
        <li class = "msgNormal">
            (${mensagens[i].time}) <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> ${mensagens[i].text}
        </li>`
        }
                
    }
}







