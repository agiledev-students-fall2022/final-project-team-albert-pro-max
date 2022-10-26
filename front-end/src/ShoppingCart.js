import CourseInCart from './CourseInCart'
import './ShoppingCart.css'

const ShoppingCart = (props) =>{
    const added = props.added
    // let items = [];
    // for (let i = 0; i < added.length; i++) {
    //     items.push(<CourseInCart key={i} show={props.show} setShow={props.setShow} name={props.name}/>) // add
    // }
    const items = added.map((add) =>
    // Correct! Key should be specified inside the array.
    <CourseInCart key={add} show={props.show} setShow={props.setShow} name = {add}/>
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