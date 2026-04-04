document.addEventListener("DOMContentLoaded", () => {
  let downloadBtn = document.createElement("button");
  downloadBtn.id = "downloadBtn";
  downloadBtn.textContent = "Download HTML";
  document.body.appendChild(downloadBtn);

  let current = null;

  function enableEditing(el) {
    if (current) return;
    current = el;
    el.contentEditable = true;
    el.classList.add("editing");
    el.focus();
  }

  function disableEditing() {
    if (!current) return;
    current.contentEditable = false;
    current.classList.remove("editing");
    current = null;
  }

  document.body.addEventListener("dblclick", (e) => {
    const target = e.target;
    if (target.tagName.match(/P|H1|H2|H3|DIV|SPAN/)) {
      enableEditing(target);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") disableEditing();
  });

  const btn = document.getElementById("downloadBtn");
  btn.addEventListener("click", () => {
    disableEditing();

    const html = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
});