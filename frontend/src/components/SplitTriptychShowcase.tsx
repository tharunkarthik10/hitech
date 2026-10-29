interface SplitTriptychShowcaseProps {
  slice1?: string;
  slice2?: string;
  slice3?: string;
  className?: string;
}

export default function SplitTriptychShowcase({
  slice1 = "/production_welder_slice_1.png",
  slice2 = "/production_welder_slice_2.png",
  slice3 = "/production_welder_slice_3.png",
  className = "",
}: SplitTriptychShowcaseProps) {
  return (
    <section
      id="infrastructure"
      className={`w-full pt-4 pb-8 sm:pb-12 ${className}`}
    >
      {/* Section Header: Our Infrastructure */}
      <div className="space-y-4 mb-8 sm:mb-10 max-w-3xl">
        <span className="text-sm font-medium tracking-tight text-[#64748b]">
          ✦ Section 06 — Our Infrastructure
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#121212] leading-[1.12]">
          Our Infrastructure.<br />
          <span className="font-normal text-[#64748b]">Built For Heavy Precision & Serial Scale.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-2xl">
          Multi-bay manufacturing units equipped with robotic welding cells, high-tonnage gantry beds, and serialized digital inspection stations engineered for uninterrupted OEM output.
        </p>
      </div>

      {/* 3-Column Split Grid with 90% reduced gap & 20% decreased height (aspect 1024/454) */}
      <div className="rounded-2xl sm:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-lg bg-[#f8fafc] aspect-[1024/454]">
        <div className="grid grid-cols-3 gap-[2px] sm:gap-[3px] bg-[#f8fafc] h-full">
          {/* Slice 1 (Left) */}
          <div className="overflow-hidden bg-black h-full relative">
            <img
              src={slice1}
              alt="Our Infrastructure - Welding Bay Left Section"
              className="w-full h-full object-cover object-center block"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          </div>

          {/* Slice 2 (Center - Welding Arc & Helmet) */}
          <div className="overflow-hidden bg-black h-full relative">
            <img
              src={slice2}
              alt="Our Infrastructure - Welding Bay Center Section"
              className="w-full h-full object-cover object-center block"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          </div>

          {/* Slice 3 (Right) */}
          <div className="overflow-hidden bg-black h-full relative">
            <img
              src={slice3}
              alt="Our Infrastructure - Welding Bay Right Section"
              className="w-full h-full object-cover object-center block"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
