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

const textImage = (node) => stream => {
  return stream;
}

let default_style;

const textChanged = (ev) => {
  const node_id = ev.target.id.split('__AT__')[1];
  const button = document.querySelector(`#save__AT__${node_id}`);
  if (default_style === undefined) {
    default_style = [button.style.backgroundColor,button.style.color];
  }
  button.style.backgroundColor = '#b11';
  button.style.color = 'white';
}

const resetStyle = (ev) => {
  ev.target.style.backgroundColor = default_style[0];
  ev.target.style.color = default_style[1];
}

export const textImage_ui = {
  id: "IMG_TEXTIMAGE",
  class: "producer",
  description: "Text Image",
  tags: ["PNM","laplace","edge detection"],
  help: ["3D Raster Viewer"],
  func: textImage,
  ui: [
    [
      {widget:"label",title: "Raster"}, 
      {widget: "output",name:"rasterout:raster2"}
    ],
    [
      {widget:"button", state: true, icon: 'floppy-o',on: {'mouseup': resetStyle},title: 'Save', name: "save:boolean"}
    ],
    [
      {widget:"textarea", state: "(x) => x\n",on: {'input': textChanged},name: "code:string"}
    ]
  ]
};