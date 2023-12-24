import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { RESET_PROD, getAProduct, updateProduct } from '../../../redux/features/products/productSlice';
import { getBrand, getCategories } from '../../../redux/features/categoryAndBrand/categoryAndBrandSlice';
import { toast } from 'react-toastify';
import ProductForm from '../productForm/ProductForm';
import Loader from '../../loader/Loader';

const EditProducts = () => {

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [files, setFiles] = useState([]);
  const { product: productEdit, isLoading, message } = useSelector(state => state.product);
  const [product, setProduct] = useState(productEdit);
  const { category: categories } = useSelector(state => state.category);
  const { brand: brands } = useSelector(state => state.brand);
  

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

// refresh product, brand and category
  useEffect(() => {

    const refreshState = async () => {
      // await dispatch(getCategories());
      // await dispatch(getBrand());
      await dispatch(getAProduct(id))
    }
    refreshState();
        
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    if (productEdit && productEdit.image) {
      setFiles(productEdit.image)
    }
},[productEdit])

  // filtered brand
  const filterBrands = (selectedCategory) => {
    const newBrands = brands.filter((brand) => brand.category === selectedCategory);
    setFilteredBrands(newBrands);
  };
    
  useEffect(() => {
    filterBrands(product?.category);
  }, [product?.category]);

  const saveProduct = async (e) => {
        e.preventDefault();

        if (files.length < 1) {
            return toast.error("please, add an image!")
        }
        
        const formData = {
            name:product.name,
            category:product.category,
            brand:product.brand,
            color:product.color,
            quantity: Number(product.quantity),
            regularPrice: Number(product.regularPrice),
            price: Number(product.price),
            description: product.description,
            image: files
        }
        console.log(formData);
        await dispatch(updateProduct({id, formData}));
  };
  
  useEffect(() => {
        if (message==='product updated successfully!') {
         navigate('/admin/all-product');
        }   
        dispatch(RESET_PROD());
    },[message, navigate, dispatch])

  const handleInputChange=(e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }


  return (
    <section>
          <div className="container">
           {isLoading && <Loader/>}
              <h3 className='--mt'>Edit product</h3>
              <ProductForm
                  saveProduct={saveProduct}
                  product={product}
                  handleInputChange={handleInputChange}
                  categories={categories}
                  files={files}
                  setFiles={setFiles}
                  isEditing={true}
                  filteredBrands={filteredBrands}
              />

          </div> 
    </section>
  )
}

export default EditProducts