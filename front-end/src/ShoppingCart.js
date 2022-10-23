import CourseInCart from './CourseInCart'
import './ShoppingCart.css'

const ShoppingCart = (props) =>{
    const num = props.id
    let items = [];
    for (let i = 0; i < num; i++) {
        items.push(<CourseInCart key={i}/>)
    }
    return(
        <div className="ShoppingCart">
            <h2>Shopping Cart</h2>
            {items}
        </div>
    )
};
export default ShoppingCart