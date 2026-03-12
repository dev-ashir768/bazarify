"use client";

import { motion, Variants } from "framer-motion";

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HeroSection = () => {
  return (
    <section
      className="relative w-full md:h-[60%] h-[65%] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/jpg/marketplace-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-[#CCE3FE] to-[#E6F1FF] opacity-50" />

      <div
        className="absolute right-0 bottom-0 md:w-[282px] w-[142px] md:h-[300px] h-[150px] bg-no-repeat bg-contain"
        style={{
          backgroundImage: "url('/images/svg/marketplace/bg-element-one.png')",
        }}
      />

      <div
        className="absolute left-0 bottom-0 md:size-[300px] size-[150px] bg-no-repeat bg-contain"
        style={{
          backgroundImage: "url('/images/svg/marketplace/bg-element-two.png')",
        }}
      />

      <div className="relative lg:h-full sm:h-auto">
        <div className="container w-full h-full flex lg:flex-row flex-col justify-center lg:items-center lg:gap-y-0 gap-y-16 lg:pt-[68px] pt-[125px] pb-[78px] lg:pb-0 overflow-hidden">
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="lg:w-[60%] w-full sm:space-y-6 space-y-5 overflow-hidden"
          >
            <div className="text-center">
              <motion.h1
                variants={itemVariant}
                className="text-midnight font-bold xl:text-[55px] lg:text-[50px] xl:leading-[60px] lg:leading-[55px] sm:text-4xl text-3xl leading-[40px] tracking-wide"
              >
                Welcome to the Bazarify Marketplace
              </motion.h1>
            </div>
            <div className="max-w-[690px] text-center mx-auto">
              <motion.p
                variants={itemVariant}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-charcoal font-normal sm:text-base text-[13px] leading-[20px]"
              >
                Your one-stop destination for everything you need. Discover
                thousands of products, unbeatable deals, and a seamless shopping
                experience all in one place.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
