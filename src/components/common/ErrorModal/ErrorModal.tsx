import React, { useState } from "react";
import classes from "./ErrorModal.module.scss";

type PropsType = {
  globalError: string | null;
  globalErrorNull: () => void;
};

const ErrorModal: React.FC<PropsType> = ({ globalError, globalErrorNull }) => {
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
