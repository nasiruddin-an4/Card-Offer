import React from "react";
import Image from "next/image";
import {
  Facebook,
  Linkedin,
  X,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: <Linkedin size={20} />, href: "#" },
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <X size={20} />, href: "#" },
    { icon: <Youtube size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
  ];

  const middleLinks = [
    "Vision & Purpose",
    "Core Beliefs",
    "Impact & Responsibility",
    "News & Stories",
    "Career",
    "BTRP",
  ];

  return (
    <footer className="bg-[#F3F3F3] text-[#4B5563] py-20 font-sans border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          {/* Left Column: Logo and Socials */}
          <div className="flex flex-col space-y-10">
            <div className="flex items-center">
              <Image
                src="/betopia-logo.svg"
                alt="Betopia Logo"
                width={200}
                height={60}
                className="brightness-0"
              />
            </div>

            <div className="space-y-6">
              <p className="text-xl font-medium text-[#374151]">
                Join Betopia Community
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-[#374151] text-white flex items-center justify-center hover:bg-black transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <p className="text-sm text-[#6B7280]">
                Copyright © 2026 betopia group{" "}
                <a href="#" className="hover:underline ml-1">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          {/* Middle Column: Links with dashed lines */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[280px] space-y-0 mt-2">
              {middleLinks.map((link, index) => (
                <div key={index} className="w-full group">
                  {index === 0 && (
                    <div className="border-t border-dashed border-gray-300 w-full" />
                  )}
                  <a
                    href="#"
                    className="block text-center text-[#4B5563] hover:text-black transition-colors font-medium py-4"
                  >
                    {link}
                  </a>
                  <div className="border-b border-dashed border-gray-300 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Reach Out */}
          <div className="flex flex-col space-y-8">
            <h3 className="text-xl font-bold text-[#1F2937]">Reach Out</h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-[#374151] text-white flex items-center justify-center shrink-0 group-hover:bg-black transition-colors">
                  <Mail size={20} />
                </div>
                <a
                  href="mailto:info@betopiagroup.com"
                  className="text-[15px] font-medium hover:text-black transition-colors"
                >
                  info@betopiagroup.com
                </a>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Lotus+Kamal+Tower-2,+Gulshan+Ave,+Dhaka+1212"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-[#374151] text-white flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-black transition-colors">
                  <MapPin size={20} />
                </div>
                <p className="text-[15px] font-medium leading-relaxed max-w-[250px] group-hover:text-black transition-colors">
                  Level 6, 59 & 61, South Avenue, Lotus Kamal Tower-2, Gulshan
                  Ave, Dhaka 1212.
                </p>
              </a>

              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-full bg-[#374151] text-white flex items-center justify-center shrink-0 group-hover:bg-black transition-colors">
                  <Phone size={20} />
                </div>
                <a
                  href="tel:+8801332840800"
                  className="text-[15px] font-medium hover:text-black transition-colors"
                >
                  +8801332840800
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
