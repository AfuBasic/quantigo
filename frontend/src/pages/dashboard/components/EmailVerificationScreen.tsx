import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useResendVerificationEmailMutation } from "@/features/auth/mutations";

interface EmailVerificationScreenProps {
  user: any;
  t: any;
}

const COOLDOWN_SECONDS = 60;

export function EmailVerificationScreen({
  user,
  t,
}: EmailVerificationScreenProps) {
  const [resendState, setResendState] = useState<"idle" | "sent" | "error">(
    "idle",
  );
  const [cooldown, setCooldown] = useState(0);
  const { mutate: resend, isPending } = useResendVerificationEmailMutation();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  function handleResend() {
    if (isPending || cooldown > 0) return;
    resend(undefined, {
      onSuccess: () => {
        setResendState("sent");
        setCooldown(COOLDOWN_SECONDS);
        toast.success("Verification email sent", {
          description: "Check your inbox (and spam folder) for the link.",
        });
      },
      onError: () => {
        setResendState("error");
        toast.error("Could not resend email", {
          description: "Please try again in a moment.",
        });
      },
    });
  }

  const canResend = !isPending && cooldown === 0;

  return (
    <div className="rounded-[28px] border border-slate-200 dark:border-white/8 bg-white dark:bg-slate-900 overflow-hidden">
      {/* Top gradient band */}
      <div className="h-1.5 w-full bg-gradient-to-r from-q-blue via-blue-400 to-indigo-500" />

      <div className="p-8 md:p-12 flex flex-col items-center text-center gap-8">
        {/* Envelope illustration */}
        <div className="relative flex items-center justify-center">
          {/* Outer glow rings */}
          <div
            className="absolute w-32 h-32 rounded-full bg-q-blue/8 animate-ping"
            style={{ animationDuration: "2.5s" }}
          />
          <div className="absolute w-24 h-24 rounded-full bg-q-blue/12" />
          {/* Icon container */}
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-q-blue/20 to-indigo-500/20 border border-q-blue/20 dark:border-q-blue/30 flex items-center justify-center shadow-lg shadow-q-blue/10">
            <Mail className="w-9 h-9 text-q-blue" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3 max-w-md">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t("verifyEmailTitle")}
          </h2>
          <p className="text-sm text-slate-500 dark:text-white/50 leading-relaxed">
            {t("verifyEmailDesc")}{" "}
            <span className="font-semibold text-slate-800 dark:text-white/80">
              {user?.email}
            </span>
            . {t("checkSpamFolder")}
          </p>
        </div>

        {/* Status feedback */}
        {resendState === "sent" && (
          <div className="w-full max-w-sm flex items-start gap-3 bg-emerald-500/8 border border-emerald-500/20 rounded-2xl px-4 py-3.5 text-left">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {t("verificationEmailSent")}
              </p>
              <p className="text-xs text-emerald-600/70 dark:text-emerald-400/60 mt-0.5">
                {t("freshLinkSent")}
              </p>
            </div>
          </div>
        )}

        {resendState === "error" && (
          <div className="w-full max-w-sm flex items-start gap-3 bg-red-500/8 border border-red-500/20 rounded-2xl px-4 py-3.5 text-left">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                {t("somethingWentWrong")}
              </p>
              <p className="text-xs text-red-600/70 dark:text-red-400/60 mt-0.5">
                {t("tryAgainMoment")}
              </p>
            </div>
          </div>
        )}

        {/* Action area */}
        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={handleResend}
            disabled={!canResend}
            className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-q-blue hover:bg-blue-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed py-4 px-6 text-sm font-semibold text-white transition-all duration-150 shadow-md shadow-q-blue/25"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("sendingLink")}
              </>
            ) : cooldown > 0 ? (
              `${t("resendIn")} ${cooldown}s`
            ) : (
              t("resendVerifyLink")
            )}
          </button>

          <p className="text-xs text-slate-400 dark:text-white/30">
            {t("didNotGetEmail")}
          </p>
        </div>
      </div>
    </div>
  );
}
