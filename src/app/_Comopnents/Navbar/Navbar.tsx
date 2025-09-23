'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import logo from '@images/freshcart-logo.svg';
import Loader from "../Loader/Loader";
import { CartContext } from "@/app/(cart)/cart/CartCount";
import { WashlistContext } from "@/app/(washlist)/washlist/WashlistContext";
import { getUserCart } from "@/app/_services/cart.service";
import { getMyUserWashlist } from "@/app/_services/washlist.service";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export default function Navbar() {
  const { status } = useSession();
  const { cartCount } = useContext(CartContext);
  const { washlistCount, updateWashlistCount } = useContext(WashlistContext);
  const [initialCartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
      getUserCart().then(res => setCartCount(res.numOfCartItems));
      getMyUserWashlist().then(res => updateWashlistCount(res.count));
    }
  }, [status, updateWashlistCount]);

  const handleLogout = () => {
    signOut({ redirect: false, callbackUrl: '/login' });
    setMobileMenuOpen(false);
    router.push('/login');
  };

  const linkClass = (href: string) =>
    pathname === href
      ? "text-green-600 dark:text-white"
      : "text-gray-700 dark:text-gray-200";

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 fixed top-0 right-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Fresh Cart" className="h-6 w-auto" />
        </Link>

        {/* Desktop Links */}
        {status === "authenticated" && (
          <ul className="hidden md:flex space-x-6 rtl:space-x-reverse font-medium">
            <li><Link href="/" className={linkClass("/")}>Home</Link></li>
            <li><Link href="/brand" className={linkClass("/brand")}>Brand</Link></li>
            <li><Link href="/category" className={linkClass("/category")}>Category</Link></li>
          </ul>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse relative">
          {status === "loading" && <Loader />}

          {/* Auth Links for Desktop */}
          {status === "unauthenticated" && (
            <div className="hidden md:flex space-x-4 rtl:space-x-reverse">
              <Link href="/register" className={linkClass("/register")}>Register</Link>
              <Link href="/login" className={linkClass("/login")}>Login</Link>
            </div>
          )}

          {status === "authenticated" && (
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              <Link href="/washlist" className={`relative ${linkClass("/washlist")}`}>
                ❤️
                {washlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                    {washlistCount}
                  </span>
                )}
              </Link>
              <Link href="/cart" className={`relative ${linkClass("/cart")}`}>
                🛒
                {(cartCount || initialCartCount) > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                    {cartCount > 0 ? cartCount : initialCartCount}
                  </span>
                )}
              </Link>
              <span
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Logout
              </span>
            </div>
          )}

          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40">
          <ul className="flex flex-col p-4 space-y-2 font-medium text-gray-700 dark:text-gray-200">
            {status === "authenticated" && (
              <>
                <li><Link href="/" onClick={() => setMobileMenuOpen(false)} className={linkClass("/")}>Home</Link></li>
                <li><Link href="/brand" onClick={() => setMobileMenuOpen(false)} className={linkClass("/brand")}>Brand</Link></li>
                <li><Link href="/category" onClick={() => setMobileMenuOpen(false)} className={linkClass("/category")}>Category</Link></li>
                <li>
                  <span
                    onClick={handleLogout}
                    className="block py-2 px-2 text-red-600 cursor-pointer"
                  >
                    Logout
                  </span>
                </li>
                <li>
                  <Link href="/washlist" onClick={() => setMobileMenuOpen(false)} className={`relative ${linkClass("/washlist")}`}>
                    ❤️ {washlistCount > 0 && <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">{washlistCount}</span>}
                  </Link>
                </li>
                <li>
                  <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className={`relative ${linkClass("/cart")}`}>
                    🛒 {(cartCount || initialCartCount) > 0 && <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">{cartCount > 0 ? cartCount : initialCartCount}</span>}
                  </Link>
                </li>
              </>
            )}
            {status === "unauthenticated" && (
              <>
                <li><Link href="/register" onClick={() => setMobileMenuOpen(false)} className={linkClass("/register")}>Register</Link></li>
                <li><Link href="/login" onClick={() => setMobileMenuOpen(false)} className={linkClass("/login")}>Login</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
