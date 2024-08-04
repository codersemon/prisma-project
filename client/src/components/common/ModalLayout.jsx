// dependencies
import { Modal } from "react-bootstrap";

const ModalLayout = ({
  showModal,
  closeModal,
  title,
  subtitle,
  className,
  children,
  dialogClassName
}) => {
  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
        className={`theme-modal ${className}`}
        centered
        dialogClassName={dialogClassName}
      >
        <Modal.Header>
          <div>
            {title && <Modal.Title>{title}</Modal.Title>}
            {subtitle && <p className="mt-1 text-content">{subtitle}</p>}
          </div>
          <button type="button" className="btn-close" onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default ModalLayout;
