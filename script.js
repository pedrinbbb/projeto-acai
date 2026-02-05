// // script.js

// // ----------------------
// // Variáveis do carrinho
// // ----------------------
// let carrinho = [];
// const taxaEntrega = 2.00;

// // ----------------------
// // Seleção de elementos
// // ----------------------
// const btnCarrinho = document.getElementById('btnCarrinho');
// const carrinhoModal = document.getElementById('carrinhoModal');
// const listaCarrinho = document.getElementById('listaCarrinho');
// const subtotalEl = document.getElementById('subtotal');
// const totalEl = document.getElementById('total');
// const taxaEl = document.getElementById('taxa');
// const finalizarPedido = document.getElementById('finalizarPedido');
// const voltarCardapio = document.getElementById('voltarCardapio');

// const modalTamanho = document.getElementById('modalTamanho');
// const btnTamanhos = document.querySelectorAll('.btn-tamanho');
// const fecharModalTamanho = modalTamanho.querySelector('.fechar');

// const modalFormCliente = document.getElementById('modalFormCliente');
// const fecharFormCliente = document.getElementById('fecharFormCliente');
// const formularioCliente = document.getElementById('formularioCliente');

// const notificacao = document.getElementById('notificacaoCarrinho');

// // ----------------------
// // Produtos
// // ----------------------
// const produtos = [
//     { nome: "Garrafa de Açaí", preco300: 12, preco500: 18 },
//     { nome: "Açaí com Maracujá", preco300: 12, preco500: 18 },
//     { nome: "Açaí com Limão", preco300: 12, preco500: 18 }
// ];

// let produtoSelecionado = null; // Produto temporário antes de escolher o tamanho

// // ----------------------
// // Funções auxiliares
// // ----------------------
// function formatarReais(valor){
//     return `R$ ${valor.toFixed(2).replace('.', ',')}`;
// }

// function mostrarNotificacao() {
//     notificacao.classList.add('mostrar');
//     setTimeout(() => {
//         notificacao.classList.remove('mostrar');
//     }, 2000);
// }

// // ----------------------
// // Abrir e fechar carrinho
// // ----------------------
// btnCarrinho.addEventListener('click', () => {
//     carrinhoModal.style.display = 'flex';
//     atualizarCarrinho();
// });

// voltarCardapio.addEventListener('click', () => {
//     carrinhoModal.style.display = 'none';
// });

// // ----------------------
// // Abrir modal tamanho
// // ----------------------
// document.querySelectorAll('.adicionar-carrinho').forEach((btn, index) => {
//     btn.addEventListener('click', () => {
//         produtoSelecionado = produtos[index];
//         modalTamanho.style.display = 'flex';
//     });
// });

// // Selecionar tamanho e adicionar ao carrinho
// btnTamanhos.forEach(btn => {
//     btn.addEventListener('click', () => {
//         const tamanho = btn.dataset.tamanho;
//         const preco = tamanho === "300ml" ? produtoSelecionado.preco300 : produtoSelecionado.preco500;

//         carrinho.push({
//             nome: produtoSelecionado.nome,
//             tamanho: tamanho,
//             preco: preco
//         });

//         modalTamanho.style.display = 'none';
//         atualizarCarrinho();
//         mostrarNotificacao();
//     });
// });

// // Fechar modal tamanho
// fecharModalTamanho.addEventListener('click', () => {
//     modalTamanho.style.display = 'none';
// });

// // ----------------------
// // Atualizar carrinho
// // ----------------------
// function atualizarCarrinho(){
//     listaCarrinho.innerHTML = '';

//     let subtotal = 0;

//     carrinho.forEach((item, index) => {
//         subtotal += item.preco;

//         const li = document.createElement('li');
//         li.textContent = `${item.nome} (${item.tamanho}) - ${formatarReais(item.preco)}`;

//         // Botão remover
//         const btnRemover = document.createElement('button');
//         btnRemover.textContent = '❌';
//         btnRemover.style.marginLeft = '10px';
//         btnRemover.style.background = 'transparent';
//         btnRemover.style.border = 'none';
//         btnRemover.style.cursor = 'pointer';
//         btnRemover.style.fontSize = '16px';
//         btnRemover.addEventListener('click', () => {
//             carrinho.splice(index, 1);
//             atualizarCarrinho();
//         });

//         li.appendChild(btnRemover);
//         listaCarrinho.appendChild(li);
//     });

//     subtotalEl.textContent = formatarReais(subtotal);
//     taxaEl.textContent = formatarReais(taxaEntrega);
//     totalEl.textContent = formatarReais(subtotal + taxaEntrega);
// }

// // ----------------------
// // Finalizar pedido
// // ----------------------
// finalizarPedido.addEventListener('click', () => {
//     if(carrinho.length === 0){
//         alert("Seu carrinho está vazio!");
//         return;
//     }
//     carrinhoModal.style.display = 'none';
//     modalFormCliente.style.display = 'flex';
// });

// // Fechar formulário
// fecharFormCliente.addEventListener('click', () => {
//     modalFormCliente.style.display = 'none';
// });

// // ----------------------
// // Enviar pedido via WhatsApp
// // ----------------------
// formularioCliente.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const nome = document.getElementById('nomeCliente').value;
//     const telefone = document.getElementById('telefoneCliente').value;
//     const endereco = document.getElementById('enderecoCliente').value;
//     const referencia = document.getElementById('referenciaCliente').value;
//     const bairro = document.getElementById('bairroCliente').value;

//     let mensagem = `🛒 *Pedido de Açaí*\n\n`;

//     carrinho.forEach(item => {
//         mensagem += `${item.nome} (${item.tamanho}) - ${formatarReais(item.preco)}\n`;
//     });

//     mensagem += `\nSubtotal: ${subtotalEl.textContent}\n`;
//     mensagem += `Taxa de entrega: ${taxaEl.textContent}\n`;
//     mensagem += `Total: ${totalEl.textContent}\n\n`;

//     mensagem += `*Dados do Cliente:*\n`;
//     mensagem += `Nome: ${nome}\nTelefone: ${telefone}\nEndereço: ${endereco}\nPonto de referência: ${referencia}\nBairro: ${bairro}`;

//     const whatsappUrl = `https://api.whatsapp.com/send?phone=55${telefone.replace(/\D/g,'')}&text=${encodeURIComponent(mensagem)}`;
//     window.open(whatsappUrl, '_blank');

//     // Limpar formulário e carrinho
//     formularioCliente.reset();
//     carrinho = [];
//     modalFormCliente.style.display = 'none';
//     atualizarCarrinho();
// });
