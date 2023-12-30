import React from 'react'
import './Carousel.scss'
import { Link } from 'react-router-dom'
import { removeHTMLTags, shortenText } from '../../utils'
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, saveCartDB } from '../../redux/features/cart/cartSlice';

const CarouselItem = ({ url, name, price, regularPrice, description, product }) => {
  
  const desc = removeHTMLTags(description);
  const dispatch = useDispatch();

  const addToCart = async (prod) => {
    dispatch(ADD_TO_CART(prod));
    await dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem('cartItems')) }));
  }

  return (
    <div className='carouselItem'>
      <Link to={`/product-details/${product._id}`} >
        <img className='product--image img-vako' src={url} alt="product" />
        <p className="price">
          
          <span>{regularPrice > 0 && <del>${regularPrice}</del>} </span>
          {`$${price}`}
        
        </p>
        <h4>{shortenText(name, 18)}</h4>
        <p className='--mb'>{shortenText(desc, 26)}</p>
      </Link>
      <button className='--btn --btn-primary --btn-block' onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  )
}

export default CarouselItem