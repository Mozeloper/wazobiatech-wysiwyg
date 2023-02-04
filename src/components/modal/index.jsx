/* eslint-disable no-unused-vars */
import ReactDOM from "react-dom";
import styled from "styled-components";

const portatRoot = document.getElementById("portal-root");

const Modal = ({
  children,
  isOpen,
  modalWidth = "659px",
  modalHeight = "336px",
}) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <Background>
      <div
        className="bg-white m-8 max-h-screen overflow-y-auto overflow-hidden"
        style={{
          borderRadius: 10,
          width: modalWidth,
          minHeight: modalHeight,
        }}
      >
        {children}
      </div>
    </Background>,
    portatRoot
  );
};

export default Modal;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  z-index: 99;
  justify-content: center;
  align-items: center;
`;
