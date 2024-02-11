interface ModalProps {
    children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">{children}</div>
        </div>
    );
}

export default Modal;
