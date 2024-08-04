// dependencies
import { Modal } from "react-bootstrap";
import { RiCloseLine } from "react-icons/ri";

const ModalLayout = ({ showModal, closeModal, title, subtitle, className, children }) => {
  return (
    <>
      <Modal show={showModal} onHide={closeModal} className={`theme-modal ${className}`}  centered>
        <Modal.Header>
          <div>
          {title && <Modal.Title>{title}</Modal.Title>}
          {subtitle && <p className="mt-1 text-content">{subtitle}</p>}
          </div>
          <button type="button" className="btn-close" onClick={closeModal}>
            <RiCloseLine />
          </button>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default ModalLayout;