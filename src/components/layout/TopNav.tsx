"use client";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Dropdown, MenuProps, message } from "antd";
import logoImg from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { getImageUrl } from "@/utils/helpers";
import {
  PUBLIC_LINKS as publicLinks,
  AUTH_LINKS as authLinks,
  DROPDOWN_LINKS as dropdownLinks,
} from "@/utils/constants";
import { useProfile } from "@/hooks/useProfile";
import { clearToken } from "@/lib/auth";
import { NotificationBell } from "./NotificationBell";

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
 const user = useProfile();
  const isAuthenticated = !!user?._id;
  const userName = user?.name || "User";
  const avatar = getImageUrl(user?.profileImage) || "/default.png";
  const mainLinks = isAuthenticated ? authLinks : publicLinks;

  const [lang, setLang] = useState<string>("en");


  useEffect(() => {
    const storedLanguage = Cookies.get("currentLanguage");

    if (storedLanguage) {
      setLang(storedLanguage);
    } else {
      Cookies.set("currentLanguage", "fr");
      document.cookie = `googtrans=/en/fr; path=/`;
      document.cookie = `googtrans=/en/fr; domain=${window.location.hostname}; path=/`;
      setLang("fr");

      window.location.hash = "#googtrans/en/fr";
    }
  }, []);

  const handleLangChange = (language: string) => {
    Cookies.set("currentLanguage", language);
    document.cookie = `googtrans=/en/${language}; path=/`;
    document.cookie = `googtrans=/en/${language}; domain=${window.location.hostname}; path=/`;

    setLang(language);

    window.location.hash = `#googtrans/en/${language}`;

    setTimeout(() => {
      window.location.reload();
    }, 100);

    message.success(
      language === "en"
        ? "Language updated to English"
        : "Langue mise à jour en Français",
    );
  };

  const langMenuItems: MenuProps["items"] = [
    {
      key: "en",
      label: (
        <span className="text-white/80 hover:text-white font-medium flex items-center gap-2">
          🇺🇸 English
        </span>
      ),
      onClick: () => handleLangChange("en"),
    },
    {
      key: "fr",
      label: (
        <span className="text-white/80 hover:text-white font-medium flex items-center gap-2">
          🇫🇷 Français
        </span>
      ),
      onClick: () => handleLangChange("fr"),
    },
  ];

  const moreMenuItems: MenuProps["items"] = dropdownLinks.map((l) => ({
    key: l.label,
    label: (
      <Link
        href={l.href}
        className="text-white/80 hover:text-white font-medium"
      >
        {l.label}
      </Link>
    ),
  }));

  const userMenuItems: MenuProps["items"] = [
    {
      key: "edit",
      label: (
        <Link
          href="/profile?tab=profile"
          className="text-white/80 hover:text-white font-medium"
        >
          Edit Profile
        </Link>
      ),
    },
    {
      key: "password",
      label: (
        <Link
          href="/profile?tab=password"
          className="text-white/80 hover:text-white font-medium"
        >
          Change Password
        </Link>
      ),
    },
    {
      key: "support",
      label: (
        <Link
          href="/profile?tab=support"
          className="text-white/80 hover:text-white font-medium"
        >
          Help & Support
        </Link>
      ),
    },
    {
      type: "divider",
      className: "bg-white/10",
    },
    {
      key: "logout",
      danger: true,
      label: (
        <div
          onClick={() => {
            clearToken();
            router.push("/login");
          }}
          className="font-bold text-danger"
        >
          Sign Out
        </div>
      ),
    },
  ];

  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    [
      "px-3.5 py-2 rounded-[10px] text-sm font-medium no-underline transition-all duration-200 inline-flex items-center justify-center h-[38px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0514]",
      isActive(href) ? "bg-primary/10 font-semibold" : "hover:bg-white/5",
    ].join(" ");

  const linkStyle = (href: string) =>
    isActive(href)
      ? { color: "var(--color-primary)" }
      : { color: "rgba(255,255,255,0.7)" };

  return (
    <header className="hidden md:block sticky top-0 z-50 bg-[#0a0514]/85 backdrop-blur-xl border-b border-white/6">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between relative">
        <Link
          href="/"
          className="flex items-center gap-2.5 no-underline z-10 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0514] rounded-lg"
        >
          <img
            src={logoImg.src}
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-white font-bold text-xl font-display tracking-tight">
            Gift Box
          </span>
        </Link>

        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 z-10">
          {mainLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={linkClass(item.href)}
              style={linkStyle(item.href)}
            >
              {item.label}
            </Link>
          ))}

          {/* More Dropdown */}
          <Dropdown
            menu={{ items: moreMenuItems }}
            trigger={["hover", "click"]}
            placement="bottomLeft"
            classNames={{ root: "custom-dropdown-dark" }}
          >
            <button className="px-3.5 py-2 rounded-[10px] text-white/70 text-sm font-medium transition-all duration-200 hover:text-white hover:bg-white/5 flex items-center justify-center gap-1.5 cursor-pointer bg-transparent border-none outline-none h-9.5 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0514]">
              More{" "}
              <DownOutlined className="text-[10px] text-white/40 group-hover:text-primary transition-colors duration-200" />
            </button>
          </Dropdown>
        </nav>

        <div className="z-10 flex items-center gap-4 md:gap-6">
          {/* Language Switcher */}
          <Dropdown
            menu={{ items: langMenuItems }}
            trigger={["click"]}
            placement="bottomRight"
            classNames={{ root: "custom-dropdown-dark" }}
          >
            <button
              type="button"
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 cursor-pointer transition-all duration-200 outline-none hover:border-primary/30 h-10 select-none font-semibold text-xs"
            >
              <span className="text-sm leading-none select-none">
                {lang === "en" ? "🇺🇸" : "🇫🇷"}
              </span>
              <span className="text-white/70 uppercase">{lang}</span>
              <DownOutlined className="text-[9px] text-white/30" />
            </button>
          </Dropdown>

          {user?._id ? (
            <>
              {/* Notifications Dropdown */}
              <NotificationBell />

              {/* User Dropdown */}
              <Dropdown
                menu={{ items: userMenuItems }}
                trigger={["click"]}
                placement="bottomRight"
                classNames={{ root: "custom-dropdown-dark" }}
              >
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-all group outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0514] rounded-xl p-0.5">
                  <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-[#ff8c00] p-0.5 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={avatar}
                      alt={userName}
                      className="w-full h-full rounded-full object-cover border-2 border-[#0a0514]"
                    />
                  </div>
                </div>
              </Dropdown>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Button type="primary" onClick={() => router.push("/login")} style={{paddingInline:"10px"}}>
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
