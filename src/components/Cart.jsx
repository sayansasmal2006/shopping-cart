import { useState } from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { state, dispatch } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  const subtotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = state.coupon
    ? (subtotal * state.coupon) / 100
    : 0;

  const afterDiscount = subtotal - discount;

  const gst = afterDiscount * 0.18;

  const grandTotal = afterDiscount + gst;

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (code === "SAVE10") {
      dispatch({
        type: "APPLY_COUPON",
        payload: 10,
      });

      setCouponMessage("10% coupon applied!");
    } else if (code === "SAVE20") {
      dispatch({
        type: "APPLY_COUPON",
        payload: 20,
      });

      setCouponMessage("20% coupon applied!");
    } else {
      setCouponMessage("Invalid coupon code.");
    }
  };

  return (
    <section className="cart">
      <h2>Shopping Cart</h2>

      {state.cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {state.cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div className="quantity">
                <button
                  onClick={() =>
                    dispatch({
                      type: "DECREASE_QUANTITY",
                      payload: item.id,
                    })
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    dispatch({
                      type: "INCREASE_QUANTITY",
                      payload: item.id,
                    })
                  }
                >
                  +
                </button>
              </div>

              <p>₹{item.price * item.quantity}</p>

              <button
                className="remove-btn"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: item.id,
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}

          <div className="coupon">
            <h3>Coupon Code</h3>

            <input
              type="text"
              placeholder="SAVE10 or SAVE20"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />

            <button onClick={applyCoupon}>Apply Coupon</button>

            {couponMessage && <p>{couponMessage}</p>}
          </div>

          <div className="summary">
            <h3>Bill Summary</h3>

            <p>
              Subtotal:
              <span>₹{subtotal.toFixed(2)}</span>
            </p>

            <p>
              Discount:
              <span>- ₹{discount.toFixed(2)}</span>
            </p>

            <p>
              GST (18%):
              <span>₹{gst.toFixed(2)}</span>
            </p>

            <hr />

            <h2>
              Grand Total:
              <span>₹{grandTotal.toFixed(2)}</span>
            </h2>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;