// import './EditInfo.css'
import axios from "axios"
import { useEffect } from 'react'
import { Form, Input, Button, Toast} from 'antd-mobile'


const EditUser = (prop) => {

    useEffect(() => {
        document.title = "Update Username - AlbertProMax";
    }, []);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const jwtToken = localStorage.getItem("token");
    // console.log('jwtToken', jwtToken)

    const changeUsername = () => {
        const newUsername = document.getElementById("newUsername").value;
        console.log(newUsername);
        if(newUsername===''){
            return ( 
                Toast.show({
                    icon: 'fail',
                    content: "Invalid username!",
                })
            )
        }
       else{
        axios.post(`${BASE_URL}/profile/update/username`, {
            newUsername: newUsername
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
            <h2>Change Username</h2>



            {/* <label className='editlabel'>New Username:</label><br></br>
            <input id="newUsername" name="newUsername" title="New UserName" /><br></br>
            <p className="form-actions">
                <input className="changebtn" type="submit" value="Change Username" title="Change Username" onClick={changeUsername} />
            </p> */}
            <Form layout='vertical'>
            <Form.Item  label='New Username' className='editlabel' >
            <br/>
            <Input id="newUsername" name="newUsername" type={"text"} placeholder='please enter new username' clearable />
             </Form.Item>
            </Form> 
            <br/>
            <br/>
            <Button className="changebtn" onClick={changeUsername}>Confirm</Button>
            <br/><br/>
            <Button className="changebtn" onClick={() => { window.location.href = "/profile" }}>Back</Button>


        </div>


    )

}
export default EditUser