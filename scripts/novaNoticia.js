const token = localStorage.getItem("token")
if(!token){
  location.replace("index.html")
}

const titulo = document.getElementById("titulo");
const criarNoticia = document.getElementById("criarNoticia");
const formNoticia = document.getElementById("formNoticia");

fetch("http://localhost:3000/noticia", {
  method: "GET",
}).then(async (res) => {
  const noticias = await res.json();
  const listaNoticias = document.getElementById("listaNoticias");

  //Para mostrar a mensagem que não tem postagens
  const caixaVaziaWrap = document.getElementById("caixaVaziaWrap")
  if(noticias.resultado.length === 0){
    caixaVaziaWrap.style.display = "flex"
  }

  noticias.resultado.forEach((item) => {

    //Cria as div onde ficam cada postagem
    const div = document.createElement("div");
    div.setAttribute("id", "noticia");
    listaNoticias.appendChild(div);
    div.innerHTML = `Título: ${item.titulo}`;

    //Cria o botão de excluir para cada postagem
    const btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "Excluir");
    btn.setAttribute("class", "btnExcluir");

    //Ouve o evento para quando clicar no botão, excluir a postagem
    btn.addEventListener("click", async () => {
      console.log(item.id);
      await fetch(`http://localhost:3000/noticia/${item.id}`, {
        method: "DELETE",
      }).then((response) => {
        alert("Postagem excluída com sucesso!");
        location.reload();
      });
    });

    //"acopla" o botão à div
    div.appendChild(btn);
  });
});

//Formulário para criação de postagem
formNoticia.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    titulo: titulo.value,
  };
  fetch("http://localhost:3000/noticia", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.status === 201) {
      alert("Postagem criada com sucesso!");
      location.reload();
    }
  });
});

const btnVoltar = document.getElementById("voltar")
btnVoltar.addEventListener("click", ()=>{
  location.assign("inicio.html")
})
