// from https://www.cssscript.com/demo/create-noise-background-javascript-canvas/

const noise = () => {
    let canvas, ctx;
  
    let wWidth, wHeight;
  
    let noiseData = [];
    let frame = 0;
  
    let loopTimeout;
    
    const density = .2; 
    const frameRate = 9;
  
    // Create Noise
    const createNoise = () => {
      const idata = ctx.createImageData(wWidth, wHeight);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;
  
      for (let i = 0; i < len; i++) {
        if (Math.random() < density) {
          buffer32[i] = 0xff000000;
        }
      }
  
      noiseData.push(idata);
    };
  
    // Play Noise
    const paintNoise = () => {
      if (frame === frameRate) {
        frame = 0;
      } else {
        frame++;
      }
  
      ctx.putImageData(noiseData[frame], 0, 0);
    };
  
    // Loop
    const loop = () => {
      paintNoise(frame);
  
      loopTimeout = window.setTimeout(() => {
        window.requestAnimationFrame(loop);
      }, 1000 / 25);
    };
  
    // Setup
    const setup = () => {
      wWidth = window.innerWidth;
      wHeight = window.innerHeight;
  
      canvas.width = wWidth;
      canvas.height = wHeight;
  
      for (let i = 0; i < frameRate*2; i++) {
        createNoise();
      }
  
      loop();
    };
  
    // Reset
    let resizeThrottle;
    const reset = () => {
      window.addEventListener(
        "resize",
        () => {
          window.clearTimeout(resizeThrottle);
  
          resizeThrottle = window.setTimeout(() => {
            window.clearTimeout(loopTimeout);
            setup();
          }, 200);
        },
        false
      );
    };
  
    // Init
    const init = (() => {
      canvas = document.getElementById("noise");
      ctx = canvas.getContext("2d");
  
      setup();
    })();
  };
  
  noise();
  