export const handleEditorClick = (file) => {
  let contentEditableElement = document.querySelector("#content-editable");
  const img = document.createElement("img");
  img.src = file;
  img.className = "w-full h-[323px]";
  const selection = window.getSelection();
  if (selection.anchorNode.parentNode.id !== "content-editable") {
    contentEditableElement.appendChild(img);
  } else {
    const range = selection.getRangeAt(0);
    range.insertNode(img);
    range.collapse();
  }
};

export function checkCaretPosition() {
  let contentEditableElement = document.querySelector("#content-editable");
  let selection = window.getSelection();
  let range = document.createRange();
  let textNode = document.getTextNode("|");
  contentEditableElement.appendChild(textNode);
  range.setStart(textNode, 0);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);

  let caretRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
  return caretRect;
  // textNode.remove();
}

export function getCaret() {
  sessionStorage.setItem("caretPosition", window.getSelection().focusOffset);
}

export function caretSelection() {
  const selection = window.getSelection();
  console.log(JSON.stringify(selection));
  sessionStorage.setItem("caretSelection", selection);
}
