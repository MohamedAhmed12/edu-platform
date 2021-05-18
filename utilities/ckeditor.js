export default function initCkeditor() {
  if (process.client) {
    var DecoupledEditor = require("@ckeditor/ckeditor5-build-decoupled-document");
    let EditorDivs = document.querySelectorAll("#ckeditor");
    EditorDivs.forEach((EditorDiv) => {
      let Editor = document.createElement("div");
      Editor.setAttribute("id", "editor");

      DecoupledEditor.create(Editor)
        .then((editor) => {
          let toolbar = document.createElement("div");
          toolbar.setAttribute("id", "toolbar");
          toolbar.appendChild(editor.ui.view.toolbar.element);
          EditorDiv.append(toolbar);
          EditorDiv.append(Editor);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    });
  }
}
