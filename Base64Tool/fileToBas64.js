//upload and convert
if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
  } else {
    alert('There was an error uploading the file.');
  }
  
  function handleFileSelect(evt) {
    var f = evt.target.files[0]; // FileList object
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
        //showing file converted to base64
        document.getElementById('base64').value = base64String;
        alert('File converted to base64, you may now export.');
      };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);
  }

//display the export button after uploading is complete
$(function () {
    $("#files").on('click', function () {
        $("#exportButton").show();
    });
});
//export
  function saveTextAsFile(textToWrite, fileNameToSaveAs)
  {
      var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'}); 
      var downloadLink = document.createElement("a");
      downloadLink.download = fileNameToSaveAs;
      downloadLink.innerHTML = "Download File";
      if (window.webkitURL != null)
      {
          downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
      }
      else
      {
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.onclick = destroyClickedElement;
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
      }
      downloadLink.click();
  }