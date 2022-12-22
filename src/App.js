import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';


function App() {

  const [read, setRead] = useState("");

  useEffect(() => {
    init();
  }, [])


  const init = async () => {
    try {
      let devices = await Html5Qrcode.getCameras();
      let scanner = new Html5Qrcode("reader");
      scanner.start(devices[0].id, { fps: 10, qrbox: { height: 250, width: 250 } }, (data) => setRead(data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>QR Reader</h1>
      <div id='reader' style={{ height: "380px", width: "500px" }}></div>
      <p>QR Value: {read ? read : "No Code Found"}</p>
    </div>
  );
}

export default App;
