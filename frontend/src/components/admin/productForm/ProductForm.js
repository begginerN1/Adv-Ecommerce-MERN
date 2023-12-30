import React, { useState } from 'react'
import "./ProductForm.scss"
import Card from '../../card/Card'
import UploadWidget from './UploadWidget'
import { BsTrash } from 'react-icons/bs'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { list } from 'firebase/storage'

const ProductForm = ({
    saveProduct,
    product,
    handleInputChange,
    categories,
    isEditing,
    filteredBrands,
    description, setDescription,
    files, setFiles
}) => {

    const removeImage = (img) => {
        setFiles(files.filter((image) => image !== img))
    }
    

    return (
        <div className='add-product'>
            <UploadWidget files={files} setFiles={setFiles} product={product} />
          
            <Card cardClass={"card"}>
                <br />
                <form onSubmit={saveProduct}>
                    <label >Product Image(s):</label>
                    <div className='slide-container'>
                        <aside>
                            {files.length > 0 &&
                                files.map((img) => (
                                    <div key={img} className='thumbnail'>
                                        <img src={img} alt="product" height={100} />
                                        <div>
                                            <BsTrash className='thumbnailIcon' size={25} onClick={() => removeImage(img)} />
                                        </div>
                                    </div>
                                ))}
                            {files.length < 1 &&
                                <p className='--m'>no image(s) set for this product</p>}
                        </aside>
                      
                    </div><br />

                    <label >Product Name:</label>
                    <input
                        type="text"
                        placeholder='product name'
                        name='name'
                        required
                        value={product?.name}
                        onChange={handleInputChange}
                    />
                    <label >Product Category:</label>
                    <select name="category" value={product?.category} onChange={handleInputChange} >
                        {isEditing ? (
                            <option value={product?.category}>{product?.category}</option>
                        ) : (
                            <option>Select category</option>
                        )}
                        {categories.length > 0 &&
                            categories.map(cat => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                    </select>

                    <label >Product Brand:</label>
                    <select name="brand" value={product?.brand} onChange={handleInputChange} >
                        {isEditing ? (
                            <option value={product?.brand}>{product?.brand}</option>
                        ) : (
                            <option>Select brand</option>
                        )}
                        {filteredBrands.length > 0 &&
                            filteredBrands.map(brand => (
                                <option key={brand._id} value={brand.name}>{brand.name}</option>
                            ))}
                    </select>

                    <label >Color: </label>
                    <input
                        type="text"
                        placeholder='product color'
                        name='color'
                        required
                        value={product?.color}
                        onChange={handleInputChange}
                    />

                    <label >Regular Price: </label>
                    <input
                        type="number"
                        placeholder='product regular price'
                        name='regularPrice'
                        required
                        value={product?.regularPrice}
                        onChange={handleInputChange}
                    />

                    <label >Price: </label>
                    <input
                        type="number"
                        placeholder='product price'
                        name='price'
                      
                        value={product?.price}
                        onChange={handleInputChange}
                    />

                    <label >Quantity: </label>
                    <input
                        type="number"
                        placeholder='product quantity'
                        name='quantity'
                        required
                        value={product?.quantity}
                        onChange={handleInputChange}
                    />

                    <label >Description: </label>
                    
                    <ReactQuill
                        modules={ProductForm.modules}
                        formats={ProductForm.formats}
                        theme="snow"
                        value={description}
                        onChange={setDescription} />

                    <div>
                        <button type='submit' className='--btn --btn-primary'>Save product</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

ProductForm.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ lign: [] }],
        [{ color: [] }, { background: [] }],
        [
            {list:'ordered'},
            {list:'bullet'},
            {indent:'-1'},
            {indent:'1'},
        ],
        ["clean"],
  ],
};

ProductForm.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'video',
    'image',
    'code-block',
    'align'

]

export default ProductForm