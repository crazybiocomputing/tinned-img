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
const translateFunc = (node) => (stream) => {
  // Get source...
  let source$ = stream.getCallbag(`rasterin@${node.id}`);
  const tx$ = stream.getCallbag(`tx@${node.id}`);
  const ty$ = stream.getCallbag(`ty@${node.id}`);
  // Create Observable
  const stream$ = pipe(
    merge(source$,tx$,ty$),
    // TODO
  );
  // Set stream
  stream.setCallbags(`rasterout@${node.id}`,stream$);
  // Return stream
  return stream;
}

export const translate_ui =  {
  id: "IMG_TRANSLATE",
  class: "geometry",
  description: "Translate",
  tags: ["transform"],
  help: ["Apply a Translation Vector (tx,ty) to a 2D image"],
  func: translateFunc,
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
      {widget: "input",name: "tx:number"},
      {widget:"label",title: "Tx"}
    ],
    [
      {widget: "input",name: "ty:number"},
      {widget:"label",title: "Ty"}
    ]
  ]
};