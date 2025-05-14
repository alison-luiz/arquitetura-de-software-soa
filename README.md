# Sistema SOA para Análise de Tendência de Nomes no Brasil

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

- Frontend:
- Backend: NestJS
- Bibliotecas de Visualização:
- API: IBGE Nomes
