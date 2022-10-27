import  './Popup.css'
import EditInfo from'./EditPassword.js'
const Popup = props => {
    return (props.trigger) ?(
      <>
        <div className="pop-up">
            <div className="pop-up-inner">
                {<EditInfo></EditInfo>}
            </div>
        </div>
      </>
    ):"";
  }

  export default Popup;