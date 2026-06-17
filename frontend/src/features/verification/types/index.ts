export type VerificationStatus =
  | 'unsubmitted'
  | 'submitted'
  | 'under_review'
  | 'additional_information_requested'
  | 'resubmitted'
  | 'compliance_review'
  | 'approved'
  | 'rejected';

export interface VerificationProfile {
  id: number;
  verification_status: VerificationStatus;
  requested_information: string[] | null;
  rejection_reason: string | null;
  cac_certificate_path: string | null;
  cac_status_report_path: string | null;
  proof_of_address_path: string | null;
  director_identity_path: string | null;
}

export interface VerificationHistory {
  id: number;
  status_from: VerificationStatus | null;
  status_to: VerificationStatus;
  notes: string | null;
  created_at: string;
}
