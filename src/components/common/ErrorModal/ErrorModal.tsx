import React, { useState } from "react";
import classes from "./ErrorModal.module.scss";
import { globalErrorNull } from "../../../redux/appReducer";
import { useDispatch } from "react-redux";

type PropsType = {
  globalError: string | null;
};

const ErrorModal: React.FC<PropsType> = ({ globalError }) => {
  let [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();

  const onModalClose = () => {
    setIsOpen(false);
    dispatch(globalErrorNull());
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
