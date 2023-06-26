import React from "react";

const Modal = (props) => {
  return (
    <div
      className={`${
        !props.toggle && "hidden"
      } fixed z-10 left-0 top-0 w-full h-full overflow-hidden bg-modalBG flex justify-center items-center`}
    >
      {props.children}
    </div>
  );
};

export default Modal;
