const {green, red} = require('chalk')
const {db} = require('../server/db')
const Product = require('../server/db/models/product')
const User = require('../server/db/models/user')

const seed = async () => {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    //product seeding
    const products = [
      {
        name: 'Pink Citron Peacock Diagonal Stripe On Triangle Earring',
        description:
          'Part of our signature seed bead collection, these amazing fringe earrings offer a unique look as they hang from a brass triangle at the top. They are handcrafted by artisans in India and are sure to add an effortlessly cool edge to any modern boho look.',
        category: 'Beaded',
        imageUrl: './public/img/Beaded_1_Pink-Citron-Peacock.jpg',
        price: 30.0,
        inventory: 25
      },
      {
        name: 'Peacock Rust Citron Fringe Earring',
        description:
          'Part of our signature seed bead collection, these amazing fringe earrings offer a unique look as they hang from a brass triangle at the top. They are handcrafted by artisans in India and are sure to add an effortlessly cool edge to any modern boho look.',
        category: 'Beaded',
        imageUrl: './public/img/Beaded_2_Peacock-Rust-Citron.jpg',
        price: 30.0,
        inventory: 25
      },
      {
        name: 'Gold Petite Luxe Earring',
        description:
          'Part of our luxe collection accessories, the luxe petite fringe earring is hand crafted by artisans in India. Delicate glass beads with an elegant shimmer are woven for a luminous, lightweight and effortlessy cool beaded statement accessory - a must for those who love their everyday delicates with a touch of evening elegance.',
        category: 'Beaded',
        imageUrl: './public/img/Beaded_3_Gold-Petite-Luxe.jpg',
        price: 30.0,
        inventory: 25
      },
      {
        name: 'Gold Petite Luxe Earring',
        description:
          'Part of our luxe collection accessories, the luxe petite fringe earring is hand crafted by artisans in India. Delicate glass beads with an elegant shimmer are woven for a luminous, lightweight and effortlessy cool beaded statement accessory - a must for those who love their everyday delicates with a touch of evening elegance.',
        category: 'Beaded',
        imageUrl: './public/img/Beaded_3_Gold-Petite-Luxe.jpg',
        price: 30.0,
        inventory: 25
      },
      {
        name: 'Confetti Small Hoop Earring',
        description: `A smaller take on our signature seed bead hoop earrings, the gold small hoop seed bead earring is a style that's sure to make a simple statement. The lightweight silhouette ensures easy wear, day or night. Crafted in India by skilled artisans, these glass seed bead earrings are sure to make you look effortlessly cool.`,
        category: 'Beaded',
        imageUrl: './public/img/Beaded_4_Confetti-Small-Hoop.jpg',
        price: 25.0,
        inventory: 50
      },
      {
        name: 'Muted Confetti Button Post Beaded Earring',
        description: `The seed bead button post earring is a style that's perfect for any occasion. Part of our seed bead collection crafted by skilled artisans in India, the simple statement accessory adds a pop of color to any outfit. Channel your inner boho with this simple and effortlessly cool statement accessory.`,
        category: 'Beaded',
        imageUrl: './public/img/Beaded_5_Muted-Confetti-Button.jpg',
        price: 20.0,
        inventory: 100
      },
      {
        name: 'Scarlet & Magenta Luxe Diamond Earring',
        description: `Part of our luxe collection the scarlet and magenta diamond earring is hand crafted by artisans in India. Delicate glass beads with an elegant shimmer are woven for an effortlessly cool beaded statement accessory - a must for those who love their everyday delicates with a touch of evening elegance.`,
        category: 'Beaded',
        imageUrl: './public/img/Beaded_6_Scarlet-Magenta-Luxe.jpg',
        price: 35.0,
        inventory: 25
      },
      {
        name: 'Ivory Fringe Beaded Earring',
        description: `Effortlessly cool earrings are a must have in everyone’s wardrobe. Part of our petite seed bead collection, the petite fringe seed bead earrings are a one-and-done stunner. Throw these on with your favorite tee and jeans and you're ready for whatever the day brings. Crafted in India by skilled artisans.`,
        category: 'Beaded',
        imageUrl: './public/img/Beaded_7_Ivory-Fringe-Beaded.jpg',
        price: 20.0,
        inventory: 100
      },
      {
        name: 'Port And Gold Button Post Earring',
        description: `The seed bead button post earring is a style that's perfect for any occasion. Part of our seed bead collection crafted by skilled artisans in India, the simple statement accessory is a perfect combo of girly and tomboy. Channel your inner boho with this simple and effortlessly cool statement accessory.`,
        category: 'Beaded',
        imageUrl: './public/img/Beaded_8_Port-Gold-Button.jpg',
        price: 20.0,
        inventory: 100
      },
      {
        name: 'White And Gold Button Post Beaded Earring',
        description: `The seed bead button post earring is a style that's perfect for any occasion. Part of our seed bead collection crafted by skilled artisans in India, the simple statement accessory is a perfect combo of girly and tomboy. Channel your inner boho with this simple and effortlessly cool statement accessory.`,
        category: 'Beaded',
        imageUrl: './public/img/Beaded_9_White-Gold-Button.jpg',
        price: 20.0,
        inventory: 100
      },
      {
        name: 'Hot Pink With Coral Small Hoop Seed Bead Earring',
        description: `A smaller take on our signature seed bead hoop earrings, the color block small hoop seed bead earring is a style that's sure to make a simple statement. The lightweight silhouette ensures easy wear, day or night. Crafted in India by skilled artisans, these glass seed bead earrings are sure to make you look effortlessly cool.`,
        category: 'Beaded',
        imageUrl: './public/img/Beaded_10_Hot-Pink-Coral.jpg',
        price: 25.0,
        inventory: 75
      },
      {
        name: 'Black And Brass Ceramic Spike Earring',
        description: `The brass ceramic spike earring is a sleek accessory with modern flair that exceeds any expectations of a standard dangle earring. The ceramic elongated accent adds a unique aspect to this statement earring. Our signature ceramic collection is crafted in India by skilled artisans.`,
        category: 'Brass',
        imageUrl: './public/img/Brass_1.jpg',
        price: 45.0,
        inventory: 25
      },
      {
        name: 'Terra Cotta And Brass Ceramic Pendulum Earring',
        description: `With a distinctive silhouette, the brass ceramic pendulum earring is an impactful accessory with modern flair that far exceeds the expectation of a standard dangle post. The ceramic accent adds a unique aspect to this statement earring. Our signature ceramic collection is crafted in India by skilled artisans.`,
        category: 'Brass',
        imageUrl: './public/img/Brass_2.jpg',
        price: 40.0,
        inventory: 25
      },
      {
        name: 'Black And Brass Ceramic Half Circle Post Earring',
        description: `Our signature ceramic collection is crafted in India by skilled artisans. The brass and ceramic half circle post earring is a modern and bold statement accessory. This trendy sculptural shape transitions effortlessly from the office to evening.`,
        category: 'Brass',
        imageUrl: './public/img/Brass_3.jpg',
        price: 35.0,
        inventory: 50
      },
      {
        name: 'Terra Cotta And Brass Ceramic Half Circle Post Earring',
        description: `Our signature ceramic collection is crafted in India by skilled artisans. The brass and ceramic half circle post earring is a modern and bold statement accessory. This trendy sculptural shape transitions effortlessly from the office to evening.`,
        category: 'Brass',
        imageUrl: './public/img/Brass_4.jpg',
        price: 35.0,
        inventory: 50
      },
      {
        name: 'Black And Brass Ceramic Hoop Earring',
        description: `Our signature ceramic collection is crafted in India by skilled artisans. The brass and ceramic half circle post earring is a modern and bold statement accessory. This trendy sculptural shape transitions effortlessly from the office to evening.`,
        category: 'Brass',
        imageUrl: './public/img/Brass_5.jpg',
        price: 35.0,
        inventory: 50
      },
      {
        name: 'Brass Small Star Earrings',
        description: `Our small star brass post earrings make a bold statement. Part of our brass collection, these earrings add shine to any outfit. Our brass collection is crafted in India by skilled artisans and molded into modern statement pieces.`,
        category: 'Brass',
        imageUrl: './public/img/Brass_6.jpg',
        price: 30.0,
        inventory: 50
      },
      {
        name: 'Small Heart Post Brass Earring',
        description: `Looking for a cute, simple everyday pair of earrings? Look no further than the small heart post earrings. Part of our signature brass collection that is crafted in India, these earrings are effortlessly cool in any setting.`,
        category: 'Brass',
        imageUrl: './public/img/Brass_7.jpg',
        price: 30.0,
        inventory: 50
      },
      {
        name: 'Matte Brass Rainbow Earring',
        description: `Part of our brass collection, these earrings are made by artisans in India from uncycled brass. Inspired by nature and its rainbows, the rainbow dangle earring features a unique sillouhette that adds an effortlessly cool statement to any outfit.`,
        category: 'Brass',
        imageUrl: './public/img/Brass_8.jpg',
        price: 55.0,
        inventory: 15
      },
      {
        name: 'Cobalt Burst Brass Earring',
        description: `Part of our brass collection, these earrings are made by artisans in India from upcycled brass. By incorporating both sides of the earring, they feature a unique sillouhette that adds an effortlessly cool statement to any outfit.`,
        category: 'Brass',
        imageUrl: './public/img/Brass_9.jpg',
        price: 45.0,
        inventory: 25
      },
      {
        name: 'Palm Leaf Drop Brass Earring',
        description: `Taking a cue from nature, the brass palm leaf earrings are a must for those who love a statement accessory and can't get enough of nature-inspired pieces. Our brass collection is crafted in India by skilled artisans and molded into modern statement pieces that add boldness to any outfit.`,
        category: 'Brass',
        imageUrl: './public/img/Brass_10.jpg',
        price: 60.0,
        inventory: 15
      },
      {
        name: 'Chartreuse Hoop Lucite Earring',
        description: `Ready to elevate everything? Crafted in India by skilled artisans, our lucite collection is molded into modern geometric shapes. The lightweight lucite hoop earrings will add flare to any outfit. These of-the-moment extras are perfect for the office or everyday.`,
        category: 'Lucite & Resin',
        imageUrl: './public/img/LR_1.jpg',
        price: 20.0,
        inventory: 50
      },
      {
        name: 'Chartreuse Clear Rectangle Half-Round Lucite Earring',
        description: `Our lucite rectangle with double half-round earrings feature bold shapes that dangle from a brass hoop. Crafted in India by skilled artisans and molded into modern geometric statement accessories, these statement earrings are the perfect addition to your modern boho wardrobe.`,
        category: 'Lucite & Resin',
        imageUrl: './public/img/LR_2.jpg',
        price: 20.0,
        inventory: 50
      },
      {
        name: 'Watermelon Clear Double Half Round Lucite Earring',
        description: `Our lucite collection is crafted in India by skilled artisans and molded into modern geometric statement accessories. The lucite double half-round earrings add a dose of modern flair to your effortlessly cool wardrobe. The bold shapes make a statement for every day and any occasion.`,
        category: 'Lucite & Resin',
        imageUrl: './public/img/LR_3.jpg',
        price: 20.0,
        inventory: 50
      },
      {
        name: 'Clear Double Half Round Lucite Earring',
        description: `Our lucite collection is crafted in India by skilled artisans and molded into modern geometric statement accessories. The lucite double half-round earrings add a dose of modern flair to your effortlessly cool wardrobe. The bold shapes make a statement for every day and any occasion.`,
        category: 'Lucite & Resin',
        imageUrl: './public/img/LR_4.jpg',
        price: 20.0,
        inventory: 50
      },
      {
        name: 'Turquoise Clear Rectangle Half-Round Lucite Earring',
        description: `Our lucite rectangle with double half-round earrings feature bold shapes that dangle from a brass hoop. Crafted in India by skilled artisans and molded into modern geometric statement accessories, these statement earrings are the perfect addition to your modern boho wardrobe.`,
        category: 'Lucite & Resin',
        imageUrl: './public/img/LR_5.jpg',
        price: 20.0,
        inventory: 50
      },
      {
        name: 'Turquoise Clear Rectangle Half-Round Lucite Earring',
        description: `Our lucite rectangle with double half-round earrings feature bold shapes that dangle from a brass hoop. Crafted in India by skilled artisans and molded into modern geometric statement accessories, these statement earrings are the perfect addition to your modern boho wardrobe.`,
        category: 'Lucite & Resin',
        imageUrl: './public/img/LR_5.jpg',
        price: 20.0,
        inventory: 50
      },
      {
        name: 'White Wood Hoop Earring',
        description: `Part of our wood collection, these earrings feature materials sourced from India and the Philippines and are all handcrafted in our Atlanta studio. They make for a simple yet chic boho addition to any look.`,
        category: 'Wood',
        imageUrl: './public/img/Wood_1.jpg',
        price: 35.0,
        inventory: 40
      },
      {
        name: 'White Ball On Stick Earring',
        description: `Part of our wood collection, these earrings feature materials sourced from India and the Philippines and are all handcrafted in our Atlanta studio. They make for a simple yet chic boho addition to any look.`,
        category: 'Wood',
        imageUrl: './public/img/Wood_2.jpg',
        price: 35.0,
        inventory: 40
      },
      {
        name: 'Drop White Wood And Brass Earring',
        description: `Part of our wood collection, these earrings feature materials sourced from India and the Philippines and are all handcrafted in our Atlanta studio. They make for a simple yet chic boho addition to any look.`,
        category: 'Wood',
        imageUrl: './public/img/Wood_3.jpg',
        price: 35.0,
        inventory: 0
      },
      {
        name: 'White Hoop Wood And Resin Earring',
        description: `Our wood + resin collection is equal parts simple and bold. The wood and resin hoops combine wood and resin to create a unique and inspired look. Crafted in India by skilled artisans.`,
        category: 'Wood',
        imageUrl: './public/img/Wood_4.jpg',
        price: 35.0,
        inventory: 0
      },
      {
        name: 'Red Hoop Wood And Resin Earring',
        description: `Our wood + resin collection is equal parts simple and bold. The wood and resin hoops combine wood and resin to create a unique and inspired look. Crafted in India by skilled artisans.`,
        category: 'Wood',
        imageUrl: './public/img/Wood_5.jpg',
        price: 35.0,
        inventory: 40
      },
      {
        name: 'Red Post Wood And Resin Earring',
        description: `Our wood + resin collection is a must for those who love their everyday delicates with a touch of bold artistry. The wood and resin circle post features a molded resin half combined with a wooden semicircle. Wear to add modern flair to any outfit. Crafted by skilled artisans in India.`,
        category: 'Wood',
        imageUrl: './public/img/Wood_6.jpg',
        price: 35.0,
        inventory: 40
      },
      {
        name: 'Champagne Leather Circles Earring',
        description: `Lightweight, simple yet bold, the leather circles earring is a modern accessory, easy to wear with any outfit. These one-and-done stunners are perfect alone or with your other INK + ALLOY favorites. Crafted in Atlanta by skilled artisans.`,
        category: 'Leather',
        imageUrl: './public/img/Leather_1.jpg',
        price: 40.0,
        inventory: 25
      },
      {
        name: 'Champagne Leather Hoop Earring',
        description: `Elevate your look by adding style to any outfit with the unique silhouette of the double diamond leather earring. Part of the leather collection, these effortlessly cool statement earrings are handcrafted in Atlanta, Georgia by skilled artisans.`,
        category: 'Leather',
        imageUrl: './public/img/Leather_2.jpg',
        price: 40.0,
        inventory: 25
      },
      {
        name: 'Black Camel Geo Dangle Leather Earring',
        description: `Elevate your look by adding style to any outfit with the geo dangle leather earrings. Our leather collection is crafted in Atlanta, Georgia by skilled artisans and designed to be modern statement pieces.`,
        category: 'Leather',
        imageUrl: './public/img/Leather_3.jpg',
        price: 40.0,
        inventory: 25
      },
      {
        name: 'Indigo Small Circle With Blush Half Circles Leather Earring',
        description: `Elevate your look by adding style to any outfit with the small half-circles leather earrings. Our leather collection is crafted in Atlanta, Georgia by skilled artisans and designed to be modern statement pieces.`,
        category: 'Leather',
        imageUrl: './public/img/Leather_4.jpg',
        price: 40.0,
        inventory: 25
      },
      {
        name: 'Black Circle With Brass Leather Earring',
        description: `Lightweight, simple yet bold, the leather circle with brass post earring is a modern accessory, easy to wear with any outfit. Crafted in Atlanta by skilled artisans.`,
        category: 'Leather',
        imageUrl: './public/img/Leather_5.jpg',
        price: 40.0,
        inventory: 25
      },
      {
        name: 'Oyster And Rose Gold Diamond Leather Earring',
        description: `Elevate your look by adding style to any outfit with the unique sillouhette of the double diamond leather earring. Part of the leather collection, these effortlessly cool statement earrings are handcrafted in Atlanta, Georgia by skilled artisans.`,
        category: 'Leather',
        imageUrl: './public/img/Leather_6.jpg',
        price: 38.0,
        inventory: 25
      }
    ]

    const [
      P1,
      P2,
      P3,
      P4,
      P5,
      P6,
      P7,
      P8,
      P9,
      P10,
      P11,
      P12,
      P13,
      P14,
      P15,
      P16,
      P17,
      P18,
      P19,
      P20,
      P21,
      P22,
      P23,
      P24,
      P25,
      P26,
      P27,
      P28,
      P29,
      P30,
      P31,
      P32,
      P33,
      P34,
      P35,
      P36,
      P37
    ] = await Product.bulkCreate(products)
    console.log(green('Seeded products!'))

    //user seeding
    const users = [
      {
        email: 'weronika.janczuk@gmail.com',
        password: 'invisiblewoman1',
        first_name: 'Weronika',
        last_name: 'Janczuk'
      },
      {
        email: 'victoria.ho@gmail.com',
        password: 'invisiblewoman2',
        first_name: 'Victoria',
        last_name: 'Ho',
        isAdmin: true
      },
      {
        email: 'michelle.dacal@gmail.com',
        password: 'invisiblewoman3',
        first_name: 'Michelle',
        last_name: 'Dacal',
        isAdmin: true
      },
      {
        email: 'kay.xiongpachay@gmail.com',
        password: 'invisiblewoman4',
        first_name: 'Kay',
        last_name: 'XiongPachay'
      }
    ]

    const [U1, U2, U3, U4] = await User.bulkCreate(users)
    console.log(green('Seeded users!'))
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
