export interface MeasureRange {
    id: number;
    measure_id: number,
    age_min: number,
    age_max: number,
    gender: number,
    range_lower: any,
    range_upper: any,
    alphanumeric: string,
    interpretation: string,
    deleted_at: string,
    hl7_identifier: string,
    hl7_text: string,
    hl7_coding_system: string,
    hl7_measure_type_override: string
  }