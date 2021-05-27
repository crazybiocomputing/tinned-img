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

const fetchSamples = (node) => stream => {
  return stream;
}

const samplesZip = [
  "3D_Chromosome.zip",
  "4D-Stack(256x256x20x10).zip",
  "5d.zip",
  "BinaryBlobs.zip",
  "FluorescentCells.zip",
  "GFAP-FVII.zip",
  "ImageWithOverlay.zip",
  "Introduction_to_ImageJ.zip",
  "OutOfMemSamples.zip",
  "Pseudotsuga_menziesii.zip",
  "RatBrain.zip",
  "RoiSet.zip",
  "Rat_Hippocampal_Neuron.zip",
  "Rat_Hippocampal_Neuron2.zip",
  "Spindly-GFP.zip",
  "bat-cochlea-renderings.zip",
  "bat-cochlea-volume.zip",
  "blood-brain-barrier.zip",
  "cardio.dcm.zip",
  "cheetah_256_8.tif.zip",
  "class-images.zip",
  "confocal-series.zip",
  "confocal-stack.zip",
  "ct-scan.zip",
  "ct.dcm.zip",
  "fat-cells.zip",
  "flybrain.zip",
  "gel-electrophoresis.zip",
  "hela-cells.zip",
  "m51.zip",
  "mri-stack.zip",
  "organ-of-corti.zip",
  "scala-media.zip",
  "se3.zip",
  "stack-projections.zip",
  "t1-head-raw.zip",
  "t1-head.zip",
  "t1-rendering.zip",
  "test.bmp.zip",
  "watershed-animation.zip",
  "xrays.zip"
];


const samples_0Z = [
  "None",
  "2D_Gel.jpg",
  "8-connected-pixel.gif",
  "AuPbSn40-2.jpg",
  "AuPbSn40.jpg",
  "CT%20Scan.dcm",
  "Cartwheel_Galaxy.jpg",
  "Cell_Colony.jpg",
  "Cell_Colony2.jpg",
  "Cntrl1.lsm",
  "Color48%20Image.IPL",
  "Composite.tif",
  "DaveBright.gif",
  "DentalRadiograph.png",
  "Diatoms.jpg",
  "Dot_Blot.jpg",
  "Dot_Blots.jpg",
  "Fibroblast_Cell_Nucleus.jpg",
  "FluorescentCells.jpg",
  "FluorescentCells.txt",
  "GFAP-FVII.txt",
  "ImageJ.png",
  "LineGraph.jpg",
  "LineGraph2.jpg",
  "NileBend.jpg",
  "PET_Scan.gif",
  "SmartSEMSample.tif",
  "TEM_filter_sample.jpg",
  "TI-1766.jpg",
  "Tree_Rings.jpg",
  "Tree_Rings2.jpg",
  "X.png"
];

const samples_ai = [
  "None",
  "abe.tif",
  "apple.tif",
  "at.gif",
  "baboon.gif",
  "baboon.jpg",
  "bad.gif",
  "bat-cochlea-volume.txt",
  "blobs.gif",
  "boats.gif",
  "bridge.gif",
  "bug-UBE2%20WGA-composite.tif",
  "camera.gif",
  "camera16.gif",
  "cardio.dcm",
  "cat.jpg",
  "cer-sag.gif",
  "clown.gif",
  "clown.jpg",
  "clown.png",
  "colors.gif",
  "columbia.gif",
  "couple.jpg",
  "crosshair-cursor-64x64.gif",
  "crosshair-cursor-color.gif",
  "crosshair-cursor-redone.gif",
  "crosshair-cursor.gif",
  "ct.dcm",
  "ct2.dcm",
  "curve-fits.gif",
  "dialog-bug.jpg",
  "dots.gif",
  "egg.jpg",
  "embryos.jpg",
  "enhance-me.gif",
  "face.gif",
  "fire.lut",
  "floatProblm.tif",
  "fluoview-multi.tif",
  "flybrain.txt",
  "g16.png",
  "gel.gif",
  "gel2.gif",
  "goldhill.gif",
  "goldhill.jpg",
  "grays.lut",
  "hela-cells-zoom.jpg",
  "hela-cells.txt",
  "ij-icon.gif",
  "im2.dcm",
  "imagej-logo.gif",
  "immunohistochemical-slide.jpg"
];

const samples_jz = [
  "None",
  "jpeg.avi",
  "leaf.jpg",
  "lena-std.tif",
  "lena.jpg",
  "line.gif",
  "little-girl.gif",
  "logo.gif",
  "logo.jpeg",
  "lymp.tif",
  "m51.fits",
  "m51.jpg",
  "m51.tif",
  "microm.jpg",
  "microscope.gif",
  "mri.gif",
  "new.gif",
  "owl.png",
  "parisbynight.jpg",
  "particles.gif",
  "peppers.gif",
  "pet-series.txt",
  "png.avi",
  "point-tool.gif",
  "psf.gif",
  "qt-player.jpg",
  "sea-grass.jpg",
  "skeletonize-bug.png",
  "skeletonize-table.gif",
  "snowflake.gif",
  "t1-head.gif",
  "t1-head.txt",
  "t1-renderings.txt",
  "updated.gif",
  "watershed-animation.gif",
  "watershed-problem.gif",
  "xor-bug.jpg"
];

export const fetchSamples_ui = {
  id: "IMG_SAMPLE",
  class: "producer",
  description: "Fetch Samples",
  tags: ["url","png","jpg","tif","download"],
  help: ["Fetch ImageJ Samples"],
  func: fetchSamples,
  ui: [
    [
      {widget:"label",title: "Data"},
      {widget: "output", title: "Data",name: "dataout:any"}
    ],
    [
      {widget: "label", title: "Sample [0-Z]"},
      {widget: "select", state: "None","items": samples_0Z,name: "sample0:string"}
    ],
    [
      {widget: "label", title: "Sample [a-i]"},
      {widget: "select", state: "None","items": samples_ai,name: "sample1:string"}
    ],
    [
      {widget: "label", title: "Sample [j-z]"},
      {widget: "select", state: "None","items": samples_jz,name: "sample2:string"}
    ]
  ]
};