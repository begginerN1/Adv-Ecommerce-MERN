import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import styles from './ProductFilter.module.scss';
import { useDispatch } from 'react-redux';
import { FILTER_BY_BRAND, FILTER_BY_CAT, FILTER_BY_PRICE } from '../../../redux/features/products/filterSlice';
import { GET_PRICE_RANGE } from '../../../redux/features/products/productSlice';
import Slider from 'rc-slider'
import "rc-slider/assets/index.css";


const ProductFilter = () => {
  const { products, minPrice, maxPrice } = useSelector(state => state.product);
  const [category, setCategory] = useState('ALL');
  const [brand, setBrand] = useState('ALL');
  const [price, setPrice] = useState([10, 2000]);

  const dispatch = useDispatch();

  const allCategories = [
    "ALL",
    ...new Set(products?.map(product=>product.category))
  ]
  const allBrands = [
    "ALL",
    ...new Set(products?.map(product=>product.brand))
  ]

  const filterProductsCategory = (cat) => {
    setCategory(cat);
    
    dispatch(FILTER_BY_CAT({products, cat}))
   
  }
  
  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }))
  }, [dispatch, brand]);

  useEffect(() => {
    dispatch(GET_PRICE_RANGE({ products }))
  }, [dispatch, products]);

  
  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price}))
  }, [dispatch, price]);
  
  const clearFilter = () => {
    setCategory("ALL");
    setBrand('ALL');
    setPrice([minPrice,maxPrice])
  }

  return (
      <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
        return (
          <button
            key={index}
            type='button'
            className={`${category}` === cat ? `${styles.active}` : null}
            onClick={()=>filterProductsCategory(cat)}
          >
            &#8250; {cat}
          </button>
        )
      })}
      </div>
      <br />
      <h4>Brands</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>{brand}</option>
            )
          })}
        </select>
      </div>
      <br />
      <h4>Price</h4>
      <div className={styles.price}>
        <Slider
          range
          marks={{
            1: `${price[0]}`,
            1000: `${price[1]}`
          }}
          min={minPrice}
          max={maxPrice}
          defaultValue={[minPrice, maxPrice]}
          tipFormatter={value => `$${value}`}
          tipProps={{
            placement: "top",
            visible:true
          }}
          value={price}
          onChange={(e) => setPrice(e)}
        />
      </div><br /><br /><br />
      <button className='--btn --btn-danger' onClick={clearFilter}>clear filters...</button>
    </div>
    
  )
}

export default ProductFilter