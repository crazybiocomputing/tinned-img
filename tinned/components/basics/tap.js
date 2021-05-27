/*
 *  TINNED: TINy Node EDitor
 *  Copyright (C) 2021  Jean-Christophe Taveau.
 *
 *  This file is part of TINNED
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
 *  along with TINNED.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Jean-Christophe Taveau
 */

'use strict';

import {tap} from '../../callbags/callbag-tap.js';

const tapFunc = (node) => (stream) => {
  // Get source...
  let source$ = stream.getCallbags(node)[0];
  // Get param
  const textarea = document.querySelector(`#node_${node.id} textarea`);

  // Create observable
  const stream$ = tap( (val) => {
    // Update node
    if (typeof val === 'object') {
      val = JSON.stringify(val);
    }
    node.data.state.log += val + '\n';
    textarea.innerHTML = node.data.state?.log;
  })(source$);

  // Set stream
  stream.setCallbags(`dataout@${node.id}`,stream$);
  
  // Return stream
  return stream;
}

export const tap_ui = {
  id: "PROG_TAP",
  class: "information",
  description: "Tap",
  tags: ["console","display","log","print","show"],
  help: ["Look at data through the pipeline"],
  comment: ["Network tap https://en.wikipedia.org/wiki/Network_tap"],
  func: tapFunc,
  ui: [
    [
      {widget:"label",title: "Data"}, 
      {widget: "output",name:"dataout:any"}
    ],
    [
      {widget: "input",name: "datain:any"},
      {widget:"label",title: "Data"}
    ],
    [
      {widget:"textarea", state: "",name: "log:string"}
    ]
  ]
};