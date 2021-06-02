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

const iMath = (node) => stream => {
  return stream;
}

export const imath_ui = {
  id: "IMG_IMATH",
  class: "math",
  description: "ImageMath",
  tags: ["add","subtract","multiply","divide"],
  help: ["Scalar Image Operations"],
  func: iMath,
  ui: [
    [
      {widget:"label",title: "Raster"}, 
      {widget: "output",name:"rasterout:raster2"}
    ],
    [
      {widget: "label", title: "Op."},
      {widget: "select", state: "Add","items": ["Add","Subtract","Multiply","Divide","AND","OR","XOR","Min","Max","Gamma","Set","Op."],name: "op:string"}
    ],
    [
      {widget: "label", title: "Value"},
      {widget: "text", state: 0,name: "value:number"}
    ],
    [
      {widget: "input",name:"rasterin:raster2"},
      {widget:"label",title: "Raster"}
    ]
  ]
};