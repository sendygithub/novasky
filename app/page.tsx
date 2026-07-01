"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/providers";
import {
  Menu,
  X,
  ChevronRight,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Stethoscope,
  Bed,
  Ambulance,
  FlaskConical,
  Scan,
  Pill,
  HeartPulse,
  Syringe,
  Quote,
  Calendar,
  User,
  Shield,
  Activity,
  Globe,
  Video,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME, SERVICES, STATS, CONTACT_INFO } from "@/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Bed,
  Ambulance,
  FlaskConical,
  Scan,
  Pill,
  HeartPulse,
  Syringe,
};

const testimonials = [
  {
    name: "Ibu Sari Dewi",
    role: "Pasien Rawat Jalan",
    content:
      "Pelayanan di RS Setiabudi sangat memuaskan. Dokter-dokternya profesional dan ramah. Proses administrasi juga cepat berkat sistem digitalnya.",
    rating: 5,
  },
  {
    name: "Bapak Ahmad Rizki",
    role: "Pasien Rawat Inap",
    content:
      "Fasilitas rawat inap sangat nyaman. Perawatnya sigap 24 jam. Saya merasa seperti dirawat di rumah sendiri.",
    rating: 5,
  },
  {
    name: "Ibu Maria Santoso",
    role: "Pasien MCU",
    content:
      "Medical Check Up di sini lengkap dan hasilnya cepat. Harganya juga terjangkau untuk kualitas yang didapatkan.",
    rating: 4,
  },
  {
    name: "Bapak Hendra Gunawan",
    role: "Pasien UGD",
    content:
      "Tanggap daruratnya sangat cepat. Tim medis langsung sigap menangani saya. Terima kasih RS Setiabudi.",
    rating: 5,
  },
];

const doctors = [
  {
    name: "dr. Andi Pratama, Sp.PD",
    spesialis: "Penyakit Dalam",
    rating: 4.9,
    pasien: 1250,
  },
  {
    name: "dr. Sarah Wijaya, Sp.A",
    spesialis: "Anak",
    rating: 4.8,
    pasien: 980,
  },
  {
    name: "dr. Budi Santoso, Sp.OG",
    spesialis: "Kandungan",
    rating: 4.9,
    pasien: 1500,
  },
  {
    name: "dr. Rina Marlina, Sp.JP",
    spesialis: "Jantung",
    rating: 4.7,
    pasien: 870,
  },
];

function AnimatedCounter({
  value,
  suffix = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* ===== NAVBAR ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-200">
                <HeartPulse className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">
                  RS Setiabudi
                </span>
                <span className="hidden sm:block text-[10px] font-medium text-blue-600 -mt-1">
                  Hospital Management System
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {[
                { href: "/", label: "Beranda" },
                { href: "#dokter", label: "Dokter" },
                { href: "#layanan", label: "Layanan" },
                { href: "#jadwal", label: "Jadwal" },
                { href: "#tentang", label: "Tentang" },
                { href: "#kontak", label: "Kontak" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <Link href="/dashboard">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Dashboard
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="text-gray-700">
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200">
                      Daftar
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white"
            >
              <div className="px-4 py-6 space-y-4">
                {[
                  { href: "/", label: "Beranda" },
                  { href: "#dokter", label: "Dokter" },
                  { href: "#layanan", label: "Layanan" },
                  { href: "#jadwal", label: "Jadwal" },
                  { href: "#tentang", label: "Tentang" },
                  { href: "#kontak", label: "Kontak" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm font-medium text-gray-600 hover:text-blue-600 py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                  {user ? (
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button variant="outline" className="w-full">
                          Masuk
                        </Button>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Daftar
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
              >
                <Shield className="h-4 w-4 text-green-300" />
                <span className="text-sm font-medium text-white/90">
                  Terakreditasi KARS 2026
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                {APP_NAME}
                <span className="block text-blue-200 text-2xl sm:text-3xl lg:text-4xl font-light mt-4">
                  Pelayanan Kesehatan Modern, Cepat, Aman, dan Terpercaya
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-blue-100/80 max-w-xl leading-relaxed"
              >
                Didukung dokter spesialis terbaik serta sistem digital terpadu
                untuk memberikan pelayanan kesehatan optimal bagi Anda dan
                keluarga.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/dashboard/booking">
                  <Button
                    size="xl"
                    className="bg-white text-blue-700 hover:bg-blue-50 shadow-2xl shadow-blue-900/30 group"
                  >
                    Buat Janji
                    <Calendar className="h-5 w-5 ml-2 group-hover:rotate-12 transition-transform" />
                  </Button>
                </Link>
                <Link href="#dokter">
                  <Button
                    size="xl"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    Lihat Dokter
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-8 pt-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center"
                    >
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">+</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-blue-100/70">
                    Dipercaya 50.000+ pasien
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <div className="w-full aspect-square max-w-lg mx-auto bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <Activity className="h-8 w-8 text-green-300 mb-2" />
                        <p className="text-white text-sm font-medium">
                          Monitoring
                        </p>
                        <p className="text-blue-200 text-xs">Real-time</p>
                      </div>
                      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <Stethoscope className="h-8 w-8 text-blue-300 mb-2" />
                        <p className="text-white text-sm font-medium">
                          Spesialis
                        </p>
                        <p className="text-blue-200 text-xs">Terbaik</p>
                      </div>
                    </div>
                    <div className="space-y-4 mt-8">
                      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <HeartPulse className="h-8 w-8 text-red-300 mb-2" />
                        <p className="text-white text-sm font-medium">
                          UGD 24 Jam
                        </p>
                        <p className="text-blue-200 text-xs">Siaga</p>
                      </div>
                      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <Scan className="h-8 w-8 text-purple-300 mb-2" />
                        <p className="text-white text-sm font-medium">
                          Radiologi
                        </p>
                        <p className="text-blue-200 text-xs">Modern</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">98%</p>
                      <p className="text-xs text-gray-500">Kepuasan</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">150+</p>
                      <p className="text-xs text-gray-500">Dokter</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative -mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LAYANAN SECTION ===== */}
      <section id="layanan" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-sm font-semibold text-blue-600 uppercase tracking-wider"
            >
              Layanan Kami
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
            >
              Pelayanan Kesehatan Lengkap
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 mt-4 max-w-2xl mx-auto"
            >
              Kami menyediakan berbagai layanan kesehatan dengan standar
              internasional untuk memenuhi kebutuhan Anda
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {SERVICES.map((service, index) => {
              const Icon = iconMap[service.icon] || Stethoscope;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300"
                >
                  <div className="h-14 w-14 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== DOKTER SECTION ===== */}
      <section id="dokter" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-sm font-semibold text-blue-600 uppercase tracking-wider"
            >
              Dokter Kami
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
            >
              Dokter Spesialis Terbaik
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 mt-4 max-w-2xl mx-auto"
            >
              Ditangani oleh dokter-dokter spesialis berpengalaman di bidangnya
              masing-masing
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <User className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-blue-600 font-medium mt-1">
                    {doctor.spesialis}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {doctor.rating}
                    </span>
                    <span>{doctor.pasien} pasien</span>
                  </div>
                  <Link href="/dashboard/booking">
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      Lihat Jadwal
                      <Calendar className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-sm font-semibold text-blue-200 uppercase tracking-wider"
            >
              Testimoni
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mt-2"
            >
              Apa Kata Pasien Kami
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
              >
                <Quote className="h-12 w-12 text-blue-300/50 mb-6" />
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                  "{testimonials[testimonialIndex].content}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">
                      {testimonials[testimonialIndex].name}
                    </p>
                    <p className="text-sm text-blue-200">
                      {testimonials[testimonialIndex].role}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({
                      length: testimonials[testimonialIndex].rating,
                    }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === testimonialIndex
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Siap untuk Mendapatkan Pelayanan Kesehatan Terbaik?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 mt-4 max-w-2xl mx-auto"
            >
              Jadwalkan konsultasi dengan dokter spesialis kami sekarang juga.
              Proses cepat dan mudah melalui sistem online.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <Link href="/dashboard/booking">
                <Button
                  size="xl"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                >
                  Buat Janji Sekarang
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="tel:119">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  UGD 119
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="kontak" className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <HeartPulse className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">
                  RS Setiabudi
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Rumah Sakit terpercaya dengan pelayanan kesehatan modern,
                didukung tenaga medis profesional dan sistem digital terpadu.
              </p>
              <div className="flex gap-4 mt-6">
                <a
                  href="#"
                  className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Video className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Layanan</h3>
              <ul className="space-y-3">
                {SERVICES.slice(0, 6).map((service, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Jam Operasional</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-gray-300">Senin - Jumat</p>
                    <p className="text-gray-500">
                      {CONTACT_INFO.hours.weekdays}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-gray-300">Sabtu - Minggu</p>
                    <p className="text-gray-500">
                      {CONTACT_INFO.hours.weekend}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Ambulance className="h-4 w-4 text-red-400" />
                  <div>
                    <p className="text-gray-300">UGD</p>
                    <p className="text-gray-500">
                      {CONTACT_INFO.hours.emergency}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Kontak</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                  <p className="text-gray-400">{CONTACT_INFO.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <p className="text-gray-400">{CONTACT_INFO.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <p className="text-gray-400">{CONTACT_INFO.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Ambulance className="h-4 w-4 text-red-400" />
                  <div>
                    <p className="text-gray-300">UGD</p>
                    <p className="text-gray-500">
                      {CONTACT_INFO.hours.emergency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Rumah Sakit Setiabudi. All
              rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
