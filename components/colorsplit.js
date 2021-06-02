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

const colorSplit = (node) => stream => {
  return stream;
}

export const colorsplit_ui = {
  id: "IMG_COLORSPLIT",
  class: "color",
  description: "ColorSplit",
  tags: ["color","rgb","hsl","hsv"],
  help: ["Split three color channels according to a specific colorspace"],
  func: colorSplit,
  ui: [
    [
      {widget:"label",title: "Channel#1"}, 
      {widget: "output",name:"channel1:raster8bit"}
    ],
    [
      {widget:"label",title: "Channel#2"}, 
      {widget: "output",name:"channel2:raster8bit"}
    ],
    [
      {widget:"label",title: "Channel#3"}, 
      {widget: "output",name:"channel3:raster8bit"}
    ],
    [
      {widget: "label", title: "Method"},
      {widget: "select", state: "RGB","items": ["RGB","HSV","HSL"],name: "type:string"}
    ],
    [
      {widget: "input",name:"rasterin:raster2"},
      {widget:"label",title: "Raster"}
    ]
  ]
};