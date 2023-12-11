import ProductCarousel from "../../components/carusel/Carusel";
import CarouselItem from "../../components/carusel/CaruselItem";
import { productData, productDataPhone } from "../../components/carusel/data";
import FooterLinks from "../../components/footer/FooterLinks";
import Slider from "../../components/slider/Slider"
import HomeInfoBox from "./HomInfoBox";
import "./Home.scss";
import ProductCategory from "./ProductCategory";


const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--font-thin">{heading}</h2>
        <button className="--btn">{btnText}</button>
      </div>
      <div className="--hr"></div>
    </>
  )
}

const Home = () => {
  const productss = productData.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        url={item.imageurl}
        price={item.price}
        description={item.description}
      />
    </div>
  ))
  const productsPhone = productDataPhone.map((item) => (
    <div key={item.id}>
      <CarouselItem
        name={item.name}
        url={item.imageurl}
        price={item.price}
        description={item.description}
      />
    </div>
  ))
  return (
      <>
      <Slider /> 
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={"Latest Products"} btnText={"Shop Now >>>"} />
          <ProductCarousel products={productss}/>
        </div>
      </section>
      <section className="--bg-grey">
        <div className="container">
          <h3>Categories</h3>
          <ProductCategory/>
        </div>
      </section>

      <section>
        <div className="container">
          
          <PageHeading heading={"Mobile Phones"} btnText={"Shop Now >>>"} />
          <ProductCarousel products={productsPhone}/>
        </div>
      </section>
      <FooterLinks/>
    </>
  )
}

export default Home;