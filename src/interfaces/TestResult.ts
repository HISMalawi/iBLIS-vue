export interface TestResult {
    id: number;
    visit_id: number;
    test_type_id: number;
    specimen_id: number;
    short_name: string;
    test_name: string;
    interpretation: string;
    test_status_id: number;
    created_by: number;
    tested_by: number;
    verified_by: number;
    requested_by: string;
    time_created: string;
    time_started: string;
    time_completed: string;
    time_verified: string;
    panel_id: number;
    time_sent: string;
    external_id: number;
    not_done_reasons: string;
    person_talked_to_for_not_done: string;
  }