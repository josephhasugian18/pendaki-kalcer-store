import Logo from "../assets/Logo.png";
import Jacket1 from "../assets/Jacket1.png";
import Jacket2 from "../assets/Jacket2.png";
import Jacket3 from "../assets/Jacket3.png";
import HandWarmer from "../assets/HandWarmer.jpg";
import HandWarmer2 from "../assets/handwarmer2.png";
import SarungTangan from "../assets/SarungTangan.png";
import Pole1 from "../assets/Pole1.png";
import Pole2 from "../assets/Pole2.png";
import SleepBag from "../assets/SleepBag.png";
import SleepBag3 from "../assets/SleepBag3.png";
import Pasak from "../assets/Pasak.jpg";
import Panci from "../assets/Panci.jpg";
import Matras from "../assets/Matras.png";
import Topi from "../assets/Topi.png";
import Celana from "../assets/Celana.png";
import Sendal from "../assets/Sendal.png";
import Sendal2 from "../assets/Sendal2.jpg";
import Sepatu from "../assets/Sepatu.jpg";
import Sepatu2 from "../assets/Sepatu2.jpg";
import Sepatu3 from "../assets/Sepatu3.jpg";
import Sepatu4 from "../assets/Sepatu4.jpg";
import Kursi from "../assets/Kursi.png";
import Kompor from "../assets/Kompor.png";
import Kompor2 from "../assets/Kompor2.png";
import Tenda from "../assets/Tenda.png";
import Tas from "../assets/Tas.jpeg";
import Tas2 from "../assets/Tas2.png";
import Tas3 from "../assets/Tas3.jpg";
import Tas4 from "../assets/Tas4.png";
import Tas5 from "../assets/Tas5.jpg";
import RainCover from "../assets/RainCover.png";

const products = [
  // === NEW ===
  
  // === APPAREL ===
  {
    id: 1,
    name: "Aether Jacket",
    image: Jacket1,
    price: "Rp 310.000",
    category: "Apparel",
    subcategory: "Jacket",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Lightweight outdoor jacket, water-resistant, perfect for hiking and traveling.",
    material: "Polyester",
    weight: "500g",
    features: ["Water-resistant", "Lightweight", "Breathable"]
  },
  {
    id: 2,
    name: "Waterproof Jacket",
    image: Jacket2,
    price: "Rp 450.000",
    category: "Apparel",
    subcategory: "Jacket",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Premium waterproof jacket with ventilation, comfortable during heavy rain.",
    material: "Nylon",
    weight: "600g",
    features: ["Waterproof", "Ventilated", "Durable"]
  },
  {
    id: 3,
    name: "Windproof Jacket",
    image: Jacket3,
    price: "Rp 485.000",
    category: "Apparel",
    subcategory: "Jacket",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Windproof jacket keeping you warm in windy weather.",
    material: "Polyester + Windproof membrane",
    weight: "550g",
    features: ["Windproof", "Lightweight", "Breathable"]
  },
  {
    id: 4,
    name: "Outdoor Cap",
    image: Topi,
    price: "Rp 110.000",
    category: "Apparel",
    subcategory: "Cap",
    sizes: ["One Size"],
    description: "Breathable quick-dry outdoor cap.",
    material: "Cotton blend",
    weight: "100g",
    features: ["Quick-dry", "Breathable", "Adjustable"]
  },
  {
    id: 5,
    name: "Cargo Pants",
    image: Celana,
    price: "Rp 249.000",
    category: "Apparel",
    subcategory: "Pants",
    sizes: [28, 30, 32, 34, 36],
    description: "Cargo pants with multiple pockets, perfect for hiking.",
    material: "Cotton + Spandex",
    weight: "450g",
    features: ["Multiple pockets", "Durable", "Comfortable"]
  },

  // === FOOTWEAR ===
  {
    id: 6,
    name: "Mountain Sandals",
    image: Sendal,
    price: "Rp 175.000",
    category: "Footwear",
    subcategory: "Sandals",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    description: "Non-slip mountain sandals with adjustable straps.",
    material: "Rubber sole + Synthetic straps",
    weight: "400g",
    features: ["Non-slip", "Adjustable", "Lightweight"]
  },
  {
    id: 7,
    name: "Archer Mountain Sandals",
    image: Sendal2,
    price: "Rp 249.000",
    category: "Footwear",
    subcategory: "Sandals",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    description: "Premium mountain sandals with soft cushioning for extra comfort.",
    material: "Rubber sole + EVA",
    weight: "450g",
    features: ["Cushioned", "Durable", "Water-resistant"]
  },
  {
    id: 8,
    name: "Cerberus Hiking Shoes",
    image: Sepatu,
    price: "Rp 850.000",
    category: "Footwear",
    subcategory: "Shoes",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    description: "Hiking shoes with strong grip and waterproof material.",
    material: "Synthetic + Rubber sole",
    weight: "700g",
    features: ["Waterproof", "Strong grip", "Durable"]
  },
  {
    id: 9,
    name: "Cypress TX Shoes",
    image: Sepatu2,
    price: "Rp 1.200.000",
    category: "Footwear",
    subcategory: "Shoes",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    description: "Premium shoes with anti-slip sole and soft cushioning.",
    material: "Leather + Rubber sole",
    weight: "750g",
    features: ["Anti-slip", "Premium leather", "Comfortable"]
  },
  {
    id: 10,
    name: "Tiger Claw 2.0",
    image: Sepatu3,
    price: "Rp 650.000",
    category: "Footwear",
    subcategory: "Shoes",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    description: "Lightweight outdoor shoes with high traction grip.",
    material: "Synthetic + Rubber sole",
    weight: "680g",
    features: ["Lightweight", "High grip", "Durable"]
  },
  {
    id: 11,
    name: "Tiger Claw 2.5",
    image: Sepatu4,
    price: "Rp 800.000",
    category: "Footwear",
    subcategory: "Shoes",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    description: "Updated version of Tiger Claw with stronger material.",
    material: "Synthetic + Rubber sole",
    weight: "700g",
    features: ["Stronger material", "Lightweight", "Durable"]
  },

  // === CAMPING ===
  {
    id: 12,
    name: "Gloves",
    image: SarungTangan,
    price: "Rp 65.000",
    category: "Camping",
    subcategory: "Gloves",
    description: "Warm elastic gloves, perfect for cold weather.",
    material: "Polyester + Fleece",
    weight: "80g",
    features: ["Warm", "Elastic", "Lightweight"]
  },
  {
    id: 13,
    name: "Altro Trekking Pole",
    image: Pole1,
    price: "Rp 275.000",
    category: "Camping",
    subcategory: "Trekking Pole",
    description: "Lightweight trekking pole with sturdy aluminum.",
    material: "Aluminum",
    weight: "400g",
    features: ["Lightweight", "Sturdy", "Adjustable"]
  },
  {
    id: 14,
    name: "Mova Trekking Pole",
    image: Pole2,
    price: "Rp 169.000",
    category: "Camping",
    subcategory: "Trekking Pole",
    description: "Ergonomic trekking pole with comfortable grip.",
    material: "Aluminum",
    weight: "350g",
    features: ["Ergonomic", "Lightweight", "Comfortable grip"]
  },
  {
    id: 15,
    name: "Tent Peg",
    image: Pasak,
    price: "Rp 18.000",
    category: "Camping",
    subcategory: "Tent",
    description: "Lightweight aluminum tent peg.",
    material: "Aluminum",
    weight: "30g",
    features: ["Lightweight", "Durable"]
  },
  {
    id: 16,
    name: "Camping Cookware Set",
    image: Panci,
    price: "Rp 199.000",
    category: "Camping",
    subcategory: "Cooking Set",
    description: "Portable stainless steel camping cookware.",
    material: "Stainless steel",
    weight: "600g",
    features: ["Portable", "Durable", "Easy to clean"]
  },
  {
    id: 17,
    name: "Folding Mat",
    image: Matras,
    price: "Rp 89.000",
    category: "Camping",
    subcategory: "Mat",
    description: "Lightweight foldable mat, comfortable for outdoor sleep.",
    material: "Foam + Nylon",
    weight: "400g",
    features: ["Foldable", "Lightweight", "Comfortable"]
  },
  {
    id: 18,
    name: "Mini Stove",
    image: Kompor2,
    price: "Rp 135.000",
    category: "Camping",
    subcategory: "Cooking Set",
    description: "Portable mini stove, convenient for outdoor cooking.",
    material: "Aluminum + Steel",
    weight: "500g",
    features: ["Portable", "Windproof", "Compact"]
  },
  {
    id: 19,
    name: "Windproof Mini Stove",
    image: Kompor,
    price: "Rp 155.000",
    category: "Camping",
    subcategory: "Cooking Set",
    description: "Mini stove with wind protection, efficient for outdoor use.",
    material: "Aluminum + Steel",
    weight: "520g",
    features: ["Windproof", "Portable", "Durable"]
  },
  {
    id: 20,
    name: "Folding Chair",
    image: Kursi,
    price: "Rp 375.000",
    category: "Camping",
    subcategory: "Chair",
    description: "Lightweight folding chair with aluminum frame, easy to carry.",
    material: "Aluminum + Fabric",
    weight: "1.5kg",
    features: ["Foldable", "Lightweight", "Portable"]
  },
  {
    id: 21,
    name: "Camping Tent 200 x 200",
    image: Tenda,
    price: "Rp 335.000",
    category: "Camping",
    subcategory: "Tent",
    description: "Family tent for 4 people, easy to set up.",
    material: "Polyester + Fiberglass",
    weight: "5kg",
    features: ["Water-resistant", "Lightweight", "Easy setup"]
  },

  // === BAGS ===
  {
    id: 22,
    name: "Sleeping Bag",
    image: SleepBag,
    price: "Rp 280.000",
    category: "Bags",
    subcategory: "Sleeping Bag",
    description: "Lightweight sleeping bag with warm insulation, ideal for hiking.",
    material: "Polyester + Cotton",
    weight: "900g",
    features: ["Warm", "Lightweight", "Compact"]
  },
  {
    id: 23,
    name: "Premium Sleeping Bag",
    image: SleepBag3,
    price: "Rp 369.000",
    category: "Bags",
    subcategory: "Sleeping Bag",
    description: "Premium sleeping bag with extra insulation for cold temperatures.",
    material: "Polyester + Fleece",
    weight: "1.2kg",
    features: ["Warm", "Premium quality", "Compact"]
  },
  {
    id: 24,
    name: "Oberon Vest",
    image: Tas4,
    price: "Rp 159.000",
    category: "Bags",
    subcategory: "Backpack",
    description: "Multi-functional vest with plenty of storage pockets.",
    material: "Polyester",
    weight: "400g",
    features: ["Multi-pocket", "Lightweight", "Adjustable"]
  },
  {
    id: 25,
    name: "Daypack Alture 22L",
    image: Tas,
    price: "Rp 250.000",
    category: "Bags",
    subcategory: "Backpack",
    description: "22L lightweight daypack, perfect for daily hikes.",
    material: "Polyester",
    weight: "550g",
    features: ["Lightweight", "Durable", "Water-resistant"]
  },
  {
    id: 26,
    name: "Daypack Gravix 22L",
    image: Tas2,
    price: "Rp 250.000",
    category: "Bags",
    subcategory: "Backpack",
    description: "Gravix daypack with multiple compartments for organization.",
    material: "Polyester",
    weight: "560g",
    features: ["Multiple compartments", "Durable", "Lightweight"]
  },
  {
    id: 27,
    name: "Carrier Backpack 50L",
    image: Tas3,
    price: "Rp 750.000",
    category: "Bags",
    subcategory: "Backpack",
    description: "50L carrier backpack, comfortable for long hikes.",
    material: "Nylon + Aluminum frame",
    weight: "2kg",
    features: ["Large capacity", "Ergonomic", "Durable"]
  },
  {
    id: 28,
    name: "Carrier Backpack 65L",
    image: Tas5,
    price: "Rp 485.000",
    category: "Bags",
    subcategory: "Backpack",
    description: "65L carrier backpack with ergonomic padding.",
    material: "Nylon + Aluminum frame",
    weight: "2.5kg",
    features: ["Large capacity", "Ergonomic", "Durable"]
  },
  {
    id: 29,
    name: "Rain Cover Bag",
    image: RainCover,
    price: "Rp 65.000",
    category: "Bags",
    subcategory: "Backpack Cover",
    description: "Waterproof rain cover to protect your backpack.",
    material: "PVC",
    weight: "150g",
    features: ["Waterproof", "Lightweight", "Elastic fitting"]
  },

  // === ACCESSORIES ===
  {
    id: 30,
    name: "Hand Warmer",
    image: HandWarmer,
    price: "Rp 35.000",
    category: "Accessories",
    description: "Disposable hand warmer to keep hands warm in cold weather.",
    material: "Iron powder + Salt",
    weight: "30g",
    features: ["Disposable", "Portable", "Instant heat"]
  },
  {
    id: 31,
    name: "Reusable Hand Warmer",
    image: HandWarmer2,
    price: "Rp 39.000",
    category: "Accessories",
    description: "Reusable hand warmer that can be used multiple times.",
    material: "Gel + Metal disc",
    weight: "40g",
    features: ["Reusable", "Portable", "Eco-friendly"]
  },
];

export default products;