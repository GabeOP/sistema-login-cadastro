//====Redireciona de volta caso não haja "token" no localStorage====//
const token = localStorage.getItem("token")
if(!token){
  location.replace("index.html")
}

//====Cuida da parte das informações do usuário====//
const emailUsuario = document.getElementById("emailUsuario");
const dataEmail = localStorage.getItem("email")
emailUsuario.innerHTML = `Usuário conectado com o e-mail <strong>${dataEmail}</strong>`


//====Cuida da parte do editar====//
const editaInfo = document.getElementById("editar")
editaInfo.addEventListener("click", ()=> {
  fetch("http://localhost:3000/",{
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(async res => {
    if(res.ok){
      console.log(await res.json())
      location.assign("config.html")
    }
  })
})

//====Cuida da parte do logout====//
const sair = document.getElementById("sair");

sair.addEventListener("click", ()=>{
  localStorage.clear()
  document.cookie = "token = "
  location.replace("index.html")
})