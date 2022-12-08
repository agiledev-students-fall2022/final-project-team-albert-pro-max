// import './EditInfo.css'
import axios from "axios"
import { useEffect } from 'react'
import { Form, Input, Button, Toast } from 'antd-mobile'

const EditEmail = (prop) => {

    useEffect(() => {
        document.title = "Update Email - AlbertProMax";
    }, []);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const jwtToken = localStorage.getItem("token");
    // console.log('jwtToken', jwtToken)

    const changeEmail = () => {
        const newEmail = document.getElementById("newEmail").value;

        if (newEmail === "" || newEmail.indexOf("@") === -1) {
            Toast.show({
                icon: 'fail',
                content: 'Update Failed!',
            });

            return;
        }

        axios.post(`${BASE_URL}/profile/update/email`, {
            newEmail: newEmail
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
    };

    return (
        <div className="editinfo">
            <h2>Change email</h2>

            <Form layout='vertical'>
                <Form.Item label='New Email' name='newEmail'>
                    <Input id="newEmail" type={"text"} placeholder='please enter new email' clearable />
                </Form.Item>
            </Form>

            <br />
            <br />

            <Button block size='large' onClick={changeEmail}>Change Email</Button>
            <br />
            <br />
            <Button block size='large' onClick={() => { window.location.href = "/profile" }}>Back</Button>
        </div>


    )

}
export default EditEmail