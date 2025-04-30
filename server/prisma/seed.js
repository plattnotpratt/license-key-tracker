const { PrismaClient, ClergyType } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearTable(){
    await prisma.product.deleteMany({});
    await prisma.clergy.deleteMany({});
    await prisma.ministry.deleteMany({});
    await prisma.mass.deleteMany({});
    await prisma.branding.deleteMany({});
    await prisma.address.deleteMany({});
    await prisma.general.deleteMany({});
    await prisma.article.deleteMany({});
    await prisma.event.deleteMany({});
    await prisma.bulletin.deleteMany({});
    await prisma.church.deleteMany({});
    await prisma.user.deleteMany({});
}

async function addUser(){
  await prisma.user.create({
    data:{
      id: 1,
      photo:'https://lh3.googleusercontent.com/a/ACg8ocJS9axdX9EDDarvsrxaKwTnwsB0_n5E_LYMI8KAwtVVYj8EkWg=s96-c',
      fname: 'John',
      lname: 'Doe',
      email: 'test@google.com',
      provider: 'google',
      providerId: '114646459561880335694'
    }
  })
}


//function seeds the database with the state information present in states.js
async function main(){
    await clearTable();
    await addUser();
}
main()

// main().catch(e => {
//     console.log(e);
//     process.exit(1)
// }).finally(()=> {
//     prisma.$disconnect();
// })
