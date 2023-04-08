const formCadastro = document.getElementById("formCadastro");
const emailCadastro = document.getElementById("emailCadastro");
const senhaCadastro = document.getElementById("senhaCadastro");

const box = document.getElementById("successBox");
const fundoAll = document.getElementById("fundoAll");
const fecharSuccessBox = document.getElementById("fecharSuccessBox");

//===Parte que cuida do REGISTRO de usuários===//
fecharSuccessBox.addEventListener("click", () => {
  box.style.visibility = "hidden";
  fundoAll.style.visibility = "hidden";
  location.reload();
});

formCadastro.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!emailCadastro.value || !senhaCadastro.value) {
    emailCadastro.style.border = "1px solid #fa3c3c";
    senhaCadastro.style.border = "1px solid #fa3c3c";
    return (document.getElementById("errorMsgC").innerText =
      "Preencha todos os campos.");
  }

  const data = {
    email: emailCadastro.value,
    senha: senhaCadastro.value,
  };

  fetch("http://localhost:3000/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 422) {
        return (document.getElementById("errorMsgC").innerText =
          "E-mail já cadastrado.");
      } else if (res.ok) {
        box.style.visibility = "visible";
        fundoAll.style.visibility = "visible";
      }
    })
    .catch((error) => console.log(error));
});

//===Parte que cuida do LOGIN de usuários===//
const formLogin = document.getElementById("formLogin");
const emailLogin = document.getElementById("emailLogin");
const senhaLogin = document.getElementById("senhaLogin");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!emailLogin.value || !senhaLogin.value) {
    emailLogin.style.border = "1px solid #fa3c3c";
    senhaLogin.style.border = "1px solid #fa3c3c";
    return (document.getElementById("errorMsgL").innerText =
      "Preencha todos os campos.");
  }

  const data = {
    email: emailLogin.value,
    senha: senhaLogin.value,
  };

  fetch("http://localhost:3000/entrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.status === 422) {
      return (document.getElementById("errorMsgL").innerText =
        "Senha incorreta.");
    } else if (res.status === 404) {
      return (document.getElementById("errorMsgL").innerText =
        "E-mail não cadastrado.");
    } else if (res.ok) {
      const token = await res.json();
      localStorage.setItem("token", token.token);
      document.cookie = `token = ${token.token}`;
      localStorage.setItem("email", data.email);
      location.replace("inicio.html");
    }
  });
});
