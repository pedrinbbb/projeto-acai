// ======================
// Variáveis globais
// ======================
let carrinho = [];
const taxaEntrega = 2.00;
let produtoSelecionado = null;

// ======================
// Seleção de elementos
// ======================
const btnCarrinho = document.getElementById("btnCarrinho");
const carrinhoModal = document.getElementById("carrinhoModal");
const listaCarrinho = document.getElementById("listaCarrinho");
const subtotalEl = document.getElementById("subtotal");
const taxaEl = document.getElementById("taxa");
const totalEl = document.getElementById("total");
const finalizarPedido = document.getElementById("finalizarPedido");
const voltarCardapio = document.getElementById("voltarCardapio");

const modalTamanho = document.getElementById("modalTamanho");
const btnTamanhos = document.querySelectorAll(".btn-tamanho");
const fecharModalTamanho = modalTamanho.querySelector(".fechar");

const modalFormCliente = document.getElementById("modalFormCliente");
const fecharFormCliente = document.getElementById("fecharFormCliente");
const formularioCliente = document.getElementById("formularioCliente");

const notificacao = document.getElementById("notificacaoCarrinho");

// Botões do modal
const btn300 = document.querySelector('[data-tamanho="300ml"]');
const btn500 = document.querySelector('[data-tamanho="500ml"]');

// ======================
// Produtos (preços diferentes)
// ======================
const produtos = [
    {
        nome: "Garrafa de Açaí",
        preco300: 12.00,
        preco500: 19.00
    },
    {
        nome: "Açaí com Maracujá",
        preco300: 14.00,
        preco500: 22.00
    },
    {
        nome: "Açaí com Limão",
        preco300: 13.00,
        preco500: 19.00
    }
];

// ======================
// Funções auxiliares
// ======================
function formatarReais(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function mostrarNotificacao(texto) {
    if (!notificacao) return;

    notificacao.textContent = texto;
    notificacao.classList.add("mostrar");

    setTimeout(() => {
        notificacao.classList.remove("mostrar");
    }, 2000);
}

// ======================
// Abrir / Fechar carrinho
// ======================
btnCarrinho.addEventListener("click", () => {
    carrinhoModal.style.display = "flex";
    atualizarCarrinho();
});

voltarCardapio.addEventListener("click", () => {
    carrinhoModal.style.display = "none";
});

// ======================
// Abrir modal de tamanho (com preços dinâmicos)
// ======================
document.querySelectorAll(".adicionar-carrinho").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        produtoSelecionado = produtos[index];

        btn300.textContent = `300ml ${formatarReais(produtoSelecionado.preco300)}`;
        btn500.textContent = `500ml ${formatarReais(produtoSelecionado.preco500)}`;

        modalTamanho.style.display = "flex";
    });
});

// ======================
// Selecionar tamanho e adicionar ao carrinho
// ======================
btnTamanhos.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!produtoSelecionado) return;

        const tamanho = btn.dataset.tamanho;
        const preco =
            tamanho === "300ml"
                ? produtoSelecionado.preco300
                : produtoSelecionado.preco500;

        const itemExistente = carrinho.find(
            item => item.nome === produtoSelecionado.nome && item.tamanho === tamanho
        );

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({
                nome: produtoSelecionado.nome,
                tamanho,
                preco,
                quantidade: 1
            });
        }
        

        modalTamanho.style.display = "none";
        atualizarCarrinho();
        mostrarNotificacao(`${produtoSelecionado.nome} adicionado ao carrinho 🛒`);
    });
});

fecharModalTamanho.addEventListener("click", () => {
    modalTamanho.style.display = "none";
});

// ======================
// Atualizar carrinho
// ======================
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    let subtotal = 0;

    carrinho.forEach((item, index) => {
        const totalItem = item.preco * item.quantidade;
        subtotal += totalItem;

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.nome}</strong> (${item.tamanho})<br>
            ${formatarReais(item.preco)} x ${item.quantidade} =
            <strong>${formatarReais(totalItem)}</strong>
        `;

        const controles = document.createElement("div");
        controles.style.marginTop = "6px";

        const btnMenos = document.createElement("button");
        btnMenos.textContent = "➖";
        btnMenos.onclick = () => {
            item.quantidade--;
            if (item.quantidade <= 0) {
                carrinho.splice(index, 1);
            }
            atualizarCarrinho();
        };

        const btnMais = document.createElement("button");
        btnMais.textContent = "➕";
        btnMais.onclick = () => {
            item.quantidade++;
            atualizarCarrinho();
        };

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "❌";
        btnRemover.style.marginLeft = "10px";
        btnRemover.onclick = () => {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        };

        controles.appendChild(btnMenos);
        controles.appendChild(btnMais);
        controles.appendChild(btnRemover);

        li.appendChild(controles);
        listaCarrinho.appendChild(li);
    });

    subtotalEl.textContent = formatarReais(subtotal);
    taxaEl.textContent = formatarReais(taxaEntrega);
    totalEl.textContent = formatarReais(subtotal + taxaEntrega);
}

// ======================
// Finalizar pedido
// ======================
finalizarPedido.addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    carrinhoModal.style.display = "none";
    modalFormCliente.style.display = "flex";
});

fecharFormCliente.addEventListener("click", () => {
    modalFormCliente.style.display = "none";
});

// ======================
// Enviar pedido via WhatsApp
// ======================
formularioCliente.addEventListener("submit", e => {
    e.preventDefault();

    const nome = document.getElementById("nomeCliente").value;
    const telefone = document.getElementById("telefoneCliente").value;
    const endereco = document.getElementById("enderecoCliente").value;
    const referencia = document.getElementById("referenciaCliente").value;
    const bairro = document.getElementById("bairroCliente").value;

    let mensagem = "🛒 *Pedido de Açaí*\n\n";

    carrinho.forEach(item => {
        mensagem += `${item.nome} (${item.tamanho})\n`;
        mensagem += `${item.quantidade}x ${formatarReais(item.preco)} = ${formatarReais(item.preco * item.quantidade)}\n\n`;
    });

    mensagem += `Subtotal: ${subtotalEl.textContent}\n`;
    mensagem += `Taxa de entrega: ${taxaEl.textContent}\n`;
    mensagem += `Total: ${totalEl.textContent}\n\n`;

    mensagem += "*Dados do Cliente:*\n";
    mensagem += `Nome: ${nome}\n`;
    mensagem += `Telefone: ${telefone}\n`;
    mensagem += `Endereço: ${endereco}\n`;
    mensagem += `Ponto de referência: ${referencia}\n`;
    mensagem += `Bairro: ${bairro}`;

    const numeroLimpo = telefone.replace(/\D/g, "");
    const whatsappUrl =
        `https://api.whatsapp.com/send?phone=55${numeroLimpo}&text=${encodeURIComponent(mensagem)}`;

    window.open(whatsappUrl, "_blank");

    formularioCliente.reset();
    carrinho = [];
    modalFormCliente.style.display = "none";
    atualizarCarrinho();
});

