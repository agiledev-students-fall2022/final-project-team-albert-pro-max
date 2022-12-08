// import './EditInfo.css'
import axios from "axios"
import { useEffect } from 'react'
import { Form, Input, Button, Toast } from 'antd-mobile'

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
            const popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
        } else {
            axios.post(`${BASE_URL}/profile/update/password`, {
                newPassword: newPassword
            }, {
                headers: { Authorization: `Bearer ${jwtToken}` }
            })
                .then(function (response) {
                    console.log('enter here');
                    console.log(response);
                    localStorage.setItem("token", jwtToken);

                    if (response.data.success) {
                        window.location.href = "/profile";
                    } else {
                        Toast.show({
                            icon: 'fail',
                            content: 'Update Failed!',
                        });
                    }
                })
                .catch(function (error) {
                    console.log('enter error');
                    console.log(error);

                    Toast.show({
                        icon: 'fail',
                        content: 'Update Failed!',
                    });
                });
        }
    };

    return (
        <div className="editinfo">
            <h2>Change Password</h2>

            <Form layout='vertical'>
                <Form.Item label='New Password' name='newPassword'>
                    <Input id="newPassword" type={"password"} placeholder='please enter new password' clearable />
                </Form.Item>

                <Form.Item label='Confirm Password' name='confirmPassword'>
                    <Input id="confirmPassword" type={"password"} placeholder='please enter new password again' clearable />
                </Form.Item>
            </Form>

            <br />
            <br />

            <Button block size='large' onClick={changePassword}>Change Password</Button>
            <br />
            <br />
            <Button block size='large' onClick={() => { window.location.href = "/profile" }}>Back</Button>
        </div>


    )

}
export default EditPassword