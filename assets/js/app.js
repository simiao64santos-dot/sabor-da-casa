/* =========================================================
   UTILITÁRIOS
   ========================================================= */
const brl = n => n.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
const $ = id => document.getElementById(id);
const acharPrato = id => MENU.find(p => p.id === id);

/* =========================================================
   ESTADO DO CARRINHO
   ========================================================= */
let carrinho = [];
try { carrinho = JSON.parse(localStorage.getItem('sabordacasa_cart') || '[]'); } catch(e){ carrinho = []; }
carrinho = carrinho.filter(i => acharPrato(i.id) && i.qty > 0);

const salvar = () => localStorage.setItem('sabordacasa_cart', JSON.stringify(carrinho));
const totalItens = () => carrinho.reduce((s,i) => s + i.qty, 0);
const subtotal   = () => carrinho.reduce((s,i) => s + acharPrato(i.id).preco * i.qty, 0);

function freteAtual(){
  if (carrinho.length === 0) return 0;
  return subtotal() >= FRETE_GRATIS_A_PARTIR ? 0 : TAXA_ENTREGA;
}
function totalAtual(){ return subtotal() + freteAtual(); }

/* =========================================================
   RENDER: DESTAQUES
   ========================================================= */
function renderDestaques(){
  const lista = MENU.filter(p => p.destaque);
  $('cardsDestaque').innerHTML = lista.map(p => `
    <article class="card">
      <div class="foto" style="position:relative">
        ${p.tag ? `<span class="tag ${p.tag === 'Sábado' ? 'amarelo' : ''}">${p.tag}</span>` : ''}
        <span class="emoji">${p.emoji}</span>
      </div>
      <div class="card-body">
        <h3>${p.nome}</h3>
        <p>${p.desc}</p>
        <div class="card-foot">
          <span class="preco">${brl(p.preco)}</span>
          <button class="btn btn-primary" style="padding:10px 18px;font-size:.86rem" onclick="adicionar(${p.id})">Adicionar</button>
        </div>
      </div>
    </article>
  `).join('');
}

/* =========================================================
   RENDER: CARDÁPIO
   ========================================================= */
let catAtiva = 'marmitas';

function renderChips(){
  $('chips').innerHTML = CATEGORIAS.map(c => `
    <button class="chip ${c.id === catAtiva ? 'on' : ''}" onclick="filtrar('${c.id}')">${c.nome}</button>
  `).join('');
}

function filtrar(cat){
  catAtiva = cat;
  renderChips();
  renderMenu();
}

function renderMenu(){
  const lista = MENU.filter(p => p.cat === catAtiva);
  $('menuGrid').innerHTML = lista.map(p => `
    <article class="prato">
      <div class="prato-emoji">${p.emoji}</div>
      <div class="prato-info">
        <div class="prato-top">
          <h4>${p.nome}</h4>
        </div>
        <p>${p.desc}</p>
        <div class="prato-bottom">
          <span class="preco" style="font-size:1.08rem">${brl(p.preco)}</span>
          <button class="add" onclick="adicionar(${p.id})" aria-label="Adicionar ${p.nome}">+</button>
        </div>
      </div>
    </article>
  `).join('');
}

/* =========================================================
   CARRINHO — AÇÕES
   ========================================================= */
function adicionar(id){
  const item = carrinho.find(i => i.id === id);
  if (item) item.qty++;
  else carrinho.push({ id, qty: 1 });
  salvar();
  atualizarBadge();
  renderCarrinho();
  const p = acharPrato(id);
  toast(`✅ ${p.nome} adicionado`);
}

function alterarQtd(id, delta){
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) carrinho = carrinho.filter(i => i.id !== id);
  salvar();
  atualizarBadge();
  renderCarrinho();
}

function remover(id){
  carrinho = carrinho.filter(i => i.id !== id);
  salvar();
  atualizarBadge();
  renderCarrinho();
}

function atualizarBadge(){
  const b = $('badge');
  b.textContent = totalItens();
  b.classList.add('pop');
  setTimeout(() => b.classList.remove('pop'), 200);
}

/* =========================================================
   RENDER: CARRINHO
   ========================================================= */
function renderCarrinho(){
  const body = $('drawerBody');
  const foot = $('drawerFoot');

  if (carrinho.length === 0){
    body.innerHTML = `
      <div class="cart-empty">
        <span class="big">🍽️</span>
        <p style="font-weight:600;color:var(--carvao)">Seu carrinho está vazio</p>
        <p style="font-size:.88rem;margin-top:6px">Escolha algo do cardápio e volte aqui.</p>
        <button class="btn btn-primary" style="margin-top:22px" onclick="fecharCarrinho();document.getElementById('cardapio').scrollIntoView({behavior:'smooth'})">Ver cardápio</button>
      </div>`;
    foot.style.display = 'none';
    return;
  }

  const itens = carrinho.map(i => {
    const p = acharPrato(i.id);
    return `
      <div class="cart-item">
        <div class="prato-emoji">${p.emoji}</div>
        <div class="cart-item-info">
          <b>${p.nome}</b>
          <span class="preco">${brl(p.preco * i.qty)}</span>
          <div class="qtd">
            <button onclick="alterarQtd(${p.id},-1)" aria-label="Diminuir">−</button>
            <span>${i.qty}</span>
            <button onclick="alterarQtd(${p.id},1)" aria-label="Aumentar">+</button>
            <button class="remover" onclick="remover(${p.id})">remover</button>
          </div>
        </div>
      </div>`;
  }).join('');

  const falta = FRETE_GRATIS_A_PARTIR - subtotal();
  const avisoFrete = falta > 0
    ? `<div class="frete-gratis">🛵 Faltam ${brl(falta)} para o frete grátis</div>`
    : `<div class="frete-gratis">🎉 Você ganhou frete grátis!</div>`;

  body.innerHTML = itens + `
    <div class="form-pedido">
      <div>
        <label for="nome">Seu nome *</label>
        <input id="nome" type="text" placeholder="Ex: Maria Silva" autocomplete="name">
      </div>
      <div>
        <label for="endereco">Endereço de entrega *</label>
        <input id="endereco" type="text" placeholder="Rua, número, bairro" autocomplete="street-address">
      </div>
      <div>
        <label for="pagamento">Forma de pagamento</label>
        <select id="pagamento">
          <option>Pix</option>
          <option>Cartão (na entrega)</option>
          <option>Dinheiro</option>
        </select>
      </div>
      <div>
        <label for="obs">Observações</label>
        <textarea id="obs" rows="2" placeholder="Sem cebola, troco para R$ 100..."></textarea>
      </div>
    </div>
  `;

  foot.style.display = 'block';
  foot.innerHTML = `
    ${avisoFrete}
    <div class="totais">
      <div><span>Subtotal</span><span>${brl(subtotal())}</span></div>
      <div><span>Entrega</span><span>${freteAtual() === 0 ? 'Grátis' : brl(freteAtual())}</span></div>
      <div class="total"><span>Total</span><span>${brl(totalAtual())}</span></div>
    </div>
    <button class="btn-final" onclick="enviarPedido()">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4 0-.1-.2-.2-.5-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.9-1.4-1.3-3-1.3-4.5 0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.6 8.4-8.2 8.4z"/></svg>
      Finalizar no WhatsApp
    </button>
  `;
}

/* =========================================================
   ENVIO DO PEDIDO
   ========================================================= */
function enviarPedido(){
  const nome = $('nome').value.trim();
  const endereco = $('endereco').value.trim();
  const pagamento = $('pagamento').value;
  const obs = $('obs').value.trim();

  if (!nome){ toast('⚠️ Informe seu nome'); $('nome').focus(); return; }
  if (!endereco){ toast('⚠️ Informe o endereço'); $('endereco').focus(); return; }

  const linhas = carrinho.map(i => {
    const p = acharPrato(i.id);
    return `• ${i.qty}x ${p.nome} — ${brl(p.preco * i.qty)}`;
  }).join('\n');

  let msg = `*NOVO PEDIDO — Sabor da Casa*\n\n`;
  msg += `*Cliente:* ${nome}\n`;
  msg += `*Endereço:* ${endereco}\n`;
  msg += `*Pagamento:* ${pagamento}\n\n`;
  msg += `*Itens:*\n${linhas}\n\n`;
  msg += `Subtotal: ${brl(subtotal())}\n`;
  msg += `Entrega: ${freteAtual() === 0 ? 'Grátis' : brl(freteAtual())}\n`;
  msg += `*Total: ${brl(totalAtual())}*\n`;
  if (obs) msg += `\n*Observações:* ${obs}`;

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  toast('🚀 Abrindo WhatsApp…');
}

/* =========================================================
   DRAWER / TOAST / MENU MOBILE
   ========================================================= */
function abrirCarrinho(){
  $('drawer').classList.add('on');
  $('overlay').classList.add('on');
  document.body.style.overflow = 'hidden';
  renderCarrinho();
}
function fecharCarrinho(){
  $('drawer').classList.remove('on');
  $('overlay').classList.remove('on');
  document.body.style.overflow = '';
}
let toastTimer;
function toast(msg){
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('on'), 2200);
}

$('btnCart').addEventListener('click', abrirCarrinho);
$('burger').addEventListener('click', () => $('links').classList.toggle('on'));
document.querySelectorAll('#links a').forEach(a =>
  a.addEventListener('click', () => $('links').classList.remove('on'))
);
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharCarrinho(); });

/* =========================================================
   STATUS ABERTO / FECHADO
   ========================================================= */
function atualizarStatus(){
  const agora = new Date();
  const dia = agora.getDay(); // 0=dom, 1=seg
  const h = agora.getHours() + agora.getMinutes() / 60;
  let aberto = false;

  if (dia !== 1){
    if (dia >= 2 && dia <= 5) aberto = (h >= 11 && h < 15) || (h >= 18 && h < 22);
    else if (dia === 6)       aberto = (h >= 11 && h < 16) || (h >= 18 && h < 23);
    else if (dia === 0)       aberto = (h >= 11 && h < 16);
  }

  $('statusDot').classList.toggle('off', !aberto);
  $('statusTxt').textContent = aberto ? 'Aberto agora' : 'Fechado no momento';
}

/* =========================================================
   INIT
   ========================================================= */
$('ano').textContent = new Date().getFullYear();
renderDestaques();
renderChips();
renderMenu();
renderCarrinho();
atualizarBadge();
atualizarStatus();
setInterval(atualizarStatus, 60000);
