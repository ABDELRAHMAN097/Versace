// import React, {  useEffect, useState  } from 'react';
import { Row , Col } from 'react-bootstrap';
import StoreItems from "../Data/StoreItems.json"
import StoreItem from './StoreItem';
const Store = () => {
  
  return (
    <>   
    <h1>Store</h1>

      <Row lg={3} md={2} xs={1} className='g-3'>
          {StoreItems.map((item) => {
           return <Col key={item.id}>
              <StoreItem {...item}/>
             </Col>
          })}
      </Row>
       
      
    </>
  )
}

export default Store
