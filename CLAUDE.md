# Modelo de e-mail do Startpray

Referência para montar e-mails do **Startpray** (produto da InPeace) disparados pelo **Intercom**.
O arquivo `startpray-apresentacao.html` é o modelo de referência — parta dele, não do zero.

---

## 1. Marca

Cores extraídas do logotipo (`startpray-logo.png`), não inferidas:

| Papel | Hex | Uso |
|---|---|---|
| Azul | `#20A6DA` | Botões, rótulos, links, fallback de gradiente |
| Ciano | `#32CAE4` | Destaque de palavra no título, fim do gradiente |
| Escuro | `#0C1216` | Fundo do header, hero e rodapé |
| Claro | `#F4FAFD` | Fundo das seções de conteúdo |
| Fundo externo | `#EAF2F7` | Fora do contêiner do e-mail |
| Texto escuro | `#17323D` | Títulos e texto sobre fundo claro |
| Texto suave | `#44616D` / `#B6C6CE` | Apoio em fundo claro / escuro |
| Borda de card | `#DCE9F0` | 1px |

O **gradiente da marca** é `linear-gradient(90deg, #20A6DA 0%, #32CAE4 100%)`, sempre com
`bgcolor="#20A6DA"` junto — o Outlook ignora o gradiente e usa o `bgcolor`.

O fundo escuro `#0C1216` foi tirado do próprio produto (fundo da interface do Startpray).
O logo é ciano e lê bem sobre ele — **não precisa de fundo claro atrás**.

**Formas:** botões em pílula (`border-radius:28px`), cards `14px`, contêiner do e-mail `18px`.
A interface do Startpray usa campo e botão em pílula; as formas do e-mail seguem isso.

**Fonte:** `Arial, Helvetica, sans-serif`. Webfont em e-mail não é confiável.

---

## 2. Estrutura do modelo

```
filete de gradiente (5px, cantos de cima arredondados)
header escuro          logo 200px, centralizado
hero escuro            título + subtítulo + CTA
imagem de demonstração largura total, clicável
seção clara            eyebrow caixa alta + frase de abertura
cards                  grade 2 colunas, empilha no celular
fechamento + CTA
rodapé escuro          símbolo, assinatura InPeace, endereço, descadastro
```

---

## 3. Regras do Intercom

- Layout em **tabelas aninhadas**, 600px. Sem `float`, sem `margin` de layout
  (o único `margin` permitido é o `margin:0` do `<body>`).
- **`{{unsubscribe_url}}` é obrigatório**, antes do `</body>`.
  Nunca fixar uma URL de descadastro literal: ela carrega `user_id` de um
  destinatário só, e todo mundo que clicasse descadastraria aquele mesmo contato.
- **CSS responsivo vai isolado** em `<style data-premailer="ignore">`. Sem isso o
  premailer do Intercom inlina a media query, que passa a valer em qualquer largura.
- Todo o resto dos estilos **inline**.
- `padding` em `<td>` é usado, apesar da orientação de evitá-lo: é suportado em
  todos os clientes e sem ele o arquivo dobra de tamanho em células espaçadoras.
- `{{content}}` **não entra** em e-mail avulso — é só para template reutilizável,
  e o Intercom aceita um por e-mail.

---

## 4. Armadilhas já encontradas (não reintroduzir)

Três bugs que só aparecem no celular e passam despercebidos no desktop:

1. **Imagem com largura fixa.** `width:600px` inline estoura o container em telas
   menores. Use `width:100%; max-width:600px; height:auto`.
2. **Célula espaçadora entre cards.** Ao empilhar cards com `display:block` na media
   query, a célula de gap **também** precisa de `display:block` — se ela continuar
   `table-cell`, os cards voltam para a mesma linha.
3. **`width:100%` em célula com padding.** O padding soma por fora e vaza. Use
   `width:auto` em célula que vira bloco.

**Sempre renderize antes de entregar.** Chromium via Playwright, em 600px e 390px:

```bash
node shot.js <dir-com-preview.html>   # viewport 700 e 390, fullPage, deviceScaleFactor 2
```

Troque as URLs `raw.githubusercontent.com` por caminhos locais no preview, senão as
imagens não carregam.

---

## 5. Imagens

Hospedadas **neste repositório**, referenciadas por:

```
https://raw.githubusercontent.com/inpeaceappmkt/email/main/<arquivo>
```

O repositório é público e esse padrão de URL responde sem autenticação.
**Imagem nova só carrega depois de estar na `main`** — PR aberto não serve.

Tratamento antes de subir: recortar o excesso (`convert -trim +repage`),
redimensionar para ~2x o tamanho de exibição, e converter foto para JPG de
qualidade 82 (PNG de 1200px passa de 1 MB; o mesmo em JPG fica em ~94 KB).

**Animação tem que ser `.gif`.** WebP não funciona no Outlook. Arquivo que chega
por upload de conversa pode ser achatado para um frame só — confira com
`identify` antes de usar.

---

## 6. Limites do que se consegue verificar aqui

Renderizar no Chromium **não** é testar em cliente de e-mail. O que fica em aberto:

- **Outlook (Windows)** usa o motor do Word: ignora gradiente, `border-radius` e
  media query. O e-mail fica sempre em 600px e com cantos retos.
- **Gmail** pode remover o bloco `<style>`, inclusive com `data-premailer="ignore"`.
  Se isso ocorrer, o e-mail não empilha no Gmail mobile.
- O premailer do Intercom processa o HTML antes do envio.

Sempre recomende um disparo de teste antes do envio real.

---

## 7. Conteúdo do produto

Descrição vigente, confirmada pelo cliente:

> Uma IA que transforma o culto gravado em conteúdos para a semana: devocionais,
> resumo, transcrição, guia de estudos, mensagem e 6 cortes prontos para reels.
> Todo o conteúdo é feito baseado apenas na mensagem pregada.

Site: `startpray.com` · CTA: **USE GRATUITAMENTE**

Grafia correta é **Startpray** (com os dois "t") — o texto do cliente às vezes vem
como "Starpray".

**Não invente números, prazos, preços ou benefícios** que o cliente não escreveu.
