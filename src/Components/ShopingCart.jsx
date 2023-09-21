import React from 'react';
import { Offcanvas, Stack } from 'react-bootstrap';
import { useShopingCart } from '../Context/ShopingCartContext';
import CartItem from './CartItem';
import StoreItems from "../Data/StoreItems.json";

const ShopingCart = ({isOpen}) => {
    const {CartItems , closeCart} = useShopingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                Cart
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
           <Stack gap={3}>
           {CartItems.map((item)=>(
                <CartItem key={item.id} {...item}/>
            ))}
            <div className='ms-auto fs-5 f-w-bold'>
                Total
                {" "}
                {CartItems.reduce((total , cartItem)=>{
                    const item = StoreItems.find((i)=> i.id === cartItem.id);
                    return total + (item?.price||0) * cartItem.quantity;
                },0)}
            </div>
           </Stack>
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShopingCart