import React from 'react'
import Box from '@material-ui/core/Box';
import Button from './Button';
import './CourseInCart.css'
const CourseInCart = () =>{
    return(
        <div className="CourseInCart">
            <Box style={singleBox}>
                Course Name
                <Button title='Watch' id='watch'/>
                <Button title='Show' id='show'/>
            </Box>
        </div>
    )

}
export default CourseInCart

const singleBox = {
    border: 1,
    borderColor: "black",
    backgroundColor: "gray",
    borderStyle: "solid",
    padding: 15,
    margin: 10,

};