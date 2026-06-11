import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import {
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Box,
  Truck,
  Building,
  CheckCircle2,
  Bell,
  Archive,
  ArrowRight,
} from "lucide-react";

export function DashboardPage() {
  const { t } = useTranslation();

  const merchantInfo = {
    name: "Idris Afuwape",
    business: "Apex Pharmacy Ltd",
    segment: "Pharmacy Store",
    joinedDate: "Jun 2026",
    kybStatus: t("verifiedOperational"),
  };

  // Section 2: Active Procurement Opportunities
  const activeOpportunities = [
    {
      id: "pool-1",
      title: "Pharmaceutical Consolidated Batch Q3",
      category: "Medical Supplies",
      poolSize: "₦1,200,000",
      targetQty: "₦1,500,000",
      savingsPotential: "₦420,000",
      timeRemaining: `3 ${t("daysLeftLabel")}`,
      supplierStatus: "Verified Medisource Ltd",
      progress: 80,
      imagePlaceholder: "Medical Batch",
    },
    {
      id: "pool-2",
      title: "Consolidated Packaging boxes & Cartons",
      category: "Store Logistics",
      poolSize: "₦250,000",
      targetQty: "₦350,000",
      savingsPotential: "₦75,000",
      timeRemaining: `9 ${t("daysLeftLabel")}`,
      supplierStatus: "Verified PackAfrica Co.",
      progress: 71,
      imagePlaceholder: "Logistics Packs",
    },
    {
      id: "pool-3",
      title: "Premium Grocery & Cold Chain Pack",
      category: "Consumables",
      poolSize: "₦450,000",
      targetQty: "₦500,000",
      savingsPotential: "₦120,000",
      timeRemaining: `12 ${t("daysLeftLabel")}`,
      supplierStatus: "Verified ColdChain Logistics",
      progress: 90,
      imagePlaceholder: "Cold Storage",
    },
  ];

  // Section 3: Signature Procurement Activity Timeline
  const activeTimeline = {
    id: "QT-2940",
    product: "Consolidated Pharmaceutical Packs",
    supplier: "Medipharm Distributors Ltd",
    amount: "₦850,000",
    currentStep: 2, // 0: Joined Pool, 1: Procurement Started, 2: Supplier Confirmed, 3: Inventory Arrived, 4: Ready For Collection
    steps: [
      t("joinedGroupBuy"),
      t("orderSentToSupplier"),
      t("supplierReady"),
      t("arrivedAtWarehouse"),
      t("readyForPickup"),
    ],
  };

  // Section 4: Savings Intelligence Metrics
  const savingsData = [
    {
      label: t("totalSavedThisMonth"),
      value: "₦45,000",
      desc: t("comparedToNormalMarket"),
    },
    {
      label: t("myActiveContribution"),
      value: "₦75,000",
      desc: t("moneyInsideActiveGroupBuys"),
    },
    {
      label: t("allTimeSavings"),
      value: "₦540,000",
      desc: t("totalMoneySavedOnQuantigo"),
    },
  ];

  // Section 5: Recommended Opportunities
  const recommendedOpportunities = [
    {
      title: "Essential Antibiotics Pack",
      price: `₦120,000 ${t("base")}`,
      savings: `${t("saveUpTo")} 30%`,
      category: "Pharmacy Store",
      tag: "Pharma",
    },
    {
      title: "Consolidated Medical Consumables",
      price: `₦85,000 ${t("base")}`,
      savings: `${t("saveUpTo")} 25%`,
      category: "Medical Supplies",
      tag: "Consumables",
    },
    {
      title: "Sanitation & Hygiene Bulk Batch",
      price: `₦150,000 ${t("base")}`,
      savings: `${t("saveUpTo")} 35%`,
      category: "Hygiene & Care",
      tag: "Health",
    },
  ];

  // Section 6: Inventory & Collection Logs
  const inventoryStatus = [
    {
      id: "QT-2940",
      item: "Consolidated Pharma Packs",
      status: t("onTheWay"),
      value: "₦850,000",
      date: `${t("expected")} Jun 14`,
    },
    {
      id: "QT-2804",
      item: "Sustainable Packaging Boxes",
      status: t("readyForPickup"),
      value: "₦120,000",
      date: "Consolidated Hub Lagos",
    },
    {
      id: "QT-2715",
      item: "Antibacterial Hygiene Batch",
      status: t("done"),
      value: "₦150,000",
      date: `${t("collected")} May 28`,
    },
  ];

  // Section 7: Operations Activity Feed
  const notifications = [
    {
      title: t("poolNearTarget"),
      desc: t("poolNearTarget"),
      date: `3 ${t("minsAgo")}`,
    },
    {
      title: t("goodsLeftWarehouse"),
      desc: t("goodsLeftWarehouse"),
      date: `2 ${t("hoursAgo")}`,
    },
    {
      title: t("orderConfirmedPacking"),
      desc: t("orderConfirmedPacking"),
      date: `1 ${t("dayAgo")}`,
    },
  ];

  return (
    <div className="space-y-10">
      {/* SECTION 1: Commerce Command Center Hero */}
      <section className="relative overflow-hidden rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8 shadow-sm transition-all duration-300">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-q-blue/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-q-green/10 border border-q-green/20 text-[10px] font-extrabold text-q-green uppercase tracking-wider">
                <ShieldCheck size={12} /> KYB {merchantInfo.kybStatus}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-[var(--border-color)] text-[10px] font-bold text-[var(--text-secondary)]">
                {merchantInfo.segment}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight">
              {t("commerceCommandCenter")}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] font-medium">
              {t("storeLogsFor")}{" "}
              <span className="font-extrabold text-[var(--text-primary)]">
                {merchantInfo.business}
              </span>{" "}
              ({t("joined")} {merchantInfo.joinedDate})
            </p>
          </div>

          {/* Context Highlight Action */}
          <div className="flex flex-wrap items-center gap-4 bg-[var(--bg-elevated)] p-4 rounded-2xl border border-[var(--border-color)]">
            <div className="space-y-0.5">
              <span className="block text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                {t("nextActionRequired")}
              </span>
              <span className="text-xs font-extrabold text-[var(--text-primary)]">
                {t("checkMedicineGroupBuy")}
              </span>
            </div>
            <Link
              to="/pools"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-q-blue hover:bg-q-blue-700 px-4 py-2.5 text-xs font-semibold text-white transition-all shadow-md shadow-q-blue/10"
            >
              {t("checkNow")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: Active Procurement Opportunities (Horizontal Carousel Scroll) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">
            {t("openGroupBuys")}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] font-medium">
            {t("openGroupBuysDesc")}
          </p>
        </div>

        {/* Scrollable container */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
          {activeOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="min-w-[300px] sm:min-w-[360px] max-w-[360px] flex-shrink-0 flex flex-col justify-between rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-lg bg-q-blue/10 border border-q-blue/20 text-[10px] font-extrabold text-q-blue">
                    {opportunity.category}
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)] font-bold">
                    {opportunity.timeRemaining}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-[var(--text-primary)] leading-snug">
                    {opportunity.title}
                  </h3>
                  <p className="text-[11px] text-[var(--text-secondary)] font-semibold">
                    {opportunity.supplierStatus}
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-[var(--text-secondary)]">
                      {t("poolProgress")}
                    </span>
                    <span className="text-q-blue">{opportunity.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-q-blue rounded-full transition-all duration-500"
                      style={{ width: `${opportunity.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[var(--text-secondary)] font-semibold">
                    <span>
                      {t("pooled")}: {opportunity.poolSize}
                    </span>
                    <span>
                      {t("target")}: {opportunity.targetQty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Potential Savings Highlight */}
              <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="block text-[9px] text-[var(--text-secondary)] font-bold uppercase">
                    {t("estimatedSavings")}
                  </span>
                  <span className="text-base font-extrabold text-q-green">
                    {opportunity.savingsPotential}
                  </span>
                </div>
                <Link
                  to={`/pools/${opportunity.id}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:bg-q-blue hover:text-white transition-all shadow-sm"
                >
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid wrapper for Activity timelines and Savings info */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left pane: 8 columns */}
        <div className="lg:col-span-8 space-y-8">
          {/* SECTION 3: My Procurement Activity Timeline */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">
                {t("deliveryTracker")}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-medium">
                {t("deliveryTrackerDesc")}
              </p>
            </div>

            <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[var(--border-color)] pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">
                    {t("activeGroupBuyOrder")}
                  </span>
                  <h4 className="text-base font-bold">
                    {activeTimeline.product}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] font-medium">
                    {t("groupBuyRef")}:{" "}
                    <span className="text-q-blue font-bold">
                      {activeTimeline.id}
                    </span>
                  </p>
                </div>
                <div className="text-left sm:text-right space-y-0.5">
                  <span className="block text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">
                    {t("myContribution")}
                  </span>
                  <p className="text-lg text-[var(--text-primary)] font-extrabold">
                    {activeTimeline.amount}
                  </p>
                </div>
              </div>

              {/* Horizontal Timeline Track */}
              <div className="relative py-4">
                <div className="relative z-10 flex">
                  {activeTimeline.steps.map((step, idx) => {
                    const isCompleted = idx < activeTimeline.currentStep;
                    const isCurrent = idx === activeTimeline.currentStep;

                    return (
                      <div
                        key={step}
                        className="relative flex-1 w-0 min-w-0 flex flex-col items-center text-center px-1"
                      >
                        {/* Connecting Line to Next Step */}
                        {idx < activeTimeline.steps.length - 1 && (
                          <div
                            className={`absolute top-[15px] left-1/2 w-full h-[3px] z-0 ${
                              idx < activeTimeline.currentStep - 1
                                ? "bg-q-green"
                                : idx === activeTimeline.currentStep - 1
                                  ? "bg-gradient-to-r from-q-green to-q-blue"
                                  : "bg-[var(--border-color)]"
                            }`}
                          />
                        )}

                        {/* Step Marker */}
                        <div className="relative z-10 rounded-full bg-[var(--bg-surface)]">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                              isCompleted
                                ? "bg-q-green/20 border-q-green text-q-green"
                                : isCurrent
                                  ? "bg-q-blue/20 border-q-blue text-q-blue ring-4 ring-q-blue/20"
                                  : "bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-muted)]"
                            }`}
                          >
                          {isCompleted ? (
                            <CheckCircle2 size={16} />
                          ) : idx === 2 ? (
                            <Truck size={14} />
                          ) : idx === 3 ? (
                            <Box size={14} />
                          ) : (
                            <Building size={14} />
                          )}
                          </div>
                        </div>

                        {/* Label */}
                        <span
                          className={`text-[9px] sm:text-[10px] font-bold mt-2 leading-tight max-w-[75px] sm:max-w-[100px] ${
                            isCurrent
                              ? "text-[var(--text-primary)] font-extrabold"
                              : "text-[var(--text-secondary)] font-medium"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: Recommended Opportunities */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">
                {t("suggestedGroupBuys")}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] font-medium">
                {t("suggestedGroupBuysDesc")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {recommendedOpportunities.map((rec, i) => (
                <div
                  key={i}
                  className="group rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="h-24 rounded-xl bg-[var(--bg-elevated)] flex items-center justify-center border border-[var(--border-color)] overflow-hidden">
                      <Archive className="h-8 w-8 text-q-blue/30 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold text-q-blue bg-q-blue/10 px-2 py-0.5 rounded uppercase tracking-wider">
                        {rec.tag}
                      </span>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mt-2 line-clamp-1">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 font-semibold">
                        {rec.price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-bold text-q-green">
                    <span>{rec.savings}</span>
                    <Link
                      to="/pools"
                      className="hover:underline flex items-center gap-0.5"
                    >
                      {t("join")} <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right pane: 4 columns */}
        <div className="lg:col-span-4 space-y-8">
          {/* SECTION 4: Savings Intelligence */}
          <section className="space-y-4">
            <h2 className="text-xl font-extrabold tracking-tight">
              {t("moneySaved")}
            </h2>
            <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm space-y-6">
              {savingsData.map((sav, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between border-b border-[var(--border-color)] pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">
                      {sav.label}
                    </p>
                    <p className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
                      {sav.value}
                    </p>
                    <p className="text-[10px] text-[var(--text-secondary)] font-semibold">
                      {sav.desc}
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-q-green/10 text-q-green">
                    <TrendingUp size={16} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: Inventory & Collection Center */}
          <section className="space-y-4">
            <h2 className="text-xl font-extrabold tracking-tight">
              {t("collectionStatus")}
            </h2>
            <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm space-y-4">
              {inventoryStatus.map((inv) => (
                <div
                  key={inv.id}
                  className="flex justify-between items-start border-b border-[var(--border-color)] pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <h5 className="text-xs font-bold text-[var(--text-primary)]">
                      {inv.item}
                    </h5>
                    <p className="text-[10px] text-[var(--text-secondary)] font-semibold mt-0.5">
                      {inv.date}
                    </p>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase mt-2 px-2 py-0.5 rounded-full ${
                        inv.status === t("readyForPickup")
                          ? "bg-q-green/10 text-q-green"
                          : inv.status === t("onTheWay")
                            ? "bg-q-blue/10 text-q-blue"
                            : "bg-[var(--bg-elevated)] text-[var(--text-secondary)]"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {inv.value}
                    </span>
                    <p className="text-[9px] text-[var(--text-secondary)] mt-0.5">
                      {t("groupBuyRef")}: {inv.id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7: Operations Activity Feed */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-extrabold tracking-tight">
                {t("updates")}
              </h2>
              <Bell size={16} className="text-[var(--text-secondary)]" />
            </div>

            <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm space-y-4">
              {notifications.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 border-b border-[var(--border-color)] pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 mt-1.5 rounded-full bg-q-blue shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-[var(--text-primary)] leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-[var(--text-secondary)] font-medium leading-normal">
                      {item.desc}
                    </p>
                    <p className="text-[8px] text-[var(--text-secondary)] font-bold mt-1 uppercase">
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
