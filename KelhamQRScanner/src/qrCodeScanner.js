
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = true;

qrcode.callback = res => {
  if (res) {
    scanning = false;

    // Check res contains substring "https://lj3d.github.io" because im security pro
    // Make sure it doesnt contain hashtags because they could be used to add the https://lj3d.github.io/ link onto the end of a malicious link
    // For example:
    // www.2877fksdfnj40.ru/39sdjc.html#https://lj3d.github.io/
    if (res.includes("https://lj3d.github.io") && !res.includes("#")) {
      window.location.replace(res);
    } else {
      alert("Invalid link");
    }

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}
