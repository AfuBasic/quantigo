import React from 'react';
import { CheckCircle, FileWarning } from 'lucide-react';
import type { VerificationStatus } from '../types';

interface VerificationTimelineProps {
  currentStatus: VerificationStatus;
}

const steps = [
  { id: 'submitted', label: 'Application Submitted' },
  { id: 'under_review', label: 'Under Review' },
  { id: 'compliance_review', label: 'Compliance Checks' },
  { id: 'approved', label: 'Verified' }
];

export const VerificationTimeline: React.FC<VerificationTimelineProps> = ({ currentStatus }) => {
  const getStepStatus = (stepId: string) => {
    const currentIndex = steps.findIndex(s => s.id === currentStatus);
    const stepIndex = steps.findIndex(s => s.id === stepId);

    if (currentStatus === 'rejected') return stepIndex === 0 ? 'complete' : 'error';
    if (currentStatus === 'additional_information_requested' || currentStatus === 'resubmitted') {
      if (stepId === 'under_review') return 'warning';
      return stepIndex < 1 ? 'complete' : 'upcoming';
    }

    if (currentIndex > stepIndex) return 'complete';
    if (currentIndex === stepIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="py-6">
      <nav aria-label="Progress">
        <ol role="list" className="overflow-hidden">
          {steps.map((step, stepIdx) => {
            const status = getStepStatus(step.id);
            return (
              <li key={step.id} className={`relative ${stepIdx !== steps.length - 1 ? 'pb-10' : ''}`}>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className={`absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 ${
                      status === 'complete' ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start group">
                  <span className="flex h-9 items-center">
                    <span
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                        status === 'complete'
                          ? 'bg-blue-600 group-hover:bg-blue-800'
                          : status === 'current'
                          ? 'border-2 border-blue-600 bg-white dark:bg-slate-900'
                          : status === 'warning'
                          ? 'border-2 border-amber-500 bg-white dark:bg-slate-900'
                          : 'border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      {status === 'complete' ? (
                        <CheckCircle className="h-5 w-5 text-white" aria-hidden="true" />
                      ) : status === 'current' ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                      ) : status === 'warning' ? (
                        <FileWarning className="h-4 w-4 text-amber-500" />
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                      )}
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className={`text-sm font-medium ${
                      status === 'complete' || status === 'current' 
                        ? 'text-slate-900 dark:text-white' 
                        : status === 'warning'
                        ? 'text-amber-600 dark:text-amber-500'
                        : 'text-slate-500'
                    }`}>
                      {step.label}
                    </span>
                    <span className="text-sm text-slate-500">
                      {status === 'current' && 'Currently processing...'}
                      {status === 'warning' && 'Action required from you.'}
                    </span>
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};
