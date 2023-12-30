import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProducts } from '../../../redux/features/products/productSlice';
import "./ViewProducts.scss"
import Search from '../../seach/Search';
import { Spinner } from '../../loader/Loader';
import {AiOutlineEye} from "react-icons/ai"
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { shortenText } from '../../../utils';
import ReactPaginate from 'react-paginate'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const ViewProducts = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch();
  const { isloggedIn } = useSelector(state => state.auth);
  const { products, isLoading } = useSelector(state => state.product)

  useEffect(() => {

    const refreshProducts = async () => {
      await dispatch(getProducts());
      
  }
    if (isloggedIn) {
      refreshProducts();
    }
    
  }, [isloggedIn, dispatch])

 
    const itemsPerPage = 5
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % products.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
  };

  const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete Brand',
            message: 'Are you sure to delete this product?',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => delProd(id)
                },
                {
                    label: 'Cancel',
                    //   onClick: () => alert('Click No')
                }
            ]
        });
    };
  
  const delProd = async(id) => {
    await dispatch(deleteProduct(id));
  }
  
    return (
      <section>
        <div className='container product-list'>
          <div className='table'>
            <div className="--flex-between --flex-dir-column">
              <span>
                <h3>All products</h3>
                <p>~ <b>{products.length}</b> Product found</p>
              </span>
              <span>
                <Search value={search} onChange={(e) => setSearch(e.target.value)} />
              </span>
            </div>
          </div>
        
          {isLoading && <Spinner />}

          <div className='table'>
            {!isLoading && products.length === 0 ? (
              <p>no product found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Value</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((product, index) => {
                    const { _id, name, category, price, quantity } = product;
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{shortenText(name, 15)}</td>
                        <td>{category}</td>
                        <td>$ {price}</td>
                        <td>{quantity}</td>
                        <td>$ {price * quantity}</td>
                        <td className='icons'>
                          <span><Link to={"/"}><AiOutlineEye size={25} color={"purple"} /></Link></span>
                          <span><Link to={`/admin/edit-product/${_id}`}><FaEdit size={20} color={"green"} /></Link></span>
                          <span><FaTrashAlt size={20} color={"red"} onClick={()=>confirmDelete(_id)}/></span>
                        </td>
                        
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName='pagination'
            pageLinkClassName='page-num'
            previousLinkClassName='page-num'
            nextLinkClassName='page-num'
            activeClassName='activePage'
          />
        </div>
      </section>
    )
  }


export default ViewProducts