import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';


function App() {

  const [read, setRead] = useState("");
  const [devices, setDevices] = useState([]);
  const [cam, setCam] = useState("");

  useEffect(() => {

    if (cam !== "") {
      scan();
    }

    init();
  }, [cam])


  const init = async () => {
    try {
      let cams = await Html5Qrcode.getCameras();
      console.log(cams);
      setDevices(cams);
    } catch (err) {
      console.log(err);
    }
  }

  const scan = () => {
    let scanner = new Html5Qrcode("reader");
    scanner.start(cam, { fps: 10, qrbox: { height: 200, width: 200 } }, (data) => setRead(data));
  }


  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <h1>QR Reader</h1>
      <select value={cam} onChange={(e) => setCam(e.target.value)}>
        <option value="">Select Camera</option>
        {devices.map((device, index) => {
          return <option key={index} value={device.id}>{device.label}</option>
        })}
      </select>
      <div id='reader' style={{ height: "100%", width: "350px", marginTop: "1em" }}></div>
      <p>QR Value: {read ? read : "No Code Found"}</p>
    </div>
  );
}

export default App;
