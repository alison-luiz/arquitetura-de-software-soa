# Sistema SOA para Análise de Tendência de Nomes no Brasil

# Alunos

- Alison Luiz da Silva - RA: 22033281-2
- Andre Fragalli Vassoler - RA: 22012716-2
- Vagner Rodrigues Calado Junior - RA: 22014296-2

## 📋 Descrição

Este projeto implementa um sistema orientado a serviços (SOA) que consome a API de nomes do IBGE para fornecer análises de tendências de nomes próprios no Brasil ao longo das décadas.

## 🎯 Funcionalidades

### 1. Evolução do Ranking de um Nome

- Consulta da evolução do ranking de um nome específico em um intervalo de décadas
- Visualização através de gráficos interativos
- Período personalizável (ex: 1970 a 2000)

### 2. Evolução do Ranking de Nomes em uma Localidade

- Seleção de localidade (UF ou município)
- Exibição dos três nomes mais frequentes ao longo das décadas
- Apresentação dos dados em formato tabular

### 3. Comparação de Dois Nomes ao Longo do Tempo

- Comparação da popularidade de dois nomes em todo o Brasil
- Análise desde a década de 1930 até a mais recente
- Visualização através de gráficos comparativos

## 🏗️ Arquitetura SOA

### Componentes do Sistema

- **Interface do Usuário (UI)**: Frontend responsável pela interação com o usuário
- **Serviço de Consulta**: Responsável pela comunicação com a API do IBGE
- **Serviço de Análise**: Processa e analisa os dados recebidos
- **Serviço de Visualização**: Gera as representações gráficas e tabulares

### Princípios SOA Aplicados

- **Desacoplamento**: Componentes independentes e comunicantes via REST
- **Reutilização**: Serviços modulares e reutilizáveis
- **Interoperabilidade**: Comunicação padronizada entre serviços
- **Escalabilidade**: Arquitetura que permite adição de novos serviços

## 🚀 Tecnologias Utilizadas

- Frontend: ReactJS
- Backend: NestJS
- Bibliotecas de Visualização: chart.js
- API: IBGE Nomes

## 🛠️ Como Executar o Projeto

### Backend (API)

```bash
cd api
yarn install
yarn start:dev
```

### Frontend (Web)

```bash
cd web
npm install
npm start
```

## 📸 Imagens do Projeto

![image](https://github.com/user-attachments/assets/a4c1c33d-14e7-415d-8c77-74786a15e00c)

![image](https://github.com/user-attachments/assets/b1c83679-8a45-421f-87ea-aa2d7862a396)

![image](https://github.com/user-attachments/assets/30f6b566-cc80-4351-b3e2-4b6110e459ef)

