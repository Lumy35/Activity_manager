# 📊 Activity Manager --- Gestão de Atividades e Indicadores de Time

O **Activity Manager** é uma aplicação para organização e acompanhamento
do trabalho de equipes, criada para resolver problemas comuns de gestão:
falta de visibilidade sobre atividades em andamento, distribuição
desigual de tarefas, atrasos percebidos apenas após acontecerem e
decisões tomadas sem dados.

A solução combina um fluxo visual baseado em **Kanban**, organização de
entregas por **Sprints** e um dashboard com indicadores que auxiliam o
gestor na tomada de decisão.

---

# 🧭 1. Caminho escolhido: Kanban, Scrum e Metas

A solução utiliza uma combinação de conceitos de **Scrum** e **Kanban**,
adaptados ao contexto do problema apresentado.

## Scrum / Sprints

O trabalho é organizado em ciclos de entrega (**Sprints**) com:

- data inicial;
- data final;
- conjunto de atividades planejadas.

A escolha foi feita porque ciclos curtos permitem que o gestor avalie
progresso, compare planejamento com execução e ajuste prioridades antes
que problemas cresçam.

## Kanban

Dentro de cada Sprint, as atividades são visualizadas em um quadro
Kanban com os estados:

- `BACKLOG`
- `IN_PROGRESS`
- `BLOCKED`
- `DONE`

Essa abordagem resolve a falta de visibilidade do trabalho, permitindo
identificar rapidamente:

- tarefas em andamento;
- tarefas paradas;
- gargalos;
- atividades concluídas.

## Metas

As metas aparecem através das entregas planejadas para cada Sprint. O
objetivo não é apenas acompanhar tarefas individuais, mas entender se o
time está avançando em direção aos resultados esperados.

---

# 📈 2. Indicadores escolhidos (KPIs)

Os indicadores foram escolhidos pensando na pergunta principal:

> "Qual decisão o gestor consegue tomar olhando esse número?"

## Taxa de conclusão da Sprint

**O que mede:**

Percentual de tarefas concluídas em relação ao total planejado para a
Sprint.

**Decisão do gestor:**

Ajuda a entender a capacidade real do time. Caso a taxa esteja baixa
constantemente, o gestor pode reduzir escopo, revisar prioridades ou
identificar impedimentos no planejamento.

---

## Alteração de escopo durante a Sprint

**O que mede:**

Quantidade de atividades adicionadas depois que a Sprint iniciou.

**Decisão do gestor:**

Mostra se o planejamento está sendo respeitado ou se o time está
sofrendo muitas interrupções. Um número alto indica necessidade de
melhorar refinamento, alinhamento com clientes ou definição de
prioridades.

---

## Índice de impedimentos

**O que mede:**

Quantidade de tarefas bloqueadas no fluxo.

**Decisão do gestor:**

Permite identificar rapidamente problemas que impedem o avanço do time,
como dependências externas, falta de informações ou necessidade de
decisões.

---

## Distribuição de carga por integrante

**O que mede:**

Quantidade de tarefas atribuídas e progresso individual dos membros.

**Decisão do gestor:**

Ajuda a identificar sobrecarga ou ociosidade, permitindo redistribuir
atividades antes que isso impacte prazo e qualidade.

---

# 💻 3. Stack escolhida

A stack foi escolhida buscando produtividade, organização arquitetural e
segurança através de tipagem estática.

## NestJS

Utilizado no backend por fornecer uma arquitetura modular baseada em:

- módulos;
- controllers;
- services;
- injeção de dependência.

A estrutura facilita manutenção e crescimento da aplicação.

## Prisma ORM

Utilizado para comunicação com PostgreSQL.

Motivos:

- tipagem automática baseada no schema;
- segurança em tempo de desenvolvimento;
- produtividade para criação das operações de banco.

## ReactJS + Vite

Utilizado no frontend para criação da interface.

Motivos:

- desenvolvimento rápido;
- componentes reutilizáveis;
- boa experiência para aplicações dinâmicas como Kanban e dashboards.

## PNPM Workspace

O projeto utiliza monorepo com PNPM para organizar frontend e backend em
uma única estrutura.

---

# 🏗️ Decisões e cortes realizados

Durante o desenvolvimento algumas decisões foram tomadas para priorizar
o valor principal da aplicação.

## Gestão de usuários

O CRUD visual completo de usuários foi deixado fora do escopo inicial.

Os usuários são criados através do `seed` do banco, permitindo iniciar a
aplicação com dados reais de demonstração.

Motivo:

Priorizar as funcionalidades principais:

- gerenciamento de atividades;
- fluxo Kanban;
- indicadores.

---

## Dashboard focado em decisão

Os indicadores foram priorizados em relação a uma grande quantidade de
gráficos.

A intenção foi evitar métricas apenas visuais e manter somente
informações que ajudam o gestor a agir.

---

## Atualização otimista no Kanban

Ao mover uma atividade no quadro, a interface atualiza imediatamente e
sincroniza com a API.

Essa decisão melhora a experiência de uso, reduzindo a sensação de
lentidão.

---

# 🚀 Como executar o projeto

## Pré-requisitos

Necessário ter instalado:

- Docker
- Docker Compose
- Git

---

## Clonar o projeto

```bash
git clone git@github.com:Lumy35/Activity_manager.git

cd Activity_manager
```

---

## Executar aplicação

Na raiz do projeto:

```bash
docker compose up --build
```

O Docker irá:

1.  criar o banco PostgreSQL;
2.  instalar dependências;
3.  gerar o Prisma Client;
4.  executar migrations;
5.  executar o seed com dados de exemplo;
6.  iniciar backend e frontend.

---

# 🌐 Acessos

Frontend:

    http://localhost:5173

Backend:

    http://localhost:3000

---

# 📌 Dados de exemplo

A aplicação inicia com dados simulados para demonstrar:

- equipe cadastrada;
- atividades distribuídas;
- tarefas bloqueadas;
- tarefas concluídas;
- cenários de análise no dashboard.

---

# 🔮 Melhorias futuras

Com mais tempo, seriam implementadas:

- autenticação e controle de acesso;
- CRUD completo de usuários;
- notificações de prazo;
- histórico de movimentação das tarefas;
- relatórios mais avançados;
- integração com ferramentas externas de gestão.
