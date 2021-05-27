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

const newRaster = (node) => stream => {
  return stream;
}

export const newRaster_ui = {
  id: "IMG_NEW",
  class: "producer",
  description: "New",
  tags: ["create","raster","image"],
  help: ["Create new Empty Image"],
  func: newRaster,
  ui: [
    [
      {widget:"label",title: "Raster"}, 
      {widget: "output",name:"rasterout:raster2"}
    ],
    [
      {widget: "label", title: "Type"},
      {widget: "select", state: "8-bit","items": ["8-bit","16-bit","32-bit","RGB"],name: "type:string"}
    ],
    [
      {widget: "label", title: "Width"},
      {widget: "numerical", state: 128,name: "width:number"}
    ],
    [
      {widget: "label", title: "Height"},
      {widget: "numerical", state: 128,name: "height:number"}
    ],
    [
      {widget: "label", title: "Depth"},
      {widget: "numerical", state: 1,name: "depth:number"}
    ],
    [
      {widget: "label", title: "Fill"},
      {widget: "text", state: 'rgb(0,0,0)',name: "fill:string"}
    ]
  ]
}