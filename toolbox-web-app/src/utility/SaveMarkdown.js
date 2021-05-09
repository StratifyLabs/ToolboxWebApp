const SaveMarkdown = (markdown, name) => {
  var blob = new Blob([markdown], {type:"text/plain"});
  var url = URL.createObjectURL(blob);
  var downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export default SaveMarkdown
