import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowRight } from "lucide-react";

export function PoolDetailsPage() {
  const { poolId } = useParams();
  const { t } = useTranslation();

  // Sourcing metadata in Naira
  const pool = {
    id: poolId ?? "pool-1",
    title: "Bulk Samsung OLED Panels Q3",
    category: "Electronics Supplies",
    savings: "22%",
    progress: 75,
    committed: "₦752,000",
    target: "₦1,000,000",
    minCommit: "₦50,000",
    daysLeft: 8,
    factory: "Samsung Display Corp",
    description:
      "This group buy combines orders from multiple shops to buy high-quality OLED screen displays directly from the factory. By ordering together, we get wholesale factory pricing and skip middleman fees.",
    tiers: [
      { quantity: "1-50 units", unitPrice: "₦8,500", savings: "0% (Base)" },
      { quantity: "51-200 units", unitPrice: "₦7,650", savings: "10% off" },
      { quantity: "201-500 units", unitPrice: "₦7,140", savings: "16% off" },
      {
        quantity: "501+ units (Target)",
        unitPrice: "₦6,630",
        savings: "22% off",
      },
    ],
    timeline: [
      { stage: t("joinedGroupBuy"), date: "May 15, 2026", done: true },
      { stage: t("orderSentToSupplier"), date: "June 18, 2026", done: false },
      { stage: t("supplierReady"), date: "July 10, 2026", done: false },
      { stage: t("arrivedAtWarehouse"), date: "July 28, 2026", done: false },
      { stage: t("readyForPickup"), date: "August 05, 2026", done: false },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-[var(--border-color)] pb-5">
        <PageHeader title={pool.title} eyebrow={t("groupBuyDetails")} />
        <Link
          to={`/pools/${pool.id}/join`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-q-blue hover:bg-q-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-q-blue/20 transition-all self-start md:self-auto"
        >
          {t("joinGroupBuyBtn")} <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left 2 Columns */}
        <div className="space-y-8 lg:col-span-2">
          {/* Overview */}
          <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <h2 className="text-base font-bold text-q-blue">
              {t("aboutThisGroupBuy")}
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
              {pool.description}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--border-color)] pt-5">
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  {t("factoryLabel")}
                </p>
                <p className="text-sm font-extrabold mt-1">{pool.factory}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  {t("minOrderAmount")}
                </p>
                <p className="text-sm font-extrabold mt-1">{pool.minCommit}</p>
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <h2 className="text-base font-bold text-q-blue mb-4">
              {t("bulkPriceTiers")}
            </h2>
            <div className="overflow-hidden rounded-xl border border-[var(--border-color)]">
              <table className="min-w-full divide-y divide-[var(--border-color)]">
                <thead className="bg-[var(--bg-elevated)]">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider"
                    >
                      {t("quantityCol")}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider"
                    >
                      {t("pricePerItemCol")}
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider"
                    >
                      {t("discountCol")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-secondary)]">
                  {pool.tiers.map((tier, idx) => (
                    <tr
                      key={idx}
                      className={
                        idx === pool.tiers.length - 1
                          ? "bg-q-green/10 font-bold text-[var(--text-primary)]"
                          : ""
                      }
                    >
                      <td className="whitespace-nowrap px-4 py-3">
                        {tier.quantity}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {tier.unitPrice}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-q-green">
                        {tier.savings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-6">
          {/* Tracker Card */}
          <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <h2 className="text-base font-bold text-q-blue mb-4">
              {t("groupBuyDetails")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-secondary)] font-medium">
                  {t("progressLabel")}
                </span>
                <span className="text-q-blue font-bold">{pool.progress}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-q-blue transition-all"
                  style={{ width: `${pool.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-[var(--text-secondary)] font-semibold">
                <span>
                  {t("gatheredLabel")} <b>{pool.committed}</b>
                </span>
                <span>
                  {t("target")}: <b>{pool.target}</b>
                </span>
              </div>
              <div className="border-t border-[var(--border-color)] pt-4 flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)]">
                <span>{t("daysLeftText")}</span>
                <span className="text-q-green font-bold">
                  {pool.daysLeft} {t("daysLeftLabel")}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <h2 className="text-base font-bold text-q-blue mb-4">
              {t("deliveryTracker")}
            </h2>
            <div className="space-y-4">
              {pool.timeline.map((step, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border text-[9px] font-bold ${step.done ? "bg-q-green border-q-green text-white" : "border-[var(--border-color)] text-[var(--text-secondary)] bg-[var(--bg-elevated)]"}`}
                    >
                      {step.done ? "✓" : idx + 1}
                    </span>
                    {idx < pool.timeline.length - 1 && (
                      <span
                        className={`h-8 w-[2px] ${pool.timeline[idx + 1]?.done ? "bg-q-green" : "bg-[var(--border-color)]"}`}
                      />
                    )}
                  </div>
                  <div className="pb-2">
                    <p
                      className={`font-semibold ${step.done ? "text-q-blue font-bold" : "text-[var(--text-secondary)]"}`}
                    >
                      {step.stage}
                    </p>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
                      {step.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
