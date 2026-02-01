import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  ArrowRight,
  Globe,
  Building2,
} from "lucide-react";

const footerData = {
  about: {
    title: "Transforming Ideas into Digital Reality.",
    description:
      "Betopia Group bridges the gap between human potential and technological innovation, empowering businesses to build a sustainable future.",
  },
  locations: [
    {
      country: "Bangladesh",
      address:
        "Level 6, 59 & 61, South Avenue, Lotus Kamal Tower-2, Gulshan Ave, Dhaka 1212.",
      icon: <Building2 className="text-cyan-400" size={20} />,
    },
    {
      country: "USA",
      address: "Trump Tower, NY, New York 10022, USA",
      icon: <Globe className="text-blue-400" size={20} />,
    },
    {
      country: "UK",
      address:
        "Level 6, 59 & 61, South Avenue, Lotus Kamal Tower-2, Gulshan Ave, Dhaka 1212.",
      icon: <MapPin className="text-purple-400" size={20} />,
    },
    {
      country: "UAE",
      address:
        "Level 6, 59 & 61, South Avenue, Lotus Kamal Tower-2, Gulshan Ave, Dhaka 1212.",
      icon: <MapPin className="text-orange-400" size={20} />,
    },
    {
      country: "Philippines",
      address:
        "Level 6, 59 & 61, South Avenue, Lotus Kamal Tower-2, Gulshan Ave, Dhaka 1212.",
      icon: <MapPin className="text-emerald-400" size={20} />,
    },
  ],
  links: [
    {
      title: "Company",
      items: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "News & Media", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Services",
      items: [
        { label: "Software Development", href: "#" },
        { label: "AI Solutions", href: "#" },
        { label: "Consultancy", href: "#" },
        { label: "Procurement", href: "#" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ],
  contact: {
    items: [
      { text: "(406) 555-0120", icon: <Phone size={16} /> },
      { text: "hey@betopiagroup.com", icon: <Mail size={16} /> },
    ],
  },
  socials: [
    { icon: <Facebook size={18} />, href: "#" },
    { icon: <Twitter size={18} />, href: "#" },
    { icon: <Linkedin size={18} />, href: "#" },
    { icon: <Instagram size={18} />, href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-white pt-24 pb-10 relative overflow-hidden border-t border-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-900/10 via-[#020617] to-[#020617] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6 font-sans">
              {footerData.about.title.split(" ").slice(0, 3).join(" ")} <br />{" "}
              {footerData.about.title.split(" ").slice(3).join(" ")}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {footerData.about.description}
            </p>
          </div>
          <div className="w-full md:w-auto">
            <p className="text-sm font-semibold text-white mb-4">
              Stay updated with our latest news
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors w-full md:w-80"
              />
              <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-3 rounded-lg transition-colors flex items-center justify-center">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {footerData.locations.map((loc, index) => (
            <LocationCard
              key={index}
              country={loc.country}
              address={loc.address}
              icon={loc.icon}
            />
          ))}
        </div>

        {/* Links & Contact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-slate-800/60 pt-16 mb-16">
          {footerData.links.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold text-base mb-6 text-white uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                {section.items.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="hover:text-cyan-400 transition-colors block py-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-base mb-6 text-white uppercase tracking-wider">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {footerData.contact.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="p-2 bg-slate-800 rounded group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    {item.icon}
                  </div>
                  <span className="mt-1">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800/60">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Betopia Group. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {footerData.socials.map((social, index) => (
              <SocialIcon key={index} icon={social.icon} href={social.href} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const LocationCard = ({ country, address, icon }) => (
  <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 p-5 rounded-xl hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all duration-300 group cursor-default h-full flex flex-col">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-slate-950 rounded-lg group-hover:scale-110 transition-transform shadow-inner border border-slate-800">
        {icon}
      </div>
      <h5 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
        {country}
      </h5>
    </div>
    <p className="text-xs text-slate-400 leading-relaxed font-light grow">
      {address}
    </p>
  </div>
);

const SocialIcon = ({ icon, href }) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;
