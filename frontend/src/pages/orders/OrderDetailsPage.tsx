import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowLeft, Truck, FileText } from "lucide-react";

export function OrderDetailsPage() {
  const { orderId } = useParams();
  const { t } = useTranslation();

  // Mock orders data matching the main OrdersPage
  const mockOrders: Record<string, any> = {
    "QT-2940": {
      id: "QT-2940",
      date: "June 05, 2026",
      poolName: "Bulk Samsung OLED Panels Q3",
      amount: "₦450,000",
      units: "678 units",
      status: t("inProduction"),
      statusColor: "text-q-blue bg-q-blue/10 border border-q-blue/20",
      supplier: "Samsung Display Corp",
      eta: "July 15, 2026",
      hub: "Consolidated Hub Lagos",
      timeline: [
        { stage: t("joinedGroupBuy"), date: "June 05, 2026", done: true },
        { stage: t("orderSentToSupplier"), date: "June 08, 2026", done: true },
        { stage: t("inProduction"), date: "June 10, 2026", done: true },
        { stage: t("onTheWay"), date: "Expected July 05, 2026", done: false },
        {
          stage: t("readyForPickup"),
          date: "Expected July 15, 2026",
          done: false,
        },
      ],
    },
    "QT-2811": {
      id: "QT-2811",
      date: "May 12, 2026",
      poolName: "Custom Biodegradable Mailers Vol 2",
      amount: "₦128,000",
      units: "10,000 units",
      status: t("shipped"),
      statusColor: "text-q-green bg-q-green/10 border border-q-green/20",
      supplier: "EcoPack Industries",
      eta: "June 20, 2026",
      hub: "Consolidated Hub Port Harcourt",
      timeline: [
        { stage: t("joinedGroupBuy"), date: "May 12, 2026", done: true },
        { stage: t("orderSentToSupplier"), date: "May 15, 2026", done: true },
        { stage: t("inProduction"), date: "May 20, 2026", done: true },
        { stage: t("onTheWay"), date: "May 28, 2026", done: true },
        {
          stage: t("readyForPickup"),
          date: "Expected June 20, 2026",
          done: false,
        },
      ],
    },
    "QT-2655": {
      id: "QT-2655",
      date: "April 02, 2026",
      poolName: "Micro-USB Controller Chips Sourcing",
      amount: "₦650,000",
      units: "15,000 units",
      status: t("delivered"),
      statusColor:
        "text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border-color)]",
      supplier: "ChipSource Logistics",
      eta: "April 28, 2026",
      hub: "Collected by Merchant",
      timeline: [
        { stage: t("joinedGroupBuy"), date: "April 02, 2026", done: true },
        { stage: t("orderSentToSupplier"), date: "April 05, 2026", done: true },
        { stage: t("inProduction"), date: "April 10, 2026", done: true },
        { stage: t("onTheWay"), date: "April 18, 2026", done: true },
        { stage: t("readyForPickup"), date: "April 28, 2026", done: true },
      ],
    },
  };

  const order = mockOrders[orderId ?? "QT-2940"] || mockOrders["QT-2940"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-[var(--border-color)] pb-5">
        <div>
          <Link
            to="/orders"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-2 font-bold"
          >
            <ArrowLeft size={14} /> Back to Orders
          </Link>
          <PageHeader title={`Order ${order.id}`} eyebrow={order.poolName} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left columns */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Info Card */}
          <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-4">
              <h3 className="text-base font-bold text-q-blue flex items-center gap-2">
                <FileText size={18} /> Order Information
              </h3>
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${order.statusColor}`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  Group Buy
                </p>
                <p className="font-bold mt-1 text-[var(--text-primary)]">
                  {order.poolName}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  Order Date
                </p>
                <p className="font-bold mt-1 text-[var(--text-primary)]">
                  {order.date}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  Paid Amount
                </p>
                <p className="text-lg font-extrabold mt-1 text-q-green">
                  {order.amount}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  Quantity Sourced
                </p>
                <p className="font-bold mt-1 text-[var(--text-primary)]">
                  {order.units}
                </p>
              </div>
            </div>

            <div className="border-t border-[var(--border-color)] pt-5 grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  Supplier
                </p>
                <p className="font-bold mt-1 text-[var(--text-primary)]">
                  {order.supplier}
                </p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  Expected Pickup Date
                </p>
                <p className="font-bold mt-1 text-[var(--text-primary)]">
                  {order.eta}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  Collection Center
                </p>
                <p className="font-bold mt-1 text-[var(--text-primary)]">
                  {order.hub}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right timeline column */}
        <div>
          {/* Tracker Card */}
          <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 shadow-sm">
            <h2 className="text-base font-bold text-q-blue mb-5 flex items-center gap-2">
              <Truck size={18} /> {t("deliveryTracker")}
            </h2>
            <div className="">
              {order.timeline.map((step: any, idx: number) => (
                <div key={idx} className="flex gap-4 text-xs">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-extrabold ${
                        step.done
                          ? "bg-q-green border-q-green text-white"
                          : "border-[var(--border-color)] text-[var(--text-secondary)] bg-[var(--bg-elevated)]"
                      }`}
                    >
                      {step.done ? "✓" : idx + 1}
                    </span>
                    {idx < order.timeline.length - 1 && (
                      <div
                        className={`h-10 w-[2px] ${order.timeline[idx + 1]?.done ? "bg-q-green" : "bg-slate-200 dark:bg-slate-800"}`}
                      />
                    )}
                  </div>
                  <div className="pb-4">
                    <p
                      className={`font-bold ${step.done ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
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
