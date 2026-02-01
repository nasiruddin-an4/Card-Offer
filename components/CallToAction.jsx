import React from "react";
import Link from "next/link";
import { Phone, Mail, MessageCircle, Headphones } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="bg-slate-50 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-[#020617] px-6 py-16 shadow-2xl sm:px-16 md:pt-20 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 items-center">
          {/* Background Gradients */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-24 lg:text-left relative z-10">
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-900/30 border border-blue-700/30 px-3 py-1 text-sm font-medium text-blue-200">
                <Headphones size={14} className="text-cyan-400" />
                <span>24/7 Customer Support</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-sans">
              Need assistance with our offers?
              <br />
              We're here to help.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              Our dedicated support team is ready to assist you with any
              inquiries regarding promotions, card eligibility, or partnership
              opportunities.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 lg:justify-start">
              <a
                href="tel:+8801234567890"
                className="w-full sm:w-auto rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-3 group"
              >
                <div className="p-1 bg-gray-100 rounded-full group-hover:bg-white transition-colors">
                  <Phone size={16} className="text-blue-600" />
                </div>
                Call Support
              </a>
              <a
                href="mailto:support@betopiagroup.com"
                className="w-full sm:w-auto rounded-full bg-white/10 border border-white/10 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all flex items-center justify-center gap-3"
              >
                <Mail size={16} />
                Email Us
              </a>
            </div>
          </div>

          {/* Right Side Visual */}
          <div className="relative mt-16 h-80 lg:mt-0 w-full lg:w-1/2 hidden lg:flex items-center justify-center">
            {/* Abstract Phone/Support Visual */}
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full opacity-20 blur-2xl animate-pulse" />
              <div className="absolute inset-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                {/* Chat Bubble 1 */}
                <div className="self-end bg-blue-600 p-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                  <p className="text-xs text-white/90">
                    Hi, I need help with the B1G1 offer.
                  </p>
                </div>
                {/* Chat Bubble 2 */}
                <div className="self-start bg-slate-800 p-3 rounded-2xl rounded-tl-sm max-w-[80%] border border-slate-700">
                  <p className="text-xs text-gray-300">
                    Hello! I'd be happy to assist you with that. Are you a
                    cardholder?
                  </p>
                </div>
                {/* Chat Bubble 3 */}
                <div className="self-end bg-blue-600 p-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                  <p className="text-xs text-white/90">
                    Yes, I have a Platinum card.
                  </p>
                </div>
                {/* Status Indicator */}
                <div className="mt-auto flex items-center gap-2 pt-4 border-t border-white/5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                    Support Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
