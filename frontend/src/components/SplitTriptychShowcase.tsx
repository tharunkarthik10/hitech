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
      id="facility-feature"
      className={`w-full pt-4 pb-8 sm:pb-12 ${className}`}
    >
      {/* 3-Column Split Grid with 90% reduced gap (2px - 3px hairline slit) */}
      <div className="rounded-2xl sm:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-lg bg-[#f8fafc]">
        <div className="grid grid-cols-3 gap-[2px] sm:gap-[3px] bg-[#f8fafc]">
          {/* Slice 1 (Left) */}
          <div className="overflow-hidden bg-black aspect-[341/567] relative">
            <img
              src={slice1}
              alt="Facility Welding Cell - Left Section"
              className="w-full h-full object-cover block"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          </div>

          {/* Slice 2 (Center - Welding Arc & Helmet) */}
          <div className="overflow-hidden bg-black aspect-[341/567] relative">
            <img
              src={slice2}
              alt="Facility Welding Cell - Center Section"
              className="w-full h-full object-cover block"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          </div>

          {/* Slice 3 (Right) */}
          <div className="overflow-hidden bg-black aspect-[342/567] relative">
            <img
              src={slice3}
              alt="Facility Welding Cell - Right Section"
              className="w-full h-full object-cover block"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
