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
      "img/roupas/camisa2.jpg"
    ],
  },
  {
    nome: "Livro: Clean Code",
    categoria: "livros",
    preco: "R$ 99,00",
    imagens: [
      "img/livros/cleancode1.jpg",
      "img/livros/cleancode2.jpg"
    ],
  },
];

const container = document.getElementById("produtosContainer");
const filtro = document.getElementById("filtroCategoria");

function renderizarProdutos(filtroSelecionado) {
  container.innerHTML = "";

  const filtrados = filtroSelecionado === "todas"
    ? produtos
    : produtos.filter(p => p.categoria === filtroSelecionado);

  filtrados.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    let index = 0;

    p.imagens.forEach((imgSrc, i) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      if (i === 0) img.classList.add("active");
      carousel.appendChild(img);
    });

    const btnPrev = document.createElement("button");
    btnPrev.textContent = "‹";
    btnPrev.classList.add("prev");

    const btnNext = document.createElement("button");
    btnNext.textContent = "›";
    btnNext.classList.add("next");

    carousel.appendChild(btnPrev);
    carousel.appendChild(btnNext);

    // Navegação com clique
    btnPrev.addEventListener("click", () => mudarImagem(-1));
    btnNext.addEventListener("click", () => mudarImagem(1));

    // Função de troca de imagem
    function mudarImagem(direcao) {
      const imagens = carousel.querySelectorAll("img");
      imagens[index].classList.remove("active");
      index = (index + direcao + imagens.length) % imagens.length;
      imagens[index].classList.add("active");
    }

    // --- Suporte a toque (swipe) ---
    let startX = 0;
    let endX = 0;

    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchmove", (e) => {
      endX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", () => {
      if (startX - endX > 50) {
        mudarImagem(1); // deslizou para a esquerda
      } else if (endX - startX > 50) {
        mudarImagem(-1); // deslizou para a direita
      }
    });
    // -------------------------------

    const info = document.createElement("div");
    info.classList.add("card-info");
    info.innerHTML = `
      <h3>${p.nome}</h3>
      <p>${p.preco}</p>
      <a class="btn-comprar" href="https://wa.me/55SEUNUMERO?text=Olá! Quero comprar o ${encodeURIComponent(p.nome)}" target="_blank">Comprar no WhatsApp</a>
    `;

    card.appendChild(carousel);
    card.appendChild(info);
    container.appendChild(card);
  });
}

filtro.addEventListener("change", (e) => {
  renderizarProdutos(e.target.value);
});

renderizarProdutos("todas");
