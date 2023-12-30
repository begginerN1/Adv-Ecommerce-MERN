import React, { useEffect, useState } from 'react'
import styles from './ProductDetails.module.scss'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getAProduct } from '../../../redux/features/products/productSlice';
import { Spinner } from '../../loader/Loader';
import ProductRating from '../productRating/ProductRating';
import { calculateAverageRating, shortenText } from '../../../utils';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import Card from '../../card/Card';
import { ADD_TO_CART, DECREASE_CART, saveCartDB } from '../../../redux/features/cart/cartSlice';

const ProdDetails = () => {
    const { id } = useParams();
    const { product, isLoading } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [imageIndex, setImageIndex] = useState(0);

    const { cartItems } = useSelector(state => state.cart);

    const cart = cartItems.find(c => c._id === id);
    const isCartAdded = cartItems.findIndex(cart => cart._id === id);  

    useEffect(() => {
        const getSelectedProd = async () => {
            await dispatch(getAProduct(id));
        }
        getSelectedProd();  
    }, [id, dispatch])
    
    // Slider
    const slideLength = product?.image?.length;
    const nextSlide = () => {
        setImageIndex(imageIndex === slideLength - 1 ? 0 : imageIndex + 1);
    }

    let slideInterval;

    useEffect(() => {
        if (product?.image?.length > 1) {
            const auto = () => {
                slideInterval = setInterval(nextSlide, 3000);
            }
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [imageIndex, slideInterval]);
    
    const averageRating = calculateAverageRating(product?.rating);

    const addToCart = (prod) => {
        dispatch(ADD_TO_CART(prod));
        dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem('cartItems'))}));
    }
    const decreasingCart = (prod) => {
        dispatch(DECREASE_CART(prod));
        dispatch(saveCartDB({cartItems: JSON.parse(localStorage.getItem('cartItems'))}));
    }
    return (
        <section>
            <div className={`container ${styles.product}`}>
                <h2>Product Details</h2>
                <div>
                    <Link to={'/shop'}>&larr; back to shop</Link>
                </div>

                {isLoading ? (<Spinner />) : (
                    <>
                        <div className={styles.details}>
                            <div className={styles.img}>
                                <img className={styles.pImg} src={product?.image[imageIndex]} alt="imageArray" />

                                <div className={styles.smallImg}>
                                    {
                                        product?.image?.map((img, index) => {
                                            return (
                                                <img key={index}
                                                    alt='prod'
                                                    src={img}
                                                    onClick={() => setImageIndex(index)}
                                                    className={imageIndex === index ? "active" : ""}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles.content}>
                                <h3>{product?.name}</h3>
                                <ProductRating
                                    averageRating={averageRating}
                                    nuOfRatings={product?.rating?.length} />
                                <div className="--underline"></div>
                                <div className={styles.property}>
                                    <p><b>price:</b></p>
                                    <p className={styles.price}>${product?.price}</p>
                                </div>
                                <div className={styles.property}>
                                    <p><b>SKU:</b></p>
                                    <p>{product?.sku}</p>
                                </div>
                                <div className={styles.property}>
                                    <p><b>Category:</b></p>
                                    <p>{product?.category}</p>
                                </div>
                                <div className={styles.property}>
                                    <p><b>Brand:</b></p>
                                    <p>{product?.brand}</p>
                                </div>
                                <div className={styles.property}>
                                    <p><b>Color:</b></p>
                                    <p>{product?.color}</p>
                                </div>
                                <div className={styles.property}>
                                    <p><b>Quantity in Stock:</b></p>
                                    <p>{product?.quantity}</p>
                                </div>
                                <div className={styles.property}>
                                    <p><b>Sold:</b></p>
                                    <p>{product?.sold}</p>
                                </div>
                                <div className={styles.count}>
                                    {isCartAdded < 0 ? null : (
                                        <><br />
                                        <button className='--btn' onClick={()=>decreasingCart(product)}>-</button>
                                        <p>
                                            <b>{cart.cartQuantity}</b>
                                        </p>
                                        <button className='--btn' onClick={()=>addToCart(product)}>+</button><br />
                                    </>
                                    )}
                                    
                                </div>
                                <div className="--flex-start">
                                    {
                                        product?.quantity > 0 ? (
                                            <button className='--btn --btn-primary'
                                            onClick={()=>addToCart(product)}>ADD TO CART</button>
                                        ) : (
                                            <button className='--btn --btn-red' onClick={() => toast.error("sorry, the product is out of stock")}>Out of Stock</button>
                                        )
                                    }
                                    <button className='--btn --btn-danger'>ADD TO WISHLIST</button>
                                </div>
                                <div className="--underline"></div>
                                <div dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        shortenText(product?.description, 200)
                                    )
                                }}>

                                </div>
                            </div>
                        </div>
                    </>
                )}
                {/* review Section    */}
                <br/><br/><br/>
                <Card cardClass={styles.card}>
                    <h3>Product Review ???</h3>
                </Card>
            </div>
        </section>
    )
}

export default ProdDetails