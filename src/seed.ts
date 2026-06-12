import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category";
import Product from "./models/Product";
import User from "./models/User";
import ContentModule from "./models/ContentModule";
import { connectDB } from "./config/db";

dotenv.config();

const categoriesData = [
  {
    name: "Premium Almonds",
    slug: "premium-almonds",
    description: "Premium quality crunchy almonds, rich in nutrients.",
    image: "/assets/almonds_category.png",
  },
  {
    name: "Exotic Cashews",
    slug: "exotic-cashews",
    description: "Creamy, buttery texture cashews roasted with zero oil.",
    image: "/assets/cashews_category.png",
  },
  {
    name: "Walnut Kernels",
    slug: "walnut-kernels",
    description: "Rich in Omega-3 fatty acids, extra light halves.",
    image: "/assets/walnuts_category.png",
  },
  {
    name: "California Pistachios",
    slug: "california-pistachios",
    description: "Naturally sun-dried and lightly salted kernels.",
    image: "/assets/pistachios_category.png",
  },
  {
    name: "Dates & Figs",
    slug: "dates-figs",
    description: "Prized for maple-syrup sweetness and melting texture.",
    image: "/assets/dates_category.png",
  },
  {
    name: "Honey",
    slug: "honey",
    description: "Pure and raw honey collected from forest-edge apiaries.",
    image: "/assets/honey.png",
  },
  {
    name: "Herbs",
    slug: "herbs",
    description: "Fresh-cut herbs packed for bright everyday cooking.",
    image: "/assets/herbs.png",
  },
  {
    name: "Fruit",
    slug: "fruit",
    description: "Seasonal mix of sweet and organic fruits from partner farms.",
    image: "/assets/berries.png",
  },
  {
    name: "Grains",
    slug: "grains",
    description: "Slow-grown grains selected for texture, aroma, and nutrition.",
    image: "/assets/ancient_grains.png",
  },
  {
    name: "Vegetables",
    slug: "vegetables",
    description: "Freshly harvested organic farm vegetables.",
    image: "/assets/vegetables.png",
  },
];

const dryFruitsProducts = [
  {
    slug: "mamra-almonds",
    name: "Mamra Almonds",
    categorySlug: "premium-almonds",
    rating: 4.9,
    description: "Rich in Vitamin E and antioxidants, premium crunchy Mamra almonds.",
    image: "/assets/almonds_product.png",
    gallery: ["/assets/almonds_product.png", "/assets/almond_detail.png", "/assets/walnut_detail.png"],
    badge: "ORGANIC",
    dietary: ["Organic", "Raw"],
    sizePrices: { "250g": 13.0, "500g": 24.0, "1kg": 46.0 },
    defaultSize: "500g",
    price: 24.0,
    stock: 80,
  },
  {
    slug: "jumbo-cashews",
    name: "Jumbo Cashews",
    categorySlug: "exotic-cashews",
    rating: 4.8,
    description: "Creamy, buttery texture, perfectly roasted with zero oil.",
    image: "/assets/cashews_product.png",
    gallery: ["/assets/cashews_product.png", "/assets/almonds_product.png", "/assets/walnuts_product.png"],
    badge: "BEST SELLER",
    dietary: ["Raw"],
    sizePrices: { "250g": 18.5, "500g": 35.0 },
    defaultSize: "250g",
    price: 18.5,
    stock: 120,
  },
  {
    slug: "kashmiri-walnuts",
    name: "Kashmiri Walnuts",
    categorySlug: "walnut-kernels",
    rating: 5.0,
    description: "Extra light halves, rich in Omega-3 fatty acids sourced from Kashmir.",
    image: "/assets/walnuts_product.png",
    gallery: ["/assets/walnuts_product.png", "/assets/walnut_detail.png", "/assets/almonds_product.png"],
    badge: "",
    dietary: ["Organic", "Raw"],
    sizePrices: { "200g": 17.0, "400g": 32.0 },
    defaultSize: "400g",
    price: 32.0,
    stock: 50,
  },
  {
    slug: "iranian-pistachios",
    name: "Iranian Pistachios",
    categorySlug: "california-pistachios",
    rating: 4.7,
    description: "Long-variety, naturally sun-dried and lightly salted kernels.",
    image: "/assets/pistachios_product.png",
    gallery: ["/assets/pistachios_product.png", "/assets/pistachios_category.png", "/assets/cashews_product.png"],
    badge: "",
    dietary: ["Gluten-Free", "Raw"],
    sizePrices: { "250g": 21.0, "500g": 39.0 },
    defaultSize: "250g",
    price: 21.0,
    stock: 90,
  },
  {
    slug: "medjool-dates",
    name: "Artisanal Medjool Dates",
    categorySlug: "dates-figs",
    rating: 4.9,
    description: "Sourced from the sun-drenched valleys of Jericho, our 'Large' reserve dates are prized for their maple-syrup sweetness and melting texture.",
    image: "/assets/dates_category.png",
    gallery: ["/assets/dates_category.png", "/assets/almonds_product.png", "/assets/walnuts_product.png"],
    badge: "ORGANIC",
    dietary: ["Organic", "Raw"],
    sizePrices: { "500g": 48.0, "1kg": 83.0 },
    defaultSize: "500g",
    price: 48.0,
    stock: 65,
  },
  {
    slug: "forest-berry-mix",
    name: "Forest Berry Mix",
    categorySlug: "dates-figs",
    rating: 4.6,
    description: "Antioxidant-rich blend of wild berries and dried premium raisins.",
    image: "/assets/seeds_category.png",
    gallery: ["/assets/seeds_category.png", "/assets/dates_category.png", "/assets/almonds_product.png"],
    badge: "",
    dietary: ["Gluten-Free"],
    sizePrices: { "250g": 11.0, "500g": 19.2 },
    defaultSize: "500g",
    price: 19.2,
    stock: 150,
  },
  {
    slug: "california-almonds",
    name: "Premium California Almonds",
    categorySlug: "premium-almonds",
    rating: 4.8,
    description: "Crispy and fresh California almonds loaded with proteins.",
    image: "/assets/almond_detail.png",
    gallery: ["/assets/almond_detail.png", "/assets/almonds_product.png", "/assets/cashews_product.png"],
    badge: "",
    dietary: ["Raw"],
    sizePrices: { "250g": 12.0, "500g": 22.0, "1kg": 40.0 },
    defaultSize: "500g",
    price: 22.0,
    stock: 200,
  },
  {
    slug: "walnut-halves",
    name: "Artisanal Walnut Halves",
    categorySlug: "walnut-kernels",
    rating: 4.7,
    description: "Raw, unsalted premium halves from the valleys of Kashmir.",
    image: "/assets/walnut_detail.png",
    gallery: ["/assets/walnut_detail.png", "/assets/walnuts_product.png", "/assets/almonds_product.png"],
    badge: "BEST SELLER",
    dietary: ["Organic", "Raw"],
    sizePrices: { "200g": 15.0, "400g": 28.0 },
    defaultSize: "200g",
    price: 15.0,
    stock: 75,
  },
  {
    slug: "chia-seeds",
    name: "Organic Chia Seeds",
    categorySlug: "dates-figs",
    rating: 4.9,
    description: "Rich in fiber and omega-3, perfect additions to smoothies.",
    image: "/assets/seeds_category.png",
    gallery: ["/assets/seeds_category.png", "/assets/almonds_product.png", "/assets/cashews_product.png"],
    badge: "ORGANIC",
    dietary: ["Organic", "Gluten-Free"],
    sizePrices: { "250g": 8.0, "500g": 14.5 },
    defaultSize: "250g",
    price: 8.0,
    stock: 300,
  },
  {
    slug: "salted-cashews",
    name: "Salted Cashews",
    categorySlug: "exotic-cashews",
    rating: 4.5,
    description: "Perfect snack-sized, golden roasted, lightly salted cashews.",
    image: "/assets/cashews_product.png",
    gallery: ["/assets/cashews_product.png", "/assets/almonds_product.png", "/assets/walnuts_product.png"],
    badge: "",
    dietary: ["Gluten-Free"],
    sizePrices: { "250g": 19.0, "500g": 36.0 },
    defaultSize: "250g",
    price: 19.0,
    stock: 140,
  },
  {
    slug: "pistachio-kernels",
    name: "Pistachio Kernels",
    categorySlug: "california-pistachios",
    rating: 4.8,
    description: "Shelled pistachio kernels, vibrant green, ready to eat snack.",
    image: "/assets/pistachios_category.png",
    gallery: ["/assets/pistachios_category.png", "/assets/pistachios_product.png", "/assets/cashews_product.png"],
    badge: "ORGANIC",
    dietary: ["Organic", "Raw"],
    sizePrices: { "250g": 24.0, "500g": 45.0 },
    defaultSize: "250g",
    price: 24.0,
    stock: 110,
  },
  {
    slug: "turkish-figs",
    name: "Dried Turkish Figs",
    categorySlug: "dates-figs",
    rating: 4.7,
    description: "Naturally sweet and chewy dried figs packed with nutrients.",
    image: "/assets/dates_category.png",
    gallery: ["/assets/dates_category.png", "/assets/seeds_category.png", "/assets/almonds_product.png"],
    badge: "",
    dietary: ["Raw", "Organic"],
    sizePrices: { "250g": 16.0, "500g": 30.0 },
    defaultSize: "250g",
    price: 16.0,
    stock: 85,
  },
];

const generalProducts = [
  {
    slug: "raw-forest-honey",
    name: "Raw Forest Honey",
    categorySlug: "honey",
    rating: 4.8,
    description: "Golden raw honey collected from forest-edge apiaries.",
    image: "/assets/honey.png",
    gallery: ["/assets/honey.png"],
    badge: "Best Seller",
    dietary: ["Organic"],
    sizePrices: { "500g": 24.0 },
    defaultSize: "500g",
    price: 24.0,
    stock: 100,
  },
  {
    slug: "aroma-herbbox",
    name: "Aroma Herbbox",
    categorySlug: "herbs",
    rating: 4.7,
    description: "Fresh-cut herb bunches packed for bright everyday cooking.",
    image: "/assets/herbs.png",
    gallery: ["/assets/herbs.png"],
    badge: "",
    dietary: ["Organic"],
    sizePrices: { "250g": 18.0 },
    defaultSize: "250g",
    price: 18.0,
    stock: 150,
  },
  {
    slug: "wildberry-mix",
    name: "Wildberry Mix",
    categorySlug: "fruit",
    rating: 4.9,
    description: "A seasonal mix of tart and sweet berries from partner farms.",
    image: "/assets/berries.png",
    gallery: ["/assets/berries.png"],
    badge: "",
    dietary: ["Organic"],
    sizePrices: { "300g": 19.0 },
    defaultSize: "300g",
    price: 19.0,
    stock: 90,
  },
  {
    slug: "heritage-grains",
    name: "Heritage Grains",
    categorySlug: "grains",
    rating: 4.6,
    description: "Slow-grown grains selected for texture, aroma, and nutrition.",
    image: "/assets/ancient_grains.png",
    gallery: ["/assets/ancient_grains.png"],
    badge: "",
    dietary: ["Organic"],
    sizePrices: { "1kg": 16.0 },
    defaultSize: "1kg",
    price: 16.0,
    stock: 200,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to DB
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MONGODB_URI is not defined in the environment variables.");
      process.exit(1);
    }
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing collections
    console.log("Clearing existing data...");
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    await ContentModule.deleteMany({});

    // Seed default Users
    console.log("Seeding users...");
    const adminUser = await User.create({
      name: "CrunchVeda Admin",
      email: "admin@crunchveda.com",
      password: "adminpassword123", // Hashes automatically via User schema pre-save
      role: "admin",
    });
    console.log(`Admin user created: ${adminUser.email}`);

    const customerUser = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "customerpassword123",
      role: "customer",
    });
    console.log(`Customer user created: ${customerUser.email}`);

    // Seed Categories
    console.log("Seeding categories...");
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`Seeded ${createdCategories.length} categories.`);

    // Map Category Slug to Object ID
    const categoryMap: Record<string, string> = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id.toString();
    });

    // Merge all products
    const allProductsToSeed = [...dryFruitsProducts, ...generalProducts];

    // Prepare products with correct Category Object ID reference
    const preparedProducts = allProductsToSeed.map((prod) => {
      const categoryId = categoryMap[prod.categorySlug];
      if (!categoryId) {
        throw new Error(`Category Object ID not found for slug: ${prod.categorySlug}`);
      }
      return {
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        price: prod.price,
        stock: prod.stock,
        images: [prod.image, ...(prod.gallery || [])].filter((img, index, self) => self.indexOf(img) === index),
        category: categoryId,
        ratings: {
          average: prod.rating,
          count: Math.floor(Math.random() * 50) + 10, // Random count for realism
        },
        badge: prod.badge,
        dietary: prod.dietary,
        sizePrices: prod.sizePrices,
        defaultSize: prod.defaultSize,
        isActive: true,
      };
    });

    console.log("Seeding products...");
    const createdProducts = await Product.insertMany(preparedProducts);
    console.log(`Seeded ${createdProducts.length} products.`);

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
