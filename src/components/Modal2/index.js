import React, { useState } from "react";
import "./styles.scss";
import {AiOutlineCloseCircle} from "react-icons/ai"

const Modal2 = ({ hideModal, toggleModal, children, video }) => {
    if (hideModal) return null;

    return (
        <>
            <div className="modalOverlay2" onClick={() => toggleModal()} />

            <div className="modal2">
            <AiOutlineCloseCircle className="ExitButton" onClick={() => toggleModal()}/>
            {children}</div>

        </>
    );
};

export default Modal2;
