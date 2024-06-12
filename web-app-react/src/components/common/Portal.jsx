import React from "react";
import { createPortal } from "react-dom";

const Portal = ({ target, children }) => {
  return createPortal(children, document.getElementById(target));
};

export default Portal;
