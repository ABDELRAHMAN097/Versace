import React from "react";
import { Button, Card } from "react-bootstrap";
import { useShopingCart } from "../Context/ShopingCartContext";

const StoreItem = ({ id, price, name, imgurl }) => {
  const {
    getItemsQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removiItem,
  } = useShopingCart();
  const quantity = getItemsQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        src={imgurl}
        variant="top"
        style={{ height: "200px", width: "100", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline">
          <span className="fs-2">{name}</span>
          <span className="text-muted me-2">{price}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button onClick={() => increaseCartQuantity(id)} className="w-100">
              Add to card
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: "1.5rem" }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ gap: "1.5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <span className="fs-3">{quantity} in the cart</span>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button onClick={() => removiItem(id)} variant="danger" size="se">
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
