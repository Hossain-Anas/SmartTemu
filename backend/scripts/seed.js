// Temporary seeder: self-contained, doesn't rely on your app files
require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Minimal product shape for testing
    const productSchema = new mongoose.Schema({
      name: String,
      description: String,
      price: Number,
      category: String,
      brand: String,
      tags: [String],
      isActive: { type: Boolean, default: true }
    }, { timestamps: true });

    // Text index so your /search works well
    productSchema.index({
      name: 'text',
      description: 'text',
      category: 'text',
      brand: 'text',
      tags: 'text'
    });

    const Product = mongoose.model('Product', productSchema, 'products');

    // Clear existing for repeatable testing
    await Product.deleteMany({});

    // Insert dummy products
    await Product.insertMany([
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic 2.4GHz wireless mouse',
        price: 19.99,
        category: 'Electronics',
        brand: 'LogiTech',
        tags: ['mouse', 'wireless', 'peripherals'],
        isActive: true
      },
      {
        name: 'Gaming Laptop',
        description: 'RTX 4060, 16GB RAM, 512GB SSD',
        price: 1299.99,
        category: 'Electronics',
        brand: 'Acer',
        tags: ['laptop', 'gaming', 'computer'],
        isActive: true
      },
      {
        name: 'Coffee Mug',
        description: 'Ceramic mug 350ml',
        price: 5.99,
        category: 'Home',
        brand: 'Mugify',
        tags: ['mug', 'kitchen'],
        isActive: true
      }
    ]);

    console.log('Seeded test products.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();