import React from "react";
import ModalLayout from "./ModalLayout";

const Modal = ({ children, ...props }) => {
  return (
    <>
      <ModalLayout {...props}>{children}</ModalLayout>
    </>
  );
};

export default Modal;
