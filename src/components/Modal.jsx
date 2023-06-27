import React from "react";

const Modal = (props) => {
  return (
    <div
      className={`${
        !props.toggle && "hidden"
      } fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center overflow-hidden bg-modal-bg`}
    >
      {props.children}
    </div>
  );
};

export default Modal;
