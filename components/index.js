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

import {components as basics} from '../tinned/components/basics/components.js';
import {colorMerge_ui} from './colormerge.js';
import {colorsplit_ui} from './colorsplit.js';
import {convolve_ui} from './convolve.js';
import {edges_ui} from './edges.js';
import {fetchImage_ui} from './fetch_img.js';
import {fetchSamples_ui} from './fetchsamples.js';
import {filtering_ui} from './filtering.js';
import {imath_ui} from './imath.js';
import {imap_ui} from './imap.js';
import {itap_ui} from './itap.js';
import {montage_ui} from './montage.js';
import {morphology_ui} from './morphology.js';
import {movie_ui} from './movie.js';
import {newRaster_ui} from './newraster.js';
import {openImage_ui} from './open_img.js';
import {resize_ui} from './resize.js';
import {rotate_ui} from './rotate.js';
import {textImage_ui} from './textimage.js';
import {threshold_ui} from './threshold.js';
import {tostack_ui} from './tostack.js';
import {transform_ui} from './transform.js';
import {translate_ui} from './translate.js';
import {type_ui} from './typeconverter.js';
import {viewi3d_ui} from './viewi3d.js';
import {viewimage_ui} from './viewimage.js';
import { zproject_ui } from './zproject.js';

export const components = [
  ...basics,
  colorMerge_ui,
  colorsplit_ui,
  convolve_ui,
  edges_ui,
  fetchImage_ui,
  fetchSamples_ui,
  filtering_ui,
  imath_ui,
  imap_ui,
  itap_ui,
  montage_ui,
  morphology_ui,
  movie_ui,
  newRaster_ui,
  openImage_ui,
  resize_ui,
  rotate_ui,
  textImage_ui,
  threshold_ui,
  tostack_ui,
  transform_ui,
  translate_ui,
  type_ui,
  viewi3d_ui,
  viewimage_ui,
  zproject_ui
]
