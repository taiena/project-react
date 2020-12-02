import React, { useState, useEffect, ChangeEvent } from "react";
import { updateUserStatus } from "../../../redux/profileReducer";
import { selectStatus } from "../../../redux/profileSelectors";
import { useSelector, useDispatch } from "react-redux";

type PropsType = {};

const ProfileStatusHooks: React.FC<PropsType> = (props) => {
  const userStatus = useSelector(selectStatus);

  const dispatch = useDispatch();

  const updateStatus = (status: string) => {
    dispatch(updateUserStatus(status));
  };

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(userStatus);

  useEffect(() => {
    setStatus(userStatus);
  }, [userStatus]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    updateStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>
            {userStatus || "-------"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusHooks;
