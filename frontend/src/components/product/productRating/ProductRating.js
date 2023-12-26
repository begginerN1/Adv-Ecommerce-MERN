import './productRating.scss'
import React from 'react'
import StarRatings from 'react-star-ratings';

const ProductRating = ({averageRating, nuOfRatings}) => {
  return (
      <>
          {averageRating > 0 && (
              <>
                  <StarRatings
                      starDimension='20px'
                      starSpacing='2px'
                      starRatedColor='#F6B01E'
                      rating={averageRating}
                      editing={false}
                  />
                  ({nuOfRatings})
              </>
              
         )} 
    </>
  )
}

export default ProductRating