# Modelos de e-mail — Startpray e InPeace

Referência para montar e-mails das duas marcas. Parta de um dos modelos existentes,
não do zero.

| Arquivo | Marca | Assunto do e-mail |
|---|---|---|
| `startpray-apresentacao.html` | Startpray | Apresentação do produto |
| `startpray-cortes-da-semana.html` | Startpray | Chamada semanal para gerar os cortes |
| `startpray-uma-pregacao.html` | Startpray | Vitrine das quatro entregas |
| `inpeace-eventos-email.html` | InPeace | Funcionalidade de eventos |

---

## 1. Plataforma de disparo — **Dittofeed**

> **Mudança importante.** Estes e-mails foram construídos seguindo regras do
> **Intercom**, que era a premissa inicial. O cliente depois informou que o
> descadastro usa `{% unsubscribe_link %}`, que é sintaxe do **Dittofeed**.
> O que está abaixo reflete essa correção.

**Confirmado pelo cliente:**

```html
Não quer mais receber estes e-mails? Você pode {% unsubscribe_link %} aqui.<br/>
Powered by Dittofeed.
```

O bloco vai no rodapé, antes do `</body>`. A linha "Powered by Dittofeed" fica em
inglês — é assinatura da plataforma, não texto de marketing.

**NÃO verificado — confirme antes de confiar:**

- Que texto o `{% unsubscribe_link %}` renderiza no lugar do tag. A frase ao redor
  está em português; se o tag renderizar "unsubscribe" em inglês, a linha sai
  misturada.
- Se o Dittofeed inlina CSS no envio, como o premailer do Intercom faz.
- Se o atributo `data-premailer="ignore"` tem algum efeito. Ele é específico do
  Intercom. Os quatro arquivos ainda o carregam no bloco `<style>` da media query:
  é inofensivo, mas provavelmente inútil aqui. **Se o Dittofeed tiver mecanismo
  próprio para proteger media query do inlining, troque nos quatro.**

**Regras que valem em qualquer plataforma** (e que os quatro arquivos seguem):

- Layout em **tabelas aninhadas**, 600px. Sem `float`, sem `margin` de layout
  (o único `margin` permitido é o `margin:0` do `<body>`).
- Todos os estilos **inline**, por pedido do cliente.
- CSS responsivo isolado num único bloco `<style>` — media query não pode ser
  inlinada, senão passa a valer em qualquer largura.
- `padding` em `<td>` é usado: é suportado em todos os clientes, e sem ele o
  arquivo dobra de tamanho em células espaçadoras.
- Endereço físico no rodapé, junto do descadastro — exigência de lei anti-spam.

**Endereço vigente:**

> Ed. Premium Office – Torre B – R. José de Almeida Rebouças, 20 – Sl 716
> Mata da Praia, Vitória – ES, 29066-091

---

## 2. Startpray — linguagem visual

Cores extraídas do logotipo (`startpray-logo.png`), não inferidas:

| Papel | Hex | Uso |
|---|---|---|
| Azul | `#20A6DA` | Botões, rótulos, links, fallback de gradiente |
| Ciano | `#32CAE4` | Destaque de palavra no título, fim do gradiente |
| Escuro | `#0C1216` | Fundo do header, hero e rodapé |
| Claro | `#F4FAFD` | Fundo das seções de conteúdo |
| Fundo externo | `#EAF2F7` | Fora do contêiner |
| Texto escuro | `#17323D` | Títulos e texto sobre fundo claro |
| Texto suave | `#44616D` / `#B6C6CE` | Apoio em fundo claro / escuro |
| Borda de card | `#DCE9F0` | 1px |

Gradiente da marca: `linear-gradient(90deg, #20A6DA 0%, #32CAE4 100%)`, **sempre**
com `bgcolor="#20A6DA"` junto — o Outlook ignora o gradiente e usa o `bgcolor`.

O fundo `#0C1216` saiu da própria interface do produto. O logo é ciano e lê bem
sobre ele — não precisa de fundo claro atrás.

**Formas:** botões em pílula (`border-radius:28px`), cards `14px`, contêiner `18px`.
A interface do Startpray usa campo e botão em pílula.

**Estrutura:** filete de gradiente no topo → header escuro com logo centralizado →
hero escuro → arte → seção clara com rótulo em caixa alta → cards ou blocos →
fechamento com CTA → rodapé escuro. **Tudo centralizado.**

**Fonte:** `Arial, Helvetica, sans-serif`.

---

## 3. InPeace — linguagem visual

Deliberadamente oposta à do Startpray. As paletas são vizinhas em matiz, então a
diferença **não pode vir da cor** — vem da estrutura.

| Papel | Hex |
|---|---|
| Azul | `#38ACDE` |
| Azul claro | `#53B7E3` |
| Texto escuro | `#15323F` |
| Texto corpo | `#46606D` |
| Painel | `#EAF5FB` |
| Fundo externo | `#EEF4F8` |
| Rodapé | `#F6FAFC` |
| Borda | `#E6EFF4` |

| | Startpray | InPeace |
|---|---|---|
| Fundo | Escuro | Branco |
| Alinhamento | Centralizado | **À esquerda** |
| Tipografia | Arial | **Georgia** na abertura, Arial no corpo |
| Acento da marca | Filete de gradiente no topo | **Filete vertical** ao lado da frase |
| Botão | Pílula, centralizado | Canto 8px, à esquerda |
| Conteúdo | Cards em grade | Texto corrido, tom de carta |

Georgia é web-safe, mas cai para Times onde não existir.

---

## 4. Armadilhas já encontradas (não reintroduzir)

Bugs que só aparecem no celular e passam despercebidos no desktop:

1. **Imagem com largura fixa.** `width:600px` inline estoura o container em telas
   menores. Use `width:100%; max-width:600px; height:auto`.
2. **Célula espaçadora entre cards.** Ao empilhar cards com `display:block` na media
   query, a célula de gap **também** precisa de `display:block` — se ela continuar
   `table-cell`, os cards voltam para a mesma linha.
3. **`width:100%` em célula com padding.** O padding soma por fora e vaza. Use
   `width:auto` em célula que vira bloco.

E um de conteúdo:

4. **Título rasterizado dentro da arte.** Se a headline só existe dentro da imagem,
   o e-mail abre mudo onde imagens são bloqueadas. Repita a promessa em HTML — mas
   **com outras palavras**, não o eco literal, que fica pesado na tela.

**Sempre renderize antes de entregar:**

```bash
node shot.js <dir-com-preview.html>   # viewport 700 e 390, fullPage, deviceScaleFactor 2
```

Troque as URLs `raw.githubusercontent.com` por caminhos locais no preview, senão as
imagens não carregam. Confira que a largura do render de celular fecha em 390px —
qualquer valor acima significa estouro.

---

## 5. Imagens

Hospedadas **neste repositório**, referenciadas por:

```
https://raw.githubusercontent.com/inpeaceappmkt/email/main/<arquivo>
```

O repositório é público e esse padrão responde sem autenticação.
**Imagem nova só carrega depois de estar na `main`** — PR aberto não serve.

Tratamento antes de subir: recortar o excesso (`convert -trim +repage`),
redimensionar para ~2x o tamanho de exibição, JPG qualidade 78–82 para foto e arte.

**Orçamento de peso: até ~500 KB de imagem por e-mail.** Acima disso o Gmail trunca
a mensagem. O `startpray-uma-pregacao.html` tem cinco artes e fechou em 463 KB —
foi preciso baixar as quatro artes de feature para 1000px e qualidade 78; em
1080px/82 dava 561 KB.

**Arte com fundo transparente** sobre seção escura: achate sobre a cor exata do
fundo (`-background '#0C1216' -flatten`) e salve em JPG. Emenda sem costura e não
depende de suporte a alpha no cliente.

**Animação tem que ser `.gif`.** WebP não funciona no Outlook. Arquivo que chega
por upload de conversa pode ser achatado para um frame só — confira com `identify`.

---

## 6. Limites do que se consegue verificar aqui

Renderizar no Chromium **não** é testar em cliente de e-mail:

- **Outlook (Windows)** usa o motor do Word: ignora gradiente, `border-radius` e
  media query. O e-mail fica sempre em 600px e com cantos retos.
- **Gmail** pode remover o bloco `<style>`.
- O processamento da plataforma de disparo altera o HTML antes do envio.

Sempre recomende um disparo de teste antes do envio real.

---

## 7. Conteúdo dos produtos

### Startpray

> Uma IA que transforma o culto gravado em conteúdos para a semana: devocionais,
> resumo, transcrição, guia de estudos, mensagem e cortes prontos para reels.
> Todo o conteúdo é feito baseado apenas na mensagem pregada.

Site: `startpray.com`

**Nomes confirmados pelo cliente:** "Guia de estudos" e "Devocionais diárias".

> **Conflito aberto.** A arte do `startpray-cortes-da-semana.html` traz
> "Guia para células" e "5 Devocionais" — rasterizados dentro da imagem,
> contradizendo os nomes confirmados. Mudar só o HTML faria o e-mail contradizer a
> própria arte. Ou a arte é refeita, ou aquele e-mail não é disparado.

### InPeace

Site do admin: `admin.inpeaceapp.com`. O Startpray é um produto da InPeace.

---

## 8. Regra de conteúdo

**Não invente números, prazos, preços ou benefícios** que o cliente não escreveu.

Isso vale também para afirmações que aparecem **dentro das artes**: elas chegam
prontas e não são verificáveis daqui. Ao usar um número ou nome de entrega vindo de
uma arte, **avise o cliente que não dá para confirmar** e peça checagem antes do
disparo.

Grafia correta é **Startpray** (com os dois "t") — o texto do cliente às vezes vem
como "Starpray".
