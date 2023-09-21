import React from 'react';
import { Nav, Navbar as NavbarBs ,Container ,Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useShopingCart } from '../Context/ShopingCartContext';

const Navbar = () => {
  const { openCart , cartQuantity } = useShopingCart()
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
         
          <Nav.Link to="/Store" as={NavLink}>
            Store
          </Nav.Link>
          
        </Nav>

        <Button
          onClick={openCart}
          variant="outline-primary"
          className="rounded-circle"
          style={{ width: "3rem", height: "3rem", position: "relative" }}
        >
          <i class="fa-solid fa-cart-shopping"></i>
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              position: "absolute",
              color: "white",
              height: "1.5rem",
              width: "1.5rem",
              bottom:0,
              right:0,
              transform:"translate(25% ,25%)"
            }}
          >
            {cartQuantity}
          </div>
        </Button>
      </Container>
    </NavbarBs>
  );
}

export default Navbar


