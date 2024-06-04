/* tslint:disable */
/* eslint-disable */
import { Coordinate } from '../models/coordinate';
import { Envelope } from '../models/envelope';
import { GeometryFactory } from '../models/geometry-factory';
import { Point } from '../models/point';
import { PrecisionModel } from '../models/precision-model';
export interface Geometry {
  area?: number;
  boundary?: Geometry;
  boundaryDimension?: number;
  centroid?: Point;
  coordinate?: Coordinate;
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
}
