//====Redireciona de volta caso não haja "token" no localStorage====//
const token = localStorage.getItem("token")
if(!token){
  location.replace("index.html")
}

//====Cuida da parte das informações do usuário====//
const emailUsuario = document.getElementById("emailUsuario");
const dataEmail = localStorage.getItem("email")
emailUsuario.innerHTML = `Usuário conectado com o e-mail <strong>${dataEmail}</strong>`


//====Cuida da parte de POSTS====//
const wrapNoticias = document.getElementById("wrapNoticias");
const noticias = document.getElementById("noticias");
const noticia = document.getElementById("noticia");

fetch("http://localhost:3000/noticia",{
  method: "GET",
  headers:{
    "Authorization": `Bearer ${token}`
  }
}).then(async res=>{
  const postagens = await res.json();

  if(postagens.resultado.length === 0){
    const semConteudoWrap = document.getElementById("semConteudoWrap");
    semConteudoWrap.style.display = "block"
  }
  postagens.resultado.forEach(item=>{

    //Cria uma nested div para cada elemento e cria também elementos dentro
    const div = document.createElement("div")
    div.setAttribute("id", "noticia")
    
    const criaNoticias = noticias.appendChild(div);
    const img = document.createElement("div");
    const p = document.createElement("p");

    img.setAttribute("id", "imgNoticia")
    p.setAttribute("id", "tituloNoticia")
    criaNoticias.appendChild(img)
    criaNoticias.appendChild(p)

    p.innerHTML = (item.titulo)   
  })
})

//====Cuida da parte do dashboard====//
const dashboard = document.getElementById("dashboard")
dashboard.addEventListener("click", ()=>{
  location.assign("novaNoticia.html")
})

//====Cuida da parte do logout====//
const sair = document.getElementById("sair");

sair.addEventListener("click", ()=>{
  localStorage.clear()
  document.cookie = "token = "
  location.replace("index.html")
})