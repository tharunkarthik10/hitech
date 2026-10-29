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
      {/* 3-Column Split Grid with 10% tighter gaps */}
      <div className="grid grid-cols-3 gap-[9px] sm:gap-[14px] lg:gap-[21px] items-stretch">
        {/* Slice 1 (Left) */}
        <div className="rounded-xl sm:rounded-2xl lg:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-md bg-black aspect-[341/567] relative">
          <img
            src={slice1}
            alt="Facility Welding Cell - Left Section"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
        </div>

        {/* Slice 2 (Center - Welding Arc & Helmet) */}
        <div className="rounded-xl sm:rounded-2xl lg:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-lg bg-black aspect-[341/567] relative">
          <img
            src={slice2}
            alt="Facility Welding Cell - Center Section"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
        </div>

        {/* Slice 3 (Right) */}
        <div className="rounded-xl sm:rounded-2xl lg:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-md bg-black aspect-[342/567] relative">
          <img
            src={slice3}
            alt="Facility Welding Cell - Right Section"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
        </div>
      </div>
    </section>
  );
}
