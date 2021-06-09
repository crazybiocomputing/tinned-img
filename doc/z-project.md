# Z-project

_Node emitting a 2D Raster from a stream of rasters (aka Stack)_
_This node is equivalent to a `reduce`function._

| ![ZProject](img/zproject.png) |
|------------------------|
|Legend|


## 1. Inputs

_This node takes as input a 2D Raster_.

## 2. Properties
   
### Op. (_Operation_)

_An operation must be chosen to combine the pixels with the accumulator._
_Operations available:_
- Sum
- Average
- Minimum
- Maximum

## 3. Outputs

### Raster

_A stream of items_

## 4. Example

| Example |
|------------------------|
|The _Z-project_ returns a single z-projected raster|
|corresponding to the average of the rasters stream.|


