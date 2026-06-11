import { useState, useEffect } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useResendVerificationEmailMutation } from "@/features/auth/mutations";

interface EmailVerificationBannerProps {
  user: any;
  t: any;
}

const COOLDOWN_SECONDS = 60;

export function EmailVerificationBanner({ t }: EmailVerificationBannerProps) {
  const [cooldown, setCooldown] = useState(0);
  const { mutate: resend, isPending } = useResendVerificationEmailMutation();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  function handleResendEmail() {
    if (isPending || cooldown > 0) return;
    resend(undefined, {
      onSuccess: () => {
        toast.success("Verification email sent", {
          description: "A fresh link is on its way to your inbox.",
        });
        setCooldown(COOLDOWN_SECONDS);
      },
      onError: () => {
        toast.error("Could not resend email", {
          description: "Please try again in a moment.",
        });
      },
    });
  }

  const canResend = !isPending && cooldown === 0;

  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 gap-4 justify-between items-start sm:items-center bg-amber-50 dark:bg-amber-500/10 p-5 rounded-2xl">
      <div className="flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-800 dark:text-white">
            {t("emailPendingBannerTitle")}
          </p>
          <p className="text-xs text-amber-700 dark:text-white/60 mt-1">
            {t("emailPendingBannerDesc")}
          </p>
        </div>
      </div>
      <button
        onClick={handleResendEmail}
        disabled={!canResend}
        className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-white dark:text-black bg-amber-600 hover:bg-amber-700 dark:bg-amber-400 dark:hover:bg-amber-500 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0 min-w-[120px]"
      >
        {isPending ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> {t("resending")}
          </>
        ) : cooldown > 0 ? (
          `Resend in ${cooldown}s`
        ) : (
          t("resendLink")
        )}
      </button>
    </div>
  );
}
