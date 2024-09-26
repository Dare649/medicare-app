

const Modal = ({visible, children}) => {
    return (
      <div>
        {
          visible && 
            <div className="fixed inset-0 flex items-center justify-center bg-neutral-100 bg-opacity-50 z-50">
              {children}
            </div>
        }
      </div>
    )
  }
  
  export default Modal
  