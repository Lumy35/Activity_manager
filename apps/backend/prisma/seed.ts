import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, TaskStatus } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});
async function main() {
  console.log('🌱 Iniciando o semeio de dados (Seed)...');

  await prisma.task.deleteMany();
  await prisma.sprint.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Banco limpo com sucesso.');

  const userTL = await prisma.user.create({
    data: {
      name: 'Carlos Silva',
      role: 'Tech Lead / Full Stack',
    },
  });

  const userBE = await prisma.user.create({
    data: {
      name: 'Ana Souza',
      role: 'Backend Developer (Java)',
    },
  });

  const userFE = await prisma.user.create({
    data: {
      name: 'Lucas Lima',
      role: 'Frontend Developer (React)',
    },
  });

  console.log('👥 Usuários criados.');

  const hoje = new Date();

  const inicioSprintAtual = new Date(hoje);
  inicioSprintAtual.setDate(hoje.getDate() - 4);

  const fimSprintAtual = new Date(hoje);
  fimSprintAtual.setDate(hoje.getDate() + 3);

  const dataCriacaoPassada = new Date(inicioSprintAtual);
  dataCriacaoPassada.setHours(inicioSprintAtual.getHours() + 2);

  const dataEscopoAdicionado = new Date(hoje);
  dataEscopoAdicionado.setDate(hoje.getDate() - 1);

  const prazoAtrasado = new Date(hoje);
  prazoAtrasado.setDate(hoje.getDate() - 1);

  const prazoFuturo = new Date(fimSprintAtual);

  const sprintAtual = await prisma.sprint.create({
    data: {
      description: 'Sprint 02 - Core & Kanban Board Layout',
      startDate: inicioSprintAtual,
      endDate: fimSprintAtual,
    },
  });

  const sprintAntiga = await prisma.sprint.create({
    data: {
      description: 'Sprint 01 - Inicialização do Monorepo',
      startDate: new Date(
        inicioSprintAtual.getTime() - 14 * 24 * 60 * 60 * 1000,
      ),
      endDate: new Date(inicioSprintAtual.getTime() - 7 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('📅 Sprints estruturadas.');

  await prisma.task.createMany({
    data: [
      {
        description:
          'Modelagem do banco de dados relacional e criação das migrations do Prisma 7',
        status: TaskStatus.DONE,
        dueDate: prazoFuturo,
        createdAt: dataCriacaoPassada,
        completedAt: hoje,
        userId: userBE.id,
        sprintId: sprintAtual.id,
      },
      {
        description:
          'Configuração inicial do boilerplate NestJS e isolamento de módulos estruturais',
        status: TaskStatus.DONE,
        dueDate: prazoFuturo,
        createdAt: dataCriacaoPassada,
        completedAt: hoje,
        userId: userTL.id,
        sprintId: sprintAtual.id,
      },

      {
        description:
          'Construção dos Custom Hooks para isolamento das regras de negócio do Dashboard',
        status: TaskStatus.IN_PROGRESS,
        dueDate: prazoFuturo,
        createdAt: dataCriacaoPassada,
        userId: userFE.id,
        sprintId: sprintAtual.id,
      },
      {
        description:
          'Ajuste de interceptors do Axios no front-end para tratamento global de erros HTTP',
        status: TaskStatus.IN_PROGRESS,
        dueDate: prazoAtrasado,
        createdAt: dataCriacaoPassada,
        userId: userFE.id,
        sprintId: sprintAtual.id,
      },

      {
        description:
          'Integração do serviço de e-mail automatizado para notificação de tarefas vencidas',
        status: TaskStatus.BLOCKED,
        dueDate: prazoFuturo,
        createdAt: dataCriacaoPassada,
        userId: userBE.id,
        sprintId: sprintAtual.id,
      },

      {
        description:
          'Ajustar regras do CORS no back-end para aceitar chamadas locais do servidor Vite',
        status: TaskStatus.DONE,
        dueDate: hoje,
        createdAt: dataEscopoAdicionado,
        completedAt: hoje,
        userId: userTL.id,
        sprintId: sprintAtual.id,
      },
      {
        description:
          'Refatoração emergencial nos DTOs de Task para aceitar strings ISO8601 nativas',
        status: TaskStatus.BACKLOG,
        dueDate: prazoFuturo,
        createdAt: dataEscopoAdicionado,
        userId: userBE.id,
        sprintId: sprintAtual.id,
      },
    ],
  });

  await prisma.task.create({
    data: {
      description:
        'Definição da arquitetura e pacotes compartilhados dentro do workspace pnpm',
      status: TaskStatus.DONE,
      createdAt: sprintAntiga.startDate,
      completedAt: sprintAntiga.endDate,
      sprintId: sprintAntiga.id,
      userId: userTL.id,
    },
  });

  console.log('📋 Tarefas populadas e vinculadas aos cenários de teste.');
  console.log('✨ Seed finalizado com absoluto sucesso!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Erro ao rodar o Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
