import CourseInCart from './CourseInCart'
import './ShoppingCart.css'

const ShoppingCart = (props) =>{
    const added = props.added
    const items = added.map((add) =>
    <CourseInCart key={add.id} show={props.show} setShow={props.setShow} name = {add.course_name}/>
  );
    return(
        <div className="ShoppingCart">
            <h2 id="cart_title">Shopping Cart</h2>
            {items}
        </div>
    )
};
ShoppingCart.defaultProps={
    id : 0
}
export default ShoppingCart