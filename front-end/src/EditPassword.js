import './EditInfo.css'
import axios from "axios"
import { useEffect } from 'react'
import { Form, Input, Button, Toast} from 'antd-mobile'

const EditPassword = (prop) => {

    useEffect(() => {
        document.title = "Update Password - AlbertProMax";
    }, []);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const jwtToken = localStorage.getItem("token");
    // console.log('jwtToken', jwtToken)

    const changePassword = () => {
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        if (newPassword !== confirmPassword) {
            // const popup = document.getElementById("myPopup");
            // popup.classList.toggle("show");
            // console.log("responsehere",response.data.message);
            //     const icon_mes = response.data.message == "Course already in cart!" ? 'fail':'success'
                return ( 
                    Toast.show({
                        icon: 'fail',
                        content: "Confirm password failed!",
                    })
                )
        } 
        else if (newPassword===''){
            return ( 
                Toast.show({
                    icon: 'fail',
                    content: "Invalid new password!",
                })
            )
        }
        else {
            axios.post(`${BASE_URL}/profile/update/password`, {
                newPassword: newPassword
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
    };

    return (
        <div className="editinfo">
            <h2>Change Password</h2>
            <Form layout='vertical'>
            <Form.Item  label='New Password' className='editlabel' >
            <br/>
            <Input id="newPassword" name="newPassword" type={"password"} placeholder='please enter new password' clearable />
             </Form.Item>
            </Form>
            <br/>
            <br/>
            <Form layout='vertical'>
            <Form.Item  label='Confirm New Password' className='editlabel' >
            <br/>
            <Input id="confirmPassword" name="confirmPassword" type={"password"} placeholder='please re-enter new password' clearable />
             </Form.Item>
            </Form> 
            <br/>
            <br/>
            <Button className="changebtn" onClick={changePassword}>Confirm</Button>
            <br></br>
                {/* <span className="popuptext" id="myPopup">Confirm Password Failed</span> */}

            {/* <label className='editlabel'>New Password:</label><br></br>
            <input type="password" id="newPassword" name="newPassword" title="New password" /><br></br>
            <label id='confirmLabel'>Confirm Password:</label><br></br>
            <input type="password" id="confirmPassword" name="confirmPassword" title="Confirm new password" /><br></br>
            <p className="form-actions">
                <input className="changebtn" type="submit" value="Change Password" title="Change password" onClick={changePassword} />
                <br></br>
                <span className="popuptext" id="myPopup">Confirm Password Failed</span>
            </p> */}
        </div>


    )

}
export default EditPassword