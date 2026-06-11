import { Link } from "react-router-dom";
import {
  ChevronRight,
  Archive,
  TrendingUp,
  Bell,
  Truck,
  Box,
  Building,
  CheckCircle2
} from "lucide-react";

interface OperationalDashboardProps {
  t: any;
}

export function OperationalDashboard({ t }: OperationalDashboardProps) {
  // Opportunity options
  const recommendedOpportunities = [
    { title: "Surgical Gloves Batch 500x", price: "₦15,000", savings: "Save 22%", tag: "Medical" },
    { title: "Standard Delivery Carton Boxes", price: "₦3,500", savings: "Save 15%", tag: "Logistics" },
    { title: "Grocery Insulation Bags Q3", price: "₦8,200", savings: "Save 18%", tag: "Packaging" }
  ];

  const savingsData = [
    { label: "Net Savings Q2", value: "₦540,200", desc: "Estimated reduction vs open retail price" },
    { label: "Purchasing Volume", value: "₦3,410,000", desc: "Pooled procurement capital deployed" }
  ];

  const inventoryStatus = [
    { id: "POOL-892", item: "Sterilised Latex Gloves 200x", date: "Collection: Jun 14", status: t("readyForPickup"), value: "50 Boxes" },
    { id: "POOL-781", item: "Logistics Cardboards A4", date: "Transit: Jun 18", status: t("onTheWay"), value: "250 Units" }
  ];

  const notifications = [
    { title: "Fulfillment center changed", desc: "Your default hub is now Lagos Main Fulfillment Yard.", date: "2 hours ago" },
    { title: "Consolidated batch complete", desc: "Pharmaceutical Batch Q3 successfully pooled. Purchasing started.", date: "1 day ago" }
  ];

  const activeTimeline = {
    id: "POOL-892",
    product: "Consolidated Latex Gloves Batch",
    amount: "₦120,000",
    currentStep: 2,
    steps: ["Ordered", "Processing", "In Transit", "Ready"]
  };

  return (
    <div className="space-y-10">
      {/* Grid wrapper for Activity timelines and Savings info */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left pane: 8 columns */}
        <div className="lg:col-span-8 space-y-8">
          {/* SECTION 3: My Procurement Activity Timeline */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {t("deliveryTracker")}
              </h2>
              <p className="text-xs text-slate-500 dark:text-white/50 font-medium">
                {t("deliveryTrackerDesc")}
              </p>
            </div>

            <div className="rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-wider">
                    {t("activeGroupBuyOrder")}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {activeTimeline.product}
                  </h4>
                  <p className="text-xs text-slate-550 dark:text-white/50 font-medium">
                    {t("groupBuyRef")}:{" "}
                    <span className="text-q-blue font-bold">
                      {activeTimeline.id}
                    </span>
                  </p>
                </div>
                <div className="text-left sm:text-right space-y-0.5">
                  <span className="block text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-wider">
                    {t("myContribution")}
                  </span>
                  <p className="text-lg text-slate-900 dark:text-white font-extrabold">
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
                                  : "bg-slate-200 dark:bg-white/10"
                            }`}
                          />
                        )}

                        {/* Step Marker */}
                        <div className="relative z-10 rounded-full bg-white dark:bg-[#0f172a]">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                              isCompleted
                                ? "bg-q-green/20 border-q-green text-q-green"
                                : isCurrent
                                  ? "bg-q-blue/20 border-q-blue text-q-blue ring-4 ring-q-blue/20"
                                  : "bg-white dark:bg-[#0f172a] border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/30"
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
                              ? "text-slate-900 dark:text-white font-extrabold"
                              : "text-slate-500 dark:text-white/40 font-medium"
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
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {t("suggestedGroupBuys")}
              </h2>
              <p className="text-xs text-slate-500 dark:text-white/50 font-medium">
                {t("suggestedGroupBuysDesc")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {recommendedOpportunities.map((rec, i) => (
                <div
                  key={i}
                  className="group rounded-[20px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="h-24 rounded-xl bg-slate-50 dark:bg-[#111827] flex items-center justify-center border border-slate-200 dark:border-white/10 overflow-hidden">
                      <Archive className="h-8 w-8 text-q-blue/30 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold text-q-blue bg-q-blue/10 px-2 py-0.5 rounded uppercase tracking-wider">
                        {rec.tag}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2 line-clamp-1">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-slate-550 dark:text-white/50 mt-1 font-semibold">
                        {rec.price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-bold text-q-green">
                    <span>{rec.savings}</span>
                    <Link
                      to="/pools"
                      className="hover:underline flex items-center gap-0.5 text-q-blue"
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
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t("moneySaved")}
            </h2>
            <div className="rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] p-6 shadow-sm space-y-6">
              {savingsData.map((sav, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between border-b border-slate-200 dark:border-white/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 dark:text-white/40 font-bold uppercase tracking-wider">
                      {sav.label}
                    </p>
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {sav.value}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-white/40 font-semibold">
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
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t("collectionStatus")}
            </h2>
            <div className="rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] p-6 shadow-sm space-y-4">
              {inventoryStatus.map((inv) => (
                <div
                  key={inv.id}
                  className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {inv.item}
                    </h5>
                    <p className="text-[10px] text-slate-500 dark:text-white/40 font-semibold mt-0.5">
                      {inv.date}
                    </p>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-extrabold uppercase mt-2 px-2 py-0.5 rounded-full ${
                        inv.status === t("readyForPickup")
                          ? "bg-q-green/10 text-q-green"
                          : inv.status === t("onTheWay")
                            ? "bg-q-blue/10 text-q-blue"
                            : "bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-white/45"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {inv.value}
                    </span>
                    <p className="text-[9px] text-slate-500 dark:text-white/40 mt-0.5">
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
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {t("updates")}
              </h2>
              <Bell size={16} className="text-slate-400 dark:text-white/40" />
            </div>

            <div className="rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a] p-6 shadow-sm space-y-4">
              {notifications.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 border-b border-slate-200 dark:border-white/10 pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 mt-1.5 rounded-full bg-q-blue shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-white/50 leading-normal font-medium">
                      {item.desc}
                    </p>
                    <p className="text-[8px] text-slate-400 dark:text-white/40 font-bold mt-1 uppercase">
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
