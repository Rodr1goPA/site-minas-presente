const produtos = [
  {
    nome: "Smartphone Galaxy S21",
    categoria: "eletronicos",
    preco: "R$ 3.499,00",
    imagens: [
      "img/produtos/canecas/cn0101.png",
      "img/produtos/canecas/cn0102.png",
    ],
  },
  {
    nome: "Camisa Polo Azul",
    categoria: "roupas",
    preco: "R$ 89,90",
    imagens: [
      "img/roupas/camisa1.jpg",
      "img/roupas/camisa2.jpg",
    ],
  },
  {
    nome: "Livro: Clean Code",
    categoria: "livros",
    preco: "R$ 99,00",
    imagens: [
      "img/livros/cleancode1.jpg",
      "img/livros/cleancode2.jpg",
    ],
  },
  {
    nome: "Fone de Ouvido Bluetooth",
    categoria: "eletronicos",
    preco: "R$ 249,00",
    imagens: [
      "img/eletronicos/fone1.jpg",
      "img/eletronicos/fone2.jpg",
      "img/eletronicos/fone3.jpg",
    ],
  },
];

const lista = document.getElementById("listaProdutos");
const filtro = document.getElementById("filtroCategoria");

function renderProdutos(categoria = "todas") {
  lista.innerHTML = "";

  const filtrados =
    categoria === "todas"
      ? produtos
      : produtos.filter((p) => p.categoria === categoria);

  filtrados.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Carrossel
    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    produto.imagens.forEach((imgSrc, i) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      if (i === 0) img.classList.add("active");
      carousel.appendChild(img);
    });

    const btnPrev = document.createElement("button");
    btnPrev.classList.add("prev");
    btnPrev.innerHTML = "‹";

    const btnNext = document.createElement("button");
    btnNext.classList.add("next");
    btnNext.innerHTML = "›";

    carousel.appendChild(btnPrev);
    carousel.appendChild(btnNext);

    let imgIndex = 0;
    const imgs = carousel.querySelectorAll("img");

    btnNext.addEventListener("click", () => {
      imgs[imgIndex].classList.remove("active");
      imgIndex = (imgIndex + 1) % imgs.length;
      imgs[imgIndex].classList.add("active");
    });

    btnPrev.addEventListener("click", () => {
      imgs[imgIndex].classList.remove("active");
      imgIndex = (imgIndex - 1 + imgs.length) % imgs.length;
      imgs[imgIndex].classList.add("active");
    });

    // Conteúdo do Card
    const content = document.createElement("div");
    content.classList.add("card-content");
    content.innerHTML = `
      <h3>${produto.nome}</h3>
      <p>Categoria: ${produto.categoria}</p>
      <span>${produto.preco}</span>
    `;

    // Botão WhatsApp
    const msg = encodeURIComponent(`Olá! Tenho interesse no produto: ${produto.nome}.`);
    const numero = "5599999999999"; // coloque seu número com DDI (ex: 55 + DDD + número)
    const linkWhats = `https://wa.me/${numero}?text=${msg}`;

    const botao = document.createElement("a");
    botao.href = linkWhats;
    botao.target = "_blank";
    botao.classList.add("btn-comprar");
    botao.textContent = "Comprar pelo WhatsApp";

    content.appendChild(botao);

    card.appendChild(carousel);
    card.appendChild(content);
    lista.appendChild(card);
  });
}

filtro.addEventListener("change", (e) => renderProdutos(e.target.value));

renderProdutos();
