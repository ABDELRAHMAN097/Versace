import React from "react";
import { Stack } from "react-bootstrap";
import StoreItems from "../Data/StoreItems.json";
import { useShopingCart } from "../Context/ShopingCartContext";

const CartItem = ({ id, quantity }) => {
  const {removiItem} = useShopingCart();
  const item = StoreItems.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
      <img
        src={item.imgurl}
        alt="cart-img"
        style={{ width: "125px", hight: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}
          {"  "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <span className="text-muted" style={{ fontSize: "0.85rem" }}>
              {item.price}
            </span>

      </div>
            <div>{item.price * quantity}</div>
      <button className="btn btn-outline-danger" size="sm" onClick={() => removiItem(id)}>
              &times;
      </button>
      
    </Stack>
  );
};

export default CartItem;
