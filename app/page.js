// components/ProductList.js
"use client"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; 

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-5">
      <h1 className="pb-5">Product List</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="products">
          {products.map(product => (
            <div className="border w-48 block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark" key={product.id}>
              <img className="rounded-t-lg" src={product.imageUrl} alt={product.name} width="200" />
              <div className="p-6 text-surface dark:text-black">
              <h2 className="p-6 text-surface dark:text-black">{product.name}</h2>
              <p className="p-6 text-surface dark:text-black">Price: ${product.price}</p>
              <p className="p-6 text-surface dark:text-black">Description: {product.description}</p>
              <p className="p-6 text-surface dark:text-black">Category: {product.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
