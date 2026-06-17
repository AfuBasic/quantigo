import React, { useEffect, useState } from 'react';
import { VerificationTimeline } from '../components/VerificationTimeline';
import { VerificationDocumentUploader } from '../components/VerificationDocumentUploader';
import { getVerificationStatus, submitVerification, resubmitVerification } from '../api/verification';
import type { VerificationProfile } from '../types';
import { ShieldCheck, AlertTriangle, Info, ArrowRight } from 'lucide-react';

export const VerificationDashboardPage: React.FC = () => {
  const [profile, setProfile] = useState<VerificationProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resubmitNotes, setResubmitNotes] = useState('');

  const fetchStatus = async () => {
    try {
      const data = await getVerificationStatus();
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const data = await submitVerification();
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResubmit = async () => {
    try {
      setSubmitting(true);
      const data = await resubmitVerification(resubmitNotes);
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
      setResubmitNotes('');
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center text-slate-500">Loading verification status...</div>;
  }

  // Fallback for empty profile
  const currentStatus = profile?.verification_status || 'unsubmitted';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          Business Verification
        </h1>
        <p className="text-slate-500 mt-1">Complete your business profile to access all Quantigo merchant features.</p>
      </div>

      {/* Status Banner */}
      {currentStatus === 'additional_information_requested' && (
        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400">Action Required</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Our compliance team requires additional information to proceed with your verification.
            </p>
            {profile?.requested_information && profile.requested_information.length > 0 && (
              <ul className="mt-3 list-disc pl-5 text-sm text-amber-700 dark:text-amber-300 space-y-1">
                {profile.requested_information.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {currentStatus === 'rejected' && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-red-800 dark:text-red-400">Application Rejected</h3>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              Unfortunately, we could not verify your business at this time.
            </p>
            {profile?.rejection_reason && (
              <div className="mt-3 p-3 bg-white dark:bg-slate-900/50 rounded border border-red-100 dark:border-red-900">
                <p className="text-sm text-slate-700 dark:text-slate-300">"{profile.rejection_reason}"</p>
              </div>
            )}
          </div>
        </div>
      )}

      {currentStatus === 'approved' && (
        <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-green-600" />
          <div>
            <h3 className="text-sm font-bold text-green-800 dark:text-green-400">Verification Complete</h3>
            <p className="text-sm text-green-700 dark:text-green-300">Your business has been fully verified and approved.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Document Management Section */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Verification Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <VerificationDocumentUploader
                label="CAC Certificate"
                documentType="cac_certificate"
                currentUrl={profile?.cac_certificate_path || null}
                onUploadSuccess={fetchStatus}
                required
              />
              <VerificationDocumentUploader
                label="CAC Status Report"
                documentType="cac_status_report"
                currentUrl={profile?.cac_status_report_path || null}
                onUploadSuccess={fetchStatus}
              />
              <VerificationDocumentUploader
                label="Director Identity"
                documentType="director_identity"
                currentUrl={profile?.director_identity_path || null}
                onUploadSuccess={fetchStatus}
                required
              />
              <VerificationDocumentUploader
                label="Proof of Address"
                documentType="proof_of_address"
                currentUrl={profile?.proof_of_address_path || null}
                onUploadSuccess={fetchStatus}
              />
            </div>
          </section>

          {/* Submission Actions */}
          {currentStatus === 'unsubmitted' && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ready to submit?</h3>
              <p className="text-sm text-slate-500 mt-1 mb-4">Ensure all required documents are uploaded before submitting your application for review.</p>
              <button
                onClick={handleSubmit}
                disabled={submitting || !profile?.cac_certificate_path || !profile?.director_identity_path}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-3 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                Submit for Verification <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {currentStatus === 'additional_information_requested' && (
            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-6 border border-amber-200 dark:border-amber-800/50">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Submit Requested Information</h3>
              <p className="text-sm text-slate-500 mt-1 mb-4">Once you have updated the required documents, please add a note and resubmit your application.</p>
              <textarea
                value={resubmitNotes}
                onChange={e => setResubmitNotes(e.target.value)}
                placeholder="Add a note for the compliance team (optional)"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm rounded-lg p-3 mb-4 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
              <button
                onClick={handleResubmit}
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-3 transition-colors disabled:opacity-50"
              >
                Resubmit Application
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Review Timeline</h2>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <VerificationTimeline currentStatus={currentStatus} />
              
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-2 text-xs text-slate-500">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>Reviews typically take 1-2 business days. You will be notified via email when your status changes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
