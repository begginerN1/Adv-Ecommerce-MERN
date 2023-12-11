import React from 'react'
import "./ProductCategory.scss"
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    title: "Gadgets",
    // image: "https://i.ibb.co/5GVkd3m/c1.jpg",
    image: "https://images.unsplash.com/photo-1565536421961-1f165e0c981e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Womens Fashion",
    image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Sport Sneakers",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Category = ({title, image}) => {
    const navigate = useNavigate();
    return (
        <div className="category">
            <h3>{title}</h3>
            <img className='img-vako' src={image} alt="cat" />
            <button className='--btn --btn-block --btn-primary'
               onClick={()=>navigate("/shop")} 
            >{"Shop Now >>>"}</button>
        </div>
    )
}

const ProductCategory = () => {
  return  <div className='categories'>
          {categories.map((cat) => {
              return(<div className='--flex-center' key={cat.id}>
                  <Category title={cat.title} image={cat.image} />
              </div>)
          })}
    </div>
  
}

export default ProductCategory