import { MeasureRange } from "./MeasureRange";

export interface Measure {
    id: number;
    test_id: number;
    name: string;
    result: string;
    unit: string;
    measure_type_name: string;
    ranges: MeasureRange[];
  }