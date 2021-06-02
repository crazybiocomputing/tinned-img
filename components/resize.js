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

import {pipe} from '../tinned/callbags/callbag-pipe.js';
import {merge} from '../tinned/callbags/callbag-merge.js';
import {fromEvent} from '../tinned/callbags/callbag-from-event.js';
import {filter} from '../tinned/callbags/callbag-filter.js';
import {map} from '../tinned/callbags/callbag-map.js';

let default_style;

const textChanged = (ev) => {
  const node_id = ev.target.id.split('__AT__')[1];
  const button = document.querySelector(`#save__AT__${node_id}`);
  if (default_style === undefined) {
    default_style = [button.style.backgroundColor,button.style.color];
  }
  button.style.backgroundColor = '#b11';
  button.style.color = 'white';
}

const resetStyle = (ev) => {
  ev.target.style.backgroundColor = default_style[0];
  ev.target.style.color = default_style[1];
}

// MAP operator
const resizeFunc = (node) => (stream) => {
  // Get source...
  let source$ = stream.getCallbag(`rasterin@${node.id}`);
  // Create stream/callbag
  const stream$ = pipe(
    source$
  );
  // Set stream
  stream.setCallbags(`rasterout@${node.id}`,stream$);
  // Return stream
  return stream;
}

export const resize_ui =  {
  id: "IMG_RESIZE",
  class: "geometry",
  description: "Resize",
  tags: ["transform","scale",],
  help: ["Create a new resized 2D image.\nDimension must contained the unit 'px' or '%'"],
  func: resizeFunc,
  ui: [
    [
      {widget:"label",title: "Raster"}, 
      {widget: "output",name:"rasterout:raster2"}
    ],
    [
      {widget: "label", title: "Width"},
      {widget: "text", state: "100%",name: "width:string"}
    ],
    [
      {widget: "label", title: "Height"},
      {widget: "text", state: "100%",name: "height:string"}
    ],
    [
      {widget: "label", title: "Interpol."},
      {widget: "select", state: "Nearest","items": ["Nearest","Bilinear","Bicubic"],name: "interpol:string"}
    ],
    [
      {widget: "input",name:"rasterin:raster2"},
      {widget:"label",title: "Raster"}
    ]
  ]
};