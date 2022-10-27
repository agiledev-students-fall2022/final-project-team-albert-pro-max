import CourseInCart from './CourseInCart'
import './ShoppingCart.css'

const ShoppingCart = (props) =>{
    const added = props.added
    const items = added.map((add) =>
    <CourseInCart key={add.index} show={props.show} setShow={props.setShow} name = {add}/>
  );
    return(
        <div className="ShoppingCart">
            <h2>Shopping Cart</h2>
            {items}
        </div>
    )
};
ShoppingCart.defaultProps={
    id : 0
}
export default ShoppingCart