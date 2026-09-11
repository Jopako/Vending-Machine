<div align="center">

<img width="700" src="./assets/VendingFront.png" alt="Vending Machine">

### Vending Machine — Autômato Finito com Saída

<p>
Uma máquina de vendas que aceita moedas de 5, 10 e 25 centavos
e entrega um produto por 30 centavos.
</p>

</div>

---

<p align="center">

<a href="https://vending-machine-sooty.vercel.app/">
  <img src="https://img.shields.io/badge/Vercel-VENDING%20MACHINE-black?style=for-the-badge" alt="Vercel Vending Machine">
</a>

<a href="https://jopako.github.io/Vending-Machine/">
  <img src="https://img.shields.io/badge/GITHUB%20PAGES-ONLINE-black?style=for-the-badge" alt="GitHub Pages">
</a>

</p>

---

## Sobre o projeto

**Vending Machine** é uma simulação web de uma máquina de vendas
modelada utilizando um **Autômato Finito com Saída**.

A máquina aceita moedas de:

- **5 centavos**
- **10 centavos**
- **25 centavos**

O produto possui valor fixo de **30 centavos**.

O sistema acompanha o saldo acumulado por meio dos estados do
autômato e, quando o valor inserido atinge ou ultrapassa 30 centavos,
a máquina libera o produto e calcula o troco.

O projeto foi desenvolvido como parte da disciplina de
**Teoria da Computação**, buscando transformar o modelo formal de um
autômato em uma aplicação web interativa e visual.

---

# Interfaces

## Introdução

<img width="1098" height="927" alt="image" src="https://github.com/user-attachments/assets/16aacff0-83d0-4c91-9f0f-ef943e6e1c8a" />

## Vending Machine

<img width="1542" height="897" alt="image" src="https://github.com/user-attachments/assets/2e4fe77f-390c-43da-8fe0-f279d08d5bbf" />

---

## Como funciona

A máquina utiliza estados que representam o valor acumulado:

```text
q0   → 0 centavos
q5   → 5 centavos
q10  → 10 centavos
q15  → 15 centavos
q20  → 20 centavos
q25  → 25 centavos
```

---

# Tecnologias utilizadas

## Frontend

<div align="center">

[![My Skills](https://skillicons.dev/icons?i=react,typescript,vite,css)](https://skillicons.dev)

</div>

- **React** — construção da interface e componentes
- **TypeScript** — tipagem e implementação da lógica
- **Vite** — ambiente de desenvolvimento e build
- **CSS** — estilização, layout e responsividade

---

## Modelagem do Autômato

<div align="center">


</div>

- **JFLAP** — criação, visualização e testes do autômato
- **Máquina de Mealy** — modelo utilizado para representar as transições e saídas
- **Autômato Finito com Saída** — modelagem formal da máquina de vendas
---
# Sprites

<div align="center">

Todas as sprites utilizadas no projeto foram criadas por mim utilizando o **Aseprite**.

</div>

As **sprites** são imagens utilizadas para representar visualmente os
elementos do projeto. Neste caso, elas foram utilizadas para compor a
interface da máquina de vendas, representar as moedas e criar o personagem
presente na tela inicial.

## O Velho

O personagem presente na tela inicial foi criado para representar o dono da
máquina de vendas e introduzir o jogador à aplicação.

<div align="center"> <img src="./src/assets/Oldman.png" width="400" alt="Sprite do Velho"> </div>

## Máquina de vendas

A sprite principal representa a parte frontal da máquina de vendas.

<div align="center">

<img src="./src/assets/VendingFront.png" width="250" alt="Sprite da frente da máquina de vendas">

</div>

## Saída do produto

Essa sprite representa o compartimento onde o produto é entregue ao jogador.

<div align="center">

<img src="./src/assets/VendingOutput.png" width="350" alt="Sprite da saída do produto">

</div>

## Moedas

As moedas aceitas pela máquina também foram criadas individualmente como
sprites.

<div align="center">

<img src="./src/assets/5coin.png" width="120" alt="Sprite da moeda de 5 centavos">
<img src="./src/assets/10coin.png" width="120" alt="Sprite da moeda de 10 centavos">
<img src="./src/assets/25coin.png" width="120" alt="Sprite da moeda de 25 centavos">

</div>

As três sprites representam as entradas aceitas pelo autômato:

```text
5¢  → moeda de 5 centavos
10¢ → moeda de 10 centavos
25¢ → moeda de 25 centavos
```
---

<div align="center">

By: João Paulo Kowalski

</div>
