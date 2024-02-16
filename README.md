![Captura de tela_2024-02-16_14-21-58](https://github.com/savio777/nlw-api-2024/assets/35678887/64a405c5-ee32-4bfe-a3fe-c1bf1191abb7)

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
- criação de tabelas no `schema.prisma`
- criação de scripts de manipulações de migrations

### próximos passos:

- [x] criar endpoints de get por id e todas as votações com contadores de votos
- [ ] organização de rotas com prefixo na base da rota
- [ ] tratativa de erros
- [ ] middleware se usuário está validado e já salvar cookies previamente
