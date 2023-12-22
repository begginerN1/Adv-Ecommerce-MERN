import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrand } from '../../../redux/features/categoryAndBrand/categoryAndBrandSlice';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { FaTrashAlt } from 'react-icons/fa';

const BrandList = () => {
  const { isLoading, brand } = useSelector(state => state.brand);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrand());
        // console.log(brand);
    }, [dispatch]);


    const confirmDelete = (slug) => {
        confirmAlert({
            title: 'Delete Brand',
            message: 'Are you sure to delete this brand',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => deleteBrand_(slug)
                },
                {
                    label: 'Cancel',
                    //   onClick: () => alert('Click No')
                }
            ]
        });
    };
    
    const deleteBrand_ = async (slug) => {
        await dispatch(deleteBrand(slug));
        await dispatch(getBrand());
    }
    

  return (
      <div className='--mb2'>
          <h3>All Brands</h3>
          <div className='table'>
              {brand.length === 0 ? (
                  <p>no brand found...</p>
              ) : (
                      <table>
                          <thead>
                              <tr>
                                  <th>s/n</th>
                                  <th>name</th>
                                  <th>Category</th>
                                  <th>action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {brand.map((cat, index) => {
                                  return (
                                      <tr key={cat._id}>
                                          <td>{index + 1}</td>
                                          <td>{cat.name}</td>
                                          <td>{cat.category}</td>
                                          <td><span>
                                              <FaTrashAlt size={20} color='red' onClick={()=>confirmDelete(cat.slug)}/>
                                          </span></td>
                                      </tr>
                                  )
                              } )}
                          </tbody>
                      </table>
              )}
          </div>
      </div>
  )
}

export default BrandList