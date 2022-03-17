export interface Specimen {
    id: number;
    specimen_type_id: number;
    accession_number: string;
    tracking_number: string;
    priority: string;
    drawn_by_id: number;
    drawn_by_name: string;
    specimen_status_id: number;
    accepted_by: number;
    rejected_by: number;
    rejection_reason_id: number;
    reject_explained_to: string;
    referral_id: number;
    time_accepted: string;
    time_rejected: string;
    date_of_collection: string;

  }
  