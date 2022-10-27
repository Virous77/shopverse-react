import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItem, selectCartTotalAmount } from "../../Redux/cartSlice";
import "../../styles/cart/Cart.css";
import { selectUserName, selectIsLoggedIn } from "../../Redux/authSlice";
import { cartHead, cartHeads } from "../../Utils/data";
import { HiPlus, HiMinus } from "react-icons/hi";
import { Link } from "react-router-dom";
import CheckoutTable from "./CheckoutTable";
import {
  ADD_TO_CART,
  DECREASE_CART,
  DELETE_ITEM,
  CALCULATE_SUB_TOTAL,
  CALCULATE_TOTAL_QUANTITY,
} from "../../Redux/cartSlice";

const Cart = () => {
  const cartItem = useSelector(selectCartItem);
  const islogged = useSelector(selectIsLoggedIn);
  const activeUser = useSelector(selectUserName);
  const totalAmmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();

  const decCart = (item) => {
    dispatch(DECREASE_CART(item));
  };

  const incCart = (item) => {
    dispatch(ADD_TO_CART(item));
  };

  const deleteCartItem = (item) => {
    dispatch(DELETE_ITEM(item));
  };

  useEffect(() => {
    dispatch(CALCULATE_SUB_TOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItem]);

  return (
    <main className="cartBar">
      {cartItem.length === 0 ? (
        <div className="cartEmpty">
          <p>Your Cart is Empty. 🙃</p>
          <Link to="/explore">
            <p
            className="conitueShop"
            >Continue Shopping</p>
          </Link>
        </div>
      ) : (
        <section className="cartBar">
          {islogged && (
            <div className="cartUser">
              <span>Welcome,</span>
              <p>{activeUser}</p>
            </div>
          )}

          <div className={`cartHead ${"hideCart"}`}>
            {cartHead.map((list) => (
              <p key={list.id}>{list.name}</p>
            ))}
          </div>

          <div className="showCart">
            {cartHeads.map((list) => (
              <p key={list.id}>{list.name}</p>
            ))}
          </div>

          <div className="cartItemList">
            {cartItem?.map((item) => {
              const { id, imageURL, title, price, cartQuantity } = item;

              return (
                <div className="cartItem" key={id}>
                  <div className="itemImgName">
                    <img src={imageURL} alt={title} />
                    <h4>{title}</h4>
                  </div>

                  <div className="cartPrice">
                    <h4>$ {price}</h4>
                  </div>

                  <div className="cartAction">
                    <button>
                      <HiMinus
                        className="minus"
                        onClick={() => decCart(item)}
                      />
                    </button>
                    <p>{cartQuantity}</p>
                    <button>
                      <HiPlus className="plus" onClick={() => incCart(item)} />
                    </button>
                  </div>

                  <div className="subTotal">$ {price * cartQuantity}</div>

                  <div className="cartItemDelete">
                    <FaTrash
                      className="trash"
                      onClick={() => deleteCartItem(item)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {cartItem.length > 0 && <CheckoutTable totalAmmount={totalAmmount} />}
    </main>
  );
};

export default Cart;
