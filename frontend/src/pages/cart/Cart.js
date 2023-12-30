import React, { useEffect } from 'react'
import styles from "./Cart.module.scss";
import "./Radio.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { ADD_TO_CART, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SUBTOTAL_CART, TOTAL_CART, saveCartDB } from '../../redux/features/cart/cartSlice';
import Card from '../../components/card/Card';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, cartTotalQuantity,cartTotalAmount } = useSelector(state => state.cart);
  
  useEffect(() => {
    dispatch(TOTAL_CART());
    dispatch(SUBTOTAL_CART())
  },[dispatch,cartItems])


  const removeFromCart = (product) => {
    dispatch(REMOVE_FROM_CART(product));
    dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem('cartItems'))}));
  }
  const decreasingCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem('cartItems'))}));
  }
  const addToCart = (prduct) => {
    dispatch(ADD_TO_CART(prduct));
    dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem('cartItems'))}));
  }
  const clearCart = () => {
    dispatch(CLEAR_CART());
    dispatch(saveCartDB({cartItems: []}));
  }

 


  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems?.length === 0 ? (
          <>
            <p>You cart is empty.</p>
            <div>
              <Link to={'/shop'}> &larr; continue shopping...</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((c, index) => {
                  const { name, price, image, cartQuantity } = c;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <p><b>{name}</b></p>
                        <img src={image[0]} alt="prodImage" style={{ width: '100px' }} />
                      </td>
                      <td>${price}</td>
                      <td>
                        <div className={styles.count}>
                          <><br />
                            <button className='--btn' onClick={() => decreasingCart(c)}>-</button>
                            <p>
                              <b>{c.cartQuantity}</b>
                            </p>
                            <button className='--btn' onClick={() => addToCart(c)}>+</button><br />
                          </>
                                    
                        </div>
                      </td>
                      <td>${price * cartQuantity}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color='red'
                          onClick={() => removeFromCart(c)}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              </table>
              <div className={styles.summary}>
                <button className='--btn --btn-danger'onClick={clearCart}>Clear Cart</button>
                <div className={styles.checkout} >
                  <div style={{ color:'aqua' }}>
                    <Link to={'/shop'} >&larr; continue shopping...</Link>
                  </div>
                  <br />
                  <Card cardClass={styles.card}>
                    <p>
                      <b>{`cart Item(s): ${cartTotalQuantity}`}</b>
                    </p>
                    <div className={styles.text}>
                      <h4>SuBtotal: </h4>
                      <h3>${cartTotalAmount?.toFixed(2) }</h3>
                    </div>
                  </Card>
                </div>
              </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart