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

    promisse.then(pegarMensagens)
    promisse.catch(corrigirErro)
}


function corrigirErro(error){    
    if(error.response.status === 400)    
        nome = prompt("Já existe usuário com esse nome. Informe outro");      
        pegarNomes()
}

function verificação(){
    const nomeUser = {
        name: nome
    }
    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nomeUser)
    // promisse.catch(pegarNomes)
}

setInterval(verificação, 5000)

function pegarMensagens(){
    const promisse = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promisse.then(carregarMsg)    
}

setInterval(pegarMensagens, 3000)

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
        if(mensagens[i].type ==="private_message" && mensagens[i].to === nome){            
            ulMensagens.innerHTML += `
            <li class = "msgReservada">
                (${mensagens[i].time}) <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> ${mensagens[i].text}
            </li>`           
        }
        //if(mensagem[i].to === nome){            
        //     ulMensagens.innerHTML += `
        //     <li class = "msgReservada">
        //         (${mensagens[i].time}) <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> ${mensagens[i].text}
        //     </li>`           
        // }
    
        if(mensagens[i].type ==="message"){
            ulMensagens.innerHTML += `
        <li class = "msgNormal">
            (${mensagens[i].time}) <strong>${mensagens[i].from}</strong> para <strong>${mensagens[i].to}</strong> ${mensagens[i].text}
        </li>`
        }             
    }
    ulMensagens.lastChild.scrollIntoView()
}

function adicionarMensagem(){
    const msg = document.querySelector(".txtEscrever").value    
    
    const novaMsg = {       
        from: nome,
	    to: "Todos",
	    text: msg,
	    type: "message"
    }
    // console.log(novaMsg)
    const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", novaMsg)

    promisse.then(pegarMensagens)
    
    const caixa = document.querySelector(".txtEscrever").innerHTML
    caixa.innerHTML = ""
}









