import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import "./Category.scss"
import Card from '../../card/Card'
import { toast } from 'react-toastify';
import { createCategory, getCategories } from '../../../redux/features/categoryAndBrand/categoryAndBrandSlice';
import Loader from '../../loader/Loader';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const { isLoading } = useSelector(state => state.category);
    const dispatch = useDispatch();

    const saveCategory = async(e) => {
        e.preventDefault();
        
        if (name.length < 2) {
            return toast.error("category must be 3 characets")
        }
        const formData = {
            name
        }
        await dispatch(createCategory(formData));
        await dispatch(getCategories());
        setName("");
    }

  return (
      <>
          {isLoading && <Loader/>}
          <div className='--mb2'>
              <h3>Create Category</h3>
              <p>Use this form to create a <b>category</b></p>
              <Card cardClass={"card"}>
                  <br />
                  <form onSubmit={saveCategory}>
                      <label>Category Name: </label>
                      <input
                          type="text"
                          placeholder='Category name'
                          name='name'
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                      />
                      <div className='--my'>
                          <button type='submit' className='--btn --btn-primary'>Save Category</button>
                      </div>
                  </form>
              </Card>
        </div>
      </>
  )
}

export default CreateCategory