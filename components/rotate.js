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

// MAP operator
const rotateFunc = (node) => (stream) => {
  // Get source...
  let source$ = stream.getCallbag(`rasterin@${node.id}`);
  const angle$ = stream.getCallbag(`rot@${node.id}`);
  // Create Observable
  const stream$ = pipe(
    merge(source$,angle$),
    // TODO
  );
  // Set stream
  stream.setCallbags(`rasterout@${node.id}`,stream$);
  // Return stream
  return stream;
}

export const rotate_ui =  {
  id: "IMG_ROTATE",
  class: "geometry",
  description: "Rotate",
  tags: ["transform"],
  help: ["Apply a Rotation (in radians) to a 2D image"],
  func: rotateFunc,
  ui: [
    [
      {widget:"label",title: "Raster"}, 
      {widget: "output",name:"rasterout:raster2"}
    ],
    [
      {widget: "input",name: "rasterin:raster2"},
      {widget:"label",title: "Raster"}
    ],
    [
      {widget: "input",name: "rot:number"},
      {widget:"label",title: "Angle"}
    ]
  ]
};