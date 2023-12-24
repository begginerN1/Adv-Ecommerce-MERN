import React, { useEffect, useState } from 'react'
import Loader from '../../loader/Loader'
import { useSelector, useDispatch } from 'react-redux'
import ProductForm from '../productForm/ProductForm';
import "./AddProduct.scss";
import { getBrand, getCategories } from '../../../redux/features/categoryAndBrand/categoryAndBrandSlice';
import { RESET_PROD, createProduct, deleteProduct, getProducts } from '../../../redux/features/products/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    category: "",
    brand: "",
    quantity: "",
    color: "",
    price: "",
    regularPrice: "",
    description:""
}

const AddProducts = () => {
    const { isLoading, message } = useSelector(state => state.product);
    const { category: categories } = useSelector(state => state.category);
    const { brand: brands } = useSelector(state => state.brand);
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const [product, setProduct] = useState(initialState);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [files, setFiles] = useState([]);

    const { name, category, brand, price, quantity, color, regularPrice, description } = product;

    // filtered brand
    const filterBrands=(selectedCategory) => {
        const newBrands = brands.filter((brand) => brand.category === selectedCategory);
        setFilteredBrands(newBrands);
    }
    
    useEffect(() => {
        filterBrands(category);
    },[category])


    const refreshState = async() => {
        await dispatch(getCategories());
        await dispatch(getBrand());
    }

    const generateSKU = (cat) => {
        const letter = cat.slice(0, 3).toUpperCase();
        const number = Date.now();
        return letter + '-' + number;
    }

    const saveProduct = async (e) => {
        e.preventDefault();

        if (files.length < 1) {
            return toast.error("please, add an image!")
        }
        
        const formData = {
            name,
            sku: generateSKU(category),
            category,
            brand,
            color,
            quantity: Number(quantity),
            regularPrice: Number(regularPrice),
            price: Number(price),
            description,
            image: files
        }
        console.log(formData);
        await dispatch(createProduct(formData));
        await dispatch(getProducts);
        
    };

    useEffect(() => {
        if (message==='product created successfully!') {
         navigate('/admin/all-product');
        }   
        dispatch(RESET_PROD());
    },[message, navigate, dispatch])

    const handleInputChange=(e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        refreshState();
        // console.log(categories, brands);
        
    }, [dispatch])
    
  return (
      <section>
          <div className="container">
           {isLoading && <Loader/>}
              <h3 className='--mt'>Add new product</h3>
              <ProductForm
                  saveProduct={saveProduct}
                  product={product}
                  handleInputChange={handleInputChange}
                  categories={categories}
                  files={files}
                  setFiles={setFiles}
                  isEditing={false}
                  filteredBrands={filteredBrands}
              />

          </div> 
    </section>
  )
}

export default AddProducts