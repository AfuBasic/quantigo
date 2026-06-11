import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import { EmailVerificationBanner } from "./components/EmailVerificationBanner";
import { EmailVerificationScreen } from "./components/EmailVerificationScreen";
import { KybPendingScreen } from "./components/KybPendingScreen";
import { KybWizardForm } from "./components/KybWizardForm";
import { OnboardingChecklist } from "./components/OnboardingChecklist";
import { OperationalDashboard } from "./components/OperationalDashboard";

export function DashboardPage() {
  const { t } = useTranslation();
  const { user, submitKyb } = useAuth();
  const [forceEdit, setForceEdit] = useState(false);

  const hasVerifiedEmail = user?.email_verified ?? false;
  const kybStatus =
    user?.merchant_profile?.verification_status ?? "unsubmitted";
  const isKybApproved = kybStatus === "approved";
  const isKybPending = kybStatus === "pending";

  async function handleKybSubmitWithReset(data: any) {
    await submitKyb(data);
    setForceEdit(false);
  }

  return (
    <div className="space-y-8">
      {/* Persistent Email Verification Banner */}
      {!hasVerifiedEmail && <EmailVerificationBanner user={user} t={t} />}

      {/* BLOCKED ONBOARDING STATE vs FULL DASHBOARD */}
      {!isKybApproved ? (
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left panel: Onboarding flow */}
          <div className="lg:col-span-8 space-y-6">
            {!hasVerifiedEmail ? (
              <EmailVerificationScreen user={user} t={t} />
            ) : isKybPending && !forceEdit ? (
              <KybPendingScreen user={user} t={t} onModify={() => setForceEdit(true)} />
            ) : (
              <KybWizardForm user={user} submitKyb={handleKybSubmitWithReset} t={t} />
            )}
          </div>

          {/* Right panel: Setup checklist */}
          <div className="lg:col-span-4 space-y-6">
            <OnboardingChecklist
              hasVerifiedEmail={hasVerifiedEmail}
              isKybApproved={isKybApproved}
              isKybPending={isKybPending}
              t={t}
            />
          </div>
        </div>
      ) : (
        /* FULL VERIFIED OPERATIONAL DASHBOARD */
        <OperationalDashboard t={t} />
      )}
    </div>
  );
}
