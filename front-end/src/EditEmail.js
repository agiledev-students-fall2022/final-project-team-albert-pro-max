import './EditInfo.css'
import axios from "axios"
import { Form, Input, Button, Toast} from 'antd-mobile'
import { useEffect } from 'react'

const EditEmail = (prop) => {

    useEffect(() => {
        document.title = "Update Email - AlbertProMax";
    }, []);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const jwtToken = localStorage.getItem("token");
    // console.log('jwtToken', jwtToken)

    const changeEmail = () => {
        const newEmail = document.getElementById("newEmail").value;
        const re = /^\S+@nyu\.edu$/
        const emailValid  =re.test(newEmail);
        console.log(emailValid)
        if(newEmail!=='' && emailValid){
        axios.post(`${BASE_URL}/profile/update/email`, {
            newEmail: newEmail
        }, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        })
            .then(function (response) {
                console.log('enter here');
                console.log(response);
                localStorage.setItem("token", jwtToken);
                window.location.href = "/profile";
            })
            .catch(function (error) {
                console.log('enter error');
                console.log(error);
            });
        }
        else{
            return ( 
                Toast.show({
                    icon: 'fail',
                    content: "Invalid email!",
                })
            )
        }
    };

    return (
        <div className="editinfo">
            <h2>Change email</h2>
            {/* <label className='editlabel'>New Email Address:</label><br></br>
            <input id="newEmail" name="newEmail" title="New Email" /><br></br>
            <p className="form-actions">
                <input className="changebtn" type="submit" value="Change Email" title="Change Email" onClick={changeEmail} />
            </p> */}
            <Form layout='vertical'>
            <Form.Item  label='New Email' className='editlabel' >
            <br/>
            <Input id="newEmail" name="newEmail" type={"text"} placeholder='please enter new email' clearable />
             </Form.Item>
            </Form> 
            <br/>
            <br/>
            <Button className="changebtn" onClick={changeEmail}>Confirm</Button>
        </div>


    )

}
export default EditEmail