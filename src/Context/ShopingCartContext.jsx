import React, { useState, createContext, useContext } from "react";
import ShopingCart from "../Components/ShopingCart";

const ShopingCartContext = createContext("");

const ShopingCartProvider = ({ children }) => {
  const [CartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };

  const cartQuantity = CartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const getItemsQuantity = (id) => {
    return CartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removiItem = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <ShopingCartContext.Provider
      value={{
        CartItems,
        getItemsQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removiItem,
        openCart,
        closeCart,
        cartQuantity,
      }}
    >
      {children}
      <ShopingCart isOpen={isOpen} />
    </ShopingCartContext.Provider>
  );
};
export default ShopingCartProvider;

export const useShopingCart = () => {
  return useContext(ShopingCartContext);
};
