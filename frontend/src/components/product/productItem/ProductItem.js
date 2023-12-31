import React from 'react'
import styles from './ProductItem.module.scss';
import Card from '../../card/Card';
import { Link } from 'react-router-dom';
import { calculateAverageRating, shortenText } from '../../../utils';
import { toast } from 'react-toastify';
import DomPurify from 'dompurify';
import DOMPurify from 'dompurify';
import ProductRating from '../productRating/ProductRating';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART, saveCartDB } from '../../../redux/features/cart/cartSlice';

const ProductItem = ({
    product,
    grid,
    _id,
    name,
    price,
    regularPrice,
    image,

}) => {

    const dispatch = useDispatch();

    const averageRating = calculateAverageRating(product.rating);

    const AddToCart = async(prod) => {
        dispatch(ADD_TO_CART(prod));
        await dispatch(saveCartDB({ cartItems: JSON.parse(localStorage.getItem('cartItems')) }));
    }

    return (
        <Card cardClass={grid? `${styles.grid}` : `${styles.list}`}>
            <Link to={`/product-details/${_id}`}>
                <div className={styles.img}>
                    <img src={image[0]} alt={name} />
                </div>
            </Link>
            <div className={styles.content}>
                <div className={styles.details}>
                    <p>
                        <span>{regularPrice > 0 && <del>${regularPrice} </del>}</span>
                        {`_ ${price}`}
                    </p>
                    <p style={{ color: 'green', fontStyle: 'italic' }}>Rating: </p>
                    <ProductRating
                        averageRating={averageRating}
                        nuOfRatings={product?.rating?.length} />
                    <h4>{shortenText(name, 18)}</h4>
                    {!grid && (
                        <div dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                            shortenText(product?.description,200)
                        )}}>

                        </div>
                    )}
                    
                    {product?.quantity > 0 ?(
                        <button className='--btn --btn-primary'onClick={()=>AddToCart(product)}>add to cart</button>
                    ) : (
                        <button className='--btn --btn-red' onClick={()=>toast.error("sorry, this product is out of stock")}>out of stock</button>
                    )}
                </div>
            </div>
        </Card>
    )
};

export default ProductItem;