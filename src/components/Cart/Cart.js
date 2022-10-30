import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const addCartItemHandler = (item) => {
    cartCtx.addToCart({ ...item, amount: 1 });
  };

  const removeCartItemHandler = (id) => {
    cartCtx.removeFromCart(id);
  };

  const cartItems = cartCtx.items.map((cartItem) => {
    return (
      <CartItem
        key={cartItem.id}
        name={cartItem.name}
        amount={cartItem.amount}
        price={cartItem.price}
        onAdd={addCartItemHandler.bind(null, cartItem)}
        onRemove={removeCartItemHandler.bind(null, cartItem.id)}
      ></CartItem>
    );
  });

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItemsInCart = cartCtx.items.length > 0;

  return (
    <Modal onClose={props.onCloseCart}>
      <ul className={classes['cart-items']}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button-alt']} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItemsInCart && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
