import { PatientReg } from "@/interfaces/PatientReg";
import { TestResult } from "@/interfaces/TestResult";

export interface OrderResult {
    id:number,
    specimen_type: string,
    test_name: string,
    location: string,
    visit_type: string,
    patient: PatientReg,
    accession_number: number,
    tracking_number: number,
    priority: string,
    tests: TestResult,
    requesting_physician: string,
    drawn_by_id: number,
    drawn_by_name:string,
    specimen_status_id: number,
    accepted_by: number,
    rejected_by: number,
    rejected_reason_id: number,
    reject_explained_to: string,
    referral_id: number,
    time_accepted: string,
    time_rejected:string,
    date_of_collection: string,
}
