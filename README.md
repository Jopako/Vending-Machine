# 🥤 Vending Machine — Autômato Finito

Trabalho 01 de Linguagens Formais e Autômatos.

## Objetivo

Modelar uma máquina de venda automática que aceita moedas de **5¢, 10¢ e 25¢** e libera um produto de **30¢**.

O projeto possui:

- interface interativa;
- visualização do estado atual;
- animação visual das transições;
- histórico da execução;
- cálculo de troco;
- arquivo de modelagem para JFLAP.

## Modelo

Estados:

`Q = {q0, q5, q10, q15, q20, q25, q30}`

Alfabeto:

`Σ = {5, 10, 25}`

Estado inicial:

`q0`

Estado de aceitação/liberação:

`q30`

A transição é:

`δ(q, moeda) = min(q + moeda, 30)`

Quando o saldo chega a 30¢ ou mais, o produto é liberado. O excedente é devolvido como troco e a máquina pode ser reiniciada para uma nova compra.

## Executar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## JFLAP

O arquivo `jflap/vending-machine.jff` contém a modelagem do autômato.

## Demonstração online

O projeto pode ser publicado como site estático. O Vite gera a pasta `dist` no build e suporta publicação em GitHub Pages.
