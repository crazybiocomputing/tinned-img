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

const view2D = (node) => stream => {
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
      {widget:"label",title: "Raster"}, 
      {widget: "input",name:"rasterin:raster2"}
    ],
    [
      {widget: "canvas",name:"canvas:any"}
    ]
  ]
};