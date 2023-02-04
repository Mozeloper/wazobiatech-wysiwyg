import React, { useRef, useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import picture from "./assets/icons/picture.png";
import video from "./assets/icons/video-camera.png";
import social from "./assets/icons/social.png";
import link from "./assets/icons/link.png";
import alignleft from "./assets/icons/align-left.png";
import aligncenter from "./assets/icons/align-center.png";
import alignright from "./assets/icons/align-right.png";
import Modal from "./components/modal";
import Embed from "./components/embed";
import { handleEditorClick, getCaret } from "./helper";

let selection = null;

function App() {
  const inputRef = useRef(null);
  // const [selection, setSelection] = useState(null);
  const [content, setContent] = useState("");
  const [showActionsCard, setShowActionsCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  function caretSelection() {
    const windowSelection = window.getSelection();
    if (windowSelection.anchorNode.parentNode.id === "content-editable") {
      selection = windowSelection;
    }
  }

  useEffect(() => {
    inputRef.current.focus();
    if (inputRef.current) {
      inputRef.current.addEventListener("mousedown", () => getCaret());
      inputRef.current.addEventListener("mouseup", () => getCaret());
      inputRef.current.addEventListener("keydown", () => getCaret());
      inputRef.current.addEventListener("keyup", () => getCaret());
    }
  }, [content]);

  // const injectImage = (imageNode) => {
  //   let prevValue = inputRef.current.textContent;
  //   let position = sessionStorage.getItem("caretPosition");
  //   let output = [
  //     prevValue.slice(0, position),
  //     imageNode,
  //     prevValue.slice(position),
  //   ].join("");
  //   console.log(output, inputRef.current.innerText);
  //   inputRef.current.textContent = output;
  // };

  const handleBoldClick = () => {
    setBold(!bold);
  };

  const handleItalicClick = () => {
    setItalic(!italic);
  };

  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
    allowedAttributes: { a: ["href"] },
  };

  const sanitize = () => {
    setContent(sanitizeHtml(content, sanitizeConf));
  };

  const handleImageUpload = (e) => {
    let imageFile = e.target.files[0];
    // create a FileReader object
    let reader = new FileReader();
    // read the image as a data URL
    reader.readAsDataURL(imageFile);
    // listen for load event
    reader.onload = (event) => {
      // get the data URL
      const dataURL = event.target.result;
      handleEditorClick(dataURL);
    };
  };

  const handleFormatBlock = (blockType) => {
    document.execCommand("formatBlock", false, blockType);
  };

  // const handleContentChange = (event) => {
  //   setContent(event.target.innerHTML);
  // };

  return (
    <>
      <div className="w-full h-screen font-bold flex justify-center items-center">
        <div className="w-[662px] h-auto min-h-[813px] border border-borderColor rounded-md">
          <div className="mt-12 border-b border-borderColor"></div>
          <div className="w-full p-6">
            <div className="w-full text-2xl font-black text-[#343E37] mb-3">
              This is the title
            </div>
            <div className="mb-3 flex gap-2 w-[464px] min-h-[40px] rounded-md bg-BACKGROUND_WHITE">
              <div
                onClick={() => handleFormatBlock("h1")}
                className="border-r border-[#E7F1E9] cursor-pointer flex justify-center gap-1 items-center font-normal p-3"
              >
                paragraph
              </div>
              <div className="border-r border-[#E7F1E9] flex gap-3 items-center pr-4">
                <img
                  src={link}
                  className="w-[16px] h-[16px] cursor-pointer"
                  alt="icon_link"
                  loading="lazy"
                />
                <label htmlFor="dropzone-files">
                  <img
                    src={picture}
                    className="w-[16px] h-[16px] cursor-pointer"
                    alt="icon_picture"
                    loading="lazy"
                  />
                  <input
                    id="dropzone-files"
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="border-r border-[#E7F1E9] flex gap-3 items-center pr-4">
                <img
                  src={alignleft}
                  className="w-[20px] h-[20px] cursor-pointer"
                  alt="icon_alignleft"
                  loading="lazy"
                />
                <img
                  src={aligncenter}
                  className="w-[20px] h-[20px] cursor-pointer"
                  alt="icon_align-center"
                  loading="lazy"
                  onClick={() => {
                    setShowModal(true);
                  }}
                />
                <img
                  src={alignright}
                  className="w-[16px] h-[16px] cursor-pointer"
                  alt="icon_align-center"
                  loading="lazy"
                  onClick={() => {
                    setShowModal(true);
                  }}
                />
              </div>
              <div className="border-r border-[#E7F1E9] flex gap-3 items-center pr-4">
                <div
                  onClick={handleBoldClick}
                  className="font-extrabold text-[#343E37] cursor-pointer"
                >
                  B
                </div>
                <div
                  onClick={handleItalicClick}
                  className="font-extrabold text-[#343E37] italic cursor-pointer"
                >
                  I
                </div>
              </div>
            </div>
            <div
              id="content-editable"
              suppressContentEditableWarning={true}
              spellCheck={false}
              contentEditable={true}
              ref={inputRef}
              // onInput={handleContentChange}
              className="outline-none h-auto w-full font-normal"
              onBlur={sanitize}
              style={{
                fontWeight: bold ? "bold" : "normal",
                fontStyle: italic ? "italic" : "normal",
                // textDecoration: underline ? "underline" : "none",
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <div className="relative w-full mt-10">
              <div
                onClick={() => {
                  setShowActionsCard(!showActionsCard);
                }}
                className="cursor-pointer font-bold text-lg flex items-center justify-center h-[32px] w-[32px] rounded-full bg-[#CEE3D4]"
              >
                +
              </div>
              {showActionsCard && (
                <div className="bg-BACKGROUND_WHITE w-[277px] h-auto min-h-[181px] absolute top-10 left-0">
                  <div className="w-full text-xs font-normal text-[#333333] p-3">
                    EMBEDS
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <div
                      onClick={() => {
                        setShowModal(true);
                        setShowActionsCard(false);
                      }}
                      className="w-full cursor-pointer p-3 flex gap-2 hover:bg-[#F7FCF8] text-xs font-black text-[#333333] mb-1"
                    >
                      <img
                        src={picture}
                        className="w-[16px] h-[16px]"
                        alt="icon_picture"
                        loading="lazy"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="text-xs font-bold">Picture</div>
                        <div className="text-xs font-normal">Jpeg, png</div>
                      </div>
                    </div>
                    <div className="w-full cursor-pointer p-3 flex gap-2 hover:bg-[#F7FCF8] text-xs font-black text-[#333333] mb-1">
                      <img
                        src={video}
                        className="w-[16px] h-[16px]"
                        alt="icon_video"
                        loading="lazy"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="text-xs font-bold">Video</div>
                        <div className="text-xs font-normal">
                          JW player, Youtube, Vimeo
                        </div>
                      </div>
                    </div>
                    <div className="w-full cursor-pointer p-3 flex gap-2 hover:bg-[#F7FCF8] text-xs font-black text-[#333333] mb-1">
                      <img
                        src={social}
                        className="w-[16px] h-[16px]"
                        alt="icon_social"
                        loading="lazy"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="text-xs font-bold">Social</div>
                        <div className="text-xs font-normal">
                          Instagram, Twitter, TikTok, Snapchat, Facebook
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={showModal}>
        <Embed
          selection={selection}
          setShowModal={setShowModal}
          // injectImage={injectImage}
        />
      </Modal>
    </>
  );
}

export default App;
