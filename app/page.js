// components/ProductList.js
"use client"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // تأكد من المسار الصحيح

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
            <div className="card" key={product.id}>
              <img className="product-img" src={product.imageUrl} alt={product.name} width="200" />
              <div className="card-body">
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
              <p>Category: {product.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
