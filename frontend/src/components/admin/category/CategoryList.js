import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getCategories } from '../../../redux/features/categoryAndBrand/categoryAndBrandSlice';
import { FaTrashAlt } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const CategoryList = () => {
    const { isLoading, category } = useSelector(state => state.category);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories()); 
    }, [dispatch]);


    const confirmDelete = (slug) => {
        confirmAlert({
            title: 'Delete Category',
            message: 'Are you sure to delete this category',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => deleteCat(slug)
                },
                {
                    label: 'Cancel',
                    //   onClick: () => alert('Click No')
                }
            ]
        });
    };
    
    const deleteCat = async (slug) => {
        await dispatch(deleteCategory(slug));
        await dispatch(getCategories());
    }
    

  return (
      <div className='--mb2'>
          <h3>All Categories</h3>
          <div className='table'>
              {category.length === 0 ? (
                  <p>no category found...</p>
              ) : (
                      <table>
                          <thead>
                              <tr>
                                  <th>s/n</th>
                                  <th>name</th>
                                  <th>action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {category.map((cat, index) => {
                                  return (
                                      <tr key={cat._id}>
                                          <td>{index + 1}</td>
                                          <td>{cat.name}</td>
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

export default CategoryList