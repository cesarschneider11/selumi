# 🕯️ SELUMI — Luz que acolhe

> **Catálogo Digital Premium de Velas Artesanais e Aromáticas**  
> Desenvolvido com **Next.js**, **React**, **Tailwind CSS** e **TypeScript**, otimizado para celulares e pronto para deploy na **Vercel** e versionamento no **GitHub**.

---

## ✨ Identidade e Conceito

O projeto da **Selumi** foi concebido como uma **boutique digital refinada**, inspirada na tranquilidade, afeto, aconchego e bem-estar:
- **Paleta de cores:** Bege suave, linho, creme, caramelo e marrom espresso acolhedor.
- **Tipografia:** Serifada poética (*Cormorant Garamond*) e sem serifa moderna (*Plus Jakarta Sans*).
- **Sensação:** Encantamento, suavidade e zero atrito de compra.
- **Canal de fechamento:** WhatsApp oficial da marca, com pedido estruturado e atendimento humano.

---

## 📦 Produtos Iniciais do Catálogo

1. **Jardim** — R$ 50,00  
   *Vela botânica esculpida em cera vegetal com relevos delicados.*
2. **Rosa** — R$ 50,00  
   *Escultura de rosa em cera pura, pétalas aveludadas e toque romântico.*
3. **Flor** — R$ 50,00  
   *Vela floral contemporânea que dissipa as tensões da rotina.*
4. **Vidro pequeno** — R$ 25,00  
   *Pote de vidro com tampa protetora para rituais de autocuidado (100g).*
5. **Vidro grande** — R$ 35,00  
   *Recipiente generoso para queima prolongada e difusão em todo o lar (180g).*

---

## 🌸 Aromas & Essências Configuradas

1. **Vanilla Sugar** — Adocicada (baunilha, caramelo, jasmim e framboesa)
2. **Confort Baby** — Infantil (pera, maçã, rosa, jasmim e lírio-do-vale)
3. **La Bomba** — Oriental floral (pitaya, peônia vermelha, frangipani, baunilha e patchouli)
4. **Sakura Lovers** — Floral frutada adocicada (cereja, cassis, rosa, violeta, framboesa, sândalo e baunilha)
5. **Bamboo Trouss** — Cítrica herbal aquática (limão, bergamota, notas verdes e aquáticas)
6. **White Jasmin** — Floral (jasmim, frésia, rosa, lírio-do-vale, maçã e notas verdes)
7. **Cereja e Avelã** — Adocicada (cereja, avelã, caramelo e baunilha)
8. **Ginger Bread** — Gourmand especiada (biscoitos, especiarias quentes e caramelo)
9. **Chá Branco** — Fresco, delicado e levemente herbal
10. **Flor de Cerejeira** — Floral (flores de cerejeira, sereno e romântico)
11. **Pinho Siberiano** — Verde, conífero e amadeirado
12. **Caramelate** — Frutado gourmand, amadeirado (figo, folhas verdes, baunilha, sândalo e caramelo)
13. **Peônia** — Floral frutado (peônia, pera, pêssego e âmbar)
14. **Champagne Toast** — Frutado cítrico adocicado (notas cítricas, frutadas e baunilha)

---

## 🛠️ Funcionalidades Principais

1. **Página Inicial de Encantamento:** Apresentação da marca, destaques dos 4 pilares artesanais (100% Cera Vegetal, Alta Perfumaria, Feito à Mão, Presente Especial).
2. **Catálogo Interativo:** Filtro por coleções, fotografias de destaque, preços nítidos e indicação de estoque.
3. **Personalização Completa:** Ao escolher qualquer vela, o cliente escolhe a **essência desejada** e a **quantidade**, visualizando notas olfativas e valores em tempo real.
4. **Sacola de Afeto (Carrinho):** Persistente via `localStorage` (os itens permanecem salvos mesmo se o cliente recarregar a página).
5. **Finalização Rápida sem Login:** O cliente informa apenas seu nome, telefone opcional, observações/endereço e a forma de pagamento:
   - **PIX**
   - **Dinheiro** (na entrega ou retirada presencial)
   - **Cartão / Mercado Pago** (deixado preparado como funcionalidade futura)
6. **Integração WhatsApp:** Gera automaticamente a mensagem estruturada com formatação profissional e abre a conversa oficial da Selumi.
7. **Botão Fale Conosco:** Botão flutuante discreto e acessível para dúvidas e pedidos especiais sob medida.
8. **Área Administrativa Protegida (`/admin`):**
   - Login com credenciais seguras.
   - **Gerenciar Velas:** Criar, editar nomes, descrições, valores, disponibilidade (estoque) e fotos (via link ou upload de imagem do computador/celular).
   - **Gerenciar Essências:** Adicionar novas fragrâncias, notas olfativas e ativar/desativar.
   - **Configurações Gerais:** Número do WhatsApp da Selumi, chave PIX, mensagens da loja.
   - **Backup & Restauração:** Exportar/importar catálogo em JSON ou restaurar os dados de fábrica a qualquer momento.

---

## 🔐 Acesso ao Painel Administrativo

- **Rota:** `/admin`
- **Usuário:** `selumi`
- **Senha:** `111026`

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar dependências (caso necessário)
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Acesse no navegador
http://localhost:3000
```

---

## ☁️ Como Publicar na Vercel e GitHub

1. **Crie um repositório no seu GitHub** (ex: `selumi-catalogo`).
2. **Envie o código:**
   ```bash
   git add .
   git commit -m "feat: Catalogo digital completo Selumi"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/selumi-catalogo.git
   git push -u origin main
   ```
3. **Importe o repositório na [Vercel](https://vercel.com):**
   - A Vercel detectará automaticamente o **Next.js**.
   - Clique em **Deploy**.
   - Seu catálogo estará no ar com HTTPS gratuito e velocidade ultra rápida!
