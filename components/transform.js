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
const transformFunc = (node) => (stream) => {
  // Get source...
  let source$ = stream.getCallbag(`x@${node.id}`);
  const button = document.querySelector(`#save__AT__${node.id}`);
  // Get params
  if (node.data.state.save) {
    // Update code from textarea
    node.data.state.code = document.querySelector(`#code__AT__${node.id}`).value;
    node.data.state.save = false;
  }
  const code = node.data.state.code;
  const mapFun = new Function('x','const foo = ' + code + '\nreturn foo(x);');
  // Create Observable
  const stream$ = pipe(
    merge(source$,fromEvent(button,'click')),
    filter(data => {
      if (data.target && data.target.id.includes('save')) {
        // Stop...
        stream.dispose();
        // and Start
        stream.run();
        return false;
      }
      return true;
    }),
    map(mapFun)
  );
  // Set stream
  stream.setCallbags(`result@${node.id}`,stream$);
  // Return stream
  return stream;
}

export const transform_ui =  {
  id: "IMG_TRANSFORM",
  class: "geometry",
  description: "Transform",
  tags: ["rotate","scale","translate"],
  help: ["Apply a Geometric Transform to a 2D image"],
  func: transformFunc,
  ui: [
    [
      {widget:"label",title: "Raster"}, 
      {widget: "output",name:"rasterout:raster2"}
    ],
    [
      {widget: "label", title: "Rotate"},
      {widget: "numerical", state: 0,name: "angle:number"}
    ],
    [
      {widget: "label", title: "TranslateX"},
      {widget: "numerical", state: 0,name: "tx:number"}
    ],
    [
      {widget: "label", title: "TranslateY"},
      {widget: "numerical", state: 0,name: "ty:number"}
    ],
    [
      {widget: "label", title: "ScaleX"},
      {widget: "numerical", state: 1,name: "sx:number"}
    ],
    [
      {widget: "label", title: "ScaleY"},
      {widget: "numerical", state: 1,name: "sy:number"}
    ],
    [
      {widget: "input",name: "rasterin:raster2"},
      {widget:"label",title: "Raster"}
    ],

  ]
};