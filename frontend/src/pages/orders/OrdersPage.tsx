import { PageHeader } from "@/components/PageHeader";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";

export function OrdersPage() {
  const { t } = useTranslation();

  const orders = [
    {
      id: "QT-2940",
      date: "June 05, 2026",
      poolName: "Bulk Samsung OLED Panels Q3",
      amount: "₦450,000",
      units: "678 units",
      status: t("inProduction"),
      statusColor: "text-q-blue bg-q-blue/10 border border-q-blue/20",
    },
    {
      id: "QT-2811",
      date: "May 12, 2026",
      poolName: "Custom Biodegradable Mailers Vol 2",
      amount: "₦128,000",
      units: "10,000 units",
      status: t("shipped"),
      statusColor: "text-q-green bg-q-green/10 border border-q-green/20",
    },
    {
      id: "QT-2655",
      date: "April 02, 2026",
      poolName: "Micro-USB Controller Chips Sourcing",
      amount: "₦650,000",
      units: "15,000 units",
      status: t("delivered"),
      statusColor:
        "text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border-color)]",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={t("orders")} eyebrow={t("trackOrderDeliveries")} />

      <div className="rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--border-color)]">
            <thead className="bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                >
                  {t("orderIdCol")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                >
                  {t("orderDateCol")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                >
                  {t("groupBuyCol")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                >
                  {t("amountQtyCol")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider"
                >
                  {t("deliveryStatusCol")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider"
                >
                  {t("actionsCol")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] bg-[var(--bg-surface)] text-sm font-medium text-[var(--text-secondary)]">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-[var(--bg-elevated)] transition-colors"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-bold text-q-blue">
                    {order.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-[var(--text-primary)]">
                    {order.poolName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-[var(--text-primary)] font-extrabold">
                      {order.amount}
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)] font-semibold">
                      {order.units}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${order.statusColor}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Link
                      to={`/orders/${order.id}`}
                      className="inline-flex items-center justify-center rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-color)] px-3.5 py-1.5 text-xs font-bold text-[var(--text-primary)] hover:bg-q-blue hover:text-white transition-all cursor-pointer"
                    >
                      {t("viewDetailsLabel")}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
