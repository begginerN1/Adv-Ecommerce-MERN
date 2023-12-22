import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createBrand, getBrand, getCategories } from '../../../redux/features/categoryAndBrand/categoryAndBrandSlice';
import Loader from '../../loader/Loader';
import Card from '../../card/Card';

const CreateBrand = () => {
    const [name, setName] = useState('');
    const [cat, setCat] = useState('');
    const { isLoading, category } = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    },[dispatch])

    const saveBrand = async(e) => {
        e.preventDefault();        
        
        if (name.length < 3) {
            return toast.error("brand must be 3 characets")
        }
        if (!cat) {
            return toast.error("please, select the Parent Category")
        }
        const formData = {
            name,
            category:cat
        }
        console.log(formData);
        
        await dispatch(createBrand(formData));
        await dispatch(getBrand());
        setName("");
        setCat("");
    }
    return ( 
      <>
          {isLoading && <Loader/>}
          <div className='--mb2'>
              <h3>Create Brand</h3>
              <p>Use this form to create a <b>brand</b></p>
              <Card cardClass={"card"}>
                  <br />
                  <form onSubmit={saveBrand} >
                      <label>Brand Name: </label>
                      <input
                          type="text"
                          placeholder='brand name'
                          name='name'
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                        />
                        <br />

                        <label>Parent Catogory: </label>
                        <select name="category" className="form-control" onChange={(e) => setCat(e.target.value)}>
                            <option>Select Category</option>
                            {category.length > 0 && 
                                category.map(c => (
                                    <option key={c._id} value={c.name}>{c.name }</option>
                            ))
                            }

                        </select>

                      <div className='--my'>
                          <button type='submit' className='--btn --btn-primary'>Save Brand</button>
                      </div>
                  </form>
              </Card>
        </div>
      </>
      )
}

export default CreateBrand