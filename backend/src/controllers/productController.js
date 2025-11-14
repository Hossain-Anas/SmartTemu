// Product Controller - Search Functionality
const Product = require('../models/Product');

const searchProducts = async (req, res) => {
  try {
    // Extract query parameters
    const { q, category, minPrice, maxPrice, page = 1, limit = 10, sort } = req.query;

    
    // Convert to numbers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    let sortOption = {_id: -1};
    
    if (sort === 'price-asc') {
      sortOption = {price: 1};}
    
    if (sort === 'price-desc') {
      sortOption = {price: -1};
    }

    if (sort === 'name_asc') {
      sortOption = {name: 1};
    }

    if (sort === 'name_desc') {
      sortOption = {name: -1};
    }


    // Build search query
    const query = {
      isActive: true
    };
    
    // Add text search using regex
    if (q) {
      const regex = new RegExp(q, 'i'); 
      
      query.$or = [
        { name: regex },
        { description: regex },
        { category: regex },
        { brand: regex },
        { tags: regex }
      ];
    }
    
    // Add category filter
    if (category) {
      query.category = new RegExp(`^${category}$`, "i");
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
      .sort(sortOption);
    
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