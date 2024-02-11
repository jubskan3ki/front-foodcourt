interface ModalProps {
    children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
    return (
        <div className="modal-overlay" role="presentation" tabIndex={-1}>
            <div className="modal-content" role="presentation">
                {children}
            </div>
        </div>
    );
}

export default Modal;
