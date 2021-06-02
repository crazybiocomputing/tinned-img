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

const colorMerge = (node) => stream => {
  return stream;
}

export const colorMerge_ui = {
  id: "IMG_COLORMERGE",
  class: "color",
  description: "ColorMerge",
  tags: ["color","rgb","hsl","hsv"],
  help: ["Merge three color channels according to a specific colorspace"],
  func: colorMerge,
  ui: [
    [
      {widget:"label",title: "Raster"}, 
      {widget: "output",name:"rasterout:raster2"}
    ],
    [
      {widget: "label", title: "Method"},
      {widget: "select", state: "RGB","items": ["RGB","HSV","HSL"],name: "type:string"}
    ],
    [
      {widget: "input",name:"channel1:raster8bit"},
      {widget:"label",title: "Channel#1"}
    ],
    [
      {widget: "input",name:"channel2:raster8bit"},
      {widget:"label",title: "Channel#2"}
    ],
    [
      {widget: "input",name:"channel3:raster8bit"},
      {widget:"label",title: "Channel#3"}
    ],
  ]
};