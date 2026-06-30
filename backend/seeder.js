const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const Review = require("./models/Review");
const User = require("./models/User");
const dns = require("dns");

dotenv.config();

const products = [
  {
    name: "2.5' Pooja Stand",
    category: "Pooja Stand",
    description: "Traditional 2.5 feet pooja stand with elegant design.",
    price: 2900,
    images: [
      "https://www.themaarktrendz.com/cdn/shop/files/interior--1.jpg?v=1768884793",
    ],
    inStock: true,
  },
  {
    name: "3.5' Pooja Stand",
    category: "Pooja Stand",
    description: "Graceful 3.5 feet pooja stand for your daily worship.",
    price: 3900,
    images: [
      "https://m.media-amazon.com/images/I/81BtKGT8pzL._AC_UF894,1000_QL80_.jpg",
    ],
    inStock: true,
  },
  {
    name: "4.5' Pooja Stand",
    category: "Pooja Stand",
    description: "Spacious 4.5 feet pooja stand with intricate detailing.",
    price: 4900,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/3/QD/HE/KT/16259333/whatsapp-image-2023-02-28-at-10-31-36-am-1--500x500.jpeg",
    ],
    inStock: true,
  },
  {
    name: "5.5' Pooja Stand",
    category: "Pooja Stand",
    description: "Grand 5.5 feet pooja stand, ideal for home temples.",
    price: 5900,
    images: [
      "https://www.venkatsulochanafurniture.com/myweb/uploads/2025/04/HE020-MODEL-2.png",
    ],
    inStock: true,
  },
  {
    name: "6.0' Pooja Stand",
    category: "Pooja Stand",
    description: "Premium 6 feet pooja stand for a divine ambiance.",
    price: 7900,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/7/326731621/HI/UE/VF/74864230/6x3-feet-wooden-pooja-cupboard.webp",
    ],
    inStock: true,
  },
  {
    name: "5.5' Pooja Stand Carving",
    category: "Pooja Stand",
    description: "5.5 feet pooja stand with beautiful hand carving.",
    price: 8900,
    images: [
      "https://m.media-amazon.com/images/I/81cJZM1HheL._AC_UF894,1000_QL80_.jpg",
    ],
    inStock: true,
    featured: true,
  },
  {
    name: "6.0' Pooja Stand Carving",
    category: "Pooja Stand",
    description: "Exquisite 6 feet pooja stand with artistic carvings.",
    price: 11900,
    images: [
      "https://m.media-amazon.com/images/I/714RpqqLKWL._AC_UF894,1000_QL80_.jpg",
    ],
    inStock: true,
    featured: true,
  },
  {
    name: "4.0' Pooja Stand Teak Wood",
    category: "Pooja Stand",
    description: "Solid teak wood 4 feet pooja stand for durability.",
    price: 17900,
    images: [
      "https://m.media-amazon.com/images/I/812RXv3WPfL._AC_UF894,1000_QL80_.jpg",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "5.0' Pooja Stand Teak Wood",
    category: "Pooja Stand",
    description: "Sturdy 5 feet teak wood pooja stand with classic look.",
    price: 21900,
    images: ["https://m.media-amazon.com/images/I/81hG8BuzqwS.jpg"],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "5.0' Pooja Stand Teak Carving",
    category: "Pooja Stand",
    description: "Handcrafted 5 feet teak wood pooja stand with carving.",
    price: 27900,
    images: [
      "https://harishyam.com/cdn/shop/files/75_LargeDesignerHandcarvedTeakWoodPoojaMandir11.webp?v=1706596430",
    ],
    inStock: true,
    featured: true,
    material: "Teak Wood",
  },
  {
    name: "Queen Size (5×6.25) Cot",
     category: "Cart",
    description: "Standard queen size cot with comfortable design.",
    price: 14900,
    images: [
      "https://www.themaarktrendz.com/cdn/shop/files/Interior-Banner_14d35456-45c6-4244-a10c-59378c803708.jpg?v=1765353444",
    ],
    inStock: true,
  },
  {
    name: "Queen Size Carving Cot",
    category: "Cart",
    description: "Queen size cot with decorative wood carving.",
    price: 15900,
    images: [
      "https://aarsunwoods.com/wp-content/uploads/2020/04/Carved-Wooden-Bed-Natural-Finish-UH-YT-241-jpg.webp",
    ],
    inStock: true,
  },
  {
    name: "King Size Cot",
     category: "Cart",
    description: "Spacious king size cot for large master bedrooms.",
    price: 17900,
    images: [
      "https://m.media-amazon.com/images/I/81bFcMiU33L._AC_UF894,1000_QL80_.jpg",
    ],
    inStock: true,
  },
  {
    name: "King Size Carving Cot",
     category: "Cart",
    description: "Luxurious king size cot with intricate carving.",
    price: 21900,
    images: [
      "https://narayanafineartscrafts.com/wp-content/uploads/2020/10/mysore-antique-cot.jpg",
    ],
    inStock: true,
  },
  {
    name: "Queen Teakwood Cot",
     category: "Cart",
    description: "Durable teakwood queen size cot.",
    price: 21900,
    images: [
      "https://5.imimg.com/data5/ANDROID/Default/2022/8/SC/UH/KG/22957875/product-jpeg.jpg",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "Queen Storage Cot",
     category: "Cart",
    description: "Functional queen size cot with storage space.",
    price: 22900,
    images: [
      "https://goyalhandicraft.com/cdn/shop/files/King-Size-Hydraulic-Storage-Double-Bed-Cot-Palang-Grey-Honey-Main.jpg?v=1770184920&width=3840",
    ],
    inStock: true,
  },
  {
    name: "Queen Teakwood Carving Cot",
     category: "Cart",
    description: "Premium teakwood queen size cot with carving.",
    price: 23900,
    images: ["https://m.media-amazon.com/images/I/71f0kw9X7WL.jpg"],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "Queen Special Order Cot",
     category: "Cart",
    description: "Custom designed queen size cot based on order.",
    price: 27900,
    images: [
      "https://sriganesanfurniture.com/wp-content/uploads/2022/03/WOODEN-QUEEN-SIZE-COT5.jpg",
    ],
    inStock: true,
  },

  {
    name: "King Teakwood Cot",
     category: "Cart",
    description: "Premium teakwood king size cot for lifetime durability.",
    price: 27900,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2024/11/466598953/SH/EM/QR/109571353/wooden-cot-teak-wood.jpeg",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "King Storage Cot",
     category: "Cart",
    description: "King size cot with maximum storage capacity.",
    price: 28900,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/5/311991829/TD/WT/UR/111928898/wooden-king-size-cot-500x500.png",
    ],
    inStock: true,
  },
  {
    name: "King Teakwood Carving Cot",
     category: "Cart",
    description: "Royal teakwood king size cot with master carving.",
    price: 31900,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROFC8KPHsHJ9gDyWLNoZcoMKrmYwO0kpzc8A&s",
    ],
    inStock: true,
    featured: true,
    material: "Teak Wood",
  },
  {
    name: "King Special Order Cot",
     category: "Cart",
    description: "Exclusive special order king size cot.",
    price: 38900,
    images: [
      "https://images.woodenstreet.de/image/cache/data/poster-beds/allure-poster-bed-revised/updated/honey/new-logo/new-logo/1-750x650.jpg",
    ],
    inStock: true,
  },
  {
    name: "King Teakwood Luxury Cot",
    category: "Cart",
    description: "Top-tier luxury teakwood cot for ultimate status.",
    price: 64900,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/1/YQ/NL/BT/35187907/mahogany-wood-bed-panama.png",
    ],
    inStock: true,
    featured: true,
    material: "Teak Wood",
  },
  {
    name: 'Queen Foam 4" Bed',
    category: "Mattresses",
    description: "Comfortable 4-inch foam mattress for queen cot.",
    price: 5900,
    images: [
      "https://images.woodenstreet.de/image/cache/data/mattress/updated/ortho-memory-mattress/updated/single/6-inch/updated/dreamlux+updated/New-Images/1-810x702.jpg",
    ],
    inStock: true,
  },
  {
    name: 'King Foam 4" Bed',
    category: "Mattresses",
    description: "Standard 4-inch foam bed for king size cot.",
    price: 6900,
    images: [
      "https://rukminim2.flixcart.com/image/480/640/xif0q/bed-mattress/t/m/s/normal-top-queen-8-60-72-original-bodyiq-orthopedic-memory-high-original-imah9a2gtzvrmqum.jpeg?q=80",
    ],
    inStock: true,
  },
  {
    name: 'Queen Foam 6" Bed',
    category: "Mattresses",
    description: "Soft 6-inch foam mattress for better support.",
    price: 8900,
    images: ["https://m.media-amazon.com/images/I/71U7WiW7SnL.jpg"],
    inStock: true,
  },
  {
    name: 'Queen Spring Bed 8"',
    category: "Mattresses",
    description: "8-inch spring mattress for bouncy comfort.",
    price: 8900,
    images: [
      "https://mysleepwell.b-cdn.net/uploads/products/webp/1_6_-1732271847249.webp",
    ],
    inStock: true,
  },
  {
    name: 'King Foam 6" Bed',
    category: "Mattresses",
    description: "Thick 6-inch foam bed for king size comfort.",
    price: 9900,
    images: [
      "https://m.media-amazon.com/images/I/71X95Upwp7L._AA360_AC_QL70_.jpg",
    ],
    inStock: true,
  },
  {
    name: 'King Spring Bed 8"',
    category: "Mattresses",
    description: "Durable 8-inch spring bed for king size cot.",
    price: 10900,
    images: [
      "https://mysleepwell.b-cdn.net/uploads/products/webp/1DualProProfiled-1770181775835.webp",
    ],
    inStock: true,
  },
  {
    name: 'Queen Pillow Top 10"',
    category: "Mattresses",
    description: "Premium 10-inch pillow top mattress for queen cot.",
    price: 13900,
    images: [
      "https://hardcoremattress.ca/wp-content/uploads/2025/09/Gemini_Generated_Image_n79bdan79bdan79b.png",
    ],
    inStock: true,
  },
  {
    name: 'King Pillow Top 10"',
    category: "Mattresses",
    description: "Luxury 10-inch pillow top mattress for king cot.",
    price: 14900,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGtqPm-uq2xXbZ6U5RjNZXvkEnH6APs7b64A&s",
    ],
    inStock: true,
  },
  {
    name: 'Queen 2 Side Pillow Top 12"',
    category: "Mattresses",
    description: "Ultra-luxury 12-inch dual side pillow top bed.",
    price: 15900,
    images: [
      "https://theamishhouse.com/cdn/shop/products/Amish-Elite-Premier-Pillowtop-Two-Sided-Mattress.jpg?v=1765391807",
    ],
    inStock: true,
    featured: true,
  },
  {
    name: 'King 2 Side Pillow Top 12"',
    category: "Mattresses",
    description: "King size 12-inch dual side pillow top luxury bed.",
    price: 17900,
    images: [
      "https://media.wired.com/photos/68f670a3692735b39dbd9c77/master/w_1600%2Cc_limit/Helix_LIFESTYLE_ELITE_FRONT_031125a%2520(1)%2520(1).png",
    ],
    inStock: true,
    featured: true,
  },
  {
    name: "Basic Dining (4 Seater)",
    category: "Dining Tables",
    description: "Simple 4-seater dining set for small families.",
    price: 5900,
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    ],
    inStock: true,
  },
  {
    name: "Maharaja Dining (4 Seater)",
    category: "Dining Tables",
    description: "Royal style Maharaja dining set with 4 chairs.",
    price: 7900,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/11/362461233/KR/HN/QR/183519815/wooden-maharaja-carved-dining-table-set.jpg",
    ],
    inStock: true,
  },
  {
    name: "S Bend Dining (4 Seater)",
    category: "Dining Tables",
    description: "Designer S Bend 4-seater dining table.",
    price: 9900,
    images: [
      "https://olga.events/cdn/shop/products/scurvediningtableeventfurniturerentaldubai2.jpg?v=1632381001&width=1445",
    ],
    inStock: true,
  },
  {
    name: "Mahakani Basic Dining (4 Seater)",
    category: "Dining Tables",
    description: "Solid Mahakani wood basic 4-seater dining.",
    price: 13900,
    images: [
      "https://images.woodenstreet.de/image/cache/data/dining-set/4-seater/mcbeth-compact-4-seater-dining-set-with-4-chairs-honey-finish/updated/new-logo/New+Looks+/3-810x702.jpg",
    ],
    inStock: true,
    material: "Mahakani Wood",
  },
  {
    name: "Mahakani Luxury Dining (4 Seater)",
    category: "Dining Tables",
    description: "Elegant Mahakani wood luxury 4-seater set.",
    price: 15900,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/2/OL/NK/YV/125949865/frama-dining-table-set-250x250.jpeg",
    ],
    inStock: true,
    material: "Mahakani Wood",
  },
  {
    name: "Mahakani Glass Dining (4 Seater)",
    category: "Dining Tables",
    description: "Modern Mahakani wood dining with glass top.",
    price: 19900,
    images: [
      "https://5.imimg.com/data5/WR/EY/LP/SELLER-56632734/toughened-glass-top-4-seater-dining-table-set.jpg",
    ],
    inStock: true,
    material: "Mahakani Wood + Glass",
  },
  {
    name: "3 Seater Basic Sofa",
    category: "Sofa",
    description: "Affordable 3-seater sofa for everyday use.",
    price: 6900,
    images: [
      "https://www.royaloakindia.com/media/catalog/product/s/f/sf5026-3.jpg",
    ],
    inStock: true,
  },
  {
    name: "3 Seater Button Sofa",
    category: "Sofa",
    description: "Stylish 3-seater sofa with decorative buttons.",
    price: 7900,
    images: [
      "https://woodentwist.com/cdn/shop/files/ChesterfieldSofa_2_1200x.png?v=1743284052",
    ],
    inStock: true,
  },
  {
    name: "3 Seater Wood Sofa",
    category: "Sofa",
    description: "Classic wooden frame 3-seater sofa.",
    price: 9900,
    images: [
      "https://www.royaloakindia.com/media/catalog/product/s/f/sf20154002-3-cus6008-brown.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=800&canvas=800:500",
    ],
    inStock: true,
    material: "Wood",
  },
  {
    name: "3 Seater Royal Sofa",
    category: "Sofa",
    description: "Royal type 3-seater sofa for grand living rooms.",
    price: 9900,
    images: [
      "https://woodentwist.com/cdn/shop/products/RoyalSofa_output_3.jpg?v=1743293903",
    ],
    inStock: true,
  },
  {
    name: "3 Seater Wood Carving Sofa",
    category: "Sofa",
    description: "Artistically carved wooden 3-seater sofa.",
    price: 11900,
    images: [
      "https://woodentwist.com/cdn/shop/files/WhatsAppImage2023-07-19at9.29.07PM.jpg?v=1743284933",
    ],
    inStock: true,
    material: "Wood",
  },
  {
    name: "5 Seater Basic Sofa",
    category: "Sofa",
    description: "Complete 5-seater sofa set at a basic price.",
    price: 12900,
    images: [
      "https://ebansal.com/cdn/shop/files/Sofia_Solid_Sheesham_Wood_5_Seater_Sofa_Set_Natural_Finish_3_2.jpg?v=1745844876",
    ],
    inStock: true,
  },
  {
    name: "Basic Corner Sofa",
    category: "Sofa",
    description: "Space saving L-shaped basic corner sofa.",
    price: 13900,
    images: [
      "https://media.designcafe.com/wp-content/uploads/2021/05/17161910/elegant-living-room-set-up-with-armless-corner-sofa-design.jpg",
    ],
    inStock: true,
  },
  {
    name: "5 Seater Button Sofa",
    category: "Sofa",
    description: "Elegant 3+1+1 button sofa set for your hall.",
    price: 15900,
    images: [
      "https://homedecorlo.com/cdn/shop/products/51hkleFoT2S_530x@2x.jpg?v=1626155576",
    ],
    inStock: true,
  },
  {
    name: "3 Seater Bubbly Sofa",
    category: "Sofa",
    description: "Comfortable and fun bubbly design 3-seater sofa.",
    price: 15900,
    images: ["https://m.media-amazon.com/images/I/81L3bV0K1dL.jpg"],
    inStock: true,
  },
  {
    name: "3 Seater Super Soft Sofa",
    category: "Sofa",
    description: "Ultra-comfortable 3-seater sofa with super soft foam.",
    price: 17900,
    images: [
      "https://www.duroflexworld.com/cdn/shop/files/3seater_orange_2.jpg?v=1764824268",
    ],
    inStock: true,
  },
  {
    name: "3 Seater Teak Wood Sofa",
    category: "Sofa",
    description: "Premium teak wood 3-seater sofa for long life.",
    price: 17900,
    images: [
      "https://images.jdmagicbox.com/quickquotes/images_main/3-seater-teak-wood-furniture-wooden-sofa-for-home-2220651960-5duey8r6.jpg",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "Royal Corner Sofa",
    category: "Sofa",
    description: "Luxurious corner sofa with royal finishes.",
    price: 19900,
    images: [
      "https://www.royaloakindia.com/media/catalog/product/s/f/sf201935-cr_sf201935-cr-1_23.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=800&canvas=800:500",
    ],
    inStock: true,
  },
  {
    name: "3 Seater Pocket Spring Sofa",
    category: "Sofa",
    description: "Advanced pocket spring 3-seater sofa for extra bounce.",
    price: 19900,
    images: ["https://m.media-amazon.com/images/I/81h25oCtUXL.jpg"],
    inStock: true,
    featured: true,
  },
  {
    name: "5 Seater Royal Sofa",
    category: "Sofa",
    description: "Luxury 5-seater royal set for premium homes.",
    price: 19900,
    images: [
      "https://aarsunwoods.b-cdn.net/sofa%20set%202/5-Seater-Wooden-Sofa-set-3-scaled.webp",
    ],
    inStock: true,
  },
  {
    name: "5 Seater Wood Sofa",
    category: "Sofa",
    description: "Elegant wooden 5-seater sofa set.",
    price: 19900,
    images: [
      "https://i.pinimg.com/564x/e2/bd/a1/e2bda1b8c51aff3df486223c94360888.jpg",
    ],
    inStock: true,
    material: "Wood",
  },
  {
    name: "5 Seater Wood Carving Sofa",
    category: "Sofa",
    description: "Artistic wood carving 5-seater sofa set.",
    price: 21900,
    images: ["https://m.media-amazon.com/images/I/51xG0jMQQjL.jpg"],
    inStock: true,
    material: "Wood",
  },

  {
    name: "Luxury Corner Sofa",
    category: "Sofa",
    description: "High-end luxury L-shaped corner sofa set.",
    price: 27900,
    images: [
      "https://dukaan.b-cdn.net/700x700/webp/upload_file_service/47a0336c-21f2-47be-b569-8147d6f5280b/188a9f5ce96641bab4f0abb35cf78c7cr-jpg-960x960.webp",
    ],
    inStock: true,
  },
  {
    name: "5 Seater Bubbly Sofa",
    category: "Sofa",
    description: "Modern bubbly design 5-seater sofa set.",
    price: 27900,
    images: [
      "https://media.roche-bobois.com/is/image/rochebobois/Bubble-Volver-Bleu_2025-2_PDP_01?wid=1120&fmt=webp&resMode=sharp2&network=on&bfc=on",
    ],
    inStock: true,
  },
  {
    name: "Teak Wood Corner Sofa",
    category: "Sofa",
    description: "Exquisite teak wood corner sofa for durability.",
    price: 31900,
    images: [
      "https://images.jdmagicbox.com/quickquotes/images_main/teak-wood-corner-sofa-set-seating-capacity-6-2223213199-eic6o6g5.jpg",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "Super Soft Corner Sofa",
    category: "Sofa",
    description: "L-shaped corner sofa with super soft seating.",
    price: 31900,
    images: [
      "https://5.imimg.com/data5/HA/GO/FD/SELLER-11249783/corner-sofa.jpg",
    ],
    inStock: true,
  },
  {
    name: "5 Seater Super Soft Sofa",
    category: "Sofa",
    description: "Top comfort super soft 5-seater sofa set.",
    price: 31900,
    images: [
      "https://m.media-amazon.com/images/I/718bxgh6XiL._AC_UF894,1000_QL80_.jpg",
    ],
    inStock: true,
  },
  {
    name: "5 Seater Teak Wood Sofa",
    category: "Sofa",
    description: "High quality teak wood 5-seater sofa set.",
    price: 31900,
    images: [
      "https://cdn.shopaccino.com/plusone/products/grey-walnut-look-920547_l.jpg?v=681",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "5 Seater Pocket Spring Sofa",
    category: "Sofa",
    description: "Premium pocket spring 5-seater set for luxury.",
    price: 34900,
    images: ["https://m.media-amazon.com/images/I/814rYdHNA4L.jpg"],
    inStock: true,
    featured: true,
  },

  {
    name: "5 Seater Teak Wood Heavy Sofa",
    category: "Sofa",
    description: "Durable and heavy teak wood 5-seater set.",
    price: 35900,
    images: [
      "https://cdn.shopaccino.com/plusone/products/brown-teak-look-389553_l.jpg",
    ],
    inStock: true,
    featured: true,
    material: "Teak Wood",
  },
  {
    name: "Teak Wood Corner Sofa Heavy",
    category: "Sofa",
    description: "Premium heavy teak wood corner sofa set.",
    price: 35900,
    images: [
      "https://shop.nilamburfurniture.com/cdn/shop/files/Photo_1681818130689_5a4dc9db-bf3d-43ec-bd6f-6f9156bbbd0a-Photoroom.jpg?v=1751291632&width=1214",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "Super Soft Pocket Spring Corner Sofa",
    category: "Sofa",
    description: "Advanced pocket spring corner sofa for top luxury.",
    price: 37900,
    images: [
      "https://www.royaloakindia.com/media/catalog/product/p/e/penangcornersofa800x500.png",
    ],
    inStock: true,
    featured: true,
  },
  {
    name: "3' TV Bottom Unit",
    category: "TV Units",
    description: "Compact 3 feet bottom unit for small TV setups.",
    price: 4900,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2024/1/374855266/AQ/MG/XJ/8432120/5-feet-modern-wooden-tv-unit.jpg",
    ],
    inStock: true,
  },
  {
    name: "4' TV Bottom Unit",
    category: "TV Units",
    description: "Elegant 4 feet bottom unit for standard displays.",
    price: 5900,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/11/359718341/LN/WT/FZ/22988540/whatsapp-image-2023-11-08-at-1-21-24-pm-500x500.jpeg",
    ],
    inStock: true,
  },
  {
    name: "5' TV Bottom Unit",
    category: "TV Units",
    description: "Spacious 5 feet bottom unit with storage drawers.",
    price: 6900,
    images: [
      "https://ii1.pepperfry.com/media/catalog/product/f/e/494x544/fenily-tv-unit-in-wenge-finish-for-tvs-up-to-65--fenily-tv-unit-in-wenge-finish-for-tvs-up-to-65--piyjkb.jpg",
    ],
    inStock: true,
  },
  {
    name: "6' TV Bottom Unit",
    category: "TV Units",
    description: "Large 6 feet bottom unit for home theaters.",
    price: 7900,
    images: ["https://4.imimg.com/data4/EY/IX/ANDROID-39232028/product.jpeg"],
    inStock: true,
  },
  {
    name: "7' TV Bottom Unit",
    category: "TV Units",
    description: "Premium 7 feet bottom unit for wide setups.",
    price: 8900,
    images: [
      "https://sp-ao.shortpixel.ai/client/to_auto,q_lossless,ret_img,w_770,h_572/https://www.orientbell.com/blog/wp-content/uploads/2023/04/stone-tv-cabinet-design.jpg",
    ],
    inStock: true,
  },
  {
    name: "8' TV Bottom Unit",
    category: "TV Units",
    description: "Huge 8 feet bottom unit with massive storage.",
    price: 9900,
    images: ["https://www.centuryply.com/blogimage/3-01-24/blog2-1.jpeg"],
    inStock: true,
  },
  {
    name: "5' TV Unit (Full Stand)",
    category: "TV Units",
    description: "Complete 5 feet TV unit with wall mounting options.",
    price: 13900,
    images: [
      "https://i.pinimg.com/474x/bd/53/7e/bd537eb5200457ddf15f33dda4b08960.jpg",
    ],
    inStock: true,
  },
  {
    name: "6' TV Unit (Full Stand)",
    category: "TV Units",
    description: "Full 6 feet TV wall unit with showcase shelves.",
    price: 15900,
    images: ["https://www.centuryply.com/blogimage/3-01-24/blog2-9.jpeg"],
    inStock: true,
  },
  {
    name: "7' TV Unit (Full Stand)",
    category: "TV Units",
    description: "Luxury 7 feet TV wall unit for large halls.",
    price: 17900,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2023/12/370050596/RS/MS/XF/23815709/modular-tv-unit-8-feet.jpg",
    ],
    inStock: true,
  },
  {
    name: "8' TV Unit (Full Stand)",
    category: "TV Units",
    description: "Grand 8 feet TV unit with premium wood finish.",
    price: 19900,
    images: [
      "https://i.ytimg.com/vi/DaidkBS5X-E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBSJRgzkf-tRHg8YKry19ExnSHMew",
    ],
    inStock: true,
    featured: true,
  },
  {
    name: "Single Door Bero",
    category: "Cupboards",
    description: "Compact single door wardrobe for minimal storage.",
    price: 4900,
    images: [
      "https://images.woodenstreet.de/image/cache/data/wardrobe/adolph-sinlge-door-wardrobe/revised/honey/updated/new-logo/1-750x650.jpg",
    ],
    inStock: true,
  },
  {
    name: "2 Door Bero",
    category: "Cupboards",
    description: "Standard double door bero for small families.",
    price: 5900,
    images: [
      "https://damroimages.blob.core.windows.net/damroimages/5727-1.jpg",
    ],
    inStock: true,
  },
  {
    name: "2 Door Dressing Bero",
    category: "Cupboards",
    description: "Double door cupboard with integrated dressing mirror.",
    price: 7900,
    images: [
      "https://www.homeone.store/cdn/shop/products/SWR-07_3.png?v=1679855816&width=2048",
    ],
    inStock: true,
  },
  {
    name: "2 Door Teak Wood Carving Bero",
    category: "Cupboards",
    description: "Decorative teak wood carving bero.",
    price: 34000,
    images: [
      "https://woodentwist.com/cdn/shop/products/stanfield-solid-wood-two-door-wardrobe-with-external-drawers-in-provincial-teak-finish-by-amberville-neuhlx.jpg?v=1743257654",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "3 Door Bero",
    category: "Cupboards",
    description: "Spacious 3 door cupboard for large storage.",
    price: 9900,
    images: [
      "https://www.homeone.store/cdn/shop/products/WR-03_2.png?v=1679856955",
    ],
    inStock: true,
  },
  {
    name: "2 Door Ultra Bero",
    category: "Cupboards",
    description: "Enhanced 2 door bero with ultra-modern design.",
    price: 7900,
    images: ["https://m.media-amazon.com/images/I/51-A4TlP5XL.jpg"],
    inStock: true,
  },
  {
    name: "2 Door Post Forming Bero",
    category: "Cupboards",
    description: "Durable post forming double door bero.",
    price: 7900,
    images: [
      "https://thetimberguy.com/cdn/shop/products/Home-Furniture-Wooden-2-door-Cupboard-Wardrobe_600x.jpg?v=1740679935",
    ],
    inStock: true,
  },
  {
    name: "3 Door Dressing Bero",
    category: "Cupboards",
    description: "Large 3 door wardrobe with personal dressing mirror.",
    price: 11900,
    images: [
      "https://images.jdmagicbox.com/quickquotes/images_main/3-door-cupboard-2187599662-ykzw0bca.jpg",
    ],
    inStock: true,
  },
  {
    name: "3 Door Teak Wood Carving Bero",
    category: "Cupboards",
    description: "Artistically carved 3 door teak wood cupboard.",
    price: 47700,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJ1fdbtodNR8f-yFrOOr7O-NPJP19mi23JA&s",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "3 Door Ultra Bero",
    category: "Cupboards",
    description: "Premium 3 door ultra cupboard for modern homes.",
    price: 12900,
    images: [
      "https://m.media-amazon.com/images/I/71lp13Ae2LL._AC_UF894,1000_QL80_.jpg",
    ],
    inStock: true,
  },
  {
    name: "4 Door Bero",
    category: "Cupboards",
    description: "Massive 4 door bero for ultimate storage needs.",
    price: 17900,
    images: [
      "https://images.woodenstreet.de/image/cache/data/wardrobes-mdf/zyra-4-door-wardrobe-without-mirror-gothic-grey-classic-oak-finish/new-logo/1-750x650.jpg",
    ],
    inStock: true,
  },

  {
    name: "4 Door Dressing Bero",
    category: "Cupboards",
    description: "Extra large 4 door bero with central mirror.",
    price: 18900,
    images: [
      "https://caspianfurniture.com/cdn/shop/products/6_c6556859-1142-43e0-a38e-d857f99b5209.png?v=1681899262",
    ],
    inStock: true,
    featured: true,
  },
  {
    name: "3 Door Post Forming Bero",
    category: "Cupboards",
    description: "Advanced post forming 3 door bero.",
    price: 17900,
    images: [
      "https://odhi.in/image/cache/catalog/furniture-wood/kavery-wooden-wardrobe-kwr-302-3-door-vista-drawer-18inch-8mm-sale-online-coimbatore-1000x1000.jpg",
    ],
    inStock: true,
  },
  {
    name: "2 Door Post Forming Dressing Bero",
    category: "Cupboards",
    description: "Premium post forming dressing bero.",
    price: 11900,
    images: [
      "https://caspianfurniture.com/cdn/shop/products/1_7c1f2ede-3920-4625-a080-1e8c2b61e694.jpg?v=1681987667",
    ],
    inStock: true,
    featured: true,
  },
  {
    name: "2 Door Teak Wood Bero",
    category: "Cupboards",
    description: "High quality 2 door teak wood bero.",
    price: 27000,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6RZ-qfXe7642ZmjsXHAKiQiaoKXqA2cAqw&s",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "2 Door Teak Wood Heavy Bero",
    category: "Cupboards",
    description: "Solid and heavy teak wood 2 door cupboard.",
    price: 34000,
    images: [
      "https://images.woodenstreet.de/image/cache/data/wardrobe/cambrey-2-door-multi-utility-wardrobe/honey/updated/new-logo/1-750x650.jpg",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "3 Door Post Forming Dressing Bero",
    category: "Cupboards",
    description: "Top luxury 3 door post forming dressing set.",
    price: 19900,
    images: [
      "https://m.media-amazon.com/images/I/613TbG8L7oL._AC_UF894,1000_QL80_.jpg",
    ],
    inStock: true,
    featured: true,
  },
  {
    name: "3 Door Teak Wood Bero",
    category: "Cupboards",
    description: "Grand 3 door solid teak wood bero.",
    price: 38900,
    images: [
      "https://images.woodenstreet.de/image/cache/data/wardrobes-mdf/kayden-3-door-multi-utility-wardrobe-columbian-walnut-finish/new-logo/1-750x650.jpg",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "3 Door Teak Wood Heavy Bero",
    category: "Cupboards",
    description: "Heavy and massive 3 door teak wardobe.",
    price: 44000,
    images: [
      "https://m.media-amazon.com/images/I/51m2cFnF7PL._AC_UF894,1000_QL80_.jpg",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "Basic Dressing Table",
    category: "Dressing Tables",
    description: "Simple and affordable dressing table with mirror.",
    price: 1100,
    images: [
      "https://images.woodenstreet.de/image/cache/data/dressing-tables/selena-engineered-wood-dressing-table-with-cabinet-and-pull-out-drawers/exotic-teak-frosty-white/updated/updated/new-logo/10-750x650.jpg",
    ],
    inStock: true,
  },
  {
    name: "Step Dressing Table",
    category: "Dressing Tables",
    description: "Functional step design dressing table.",
    price: 1900,
    images: [
      "https://ebansal.com/cdn/shop/files/Solivo_Solid_Sheesham_Wood_Dressing_Table_Natural_Finish.jpg?v=1745829993",
    ],

    inStock: true,
  },
  {
    name: "Door Dressing Table",
    category: "Dressing Tables",
    description: "Dressing table with integrated cupboards.",
    price: 3900,
    images: [
      "https://www.vikifurniture.com/cdn/shop/files/250.101.31-3.png?v=1702116228&width=1946",
    ],
    inStock: true,
  },
  {
    name: "One Side Step with Door",
    category: "Dressing Tables",
    description: "Modern one-side step dresser with storage.",
    price: 4900,
    images: [
      "https://www.vikifurniture.com/cdn/shop/files/250.102.11-1.png?v=1702116672&width=1946",
    ],
    inStock: true,
  },
  {
    name: "Double Side Step with Door",
    category: "Dressing Tables",
    description: "Large double-side step dresser for extra storage.",
    price: 5500,
    images: [
      "https://www.woodvestal.com/cdn/shop/files/DressingTablewithDoubleDoor-2.png?v=1716294855&width=1946",
    ],
    inStock: true,
  },
  {
    name: "One Side Flower Dressing",
    category: "Dressing Tables",
    description: "Decorative flower design one-side dresser.",
    price: 5900,
    images: [
      "https://images.woodenstreet.de/image/data/dressing-tables-mdf/cara-dressing-table/updated/Flowery+Wenge-Frosty+White+Finish/updated/new-logo/1.jpg",
    ],
    inStock: true,
  },
  {
    name: "2 Side Flower Dressing",
    category: "Dressing Tables",
    description: "Elegant two-side flower design dressing set.",
    price: 6900,
    images: [
      "https://www.homeone.store/cdn/shop/products/DT-05_2.png?v=1679728991",
    ],
    inStock: true,
  },
  {
    name: "Full Mirror Dressing",
    category: "Dressing Tables",
    description: "Vanity table with a massive full-length mirror.",
    price: 8900,
    images: [
      "https://cdn.shopify.com/s/files/1/0191/2234/files/dressing_table_designs_latest_dressing_table_designs_2023_modern_dressing_table_designs_for_small_bedroom_corner_dressing_table_designs_small_dressing_table_designs_480x480.jpg?v=1680345774",
    ],
    inStock: true,
    featured: true,
  },
  {
    name: "Maharaja Dressing Table",
    category: "Dressing Tables",
    description: "Royal Maharaja style vanity table.",
    price: 9900,
    images: [
      "https://5.imimg.com/data5/IOS/Default/2023/12/372390415/GP/CP/ZL/115688690/product-jpeg-500x500.png",
    ],
    inStock: true,
  },
  {
    name: "Teakwood Basic Dressing",
    category: "Dressing Tables",
    description: "Solid teak wood basic dressing table.",
    price: 13900,
    images: [
      "https://starenterprisesfurniture.com/wp-content/uploads/2024/03/Wooden-Teak-Wood-Dressing-Table-with-Stool.jpg",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "Teakwood Luxury Dressing",
    category: "Dressing Tables",
    description: "High-end teak wood luxury dressing set.",
    price: 19900,
    images: [
      "https://healsway.in/cdn/shop/files/02_70406e3f-9ceb-4ae4-a116-cc6cc902221f.jpg?v=1755028517",
    ],
    inStock: true,
    featured: true,
    material: "Teak Wood",
  },
  {
    name: "Basic Teepoy",
    category: "Tea Tables",
    description: "Simple tea table for your snacks and beverages.",
    price: 900,
    images: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&q=80",
    ],
    inStock: true,
  },
  {
    name: "Maharaja Teepoy",
    category: "Tea Tables",
    description: "Royal style Maharaja tea table for your hall.",
    price: 2900,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTliGAlMdYGX3edj_sw0YT--Mx8BY14QUuMoQ&s",
    ],
    inStock: true,
  },
  {
    name: "Mahakani Teepoy",
    category: "Tea Tables",
    description: "Solid Mahakani wood tea table.",
    price: 3900,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW66_cP_7xOVOG7zhnQc8PL_DDpiPuDxsIqQ&s",
    ],
    inStock: true,
    material: "Mahakani Wood",
  },
  {
    name: "Teakwood Basic Teepoy",
    category: "Tea Tables",
    description: "Durable teak wood basic tea table.",
    price: 4900,
    images: [
      "https://images.unsplash.com/photo-1518136247453-74e7b5265980?w=600&q=80",
    ],
    inStock: true,
    material: "Teak Wood",
  },
  {
    name: "Teakwood Luxury Teepoy",
    category: "Tea Tables",
    description: "Premium teak wood luxury tea table for grand halls.",
    price: 6900,
    images: [
      "https://ouchcart.com/cdn/shop/files/71bWIrDRYrL._SL1500.jpg?v=1725087571",
    ],
    inStock: true,
    featured: true,
    material: "Teak Wood",
  },
];

const reviews = [];

const seedData = async () => {
  try {
    dns.setServers(["1.1.1.1"]);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany();
    await Review.deleteMany();
    console.log("🗑️  Cleared old data");

    const createdProducts = await Product.insertMany(products);
    await Review.insertMany(reviews);
    console.log(
      `✅ Seeded ${createdProducts.length} products and ${reviews.length} reviews`,
    );

    // Create admin user
    await User.deleteMany({ email: "admin@varunfurniture.com" });
    await User.create({
      name: "Admin",
      email: "admin@varunfurniture.com",
      password: "admin123456",
      role: "admin",
    });
    console.log(
      "✅ Admin user created: admin@varunfurniture.com / admin123456",
    );
    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message, error.stack);
    process.exit(1);
  }
};

seedData();
