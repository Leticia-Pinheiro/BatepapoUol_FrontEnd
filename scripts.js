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
    alert("ok")
    // pegarMensagens()
}

function corrigirErro(error){    
    if(error.response.status === 400)    
        nome = prompt("Já existe usuário com esse nome. Informe outro");      
        pegarNomes()
}









