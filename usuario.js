//====Cuida da parte do logout====//
const sair = document.getElementById("sair");

sair.addEventListener("click", ()=>{
  localStorage.clear()
  location.replace("index.html")
})

if(!localStorage.getItem("token")){
  location.replace("index.html")
}

//====Cuida da parte das informações do usuário====//
const emailUsuario = document.getElementById("emailUsuario");

const email = document.cookie.replace()
emailUsuario.innerHTML = `Seu e-mail é: ${email}`