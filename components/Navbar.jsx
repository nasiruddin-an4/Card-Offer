import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-[#020617] border-b border-gray-800 sticky top-0 z-40 shadow-sm/50">
      <div className="max-w-7xl mx-auto px-4 md:px-2 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/betopia-logo.svg"
              alt="Betopia Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Back Button */}
        <a
          href="https://betopiagroup.com"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/10"
        >
          <ArrowLeft size={16} />
          Back to Main Site
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
