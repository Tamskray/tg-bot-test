import React from "react";
import Portal from "../common/Portal";

const ModalLayout = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <Portal target="modal-hook">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default ModalLayout;
