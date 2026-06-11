import { Clock, Edit } from "lucide-react";

interface KybPendingScreenProps {
  user: any;
  t: any;
  onModify: () => void;
}

export function KybPendingScreen({ user, t, onModify }: KybPendingScreenProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-8 text-center space-y-6">
      <Clock className="h-16 w-16 text-amber-500 dark:text-amber-400 mx-auto animate-pulse" />
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t("kybPendingTitle")}</h2>
        <p className="text-sm text-slate-500 dark:text-white/50 max-w-md mx-auto">
          {t("kybPendingDesc")}
        </p>
      </div>
      <div className="w-full max-w-sm mx-auto p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-left space-y-2.5">
        <div className="flex justify-between text-xs text-slate-500 dark:text-white/50">
          <span>{t("businessType")}:</span>
          <span className="font-bold text-slate-900 dark:text-white capitalize">
            {user?.merchant_profile?.registration_type?.replace("_", " ")}
          </span>
        </div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-white/50">
          <span>{t("rcBnNumber")}:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {user?.merchant_profile?.registration_number}
          </span>
        </div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-white/50">
          <span>{t("directorName")}:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {user?.merchant_profile?.director_name}
          </span>
        </div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-white/50">
          <span>Status:</span>
          <span className="font-bold text-amber-500 dark:text-amber-400 uppercase tracking-widest text-[10px]">
            {t("inReviewStatus")}
          </span>
        </div>
      </div>

      <div className="pt-2 max-w-sm mx-auto">
        <button
          onClick={onModify}
          className="w-full rounded-2xl bg-q-blue hover:bg-q-blue-700 py-4 px-6 text-sm font-bold text-white transition-all shadow-md shadow-q-blue/20 flex items-center justify-center gap-2"
        >
          <Edit size={16} />
          {t("modifyInfoBtn")}
        </button>
      </div>
    </div>
  );
}
