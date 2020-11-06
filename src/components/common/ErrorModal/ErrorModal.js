import React, { useState } from "react";
import classes from "./ErrorModal.module.scss";

const ErrorModal = ({ globalError, globalErrorNull }) => {
  let [isOpen, setIsOpen] = useState(true);

  const onModalClose = () => {
    setIsOpen(false);
    globalErrorNull();
  };

  return (
    <div>
      {isOpen && (
        <div className={classes.Modal}>
          <div className={classes.ModalBody}>
            <h3>Something wrong...</h3>
            <p>{globalError}</p>
            <div className={classes.ModalClose} onClick={onModalClose}>
              Close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorModal;
