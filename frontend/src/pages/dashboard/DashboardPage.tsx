import { Link } from "react-router-dom";
import {
  TrendingUp,
  ShieldCheck,
  Users,
  ChevronRight,
  ArrowUpRight,
  Calendar,
  Box,
  Truck,
  Building,
  CheckCircle2,
} from "lucide-react";

export function DashboardPage() {
  const merchantInfo = {
    name: "Idris Afuwape",
    business: "Apex Pharmacy Ltd",
    segment: "Pharmacy",
    joinedDate: "Jun 2026",
    kybStatus: "Verified",
  };

  // Active pools with SVG progress rings
  const activePools = [
    {
      id: "pool-1",
      title: "Bulk Samsung OLED Panels Q3",
      category: "Electronics",
      committed: "$45,000",
      target: "$60,000",
      progress: 75,
      participants: 42,
      daysLeft: 8,
      yieldRate: "15.4%",
    },
    {
      id: "pool-2",
      title: "Sustainable Packaging Supplies",
      category: "Logistics",
      committed: "$18,000",
      target: "$25,000",
      progress: 68,
      participants: 28,
      daysLeft: 14,
      yieldRate: "12.8%",
    },
  ];

  // Active orders workflow steps
  const activeOrders = [
    {
      id: "QT-2940",
      product: "Consolidated Pharmaceutical Packs",
      supplier: "Medipharm Distributors Ltd",
      amount: "$14,500",
      currentStep: 2, // 0: Pool Filled, 1: Sourced, 2: Shipped, 3: Arrived, 4: Collected
      steps: ["Pool Filled", "Sourced", "Shipped", "Arrived", "Collected"],
    },
  ];

  // Savings counters
  const savingsData = [
    {
      label: "Lifetime Saved",
      value: "$22,800",
      change: "+18.4% Average",
      trend: "up",
    },
    {
      label: "Monthly Saved",
      value: "$4,210",
      change: "This month vs traditional buying",
      trend: "up",
    },
    {
      label: "Pool Yield Value",
      value: "14.2%",
      change: "Return on consolidated capital",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Command Section */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 bg-gradient-to-r from-q-dark-surface/80 via-q-dark-surface to-q-blue/5 backdrop-blur-xl relative overflow-hidden">
        {/* Decorative backdrop shapes */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-q-green/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-q-green/10 border border-q-green/20 px-2.5 py-0.5 text-[10px] font-bold text-q-green">
                <ShieldCheck size={12} /> KYB {merchantInfo.kybStatus}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white/50">
                Segment: {merchantInfo.segment}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome back,{" "}
              <span className="gradient-text">{merchantInfo.name}</span>
            </h1>
            <p className="text-sm text-white/50 font-medium">
              Managing commerce operations for{" "}
              <span className="text-white font-bold">
                {merchantInfo.business}
              </span>
            </p>
          </div>

          {/* Quick Actions Panel */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/pools"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-q-blue hover:bg-q-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-q-blue/20 transition-all"
            >
              Browse Pools <ChevronRight size={16} />
            </Link>
            <button
              onClick={() => alert("Custom procurement requests are active.")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all"
            >
              Request Custom Sourcing
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Work Grid */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Side: 8 Cols */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Pools Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Active Procurement Pools
                </h2>
                <p className="text-xs text-white/40 font-medium">
                  Your current participating demand aggregation pools.
                </p>
              </div>
              <Link
                to="/pools"
                className="text-xs font-bold text-q-blue hover:underline flex items-center gap-1"
              >
                View all pools <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {activePools.map((pool) => {
                // SVG Progress Ring calculations
                const radius = 32;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset =
                  circumference - (pool.progress / 100) * circumference;

                return (
                  <div
                    key={pool.id}
                    className="group relative flex flex-col justify-between rounded-3xl border border-white/5 bg-q-dark-surface/40 p-6 shadow-xl backdrop-blur-md hover:border-white/10 transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="inline-flex rounded-lg bg-q-blue/10 border border-q-blue/25 px-2.5 py-1 text-[10px] font-bold text-q-blue">
                            {pool.category}
                          </span>
                          <h3 className="mt-4 text-base font-bold text-white group-hover:text-q-blue transition-colors">
                            {pool.title}
                          </h3>
                        </div>

                        {/* Circular Progress Ring */}
                        <div className="relative flex items-center justify-center shrink-0">
                          <svg className="w-16 h-16 transform -rotate-90">
                            <circle
                              cx="32"
                              cy="32"
                              r={radius}
                              stroke="rgba(255,255,255,0.05)"
                              strokeWidth="4.5"
                              fill="transparent"
                            />
                            <circle
                              cx="32"
                              cy="32"
                              r={radius}
                              stroke="#2563EB"
                              strokeWidth="4.5"
                              fill="transparent"
                              strokeDasharray={circumference}
                              strokeDashoffset={strokeDashoffset}
                              strokeLinecap="round"
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <span className="absolute text-xs font-extrabold text-white">
                            {pool.progress}%
                          </span>
                        </div>
                      </div>

                      {/* Pool Metrics */}
                      <div className="grid grid-cols-2 gap-4 mt-6 border-t border-b border-white/5 py-4">
                        <div>
                          <p className="text-[10px] text-white/40 font-bold uppercase">
                            Committed Capital
                          </p>
                          <p className="text-sm text-white font-extrabold mt-0.5">
                            {pool.committed}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/40 font-bold uppercase">
                            Estimated Yield
                          </p>
                          <p className="text-sm text-q-green font-extrabold mt-0.5">
                            {pool.yieldRate}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                      <span className="text-white/40 flex items-center gap-1.5">
                        <Users size={14} className="text-q-blue" />{" "}
                        {pool.participants} Merchants
                      </span>
                      <span className="text-white/40 flex items-center gap-1.5">
                        <Calendar size={14} /> {pool.daysLeft} days left
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Shipments & Orders Timeline */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Consolidated Supply Chain Timeline
              </h2>
              <p className="text-xs text-white/40 font-medium">
                Real-time shipping and delivery workflows for active inventory
                pools.
              </p>
            </div>

            {activeOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-white/5 bg-q-dark-surface/40 p-6 shadow-xl backdrop-blur-md space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[10px] text-white/40 font-bold uppercase">
                      Active Pipeline
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      {order.product}
                    </h4>
                    <p className="text-xs text-white/40 font-medium mt-1">
                      Order Ref:{" "}
                      <span className="text-q-blue font-bold">{order.id}</span>
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] text-white/40 font-bold uppercase">
                      Total Sourced Value
                    </p>
                    <p className="text-lg text-q-green font-extrabold mt-0.5">
                      {order.amount}
                    </p>
                  </div>
                </div>

                {/* Modern Linear Step Pipeline */}
                <div className="relative py-4">
                  {/* Background Track Line */}
                  <div className="absolute top-[28px] left-[15px] right-[15px] h-[3px] bg-white/5 z-0" />

                  {/* Glowing Active Track Line */}
                  <div
                    className="absolute top-[28px] left-[15px] h-[3px] bg-gradient-to-r from-q-blue to-q-green z-0 transition-all duration-1000"
                    style={{
                      width: `${(order.currentStep / (order.steps.length - 1)) * 90}%`,
                    }}
                  />

                  <div className="relative z-10 flex justify-between">
                    {order.steps.map((step, idx) => {
                      const isCompleted = idx < order.currentStep;
                      const isCurrent = idx === order.currentStep;

                      return (
                        <div
                          key={step}
                          className="flex flex-col items-center text-center max-w-[60px] sm:max-w-[80px]"
                        >
                          {/* Step Node Icon/Badge */}
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                              isCompleted
                                ? "bg-q-green/20 border-q-green text-q-green"
                                : isCurrent
                                  ? "bg-q-blue/20 border-q-blue text-q-blue ring-4 ring-q-blue/20"
                                  : "bg-q-dark border-white/10 text-white/20"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 size={16} />
                            ) : idx === 2 ? (
                              <Truck size={16} />
                            ) : idx === 3 ? (
                              <Box size={16} />
                            ) : (
                              <Building size={16} />
                            )}
                          </div>

                          {/* Step Label */}
                          <span
                            className={`text-[9px] sm:text-[10px] font-bold mt-2 leading-tight ${
                              isCurrent
                                ? "text-white font-extrabold"
                                : isCompleted
                                  ? "text-white/60 font-semibold"
                                  : "text-white/20"
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
            ))}
          </div>
        </div>

        {/* Right Side: 4 Cols */}
        <div className="lg:col-span-4 space-y-8">
          {/* Savings Widget */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Savings Operations
            </h2>
            <div className="rounded-3xl border border-white/5 bg-q-dark-surface/40 p-6 shadow-xl backdrop-blur-md space-y-6">
              {savingsData.map((sav, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between border-b border-white/5 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-xs text-white/40 font-bold uppercase">
                      {sav.label}
                    </p>
                    <p className="text-2xl font-extrabold text-white tracking-tight">
                      {sav.value}
                    </p>
                    <p className="text-[10px] text-white/30 font-semibold">
                      {sav.change}
                    </p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-q-green/10 text-q-green">
                    <TrendingUp size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commerce Intelligence / Insights */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Commerce Intelligence
            </h2>
            <div className="rounded-3xl border border-white/5 bg-q-dark-surface/40 p-6 shadow-xl backdrop-blur-md space-y-6">
              <div>
                <p className="text-xs font-bold text-white/40 uppercase mb-3">
                  Segment Distribution
                </p>

                {/* Custom SVG Mini Donut Chart */}
                <div className="flex items-center gap-6">
                  <div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-20 h-20 transform -rotate-90">
                      {/* Background segment (Logistics) */}
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="#8B5CF6"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 30}
                        strokeDashoffset={0}
                      />
                      {/* Mid segment (Packaging) */}
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="#06B6D4"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 30}
                        strokeDashoffset={(30 / 100) * (2 * Math.PI * 30)}
                      />
                      {/* Core segment (Pharmaceuticals) */}
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        stroke="#2563EB"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 30}
                        strokeDashoffset={(55 / 100) * (2 * Math.PI * 30)}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-[10px] font-bold text-white/40 uppercase">
                        Top
                      </span>
                      <span className="text-xs font-extrabold text-white">
                        Meds
                      </span>
                    </div>
                  </div>

                  {/* Legend list */}
                  <div className="space-y-1.5 flex-1">
                    {[
                      {
                        name: "Meds & Pharma",
                        percent: "45%",
                        color: "bg-q-blue",
                      },
                      {
                        name: "Packaging Box",
                        percent: "25%",
                        color: "bg-[#06B6D4]",
                      },
                      {
                        name: "Consolidated Freight",
                        percent: "30%",
                        color: "bg-[#8B5CF6]",
                      },
                    ].map((leg) => (
                      <div
                        key={leg.name}
                        className="flex items-center justify-between text-[10px] font-bold"
                      >
                        <div className="flex items-center gap-1.5 text-white/50">
                          <span
                            className={`h-2 w-2 rounded-full ${leg.color}`}
                          />
                          <span>{leg.name}</span>
                        </div>
                        <span className="text-white">{leg.percent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actionable insight tip */}
              <div className="p-4 rounded-2xl bg-q-blue/10 border border-q-blue/20">
                <div className="flex gap-2.5 items-start">
                  <ArrowUpRight
                    size={16}
                    className="text-q-blue shrink-0 mt-0.5"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-white">
                      Savings Threshold Near
                    </h5>
                    <p className="text-[10px] text-white/50 mt-1 leading-normal font-medium">
                      Packaging Supplies pool is at 68%. Joining with another
                      $2,000 committed capital unlocks the next wholesale tier
                      for an additional 4% average savings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
