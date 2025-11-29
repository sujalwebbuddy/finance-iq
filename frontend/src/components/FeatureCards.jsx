import React from "react";
import PadlockIcon from "./icons/PadlockIcon";
import ShieldIcon from "./icons/ShieldIcon";
import TargetIcon from "./icons/TargetIcon";

const FeatureCards = () => {
  const features = [
    {
      icon: (
        <PadlockIcon className="h-8 w-8 text-green-500 dark:text-green-600" />
      ),
      title: "Multilevel security",
      description:
        "Protect your financial data with features like multi-factor authentication and granular employee permissions.",
      iconBg: "bg-white",
      glowColor: "rgba(34, 197, 94, 0.4)",
      borderGlow: "rgba(34, 197, 94, 0.3)",
    },
    {
      icon: (
        <ShieldIcon className="h-8 w-8 text-orange-500  dark:text-orange-600" />
      ),
      title: "Trusted experience",
      description:
        "Apply in minutes and receive account approval within hours. Then access all the cash management essentials in one digital platform.",
      iconBg: "bg-white",
      glowColor: "rgba(249, 115, 22, 0.4)",
      borderGlow: "rgba(249, 115, 22, 0.3)",
    },
    {
      icon: <TargetIcon className="h-8 w-8 text-blue-500 dark:text-blue-600" />,
      title: "Structured outreach",
      description:
        "FinanceIQ offers around the clock support to answer your most pressing questions and propel your business forward.",
      iconBg: "bg-white",
      glowColor: "rgba(59, 130, 246, 0.4)",
      borderGlow: "rgba(59, 130, 246, 0.3)",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            >
              {/* Icon Container with Glow Effect */}
              <div className="relative mb-6 flex justify-center">
                {/* Glow Effect - Abstract network pattern */}
                <div
                  className="absolute -inset-4 rounded-xl opacity-40 blur-2xl"
                  style={{
                    background: `radial-gradient(circle, ${feature.glowColor} 0%, transparent 60%)`,
                  }}
                />

                {/* Additional glow layers for abstract lines effect */}
                <div
                  className="absolute -inset-6 rounded-xl opacity-25 blur-xl"
                  style={{
                    background: `
                      radial-gradient(ellipse at 20% 20%, ${feature.glowColor} 0%, transparent 40%),
                      radial-gradient(ellipse at 80% 80%, ${feature.glowColor} 0%, transparent 40%),
                      radial-gradient(ellipse at 50% 10%, ${feature.glowColor} 0%, transparent 30%)
                    `,
                  }}
                />

                {/* Icon Square Container with Glowing Border */}
                <div
                  className={`relative ${feature.iconBg} w-16 h-16 rounded-xl flex items-center justify-center z-10`}
                  style={{
                    boxShadow: `0 0 0 2px ${feature.borderGlow}, 0 0 20px ${feature.glowColor}, 0 0 40px ${feature.glowColor}`,
                  }}
                >
                  {feature.icon}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-gray-800 w-full">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                {feature.description}
              </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
