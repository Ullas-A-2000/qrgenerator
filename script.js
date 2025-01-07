document.getElementById("generateButton").addEventListener("click", () => {
  const text = document.getElementById("textInput").value;
  const qrCodeContainer = document.getElementById("qrcode");

  // Clear any existing QR code
  qrCodeContainer.innerHTML = "";

  // Generate new QR code
  if (text) {
    var qrcode = new QRCode("qrcode", text);
  } else {
    alert("Please enter text or URL to generate a QR code.");
  }
});



function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {

    // If found you qr code
    function onScanSuccess(decodeText, decodeResult) {
        // alert("Your Qr is : " + decodeText);
        openDialogAndShowLink(decodeText)
    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);
});




function openDialogAndShowLink(_link){
    // const openDialogButton = document.getElementById('openDialog');
    const closeDialogButton = document.getElementById('closeDialog');
    const link = document.querySelector('.dialoglink');

    dialog.style.display = 'block';

    link.href = _link;
    link.textContent = _link;

    closeDialogButton.addEventListener('click', () => {
        dialog.style.display = 'none';
    });

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.style.display = 'none';
        }
    });
}

function redirect(){
    const link = document.querySelector('.dialoglink');
    window.location.href = link.href
}


document.getElementById('downloadImage').addEventListener('click', () => {
    const content = document.getElementById('qrcode');
    
    html2canvas(content).then(canvas => {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
