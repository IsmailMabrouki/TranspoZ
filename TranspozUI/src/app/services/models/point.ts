/* tslint:disable */
/* eslint-disable */
import { Coordinate } from '../models/coordinate';
import { CoordinateSequence } from '../models/coordinate-sequence';
import { Envelope } from '../models/envelope';
import { Geometry } from '../models/geometry';
import { GeometryFactory } from '../models/geometry-factory';
import { PrecisionModel } from '../models/precision-model';
export interface Point {
  area?: number;
  boundary?: Geometry;
  boundaryDimension?: number;
  centroid?: Point;
  coordinate?: Coordinate;
  coordinateSequence?: CoordinateSequence;
  coordinates?: Array<Coordinate>;
  dimension?: number;
  empty?: boolean;
  envelope?: Geometry;
  envelopeInternal?: Envelope;
  factory?: GeometryFactory;
  geometryType?: string;
  interiorPoint?: Point;
  length?: number;
  numGeometries?: number;
  numPoints?: number;
  precisionModel?: PrecisionModel;
  rectangle?: boolean;
  simple?: boolean;
  srid?: number;
  userData?: {
};
  valid?: boolean;
  x?: number;
  y?: number;
}
