

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startScanBtn");
    const reader = document.getElementById("reader");
    const errorMsg = document.getElementById("cameraError");
    const resultText = document.getElementById("resultText");
    const toResultBtn = document.getElementById("toResultBtn");
    const copyTextBtn = document.getElementById("copyTextBtn"); // Add reference to the copy button
    
    let html5QrCode;
  
    startBtn.addEventListener("click", () => {
      reader.style.display = "block"; // Ensure it's visible
      errorMsg.textContent = "";
      toResultBtn.style.display = "none"; // Hide "Go to Result" button initially
  
      // Initialize the QR Code scanner
      html5QrCode = new Html5Qrcode("reader");
  
      Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
          // Start the camera
          html5QrCode.start(
            { facingMode: "environment" },  // Use back camera for mobile
            { fps: 10, qrbox: 250 },        // Configurations like frames per second and QR box size
            qrCodeMessage => {
              html5QrCode.stop().then(() => {
                reader.style.display = "none"; // Hide reader div when QR is scanned
                resultText.textContent = qrCodeMessage; // Display the scanned QR code message
                toResultBtn.style.display = "inline-block"; // Show "Go to Result" button
                document.location.href = "#result"; // Jump to result section
                
                copyTextBtn.style.display = "inline-block"; // Show the "Copy Text" button
              });
            },
            error => {
              console.warn(`QR Scan Error: ${error}`);
            }
          );
        } else {
          errorMsg.textContent = "No cameras found."; // Show error if no camera is found
        }
      }).catch(err => {
        errorMsg.textContent = "Camera error: " + err; // Handle camera access errors
      });
    });

    // Add click event for the "Copy Text" button
    copyTextBtn.addEventListener("click", () => {
      // Create a temporary input to copy the result text
      const tempInput = document.createElement("input");
      tempInput.value = resultText.textContent;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy"); // Copy the content
      document.body.removeChild(tempInput); // Clean up the temporary input

      // Provide feedback to the user
      alert("Text copied to clipboard!");
    });
});