import React, { useState } from "react";
import close from "../../assets/icons/close.png";

export default function Embed({ setShowModal, selection }) {
  const [showImage, setShowImage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleImageUpload = (e) => {
    setShowError(false);
    let imageFile = e.target.files[0];

    // create a FileReader object
    let reader = new FileReader();

    // read the image as a data URL
    reader.readAsDataURL(imageFile);

    // listen for load event
    reader.onload = function (event) {
      // get the data URL
      const dataURL = event.target.result;
      setShowImage(dataURL);
    };
  };

  const handleImageEmbedding = () => {
    // const selection = sessionStorage.getItem("caretSelection");
    let contentEditableElement = document.querySelector("#content-editable");
    const img = document.createElement("img");
    const caretPosition = sessionStorage.getItem("caretPosition");
    const targetNode = contentEditableElement.childNodes[caretPosition];
    // const range = selectionRef.current.getRangeAt(0);
    img.src = showImage;
    img.className = "w-full h-[323px]";
    contentEditableElement.insertBefore(img, targetNode);
    // injectImage(img);
    // range.insertNode(img);
    // range.collapse();
    setShowModal(false);

    // const container = document.getElementById('myDiv');
    // const selection = window.getSelection();
    // const range = selection.getRangeAt(0);
    // const targetNode = document.createTextNode('Hello World!');
    // range.insertNode(targetNode);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between w-full">
        <div className="w-full text-base font-bold text-[#333333]">EMBEDS</div>
        <img
          src={close}
          className="w-[16px] h-[16px] cursor-pointer"
          alt="icon_close"
          loading="lazy"
          onClick={() => setShowModal(false)}
        />
      </div>
      <div className="w-full mt-4 text-base font-normal text-[#333333]">
        Upload Image
      </div>
      <div className="w-full mt-4 text-xs font-normal text-[#333333]">
        FILE UPLOAD
      </div>
      <div className="flex items-center justify-center w-full mt-3">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-[141px] border-2 border-[0A7227] border-dashed rounded-lg cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full">
            {showImage !== "" ? (
              <img
                src={showImage}
                alt="upload"
                accept=".jpg, .jpeg, .png"
                className="w-[120px] h-[120px]"
              />
            ) : (
              <p className="text-sm text-[#343E37] border border-[#6CAA7D] px-4 py-2 rounded-lg">
                Import Image from Device
              </p>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>
      {showError ? (
        <div className="text-red text-xs font-normal">
          Please Upload an Image
        </div>
      ) : null}
      <div className="w-full flex gap-2 mt-4">
        <button
          onClick={handleImageEmbedding}
          type="button"
          className="outline-none border-none bg-[#0A7227] text-white rounded-md w-[78px] h-[35px]"
        >
          Embed
        </button>
        <button
          onClick={() => setShowModal(false)}
          type="button"
          className="outline-none border border-[#CEE3D4] bg-none text-[#343E37] rounded-md w-[78px] h-[35px]"
        >
          cancel
        </button>
      </div>
    </div>
  );
}
