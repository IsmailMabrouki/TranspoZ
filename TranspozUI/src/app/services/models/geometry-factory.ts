/* tslint:disable */
/* eslint-disable */
import { CoordinateSequenceFactory } from '../models/coordinate-sequence-factory';
import { PrecisionModel } from '../models/precision-model';
export interface GeometryFactory {
  coordinateSequenceFactory?: CoordinateSequenceFactory;
  precisionModel?: PrecisionModel;
  srid?: number;
}
