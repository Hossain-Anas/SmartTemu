// Product Controller - Search Functionality
const Product = require('../models/Product');

// Search Products
const searchProducts = async (req, res) => {
  try {
    // Extract query parameters
    const { q, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    
    // Convert to numbers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    // Build search query
    const query = {
      isActive: true
    };
    
    // Add text search using regex
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { brand: { $regex: q, $options: 'i' } }
      ];
    }
    
    // Add category filter
    if (category) {
      query.category = category;
    }
    
    // Add price range filters
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = parseFloat(maxPrice);
      }
    }
    
    // Execute search with pagination
    const products = await Product.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ _id: -1 });
    
    // Get total count
    const total = await Product.countDocuments(query);
    
    // Return response
    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum)
        }
      }
    });
    
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching products',
      error: error.message
    });
  }
};

module.exports = {
  searchProducts
};