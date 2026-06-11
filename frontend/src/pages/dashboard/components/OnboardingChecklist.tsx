import { Lock } from "lucide-react";

interface OnboardingChecklistProps {
  hasVerifiedEmail: boolean;
  isKybApproved: boolean;
  isKybPending: boolean;
  t: any;
}

export function OnboardingChecklist({
  hasVerifiedEmail,
  isKybApproved,
  isKybPending,
  t,
}: OnboardingChecklistProps) {
  const stepCountText = hasVerifiedEmail
    ? isKybApproved
      ? `2 ${t("ofDone")}`
      : `1 ${t("ofDone")}`
    : `0 ${t("ofDone")}`;

  return (
    <div className="rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-6 space-y-6 relative overflow-hidden">
      <div className="flex justify-between items-center">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight">{t("onboardingSteps")}</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 font-bold">
          {stepCountText}
        </span>
      </div>

      <div className="relative flex flex-col gap-8">
        {/* Step 1: Email Verification */}
        <div className="relative flex items-stretch group">
          {/* Timeline column */}
          <div className="relative flex flex-col items-center justify-center w-10 shrink-0">
            {/* Dot */}
            <div
              className={`h-3 w-3 rounded-full border-2 transition-all shrink-0 z-10 ${
                hasVerifiedEmail
                  ? "bg-q-green border-q-green shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                  : "bg-white dark:bg-[#020617] border-q-blue shadow-[0_0_8px_rgba(37,99,235,0.5)] animate-pulse"
              }`}
            />
            {/* Connecting Line (bottom half + gap) */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-slate-200 dark:bg-white/10 top-[calc(50%+12px)] bottom-[-32px]" />
          </div>

          <div
            className={`flex-1 p-4 rounded-2xl border transition-all ${
              hasVerifiedEmail
                ? "border-q-green/20 bg-q-green/5 text-q-green"
                : "border-q-blue/30 bg-q-blue-50/50 dark:bg-q-blue/5 shadow-[0_4px_20px_rgba(37,99,235,0.05)] text-q-blue"
            }`}
          >
            <div>
              <span
                className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 ${
                  hasVerifiedEmail ? "bg-q-green/10 text-q-green" : "bg-q-blue/10 text-q-blue animate-pulse"
                }`}
              >
                {hasVerifiedEmail ? t("verified") : t("actionRequired")}
              </span>
              <h4
                className={`text-sm font-bold ${
                  hasVerifiedEmail ? "text-slate-900/40 dark:text-white/40 line-through" : "text-slate-900 dark:text-white"
                }`}
              >
                {t("verifyEmailTitle")}
              </h4>
              <p className="text-xs text-slate-500 dark:text-white/45 mt-1 leading-relaxed">
                {t("confirmSecurity")}
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Business Onboarding */}
        <div className="relative flex items-stretch group">
          {/* Timeline column */}
          <div className="relative flex flex-col items-center justify-center w-10 shrink-0">
            {/* Connecting Line (top half) */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-slate-200 dark:bg-white/10 top-0 bottom-[calc(50%+12px)]" />
            {/* Dot */}
            <div
              className={`h-3 w-3 rounded-full border-2 transition-all shrink-0 z-10 ${
                isKybApproved
                  ? "bg-q-green border-q-green shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                  : isKybPending
                  ? "bg-amber-400 border-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)] animate-pulse"
                  : hasVerifiedEmail
                  ? "bg-white dark:bg-[#020617] border-q-blue shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                  : "bg-white dark:bg-[#020617] border-slate-350 dark:border-white/20"
              }`}
            />
          </div>

          <div
            className={`flex-1 p-4 rounded-2xl border transition-all ${
              isKybApproved
                ? "border-q-green/20 bg-q-green/5 text-q-green"
                : isKybPending
                ? "border-amber-400/20 bg-amber-400/5 text-amber-500 dark:text-amber-400"
                : hasVerifiedEmail
                ? "border-q-blue/20 bg-slate-50 dark:bg-white/5 hover:border-q-blue/40 text-slate-900 dark:text-white"
                : "border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2 opacity-40 select-none cursor-not-allowed text-slate-400 dark:text-white/30"
            }`}
          >
            <div>
              <span
                className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 ${
                  isKybApproved
                    ? "bg-q-green/10 text-q-green"
                    : isKybPending
                    ? "bg-amber-400/10 text-amber-500 dark:text-amber-400"
                    : hasVerifiedEmail
                    ? "bg-q-blue/10 text-q-blue"
                    : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/30"
                }`}
              >
                {isKybApproved ? t("approved") : isKybPending ? t("inReviewStatus") : hasVerifiedEmail ? t("active") : t("locked")}
              </span>

              <div className="flex items-center gap-1.5">
                <h4
                  className={`text-sm font-bold ${
                    isKybApproved ? "text-slate-900/40 dark:text-white/40 line-through" : "text-slate-900 dark:text-white"
                  }`}
                >
                  {t("submitKybDocs")}
                </h4>
                {!hasVerifiedEmail && <Lock size={12} className="text-slate-400 dark:text-white/40" />}
              </div>

              <p className="text-xs text-slate-500 dark:text-white/45 mt-1 leading-relaxed">
                {t("kybDocsDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
