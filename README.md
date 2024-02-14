### Programas necessários e plugins recomendados:

- Node 20 ou acima
- Plugin docker
- Plugin Prisma para vscode

### configurações iniciais do servidor:

- instalação das libs: `typescript`, `@types/node` e `tsx` em dev
- inicializar typescript: `npx tsc --init`
- [configuração tsconfig de acordo com a versão do node](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping)
- criação script para transformar ts para js e atualizar a cada alteração
- instalação do `fastify` (framework para criação de api de maneira simplificada)

### configuração do ORM Prisma:

- instalação do `prisma` em dev
- inicialização/configuração inicial do prisma `npx prisma init`
- edição do .env de acordo com o usuário e nome do banco criado
