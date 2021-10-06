const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // await prisma.plan.create({
  //   data: {
  //     title: 'Personal Pro',
  //     price: 1299,

  //   }
  // })

  // await prisma.user.update({
  //   where: {
  //     id: 1,
  //   },
  //   data: {
  //     plans: {
  //       disconnect: {
  //         id: 1,
  //       },
  //     },
  //   },
  // })


  // await prisma.user.update({
  //   where: {
  //     id: 689,
  //   },
  //   data: {
  //     plans: {
  //       connect: {
  //         id: 4,
  //       },
  //     },
  //   },
  // })



  // await prisma.plan.upsert({
  //   where: {title: 'Personal'},
  //   update: {},
  //   create: {
  //     title: 'Personal',
  //     price: 0,
  //   }
  // })

  // await prisma.plan.create({
  //   data: {
  //     title: 'Personal Pro (Life time)',
  //     price: 149.99,
  //     priceId: "price_1J3j0BDgkaVS9Y01HJaHnezV"
  //   }
  // })


  // await prisma.plan.create({
  //   data: {
  //     title: 'Personal Pro (Monthly)',
  //     price: 12.99,
  //     priceId: "price_1J5wDtDgkaVS9Y01gqx2YuiE"
  //   }
  // })

  // await prisma.plan.create({
  //   data: {
  //     title: 'Personal Pro (Yearly)',
  //     price: 12.99,
  //     priceId: "price_1J5wDtDgkaVS9Y01vCrkAVtN"
  //   }
  // })


  // await prisma.plan.delete({
  //   where: {
  //     title: 'Personal'
  //   }
  // })



  // await prisma.course.upsert({
  //   where: { title: 'How to build awesome dbs with Prisma' },
  //   update: {},
  //   create: {
  //     title: 'How to build awesome dbs with Prisma',
  //     description: 'Prisma is an amazing query builder and so much more!',
  //     price: 0,
  //     slug: 'how-to-build-awesome-dbs-with-prisma',
  //     lessons: {
  //       create: [
  //         {
  //           title: 'How do relationships work?',
  //           description:
  //             'You can model relationships in multiple ways in Prisma',
  //           videoUrl: 'https://www.youtube.com/watch?v=PFljjv6j_YM',
  //           slug: 'how-do-relationships-work',
  //         },
  //         {
  //           title: 'Seeding data with a js file',
  //           description:
  //             'Building fake records is as easy as putting them in a seed.js file',
  //           videoUrl: 'https://www.youtube.com/watch?v=PFljjv6j_YM',
  //           slug: 'seeding-data-with-a-js-file',
  //         },
  //       ],
  //     },
  //   },
  // })
  // await prisma.course.upsert({
  //   where: { title: 'Static Site Generation with Next.js' },
  //   update: {},
  //   create: {
  //     title: 'Static Site Generation with Next.js',
  //     description: 'Use Next.js to generate an entire site at build time!',
  //     price: 0,
  //     slug: 'static-site-generation-with-nextjs',
  //     lessons: {
  //       create: [
  //         {
  //           title: 'Using getStaticProps to generate static content',
  //           description:
  //             'You can model relationships in multiple ways in Prisma',
  //           videoUrl: 'https://www.youtube.com/watch?v=PFljjv6j_YM',
  //           slug: 'using-getstaticprops-to-generate-static-content',
  //         },
  //         {
  //           title: 'Using getStaticPaths to generate static pages',
  //           description:
  //             'Building fake records is as easy as putting them in a seed.js file',
  //           videoUrl: 'https://www.youtube.com/watch?v=PFljjv6j_YM',
  //           slug: 'using-getstaticpaths-to-generate-static-pages',
  //         },
  //       ],
  //     },
  //   },
  // })
  // await prisma.course.upsert({
  //   where: { title: 'Getting real with GraphQL' },
  //   update: {},
  //   create: {
  //     title: 'Getting real with GraphQL',
  //     description: 'How to build real-world applications with GraphQL',
  //     price: 30000,
  //     slug: 'getting-real-with-graphql',
  //     lessons: {
  //       create: [
  //         {
  //           title: 'Fetching data with queries',
  //           description:
  //             'You can model relationships in multiple ways in Prisma',
  //           videoUrl: 'https://www.youtube.com/watch?v=PFljjv6j_YM',
  //           slug: 'fetching-data-with-queries',
  //         },
  //         {
  //           title: 'Updating state with mutations',
  //           description:
  //             'Building fake records is as easy as putting them in a seed.js file',
  //           videoUrl: 'https://www.youtube.com/watch?v=PFljjv6j_YM',
  //           slug: 'updating-state-with-mutations',
  //         },
  //       ],
  //     },
  //   },
  // })
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
