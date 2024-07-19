/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {  useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import axios from 'axios';


const Store = () => {
  const [products , setproducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, [])

  function getProducts (){
    axios("http://localhost:1337/api/products?populate=*").then((res) => {
      console.log(res.data.data)
      setproducts(res.data.data)
    }) 
  }

  return (
    <>   
    <h1 className='py-2'>Store gg</h1>
      <Row lg={3} md={2} xs={1} className='g-3'>
          {products.map((item) => {
           return <div key={item.id}>
              <img src={`http://localhost:1337` + item.attributes.product_img.data.attributes.url}
              style={{ height: "200px", width: "100", objectFit: "cover" }}
               alt='product-image' />
              <p>product name : {item.attributes.product_name}</p>
              <p>Price : {item.attributes.price}</p>
             </div>
          })}
      </Row>
       
      
    </>
  )
}

export default Store
