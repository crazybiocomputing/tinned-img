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

import {pipe} from '../../tinned/callbags/callbag-pipe.js';
import {fromEvent} from '../../tinned/callbags/callbag-from-event.js';
import {forEach} from '../../tinned/callbags/callbag-for-each.js';
import {merge} from '../../tinned/callbags/callbag-merge.js';
import {subscribe} from '../../tinned/callbags/callbag-subscribe.js';


const view2D = (node) => stream => {
  // Get source...
  let source$ = stream.getCallbag(`rasterin@${node.id}`);

  const dispose = pipe(
    source$,
    subscribe({
      next: val => {
        // Update node
        if (typeof val === 'object') {
          val = `Title:${val.title}\nType:${val.type}\nWidth:${val.width}\nHeight: ${val.height}\n`;
        }
        node.data.state.log += val + '\n';
        console.log(node.data.state.log);
      },
      // Never reached because of merge with `click` button that never stops...
      complete: () => {
        node.data.state.log += 'Completed!\n';
        console.log(node.data.state.log);
      },
      error: err => alert( err )
    })
  );
  
  // Store unsubscribe...
  stream.disposals.push(dispose);

  return stream;
}


export const viewimage_ui = {
  id: "IMG_VIEW2D",
  class: "consumer",
  description: "2D Viewer",
  tags: ["image","2D","display"],
  help: ["2D Raster Viewer"],
  func: view2D,
  ui: [
    [
      {widget: "input",name:"rasterin:raster2"},
      {widget:"label",title: "Raster"}
    ],
    [
      {widget: "canvas",name:"canvas:any"}
    ]
  ]
};