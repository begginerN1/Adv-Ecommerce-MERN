import React, { useState } from 'react'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { sliderData } from './slider-data';

const Slider = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const prevSlide = () => {
        
    }
    const nextSlide = () => {
        
    }

  return (
      <div className='slider'>
          <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide}/>
          <AiOutlineArrowRight className='arrow next' onClick={nextSlide} />
          
          {
              sliderData.map((slide, index) => {
                  const { image, heading, desc } = slide;
                  return (
                      <div key={index} className={index===currentSlide?"slide current":"slide"}>
                          {index === currentSlide && (
                              <>
                                  <img src={image} alt="slide" />
                                  <p>{`"${image}"`}</p>
                                  <div className='content'>
                                      <span className="span1"></span>
                                      <span className="span2"></span>
                                      <span className="span3"></span>
                                      <span className="span4"></span>
                                      <h2>{heading}</h2>
                                      <p>{desc}</p>
                                      <hr />
                                      <button className='--btn --btn-primary'>
                                          Shop Now
                                      </button>
                                  </div>
                              </>
                          )}
                      </div>
                  )
             }) 
          }
    </div>
  )
}

export default Slider