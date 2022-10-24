import  './Popup.css'
const Popup = props => {
    return (props.trigger) ?(
      <>
        <div className="pop-up">
            <div className="pop-up-inner">
                <button className='confirm' onClick={()=>props.setTrigger(false)}>confirm</button>
                <button className='close' onClick={()=>props.setTrigger(false)}>close</button>
                {props.children}
            </div>
        </div>
      </>
    ):"";
  }

  export default Popup;