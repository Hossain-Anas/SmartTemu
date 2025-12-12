

import { useEffect, useState } from "react";
import Products from "../Products/Products";
import Banner from "../Shared/Banner";

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/products')
    .then(res => res.json())
    .then(data => setProducts(data))
    }, [])

    // const productsPromise = 
    return (
        <div>
           <Banner></Banner>

           <Products products={products}></Products>
        </div>
        
    );
};

export default Home;