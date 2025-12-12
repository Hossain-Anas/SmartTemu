import React from 'react';
import { use } from 'react';
import ProductCard from '../Shared/ProductCard';

const Products = ({products}) => {

    return (
        <div>
            <p className='text-center'>Available Total Products: {products.length}</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    products.map(product => <ProductCard product={product} key={product._id}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Products;