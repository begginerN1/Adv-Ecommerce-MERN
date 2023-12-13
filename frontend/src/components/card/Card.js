import styles from "./Card.module.scss";


const Card = ({children, cardClass}) => {
  return <div className={`S{styles.card} ${cardClass}`}>
          {children}</div>
  
}

export default Card;