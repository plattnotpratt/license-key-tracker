## Set up PostgreSQL by Docker Compose
If you have Docker installed, you can use the following command to start a MYSQL Database:

` docker-compose -f docker-compose.dev.yml up -d --wait `

### Prisma Setup
Use the following command to generate the Prisma client:

` npx prisma migrate dev `
