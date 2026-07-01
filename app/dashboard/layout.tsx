"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  Building2,
  CalendarCheck,
  ListOrdered,
  CreditCard,
  Pill,
  FileText,
  ClipboardList,
  FlaskConical,
  Scan,
  Bed,
  DoorOpen,
  BarChart3,
  Settings,
  UserCircle,
  LogOut,
  Menu,
  HeartPulse,
  ChevronDown,
  Bell,
  ChevronLeft,
  ChevronRight,
  UserCog,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS } from "@/constants";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
  children?: { label: string; href: string }[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN", "DOKTER", "PASIEN", "APOTEKER", "KASIR", "PERAWAT"],
  },
  {
    label: "Pasien",
    href: "/dashboard/pasien",
    icon: Users,
    roles: ["ADMIN"],
  },
  {
    label: "Dokter",
    href: "/dashboard/dokter",
    icon: Stethoscope,
    roles: ["ADMIN"],
  },
  {
    label: "Poli",
    href: "/dashboard/poli",
    icon: Building2,
    roles: ["ADMIN"],
  },
  {
    label: "Jadwal",
    href: "/dashboard/jadwal",
    icon: Calendar,
    roles: ["ADMIN", "DOKTER"],
  },
  {
    label: "Booking",
    href: "/dashboard/booking",
    icon: CalendarCheck,
    roles: ["ADMIN", "PASIEN"],
  },
  {
    label: "Antrian",
    href: "/dashboard/antrian",
    icon: ListOrdered,
    roles: ["ADMIN", "PERAWAT"],
  },
  {
    label: "Pembayaran",
    href: "/dashboard/pembayaran",
    icon: CreditCard,
    roles: ["ADMIN", "KASIR", "PASIEN"],
  },
  {
    label: "Apotek",
    href: "/dashboard/apotek",
    icon: Pill,
    roles: ["ADMIN", "APOTEKER"],
  },
  {
    label: "Resep",
    href: "/dashboard/resep",
    icon: FileText,
    roles: ["ADMIN", "DOKTER", "APOTEKER", "PASIEN"],
  },
  {
    label: "Rekam Medis",
    href: "/dashboard/rekam-medis",
    icon: ClipboardList,
    roles: ["ADMIN", "DOKTER", "PASIEN"],
  },
  {
    label: "Laboratorium",
    href: "/dashboard/laboratorium",
    icon: FlaskConical,
    roles: ["ADMIN"],
  },
  {
    label: "Radiologi",
    href: "/dashboard/radiologi",
    icon: Scan,
    roles: ["ADMIN"],
  },
  {
    label: "Rawat Inap",
    href: "/dashboard/rawat-inap",
    icon: Bed,
    roles: ["ADMIN"],
  },
  {
    label: "Kamar",
    href: "/dashboard/kamar",
    icon: DoorOpen,
    roles: ["ADMIN"],
  },
  {
    label: "Laporan",
    href: "/dashboard/laporan",
    icon: BarChart3,
    roles: ["ADMIN", "KASIR"],
  },
  {
    label: "User",
    href: "/dashboard/user",
    icon: UserCog,
    roles: ["ADMIN"],
  },
  {
    label: "Pengaturan",
    href: "/dashboard/pengaturan",
    icon: Settings,
    roles: ["ADMIN"],
  },
  {
    label: "Profil",
    href: "/dashboard/profil",
    icon: UserCircle,
    roles: ["PASIEN"],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const userRole = user?.role || "";
  const roleLabel = ROLE_LABELS[userRole] || userRole;

  const filteredItems = sidebarItems.filter(
    (item) => !item.roles || item.roles.includes(userRole),
  );

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label],
    );
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        } ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 ${!sidebarOpen && "lg:justify-center lg:w-full"}`}
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0">
                <HeartPulse className="h-4 w-4 text-white" />
              </div>
              {sidebarOpen && (
                <div className="hidden lg:block">
                  <p className="text-sm font-bold text-gray-900 leading-tight">
                    RS Setiabudi
                  </p>
                  <p className="text-[10px] text-blue-600 font-medium">HMS</p>
                </div>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = expandedMenus.includes(item.label);

              return (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (hasChildren) {
                        toggleMenu(item.label);
                      }
                      setMobileSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      active
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    } ${!sidebarOpen && "lg:justify-center lg:px-2"}`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="text-sm whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                    {hasChildren && sidebarOpen && (
                      <ChevronDown
                        className={`h-4 w-4 ml-auto transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                  {hasChildren && isExpanded && sidebarOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileSidebarOpen(false)}
                          className={`block px-3 py-2 text-sm rounded-lg transition-all ${
                            pathname === child.href
                              ? "bg-blue-50 text-blue-700 font-medium"
                              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                  {getInitials(user?.name || "")}
                </AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name}
                  </p>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 h-5"
                  >
                    {roleLabel}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-16"
        }`}
      >
        {/* Top navbar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium capitalize">
                  {pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              <button
                onClick={() => signOut()}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
