"use client";
import { useEffect, useState } from "react";
import { storage, db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");

  const uploadProductImage = async (file) => {
    const storageRef = ref(storage, `products/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Image URL:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const addProductWithImage = async (productData) => {
    try {
      const imageUrl = await uploadProductImage(file);
      const docRef = await addDoc(collection(db, "products"), {
        ...productData,
        imageUrl,
      });
      console.log("Product added with ID: ", docRef.id);
      return true;
    } catch (error) {
      console.error("Error adding product: ", error);
      return false;
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddProduct = async () => {
    if (file && name && price) {
      const productData = {
        name,
        price: parseFloat(price),
        description,
        category,
      };

      const success = await addProductWithImage(productData);
      if (success) {
        resetForm();
        fetchProducts(); // تحديث قائمة المنتجات بعد الإضافة
      } else {
        console.error("Failed to add product.");
      }
    } else {
      console.error("No file selected or missing product details.");
    }
  };

  const resetForm = () => {
    setFile(null);
    setName("");
    setPrice("");
    setDescription("");
    setCategory("Men");
  };

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts(products.filter((product) => product.id !== productId));
      console.log("Product deleted with ID:", productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="control">
      <div>
        <input
          className="text-black"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="text-black"
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          className="text-black textarea"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="text-black"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div>
        <h1>Products Dashboard</h1>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="products">
            {products.map((product) => (
              <div className="card" key={product.id}>
                <img
                  className="product-img"
                  src={product.imageUrl}
                  alt={product.name}
                  width="200"
                />
                <div className="card-body">
                  <h2>{product.name}</h2>
                  <p>Price: ${product.price}</p>
                  <p>Description: {product.description}</p>
                  <p>Category: {product.category}</p>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    Delete Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
