"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  TrendingUp,
  Shield,
  BarChart3,
  Award,
  Layers,
  Cpu,
  Globe,
  CheckCircle2,
  ArrowUpRight,
  Mail,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Zap,
  Activity,
  Target,
  Briefcase,
} from "lucide-react";
import { Variants } from "framer-motion";

// --- DATA DUMMY UNTUK DASHBOARD & KINERJA ---
const dataRoiBulanan = [
  { name: "Jan", ROI: 8 },
  { name: "Feb", ROI: 14 },
  { name: "Mar", ROI: 11 },
  { name: "Apr", ROI: 15 },
  { name: "Mei", ROI: 10 },
  { name: "Jun", ROI: 16 },
  { name: "Jul", ROI: 13 },
  { name: "Agu", ROI: 12 },
  { name: "Sep", ROI: 18 },
  { name: "Okt", ROI: 14 },
  { name: "Nov", ROI: 11 },
  { name: "Des", ROI: 17 },
];

const pertumbuhanPortofolio = [
  { tahun: "2023 Q1", Saldo: 500000 },
  { tahun: "2023 Q3", Saldo: 850000 },
  { tahun: "2024 Q1", Saldo: 1200000 },
  { tahun: "2024 Q3", Saldo: 1750000 },
  { tahun: "2025 Q1", Saldo: 2100000 },
  { tahun: "2026 Q2", Saldo: 2500000 },
];

const alokasiAset = [
  { name: "Kripto", value: 35, color: "#3b82f6" },
  { name: "Forex", value: 25, color: "#10b981" },
  { name: "Emas (XAU)", value: 20, color: "#f59e0b" },
  { name: "Indeks & Saham", value: 20, color: "#8b5cf6" },
];

const dataTicker = [
  { pair: "BTC/USDT", price: "67.420,50", change: "+4,2%", up: true },
  { pair: "XAU/USD", price: "2.342,80", change: "+1,1%", up: true },
  { pair: "EUR/USD", price: "1,08420", change: "-0,15%", up: false },
  { pair: "NASDAQ 100", price: "18.240,10", change: "+0,85%", up: true },
  { pair: "ETH/USDT", price: "3.520,15", change: "+5,6%", up: true },
];

// --- KONFIGURASI ANIMASI ---

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// --- KOMPONEN: ANIMASI ANGKA ---
const AnimatedCounter = ({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring" }}
      className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400"
    >
      {value}
      {suffix}
    </motion.span>
  );
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function PremiumPortfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ikhtisar");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* EFEK LATAR BELAKANG: GLOW INTERAKTIF & GRID */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-40 transition-duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[120vh] right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* TICKER PASAR LANGSUNG (DUMMY) */}
      <div className="w-full bg-[#0a0f24] border-b border-slate-800/60 text-xs py-2.5 overflow-hidden sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] gap-12 items-center">
          {[...dataTicker, ...dataTicker].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="font-semibold text-slate-400">{item.pair}</span>
              <span className="font-mono text-slate-200">{item.price}</span>
              <span
                className={`font-mono flex items-center ${item.up ? "text-emerald-400" : "text-rose-400"}`}
              >
                {item.up ? "▲" : "▼"} {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* NAVIGASI / HEADER */}
      <header className="w-full border-b border-slate-900 bg-[#050816]/70 backdrop-blur-xl z-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              NOVA <span className="text-cyan-400 font-light">HARYANTO</span>
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {[
              { id: "beranda", label: "Beranda" },
              { id: "tentang", label: "Tentang Saya" },
              { id: "keahlian", label: "Keahlian" },
              { id: "kinerja", label: "Kinerja" },
              { id: "prestasi", label: "Prestasi" },
              { id: "filosofi", label: "Filosofi" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hover:text-cyan-400 transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#kontak"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-all shadow-md shadow-blue-600/20 flex items-center gap-2 group"
            >
              Hubungi Institusi{" "}
              <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* PANEL MENU MOBILE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 bg-[#0a0f24] border-b border-slate-800 z-40 p-6 flex flex-col gap-4 md:hidden backdrop-blur-xl"
          >
            {[
              { id: "beranda", label: "Beranda" },
              { id: "tentang", label: "Tentang Saya" },
              { id: "keahlian", label: "Keahlian" },
              { id: "kinerja", label: "Kinerja" },
              { id: "prestasi", label: "Prestasi" },
              { id: "filosofi", label: "Filosofi" },
              { id: "kontak", label: "Kontak" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-300 hover:text-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO SECTION */}
        <section
          id="beranda"
          className="min-h-[calc(100vh-5rem)] flex flex-col justify-center pt-10 pb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 flex flex-col gap-6"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-400 tracking-wide w-fit"
              >
                <Zap className="h-3 w-3" /> TRADER GLOBAL ALGORITMIK &
                DISKRESIONER
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-6xl font-black tracking-tight leading-none text-white"
              >
                Turning Market <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                  Opportunities
                </span>{" "}
                <br />
                Into Consistent Results.
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-slate-400 text-lg max-w-xl leading-relaxed"
              >
                Halo, saya <strong className="text-white">Nova Haryanto</strong>
                , seorang Professional Financial Trader yang berbasis di
                Tangerang, Indonesia. Spesialis dalam manajemen risiko super
                rigid lintas instrumen Forex, Kripto, dan Indeks Global.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 pt-4"
              >
                <a
                  href="#kinerja"
                  className="px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/30 transition-all flex items-center gap-3 group"
                >
                  Lihat Kinerja Real-Time{" "}
                  <ArrowUpRight className="h-5 w-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="#kontak"
                  className="px-8 py-4 rounded-xl font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-all"
                >
                  Mulai Kemitraan
                </a>
              </motion.div>
            </motion.div>

            {/* VISUALISASI HERO / KOMPONEN DASHBOARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-50" />
              <div className="relative border border-slate-800 bg-[#0a0f24]/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                {/* Header Kontrol Jendela Simulasi */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
                    <span className="text-xs text-slate-500 ml-2 font-mono">
                      XAUUSD_H4_EKSEKUSI_ALGO
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-mono">
                    DATA LIVE
                  </span>
                </div>

                {/* Wadah Grafik Simulasi */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataRoiBulanan.slice(6)}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#1e293b/30"
                      />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderColor: "#334155",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#94a3b8" }}
                      />
                      <Bar dataKey="ROI" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Metrik Terapung di Dalam Hero */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-800/80">
                  <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-500">WIN RATE</div>
                    <div className="text-xl font-bold text-emerald-400">
                      78.0%
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-500">FAKTOR PROFIT</div>
                    <div className="text-xl font-bold text-cyan-400">3,42</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* BAR STATISTIK / COUNTER */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-slate-900">
            <div className="flex flex-col">
              <AnimatedCounter value="8" suffix="+" />
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase mt-1">
                Tahun Pengalaman
              </span>
            </div>
            <div className="flex flex-col">
              <AnimatedCounter value="12.500" suffix="+" />
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase mt-1">
                Eksekusi Trade
              </span>
            </div>
            <div className="flex flex-col">
              <AnimatedCounter value="2,5" suffix="M+" />
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase mt-1">
                Dana Kelolaan (USD)
              </span>
            </div>
            <div className="flex flex-col">
              <AnimatedCounter value="12" suffix="%" />
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase mt-1">
                Rata-Rata ROI Bulanan
              </span>
            </div>
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* TENTANG SAYA */}
        <section id="tentang" className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                  PROFIL TRADER
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
                  Disiplin Tanpa Kompromi,
                  <br />
                  Eksekusi Matematis.
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Saya adalah seorang Professional Trader dengan pengalaman
                  lebih dari 8 tahun di pasar finansial global. Fokus utama saya
                  meliputi instrumen Forex, Cryptocurrency, Indices, Gold, dan
                  Stock Trading.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Saya mengintegrasikan kekuatan analisis fundamental makro
                  serta teknikal kuantitatif demi menjaga konsistensi ekuitas
                  portofolio dari siklus volatilitas pasar yang ekstrem.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <h3 className="text-lg font-semibold text-slate-300">
                Rekam Jejak & Milestone Profesional
              </h3>
              <div className="border-l-2 border-slate-800 pl-6 ml-2 space-y-10">
                {[
                  {
                    tahun: "2024 - Sekarang",
                    title: "Institutional Asset Manager",
                    desc: "Mengelola portofolio privat multi-aset bernilai $2.5M+ dengan implementasi kontrol risiko absolut.",
                  },
                  {
                    tahun: "2021 - 2023",
                    title: "Prop Firm Funded Trader",
                    desc: "Berhasil melewati berbagai tantangan pendanaan institusional global dan masuk dalam jajaran Top 1% Trader Challenge.",
                  },
                  {
                    tahun: "2018 - 2020",
                    title: "Full-Time Retail Trader",
                    desc: "Membangun sistem perdagangan mekanikal mandiri berbasis Price Action, Smart Money Concept (SMC), dan strategi ICT.",
                  },
                ].map((milestone, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-[#050816]" />
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {milestone.tahun}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1">
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* KEAHLIAN TRADING */}
        <section id="keahlian" className="py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
              KAPABILITAS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Ekosistem Analisis & Strategi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart3,
                name: "Analisis Teknikal & Fundamental",
                desc: "Sinergi metodologi struktur grafik kuantitatif yang dipadukan dengan proyeksi rilis data makroekonomi bank sentral global.",
              },
              {
                icon: Shield,
                name: "Smart Money Concept & ICT",
                desc: "Membaca jejak likuiditas institusi besar (Order Blocks, Fair Value Gaps) untuk akurasi entri dengan rasio Risk-to-Reward maksimal.",
              },
              {
                icon: Target,
                name: "Manajemen Risiko Rigid",
                desc: "Penerapan kalkulasi lot ketat serta batas drawdown maksimal 1% per setup perdagangan demi ketahanan jangka panjang akun.",
              },
              {
                icon: Cpu,
                name: "Optimasi Portofolio",
                desc: "Diversifikasi adaptif multi-aset untuk menyeimbangkan kurva pertumbuhan modal di berbagai kondisi market (Bullish / Bearish).",
              },
              {
                icon: Layers,
                name: "Eksekusi Multi-Gaya",
                desc: "Fleksibilitas taktis sesuai kondisi pasar, mulai dari Scalping jangka pendek, Intraday Swing Trading, hingga Position Trading.",
              },
              {
                icon: Globe,
                name: "Analisis Struktur Pasar",
                desc: "Pemetaan fraktal tren makro ke mikro secara berkala guna mengantisipasi akumulasi likuiditas dan pembalikan arah harga.",
              },
            ].map((skill, idx) => {
              const IconComp = skill.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, borderColor: "rgba(34, 211, 238, 0.4)" }}
                  className="p-6 bg-[#0a0f24]/40 border border-slate-800/80 rounded-2xl transition-all group"
                >
                  <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mt-4 mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {skill.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* INTEGRASI PLATFORM */}
          <div className="mt-16 p-8 rounded-2xl border border-slate-900 bg-gradient-to-r from-slate-950 to-[#0a0f24] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-8xl font-black select-none pointer-events-none">
              TERMINAL
            </div>
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
              Infrastruktur & Platform Eksekusi Profesional
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                "MetaTrader 4",
                "MetaTrader 5",
                "TradingView",
                "Binance",
                "Bybit",
                "OKX",
                "Interactive Brokers",
                "cTrader",
                "NinjaTrader",
                "Thinkorswim",
              ].map((platform) => (
                <span
                  key={platform}
                  className="px-4 py-2 text-xs font-mono rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* PERFORMANCE DASHBOARD */}
        <section id="kinerja" className="py-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                METRIK TERODIT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                Dashboard Kinerja Terverifikasi
              </h2>
            </div>

            {/* Kontrol Tab */}
            <div className="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("ikhtisar")}
                className={`px-4 py-2 rounded-lg transition-all ${activeTab === "ikhtisar" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Ikhtisar ROI
              </button>
              <button
                onClick={() => setActiveTab("pertumbuhan")}
                className={`px-4 py-2 rounded-lg transition-all ${activeTab === "pertumbuhan" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Kurva Ekuitas
              </button>
            </div>
          </div>

          {/* GRID GRAFIK UTAMA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 border border-slate-800 bg-[#0a0f24]/50 rounded-2xl p-6">
              <AnimatePresence mode="wait">
                {activeTab === "ikhtisar" ? (
                  <motion.div
                    key="ikhtisar"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-80 w-full"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-semibold text-slate-300">
                        Performa ROI Bulanan (%)
                      </h4>
                      <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                        <Activity className="h-3 w-3" /> RATA-RATA YTD: +13,1%
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height="90%">
                      <BarChart data={dataRoiBulanan}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1f2937/40"
                        />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            borderColor: "#334155",
                          }}
                        />
                        <Bar dataKey="ROI" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                          {dataRoiBulanan.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.ROI > 12 ? "#10b981" : "#3b82f6"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pertumbuhan"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-80 w-full"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-semibold text-slate-300">
                        Kurva Pertumbuhan Kapital AUM (USD)
                      </h4>
                      <span className="text-xs text-cyan-400 flex items-center gap-1 font-mono">
                        <TrendingUp className="h-3 w-3" /> Pertumbuhan Majemuk
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height="90%">
                      <LineChart data={pertumbuhanPortofolio}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#1f2937/40"
                        />
                        <XAxis dataKey="tahun" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            borderColor: "#334155",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Saldo"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          dot={{ r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GRAFIK PIE ALOKASI ASET */}
            <div className="lg:col-span-4 border border-slate-800 bg-[#0a0f24]/50 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-4">
                  Alokasi Berdasarkan Kelas Aset
                </h4>
                <div className="h-44 w-full flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={alokasiAset}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {alokasiAset.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                {alokasiAset.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between text-xs border-b border-slate-900 pb-1.5"
                  >
                    <span className="flex items-center gap-2 text-slate-400">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name}
                    </span>
                    <span className="font-mono font-bold text-white">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* PRESTASI & SERTIFIKASI */}
        <section id="prestasi" className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                REKAM JEJAK
              </span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-8">
                Pencapaian & Prestasi
              </h2>
              <div className="space-y-4">
                {[
                  "Top 1% Trader Challenge 2024",
                  "Mencatatkan 250% Pertumbuhan Portofolio dalam 3 Tahun",
                  "Mengelola Portofolio Perdagangan Multi-Aset Skala Global",
                  "Mentorship Lebih dari 500+ Trader Pemula Secara Internal",
                  "Pembicara Utama di Berbagai Acara Trading & Investasi Finansial",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl border border-slate-900 bg-[#0a0f24]/20"
                  >
                    <Award className="h-5 w-5 text-amber-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                VALIDASI Kredensial
              </span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-8">
                Sertifikasi Profesional
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Certified Financial Market Analyst (CFMA)",
                    issuer: "Global Financial Certification Board",
                  },
                  {
                    title: "Advanced Technical Analysis Certification",
                    issuer: "Alpha Market Analytics Academy",
                  },
                  {
                    title: "Professional Risk Management Certification",
                    issuer: "Risk Institute Standard",
                  },
                  {
                    title: "Forex Market Specialist Designation",
                    issuer: "International Currency Association",
                  },
                ].map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col p-4 rounded-xl border border-slate-900 bg-[#0a0f24]/20"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0" />
                      <span className="text-sm font-bold text-white">
                        {cert.title}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 ml-8 mt-1">
                      {cert.issuer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* FILOSOFI TRADING */}
        <section id="filosofi" className="py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
              SISTEM UTAMA
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">
              Filosofi Metodologis
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Prioritas Risiko Atas Profit",
                text: "Keuntungan hanyalah produk sampingan dari manajemen risiko yang sempurna. Mengamankan modal adalah mandat utama.",
              },
              {
                title: "Konsistensi Dibanding Instan",
                text: "Menghindari ekspektasi profit cepat secara mekanis melahirkan akumulasi keuntungan stabil jangka panjang.",
              },
              {
                title: "Keputusan Berbasis Data",
                text: "Setiap penekanan tombol beli/jual didasari validasi riset empiris yang terukur, bukan sekadar intuisi atau emosi.",
              },
              {
                title: "Keberlanjutan Jangka Panjang",
                text: "Menjaga kondisi psikologis eksekusi yang rileks demi ketahanan performa pertumbuhan akun bertahun-tahun ke depan.",
              },
            ].map((phil, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-900 bg-slate-950/40 relative"
              >
                <span className="text-4xl font-black text-slate-800 absolute top-4 right-4 font-mono">
                  0{idx + 1}
                </span>
                <h4 className="text-base font-bold text-white mb-2 mt-4">
                  {phil.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {phil.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* TESTIMONIALS SECTION */}
        <section className="py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
              REKOMENDASI
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">
              Ulasan Mitra Institusional
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Michael Tan",
                role: "Investor",
                text: "Nova secara konsisten menunjukkan analisis pasar yang luar biasa serta eksekusi yang sangat disiplin.",
              },
              {
                name: "Sarah Wijaya",
                role: "Pengusaha",
                text: "Trader profesional dengan kerangka manajemen risiko yang sangat kuat dan performa bulanan yang konsisten.",
              },
              {
                name: "David Lim",
                role: "Portfolio Manager",
                text: "Salah satu trader paling berdedikasi tinggi yang pernah bekerja sama dengan kami dalam pengelolaan modal.",
              },
            ].map((testi, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-800/80 bg-[#0a0f24]/30 flex flex-col justify-between"
              >
                <p className="text-sm text-slate-400 italic leading-relaxed">
                  "{testi.text}"
                </p>
                <div className="mt-6 pt-4 border-t border-t-slate-900 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-cyan-400">
                    {testi.name[0]}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">
                      {testi.name}
                    </h5>
                    <span className="text-xs text-slate-500">{testi.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-slate-900" />

        {/* KONTAK SECTION */}
        <section id="kontak" className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                KONTAK UTAMA
              </span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">
                Mari Diskusikan Alokasi Sinergi Kapital
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Terbuka untuk diskusi kolaborasi akun korporasi, pengelolaan
                likuiditas private portfolio capital, atau undangan pembicara
                panel finansial makro global.
              </p>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="h-4 w-4 text-cyan-400" />
                  <span>nova.haryanto@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Briefcase className="h-4 w-4 text-cyan-400" />
                  <span>Tangerang, Banten, Indonesia</span>
                </div>
              </div>

              {/* TAUTAN SOSIAL MEDIA */}
              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  "LinkedIn",
                  "Telegram",
                  "Instagram",
                  "YouTube",
                  "TradingView",
                ].map((soc) => (
                  <a
                    key={soc}
                    href="#"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-cyan-500 hover:text-black transition-all border border-slate-800 text-slate-400 text-xs rounded font-medium flex items-center gap-1.5"
                  >
                    {soc} <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* FORMULIR AMAN */}
            <div className="lg:col-span-7">
              <form className="p-6 border border-slate-800 bg-[#0a0f24]/50 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                      placeholder="Contoh: John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Email Perusahaan
                    </label>
                    <input
                      type="email"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                      placeholder="johndoe@firm.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Subjek Pengajuan
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                    placeholder="Manajemen Kapital / Undangan Pembicara"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Pesan Proposal Kerjasama
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400 resize-none"
                    placeholder="Detail spesifikasi kebutuhan kolaborasi bisnis Anda di sini..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-xl font-bold bg-blue-600 text-white text-sm hover:bg-blue-500 transition-all text-center"
                  >
                    Kirim Pesan Terenkripsi
                  </button>
                  <a
                    href="https://wa.me/6281281916880"
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 px-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white text-sm transition-all text-center flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" /> WhatsApp Langsung
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER INSTITUSIONAL */}
      <footer className="w-full bg-[#03050e] border-t border-slate-950 py-8 text-xs text-slate-600 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            &copy; 2026 Nova Haryanto. Hak Cipta Institusional Dilindungi.
          </div>
          <div className="flex gap-6 text-[10px]">
            <span>
              PERINGATAN RISIKO: Perdagangan aset finansial melibatkan risiko
              likuidasi kapital yang tinggi. Kinerja masa lalu bukan jaminan
              mutlak untuk hasil di masa mendatang.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
