import React, { useState } from "react";
import { 
  Building, 
  Upload, 
  User as UserIcon, 
  CheckCircle, 
  Loader2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import * as authService from "@/services/authService";

interface KybWizardFormProps {
  user: any;
  submitKyb: (data: any) => Promise<any>;
  t: any;
}

export function KybWizardForm({ user, submitKyb, t }: KybWizardFormProps) {
  // KYB Wizard state
  const [kybStep, setKybStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [kybError, setKybError] = useState<string | null>(null);

  // Form Fields
  const [businessName, setBusinessName] = useState(user?.merchant_profile?.business_name ?? user?.name ?? "");
  const [regType, setRegType] = useState<"sole_proprietorship" | "limited_liability" | "cooperative">(user?.merchant_profile?.registration_type ?? "limited_liability");
  const [regNumber, setRegNumber] = useState(user?.merchant_profile?.registration_number ?? "RC-");
  const [address, setAddress] = useState(user?.merchant_profile?.business_address ?? "");
  const [phone, setPhone] = useState(user?.merchant_profile?.business_phone ?? "");

  // Director details
  const [directorName, setDirectorName] = useState(user?.merchant_profile?.director_name ?? "");
  const [directorPhone, setDirectorPhone] = useState(user?.merchant_profile?.director_phone ?? "");
  const [directorBvn, setDirectorBvn] = useState(user?.merchant_profile?.director_bvn ?? "");
  const [directorNin, setDirectorNin] = useState(user?.merchant_profile?.director_nin ?? "");

  // BVN Verification States
  const [bvnStatus, setBvnStatus] = useState<"idle" | "verifying" | "success" | "error">(
    user?.merchant_profile?.director_bvn ? "success" : "idle"
  );
  const [verifiedBvnName, setVerifiedBvnName] = useState(
    user?.merchant_profile?.director_bvn ? (user?.merchant_profile?.director_name ?? "") : ""
  );

  // File URL and status states
  const [cacCertUrl, setCacCertUrl] = useState(user?.merchant_profile?.cac_certificate_path ?? "");
  const [cacCertStatus, setCacCertStatus] = useState<"idle" | "uploading" | "success" | "error">(user?.merchant_profile?.cac_certificate_path ? "success" : "idle");
  const [cacCertName, setCacCertName] = useState(user?.merchant_profile?.cac_certificate_path ? "Uploaded certificate" : "");
  
  const [cacReportUrl, setCacReportUrl] = useState(user?.merchant_profile?.cac_status_report_path ?? "");
  const [cacReportStatus, setCacReportStatus] = useState<"idle" | "uploading" | "success" | "error">(user?.merchant_profile?.cac_status_report_path ? "success" : "idle");
  const [cacReportName, setCacReportName] = useState(user?.merchant_profile?.cac_status_report_path ? "Uploaded status report" : "");
  
  const [proofAddressUrl, setProofAddressUrl] = useState(user?.merchant_profile?.proof_of_address_path ?? "");
  const [proofAddressStatus, setProofAddressStatus] = useState<"idle" | "uploading" | "success" | "error">(user?.merchant_profile?.proof_of_address_path ? "success" : "idle");
  const [proofAddressName, setProofAddressName] = useState(user?.merchant_profile?.proof_of_address_path ? "Uploaded proof" : "");
  
  const [directorIdUrl, setDirectorIdUrl] = useState(user?.merchant_profile?.director_identity_path ?? "");
  const [directorIdStatus, setDirectorIdStatus] = useState<"idle" | "uploading" | "success" | "error">(user?.merchant_profile?.director_identity_path ? "success" : "idle");
  const [directorIdName, setDirectorIdName] = useState(user?.merchant_profile?.director_identity_path ? "Uploaded ID" : "");

  React.useEffect(() => {
    if (directorBvn.length === 11) {
      setBvnStatus("verifying");
      authService.verifyBvn(directorBvn, directorName)
        .then((res) => {
          setBvnStatus("success");
          setVerifiedBvnName(res.name);
        })
        .catch(() => {
          setBvnStatus("error");
        });
    } else {
      setBvnStatus("idle");
    }
  }, [directorBvn, directorName]);

  async function computeFileHash(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  async function processAndUploadFile(file: File): Promise<string> {
    const allowedExtensions = [".pdf", ".png", ".jpg", ".jpeg"];
    const fileExt = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowedExtensions.includes(fileExt) || file.type === "image/svg+xml") {
      throw new Error("Only PDF, PNG, and JPG/JPEG files are allowed.");
    }

    const hash = await computeFileHash(file);
    
    // Check deduplication
    const checkResult = await authService.checkAssetHash(hash);
    if (checkResult.exists && checkResult.url) {
      return checkResult.url;
    }

    // Request signed upload signature
    const sig = await authService.getUploadSignature();
    
    // Upload direct to Cloudinary
    const uploadedUrl = await authService.uploadFileDirectly(file, sig);

    // Register with server
    try {
      await authService.registerAsset({
        file_hash: hash,
        url: uploadedUrl,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
      });
    } catch {
      // Continue even if registration fails
    }

    return uploadedUrl;
  }

  async function handleFileUpload(file: File, type: "cert" | "report" | "proof" | "director") {
    setKybError(null);
    if (type === "cert") {
      setCacCertStatus("uploading");
      setCacCertName(file.name);
    }
    if (type === "report") {
      setCacReportStatus("uploading");
      setCacReportName(file.name);
    }
    if (type === "proof") {
      setProofAddressStatus("uploading");
      setProofAddressName(file.name);
    }
    if (type === "director") {
      setDirectorIdStatus("uploading");
      setDirectorIdName(file.name);
    }

    try {
      const url = await processAndUploadFile(file);
      if (type === "cert") {
        setCacCertUrl(url);
        setCacCertStatus("success");
      }
      if (type === "report") {
        setCacReportUrl(url);
        setCacReportStatus("success");
      }
      if (type === "proof") {
        setProofAddressUrl(url);
        setProofAddressStatus("success");
      }
      if (type === "director") {
        setDirectorIdUrl(url);
        setDirectorIdStatus("success");
      }
    } catch (err: any) {
      if (type === "cert") setCacCertStatus("error");
      if (type === "report") setCacReportStatus("error");
      if (type === "proof") setProofAddressStatus("error");
      if (type === "director") setDirectorIdStatus("error");
      setKybError(err.message || "Failed to upload file. Please try again.");
    }
  }

  async function handleKybSubmit(e: React.FormEvent) {
    e.preventDefault();
    setKybError(null);

    if (!cacCertUrl || !cacReportUrl || !proofAddressUrl || !directorIdUrl) {
      setKybError("Please ensure all files are uploaded successfully before submitting.");
      return;
    }

    if (directorBvn.length !== 11 || directorNin.length !== 11) {
      setKybError("BVN and NIN must be exactly 11 digits.");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitKyb({
        business_name: businessName,
        registration_type: regType,
        registration_number: regNumber,
        business_address: address,
        business_phone: phone,
        cac_certificate_path: cacCertUrl,
        cac_status_report_path: cacReportUrl,
        proof_of_address_path: proofAddressUrl,
        director_name: directorName,
        director_phone: directorPhone,
        director_bvn: directorBvn,
        director_nin: directorNin,
        director_identity_path: directorIdUrl,
      });
    } catch (err: any) {
      setKybError(
        err.response?.data?.message ??
        "Failed to submit KYB registry. Please verify inputs and file formats."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const isStep1Valid = businessName.trim() !== "" && regNumber.trim().length > 3 && phone.trim() !== "" && address.trim() !== "";
  const isStep2Valid = cacCertStatus === "success" && cacReportStatus === "success" && proofAddressStatus === "success";
  const isStep3Valid = directorName.trim() !== "" && directorPhone.trim() !== "" && directorBvn.length === 11 && bvnStatus === "success" && directorNin.length === 11 && directorIdStatus === "success";

  return (
    <div className="rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-8 sm:p-10 space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-q-blue" />
          {t("completeProfile")}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-white/50 mt-1">
          {t("completeProfileDesc")}
        </p>
      </div>

      {kybError && (
        <div className="flex gap-2 items-center bg-red-50 dark:bg-red-500/10 border border-red-500/25 text-red-600 dark:text-red-400 p-4 rounded-2xl text-xs font-bold leading-normal">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{kybError}</span>
        </div>
      )}

      {user?.merchant_profile?.verification_status === "rejected" && user?.merchant_profile?.verification_notes && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-500/25 text-red-600 dark:text-red-400 p-4 rounded-2xl space-y-1">
          <p className="text-xs font-bold">Audit Refusal Remarks:</p>
          <p className="text-xs text-slate-700 dark:text-white/75">{user.merchant_profile.verification_notes}</p>
        </div>
      )}

      {/* Progress Indicators */}
      <div className="flex gap-4">
        {[1, 2, 3].map((stepIdx) => (
          <div
            key={stepIdx}
            className={`h-1.5 flex-1 rounded-full transition-all duration-350 ${
              kybStep >= stepIdx ? "bg-q-blue" : "bg-slate-200 dark:bg-white/10"
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleKybSubmit} className="space-y-8">
        {/* Step 1: Business Details */}
        {kybStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("businessNameLabel")}</label>
              <div className="relative">
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4.5 pl-12 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-q-blue transition-all placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="e.g. Acme Commerce Ltd"
                  required
                />
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-white/20" />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("regTypeLabel")}</label>
                <select
                  value={regType}
                  onChange={(e: any) => setRegType(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl p-4.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-q-blue transition-all appearance-none"
                >
                  <option value="limited_liability" className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white font-medium">{t("ltd")}</option>
                  <option value="sole_proprietorship" className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white font-medium">{t("soleProprietor")}</option>
                  <option value="cooperative" className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white font-medium">{t("cooperative")}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("rcBnNumber")}</label>
                <div className="flex items-center bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden focus-within:border-q-blue transition-all">
                  <span className="pl-4 pr-1 py-4 text-sm font-semibold text-slate-500 dark:text-white/40 select-none whitespace-nowrap">
                    RC-
                  </span>
                  <input
                    type="text"
                    value={regNumber.startsWith('RC-') ? regNumber.slice(3) : regNumber}
                    onChange={(e) => {
                      const suffix = e.target.value.replace(/^RC-/i, '');
                      setRegNumber('RC-' + suffix);
                    }}
                    onKeyDown={(e) => {
                      // Prevent clearing into the prefix territory
                      const suffix = regNumber.startsWith('RC-') ? regNumber.slice(3) : regNumber;
                      if ((e.key === 'Backspace' || e.key === 'Delete') && suffix === '') {
                        e.preventDefault();
                      }
                    }}
                    className="flex-1 min-w-0 bg-transparent py-4 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none placeholder-slate-400 dark:placeholder-slate-500"
                    placeholder="9481923"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("businessPhoneLabel")}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-q-blue transition-all placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g. +23480..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("hqAddressLabel")}</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-q-blue transition-all placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="HQ Address details..."
                required
              />
            </div>

            <button
              type="button"
              onClick={() => setKybStep(2)}
              disabled={!isStep1Valid}
              className="w-full rounded-2xl bg-q-blue py-4 px-6 text-sm font-bold text-white hover:bg-q-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-q-blue/20"
            >
              {t("continueBtn")} <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: Document Uploads */}
        {kybStep === 2 && (
          <div className="space-y-8">
            <div className="space-y-6">
              {/* CAC Certificate */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("cacCertLabel")}</label>
                <div className={`relative flex items-center justify-between p-6 border rounded-2xl transition-all ${
                  cacCertStatus === "uploading" ? "border-q-blue/45 bg-blue-50 dark:bg-q-blue/10" :
                  cacCertStatus === "success" ? "border-q-green/45 bg-green-50 dark:bg-q-green/10" :
                  cacCertStatus === "error" ? "border-red-500/30 bg-red-50 dark:bg-red-500/10" :
                  "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/10"
                }`}>
                  <div className="flex items-center gap-3">
                    {cacCertStatus === "uploading" ? (
                      <Loader2 className="h-5 w-5 text-q-blue animate-spin shrink-0" />
                    ) : cacCertStatus === "success" ? (
                      <CheckCircle className="h-5 w-5 text-q-green shrink-0" />
                    ) : (
                      <Upload className="h-5 w-5 text-slate-400 dark:text-white/30 shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {cacCertStatus === "uploading" ? t("uploadingFile") :
                         cacCertStatus === "success" ? "Certificate uploaded" :
                         "CAC Certificate"}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-white/45 mt-1 max-w-[200px] sm:max-w-xs truncate">
                        {cacCertStatus === "success" && cacCertName ? cacCertName :
                         cacCertStatus === "uploading" && cacCertName ? `Uploading ${cacCertName}...` :
                         "PDF, PNG or JPG (No SVG)"}
                      </p>
                    </div>
                  </div>
                  
                  <label className={`shrink-0 ${cacCertStatus === "uploading" ? "pointer-events-none opacity-50" : "cursor-pointer"}`}>
                    <span className="text-xs font-bold text-q-blue hover:text-q-blue-700 bg-q-blue/10 px-4 py-2 rounded-xl transition-all">
                      {cacCertStatus === "success" ? t("replace") : t("chooseFile")}
                    </span>
                    <input
                      type="file"
                      disabled={cacCertStatus === "uploading"}
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'cert');
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Status Report */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("cacReportLabel")}</label>
                <div className={`relative flex items-center justify-between p-6 border rounded-2xl transition-all ${
                  cacReportStatus === "uploading" ? "border-q-blue/45 bg-blue-50 dark:bg-q-blue/10" :
                  cacReportStatus === "success" ? "border-q-green/45 bg-green-50 dark:bg-q-green/10" :
                  cacReportStatus === "error" ? "border-red-500/30 bg-red-50 dark:bg-red-500/10" :
                  "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/10"
                }`}>
                  <div className="flex items-center gap-3">
                    {cacReportStatus === "uploading" ? (
                      <Loader2 className="h-5 w-5 text-q-blue animate-spin shrink-0" />
                    ) : cacReportStatus === "success" ? (
                      <CheckCircle className="h-5 w-5 text-q-green shrink-0" />
                    ) : (
                      <Upload className="h-5 w-5 text-slate-400 dark:text-white/30 shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {cacReportStatus === "uploading" ? t("uploadingFile") :
                         cacReportStatus === "success" ? "Status report uploaded" :
                         "Form CAC 1.1 / Status Report"}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-white/45 mt-1 max-w-[200px] sm:max-w-xs truncate">
                        {cacReportStatus === "success" && cacReportName ? cacReportName :
                         cacReportStatus === "uploading" && cacReportName ? `Uploading ${cacReportName}...` :
                         "PDF, PNG or JPG (No SVG)"}
                      </p>
                    </div>
                  </div>
                  
                  <label className={`shrink-0 ${cacReportStatus === "uploading" ? "pointer-events-none opacity-50" : "cursor-pointer"}`}>
                    <span className="text-xs font-bold text-q-blue hover:text-q-blue-700 bg-q-blue/10 px-4 py-2 rounded-xl transition-all">
                      {cacReportStatus === "success" ? t("replace") : t("chooseFile")}
                    </span>
                    <input
                      type="file"
                      disabled={cacReportStatus === "uploading"}
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'report');
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Proof of Address */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("proofAddressLabel")}</label>
                <div className={`relative flex items-center justify-between p-6 border rounded-2xl transition-all ${
                  proofAddressStatus === "uploading" ? "border-q-blue/45 bg-blue-50 dark:bg-q-blue/10" :
                  proofAddressStatus === "success" ? "border-q-green/45 bg-green-50 dark:bg-q-green/10" :
                  proofAddressStatus === "error" ? "border-red-500/30 bg-red-50 dark:bg-red-500/10" :
                  "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/10"
                }`}>
                  <div className="flex items-center gap-3">
                    {proofAddressStatus === "uploading" ? (
                      <Loader2 className="h-5 w-5 text-q-blue animate-spin shrink-0" />
                    ) : proofAddressStatus === "success" ? (
                      <CheckCircle className="h-5 w-5 text-q-green shrink-0" />
                    ) : (
                      <Upload className="h-5 w-5 text-slate-400 dark:text-white/30 shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {proofAddressStatus === "uploading" ? t("uploadingFile") :
                         proofAddressStatus === "success" ? "Proof uploaded" :
                         "Proof of Business Address"}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-white/45 mt-1 max-w-[200px] sm:max-w-xs truncate">
                        {proofAddressStatus === "success" && proofAddressName ? proofAddressName :
                         proofAddressStatus === "uploading" && proofAddressName ? `Uploading ${proofAddressName}...` :
                         "PDF, PNG or JPG (No SVG)"}
                      </p>
                    </div>
                  </div>
                  
                  <label className={`shrink-0 ${proofAddressStatus === "uploading" ? "pointer-events-none opacity-50" : "cursor-pointer"}`}>
                    <span className="text-xs font-bold text-q-blue hover:text-q-blue-700 bg-q-blue/10 px-4 py-2 rounded-xl transition-all">
                      {proofAddressStatus === "success" ? t("replace") : t("chooseFile")}
                    </span>
                    <input
                      type="file"
                      disabled={proofAddressStatus === "uploading"}
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'proof');
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => setKybStep(1)}
                className="flex-1 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 py-4 px-6 text-sm font-bold text-slate-700 dark:text-white transition-all"
              >
                {t("backBtn")}
              </button>
              <button
                type="button"
                onClick={() => setKybStep(3)}
                disabled={!isStep2Valid}
                className="flex-1 rounded-2xl bg-q-blue py-4 px-6 text-sm font-bold text-white hover:bg-q-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-q-blue/20"
              >
                {t("continueBtn")} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Representative Verification */}
        {kybStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("directorNameLabel")}</label>
              <div className="relative">
                <input
                  type="text"
                  value={directorName}
                  onChange={(e) => setDirectorName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4.5 pl-12 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-q-blue transition-all placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="Full legal name"
                  required
                />
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-white/20" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("directorPhoneLabel")}</label>
              <input
                type="tel"
                value={directorPhone}
                onChange={(e) => setDirectorPhone(e.target.value)}
                className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-q-blue transition-all placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="e.g. +23480..."
                required
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("bvnLabel")}</label>
                <input
                  type="text"
                  maxLength={11}
                  value={directorBvn}
                  onChange={(e) => setDirectorBvn(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-q-blue transition-all placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="11 digits"
                  required
                />
                {bvnStatus === "verifying" && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-q-blue animate-pulse">
                    <Loader2 size={12} className="animate-spin" />
                    <span>Verifying BVN registry...</span>
                  </div>
                )}
                {bvnStatus === "success" && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-q-green">
                    <CheckCircle size={12} />
                    <span>Verified: {verifiedBvnName}</span>
                  </div>
                )}
                {bvnStatus === "error" && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-red-500">
                    <AlertCircle size={12} />
                    <span>BVN Verification failed</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("ninLabel")}</label>
                <input
                  type="text"
                  maxLength={11}
                  value={directorNin}
                  onChange={(e) => setDirectorNin(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4.5 px-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-q-blue transition-all placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="11 digits"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-wider mb-3">{t("directorIdLabel")}</label>
              <div className={`relative flex items-center justify-between p-6 border rounded-2xl transition-all ${
                directorIdStatus === "uploading" ? "border-q-blue/45 bg-blue-50 dark:bg-q-blue/10" :
                directorIdStatus === "success" ? "border-q-green/45 bg-green-50 dark:bg-q-green/10" :
                directorIdStatus === "error" ? "border-red-500/30 bg-red-50 dark:bg-red-500/10" :
                "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-white/10"
              }`}>
                <div className="flex items-center gap-3">
                  {directorIdStatus === "uploading" ? (
                    <Loader2 className="h-5 w-5 text-q-blue animate-spin shrink-0" />
                  ) : directorIdStatus === "success" ? (
                    <CheckCircle className="h-5 w-5 text-q-green shrink-0" />
                  ) : (
                    <Upload className="h-5 w-5 text-slate-400 dark:text-white/30 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {directorIdStatus === "uploading" ? t("uploadingFile") :
                       directorIdStatus === "success" ? "Identity card uploaded" :
                       "Director ID Card"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-white/45 mt-1 max-w-[200px] sm:max-w-xs truncate">
                      {directorIdStatus === "success" && directorIdName ? directorIdName :
                       directorIdStatus === "uploading" && directorIdName ? `Uploading ${directorIdName}...` :
                       "PDF, PNG or JPG (No SVG)"}
                    </p>
                  </div>
                </div>
                
                <label className={`shrink-0 ${directorIdStatus === "uploading" ? "pointer-events-none opacity-50" : "cursor-pointer"}`}>
                  <span className="text-xs font-bold text-q-blue hover:text-q-blue-700 bg-q-blue/10 px-4 py-2 rounded-xl transition-all">
                    {directorIdStatus === "success" ? t("replace") : t("chooseFile")}
                  </span>
                  <input
                    type="file"
                    disabled={directorIdStatus === "uploading"}
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'director');
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setKybStep(2)}
                className="flex-1 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 py-4 px-6 text-sm font-bold text-slate-700 dark:text-white transition-all disabled:opacity-50"
              >
                {t("backBtn")}
              </button>
              <button
                type="submit"
                disabled={!isStep3Valid || isSubmitting}
                className="flex-1 rounded-2xl bg-q-blue py-4 px-6 text-sm font-bold text-white hover:bg-q-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-q-blue/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {t("submittingBtn")}
                  </>
                ) : (
                  <>
                    {t("submitKybBtn")} <CheckCircle size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
