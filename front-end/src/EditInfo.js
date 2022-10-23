import './EditInfo.css'

const EditInfo = () =>{
    return(
        <div className="EditInfo">
            <form>
                <label>
                    <div>enter new:</div>
                    <input type="text" name="password" />
                </label>
                <div>
                    <input type="submit" value="confirm" />
                    <input type="submit" value="cancel" />
                </div>
            </form>
        </div>
    )

}
export default EditInfo