import React, { useEffect, useRef } from 'react';

function App() {

  const videoRef = useRef();

  useEffect(()=>{
    init();
  },[])

  const init = async () => {
    let media = await window.navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    videoRef.current.srcObject = media;
  }


  return (
    <div>
      <h1>QR Reader</h1>
      <video ref={videoRef} autoPlay={true} height="100%" width="400px"></video>
      <p>QR Value: {}</p>
    </div>
  );
}

export default App;
