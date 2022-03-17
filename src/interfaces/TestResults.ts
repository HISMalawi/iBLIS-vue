export interface TestResults {
    id: number;
    measure_id: number;
    measure_name: string;
    result: string;
    test_id: number
    device_name: string;
    time_entered: string;
    measure_unit: string;
    range_lower: number;
    range_upper: number;
  }