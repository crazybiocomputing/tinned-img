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

const iTap = (node) => stream => {
  return stream;
}

export const itap_ui = {
  id: "IMG_ITAP",
  class: "information",
  description: "Raster Tap",
  tags: ["tap","display","show","image","raster"],
  help: ["Similar as `tap` but for rasters"],
  func: iTap,
  ui: [
    [
      {widget:"label",title: "Raster"}, 
      {widget: "output",name:"rasterout:raster2"}
    ],
    [
      {widget:"label",title: "Header:"},
      {widget:"label",title: "0x0px Unknown"}
    ], 
    [
      {widget: "canvas",name:"canvas:any"}
    ],
    [
      {widget: "input",name:"rasterin:raster2"},
      {widget:"label",title: "Raster"}
    ]
  ]
};