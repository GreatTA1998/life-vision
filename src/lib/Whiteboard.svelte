<script>
  // credit to ApplePencilTest.svelte
  // TODO: (x, y) coordinate from touch location is incorrect
  import { onMount } from 'svelte';
  let forceElement
  let touchesElement 
  let canvas 
  let context 
  let lineWidth = 0
  let isMousedown = false
  let points = [] 

  const strokeHistory = []
  const requestIdleCallback = window.requestIdleCallback || function (fn) { setTimeout(fn, 1) };

  /**
   * Get (x, y) position of stylus/touch/mouse
   */
  function getContactPosition (e) {
    // mouse
    if (isMousedown) {
      return { 
        x: e.offsetX, 
        y: e.offsetY 
      };
    } 
    // stylus/finger
    else {
      const { left, top } = canvas.getBoundingClientRect();
      console.log('returning =', {
        x: e.touches[0].pageX - left - window.scrollX,
        y: e.touches[0].pageY - top - window.scrollY
      })
      return {
        x: e.touches[0].pageX - left - window.scrollX,
        y: e.touches[0].pageY - top - window.scrollY
      };
    }
  }

  onMount(() => {
    forceElement = document.querySelectorAll('#force')[0]
    touchesElement = document.querySelectorAll('#touches')[0]
    canvas = document.querySelectorAll('canvas')[0]
    context = canvas.getContext('2d')
    // let lineWidth = 0
    // let isMousedown = false
    // let points = []

    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2

    for (const ev of ["touchstart", "mousedown"]) {
      canvas.addEventListener(ev, function (e) {
        let pressure = 0.1;
        // let x, y;
        let { x, y } = getContactPosition(e)
        if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
          if (e.touches[0]["force"] > 0) {
            pressure = e.touches[0]["force"]
          }
          // x = contactPosition.x
          // y = contactPosition.y
          // x = e.touches[0].pageX * 2
          // y = e.touches[0].pageY * 2
        } else {
          pressure = 1.0
          // x = contactPosition.x
          // y = contactPosition.y 
          // x = e.pageX * 2
          // y = e.pageY * 2
        }

        isMousedown = true

        lineWidth = Math.log(pressure + 1) * 40
        context.lineWidth = lineWidth// pressure * 50;

        points.push({ x, y, lineWidth })
        drawOnCanvas(points)
      })
    }

    for (const ev of ['touchmove', 'mousemove']) {
      canvas.addEventListener(ev, function (e) {
        if (!isMousedown) return
        e.preventDefault()

        let pressure = 0.1
        // let x, y
        let { x, y } = getContactPosition(e)
        if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
          if (e.touches[0]["force"] > 0) {
            pressure = e.touches[0]["force"]
          }
          // x = e.touches[0].pageX * 2
          // y = e.touches[0].pageY * 2
        } else {
          pressure = 1.0
          // x = e.pageX * 2
          // y = e.pageY * 2
        }

        // smoothen line width
        lineWidth = (Math.log(pressure + 1) * 40 * 0.2 + lineWidth * 0.8)
        points.push({ x, y, lineWidth })

        drawOnCanvas(points);

        requestIdleCallback(() => {
          forceElement.textContent = 'force = ' + pressure

          const touch = e.touches ? e.touches[0] : null
          if (touch) {
            touchesElement.innerHTML = `
              touchType = ${touch.touchType} ${touch.touchType === 'direct' ? '👆' : '✍️'} <br/>
              radiusX = ${touch.radiusX} <br/>
              radiusY = ${touch.radiusY} <br/>
              rotationAngle = ${touch.rotationAngle} <br/>
              altitudeAngle = ${touch.altitudeAngle} <br/>
              azimuthAngle = ${touch.azimuthAngle} <br/>
            `
          }
        })
      })
    }

    for (const ev of ['touchend', 'touchleave', 'mouseup']) {
      canvas.addEventListener(ev, function (e) {
        let pressure = 0.1;
        // let x, y;
        let { x, y } = getContactPosition(e)
        if (e.touches && e.touches[0] && typeof e.touches[0]["force"] !== "undefined") {
          if (e.touches[0]["force"] > 0) {
            pressure = e.touches[0]["force"]
          }
          // x = e.touches[0].pageX * 2
          // y = e.touches[0].pageY * 2
        } else {
          pressure = 1.0
          // x = e.pageX * 2
          // y = e.pageY * 2
        }

        isMousedown = false

        requestIdleCallback(function () { strokeHistory.push([...points]); points = []})

        lineWidth = 0
      })
    };


  })

 
  /**
  * This function takes in an array of points and draws them onto the canvas.
  * @param {array} stroke array of points to draw on the canvas
  * @return {void}
  */
  function drawOnCanvas (stroke) {
    context.strokeStyle = 'black'
    context.lineCap = 'round'
    context.lineJoin = 'round'

    const l = stroke.length - 1
    if (stroke.length >= 3) {
      const xc = (stroke[l].x + stroke[l - 1].x) / 2
      const yc = (stroke[l].y + stroke[l - 1].y) / 2
      context.lineWidth = stroke[l - 1].lineWidth
      context.quadraticCurveTo(stroke[l - 1].x, stroke[l - 1].y, xc, yc)
      context.stroke()
      context.beginPath()
      context.moveTo(xc, yc)
    } else {
      const point = stroke[l];
      context.lineWidth = point.lineWidth
      context.strokeStyle = point.color
      context.beginPath()
      context.moveTo(point.x, point.y)
      context.stroke()
    }
  }

  /**
  * Remove the previous stroke from history and repaint the entire canvas based on history
  * @return {void}
  */
  function undoDraw () {
    strokeHistory.pop()
    context.clearRect(0, 0, canvas.width, canvas.height)

    strokeHistory.map(function (stroke) {
      if (strokeHistory.length === 0) return

      context.beginPath()

      let strokePath = [];
      stroke.map(function (point) {
        strokePath.push(point)
        drawOnCanvas(strokePath)
      })
    })
  }
</script>

<title>Touch API Test</title>
<h1>Demo of Apple Pencil / 3D touch API</h1>
<div id="force"></div>
<div id="touches"></div>
<canvas>Sorry, your browser is too old for this demo.</canvas>
<div id="info">
  <a href="https://github.com/quietshu/apple-pencil-safari-api-test" target="_blank">GitHub</a>
  <button on:click={undoDraw}>Undo</button>
</div>
 
<style>
  /* body {
    position: absolute;
    margin: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-family: sans-serif;
    font-size: 13px;
    padding: 1em;
    box-sizing: border-box;
  } */
  h1 {
    margin-top: 0;
    color: #ccc;
  }
  canvas {
    /* position: absolute; */
    width: 500px;
    height: 800px;
    margin: auto;
    /* left: 0;
    top: 0; */
    background-color: purple;
  }
  #info {
    z-index: 1;
    position: absolute;
    bottom: 1em;
  }
</style>