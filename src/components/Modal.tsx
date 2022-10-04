import React, { ReactNode } from "react";

import { AddTaskModal } from "../features/add-task-modal/components";

type ModalProps = {
  id: string;
  btnText: ReactNode;
};
const Modal = ({ id, btnText }: ModalProps) => {
  return (
    <div className="flex w-full justify-center">
      <label
        htmlFor={id}
        className="modal-button btn btn-ghost h-full hover:bg-transparent"
      >
        {btnText}
      </label>

      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <AddTaskModal />
        </label>
      </label>
    </div>
  );
};

export default Modal;
