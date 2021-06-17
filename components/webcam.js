/*
 *  TINNED_IMG: Image Processing Extension of TINy Node EDitor
 *  Copyright (C) 2021  Jean-Christophe Taveau.
 *
 *  This file is part of TINNED-IMG
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with TINNED-IMG.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */

'use strict';

import {interval} from '../../tinned/callbags/callbag-interval.js';
import {fromEvent} from '../../tinned/callbags/callbag-from-event.js';
import {takeUntil} from '../../tinned/callbags/callbag-take-until.js';
import {map} from '../../tinned/callbags/callbag-map.js';
import {concatMap} from '../../tinned/callbags/callbag-concat-map.js';
import {pipe} from '../../tinned/callbags/callbag-pipe.js';
import {fromPromise} from '../../tinned/callbags/callbag-from-promise.js';
import * as DOM from '../../tinned/src/dom/dom.js';

// From https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos

// Fill the photo with an indication that none has been
// captured.
const clearphoto = (canvas,photo) => {
  var context = canvas.getContext('2d');
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

// Capture a photo by fetching the current contents of the video
// and drawing it into a canvas, then converting that to a PNG
// format data URL. By drawing it on an offscreen canvas and then
// drawing that to the screen, we can change its size and/or apply
// other changes before drawing it.
function takePicture(raster,node,i) {

  console.log('Take Picture');
  const video = document.querySelector(`#cache #video_${node.id}`);
  const canvas = document.querySelector(`#cache #canvas_${node.id}`);
  const context = canvas.getContext('2d');

  if (video.videoWidth && video.videoHeight) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, this.width, this.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    raster.pixels = imageData.data;
  } else {
    // Gray raster
    raster.pixels = Uint8ClampedArray.from({length: raster.width * raster.height * 3}, _ => 10);
  }
  return raster;

}

  /*
  function* range(from, to) {
  let i = from;
  while (i <= to) {
    yield i;
    i++;
  }
}

const result = pipe(
  fromIter(range(40, 99))
  */

const canPlay = (streaming,video,canvas,photo) => (ev) => {
  let height;
  let width = video.videoWidth;
  if (!streaming) {
    height = video.videoHeight / (video.videoWidth/width);
  
    // Firefox currently has a bug where the height can't be read from
    // the video, so we will make assumptions if this happens.
    if (isNaN(height)) {
      height = width / (4/3);
    }
  
    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    streaming = true;
  }
};

const startup = (node) => {
  // Get/create Element <video>
  let video = document.querySelector(`#video_${node.id}`) || DOM.h(`video#video_${node.id}`,{},[]);
  if (video.parentNode === null) {
    document.querySelector(`#cache`).appendChild(video);
  }
  // Get/create Element <canvas>
  let canvas = document.querySelector(`canvas_${node.id}`) || DOM.h(`canvas#canvas_${node.id}`,{},[]);
  if (!canvas.parentNode) {
    document.querySelector('#cache').appendChild(canvas);
  }
  // Get/create Element <preview>
  let preview = document.querySelector(`#preview_${node.id}`) || DOM.h(`img#preview_${node.id}`,{},[]);
  if (preview.parentNode === null) {
    preview.style.width = 'inherit';
    preview.style.margin = 'auto';
    document.querySelector(`#node_${node.id} figure`).appendChild(preview);
  }

  let streaming = false;
  video.addEventListener('canplay', canPlay(streaming,video,canvas,preview), false);

  return navigator.mediaDevices.getUserMedia(
    {
      audio: false,
      video: {
        width: { exact: node.data.state.width},
        height: { exact: node.data.state.height }
      }
    }
  )
  .then( stream =>  {
    video.srcObject = stream;
    video.play();
    node.raster.width = video.videoWidth || canvas.width;
    node.raster.height = video.videoHeight|| canvas.height;
  })
  .catch((err) => console.log("An error occurred: " + err) );

}

const webcamFunc = (node) => stream => {
  // Get param
  const stop$ = document.querySelector(`#capture_${node.id}`);
  let period = Math.floor(1000 / node.data.state.fps);

  node.raster = {
    type: 'RGB'
  }

  // Create (multicast) callbag
  const source$ = pipe(
    fromPromise(startup(node)),   // Start Webcam
    concatMap(nav => interval(period)),
    map(i => takePicture(node,i)),
    // sample(fromIter(takePicture(node)))(interval(period)),
    takeUntil(fromEvent(stop$,'click'))
    //share
  );

  // Set in stream
  stream.setCallbags(`rasterout@${node.id}`,source$);
  // Return stream
  return stream;
}

export const webcam_ui = {
  id: "IMG_WEBCAM",
  class: "producer",
  description: "Webcam",
  tags: ["camera"],
  help: ["Get frames from webcam"],
  func: webcamFunc,
  ui: [
    [
      {widget:"label",title: "Raster"},
      {widget: "output", title: "Data",name: "rasterout:raster2"}
    ],
    [
      {widget: "label", title: "Width"},
      {widget: "numerical", state: 320,name: "width:number"}
    ],
    [
      {widget: "label", title: "Height"},
      {widget: "numerical", state: 240,name: "height:number"}
    ],
    [
      {widget: "label", title: "FPS"},
      {widget: "numerical", state: 25,name: "fps:number"}
    ],
    [
      {widget:"button", state: false,button: 'Capture', name: "capture:boolean"}
    ],
    [
      {widget:"canvas", name: "preview:boolean"}
    ]
  ]
};