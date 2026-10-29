import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface FacilityArchiveDiagonalGalleryProps {
  openQuoteModal: (source: string) => void;
}

export const FacilityArchiveDiagonalGallery: React.FC<FacilityArchiveDiagonalGalleryProps> = ({
  openQuoteModal,
}) => {
  const secRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>(".it.card");
    if (target) {
      const img = target.querySelector<HTMLImageElement>("img");
      if (img && img.src) {
        setSelectedImage({ src: img.src, alt: img.alt || "Facility Archive Detail" });
      }
    }
  };

  useEffect(() => {
    const sec = secRef.current;
    const grid = gridRef.current;
    if (!sec || !grid) return;

    const items = Array.from(grid.querySelectorAll<HTMLElement>(".it"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let override: number | null = null;
    let raf = 0;

    const ease = (t: number) => 1 - Math.pow(1 - t, 2.5);
    const clamp = (v: number) => Math.min(1, Math.max(0, v));

    function progress() {
      if (override !== null) return override;
      const r = sec!.getBoundingClientRect();
      const vh = window.innerHeight;
      // Balanced scroll progress window (vh * 2.1) for an engaging, slightly faster pace
      return clamp((vh - r.top) / (vh * 2.1));
    }

    function render() {
      raf = 0;
      const p = progress();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const g = grid!.getBoundingClientRect();

      items.forEach((el) => {
        if (reduce) {
          el.style.transform = "";
          el.style.opacity = "1";
          return;
        }
        const d = parseFloat(el.style.getPropertyValue("--d")) || 0;
        // Balanced transition window (0.55)
        const t = ease(clamp((p - d * 0.45) / 0.55));
        const left = g.left + el.offsetLeft;
        const top = g.top + el.offsetTop;
        // Controlled off-screen travel offset (0.25vw/vh)
        const dx = (vw - left + vw * 0.25) * (1 - t);
        const dy = (vh - top + vh * 0.25) * (1 - t);
        el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
        el.style.opacity = "1";
      });
    }

    function req() {
      if (!raf) raf = requestAnimationFrame(render);
    }

    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    render();

    return () => {
      window.removeEventListener("scroll", req);
      window.removeEventListener("resize", req);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .facility-archive-sec {
          --bg: #ffffff;
          --ink: #0f1222;
          --mute: #4b5878;
          --btn: #0f1222;
          --btn-ink: #ffffff;
          --line: #e6e8ee;
          width: 100%;
          border-top: 1px solid var(--line);
          padding: 0;
          overflow: visible;
          position: relative;
        }
        @media (prefers-color-scheme: dark) {
          .facility-archive-sec:not([data-theme="light"]) {
            --bg: #0d0f18;
            --ink: #f2f4fa;
            --mute: #98a3c0;
            --btn: #f2f4fa;
            --btn-ink: #0d0f18;
            --line: #232739;
          }
        }
        .facility-archive-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 1.0230;
          container-type: inline-size;
        }
        .facility-archive-stage .it {
          position: absolute;
          will-change: transform, opacity;
        }
        .facility-archive-stage .card {
          overflow: hidden;
          border-radius: 4px;
          background: #f1f5f9;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.08);
          transition: filter 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
          cursor: pointer;
        }
        .facility-archive-stage .card:hover {
          box-shadow: 0 16px 36px -4px rgba(15, 23, 42, 0.2);
          filter: brightness(1.05);
          transform: scale(1.025);
          z-index: 5;
        }
        .facility-archive-stage .card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .facility-archive-stage .facility-archive-header {
          position: absolute;
          z-index: 10;
          font-family: Inter, system-ui, -apple-system, sans-serif;
          transform: none !important;
          opacity: 1 !important;
          padding-top: 0.4cqw;
        }
        .facility-archive-stage .facility-archive-header .eyebrow {
          font-size: 1.05cqw;
          color: #64748b;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .facility-archive-stage .facility-archive-header h2 {
          margin: 0.7cqw 0 0;
          font-size: 2.85cqw;
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #0f1222;
          font-weight: 800;
        }
        .facility-archive-stage .facility-archive-header h2 span {
          display: block;
          font-weight: 400;
          color: #64748b;
          letter-spacing: -0.02em;
        }
        .facility-archive-stage .facility-archive-header p {
          font-size: 1.08cqw;
          line-height: 1.5;
          margin: 1.1cqw 0 1.3cqw 0;
          color: #475569;
          font-weight: 400;
          max-width: 100%;
        }
        .facility-archive-stage .facility-archive-header .btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #0f1222;
          color: #ffffff;
          font-size: 0.95cqw;
          padding: 0.7cqw 1.35cqw;
          border-radius: 99px;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(15, 18, 34, 0.16);
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }
        .facility-archive-stage .facility-archive-header .btn:hover {
          background: #000000;
          transform: translateY(-1px) scale(1.02);
          box-shadow: 0 6px 20px rgba(15, 18, 34, 0.24);
        }
        @media (prefers-color-scheme: dark) {
          .facility-archive-sec:not([data-theme="light"]) .facility-archive-header h2 {
            color: #f2f4fa;
          }
          .facility-archive-sec:not([data-theme="light"]) .facility-archive-header h2 span {
            color: #98a3c0;
          }
          .facility-archive-sec:not([data-theme="light"]) .facility-archive-header .eyebrow {
            color: #98a3c0;
          }
          .facility-archive-sec:not([data-theme="light"]) .facility-archive-header p {
            color: #cbd5e1;
          }
          .facility-archive-sec:not([data-theme="light"]) .facility-archive-header .btn {
            background: #f2f4fa;
            color: #0d0f18;
          }
        }
        .facility-archive-stage .txt {
          font-size: .82cqw;
          color: var(--mute);
          font-family: Inter, system-ui, -apple-system, sans-serif;
        }
        .facility-archive-stage .eyebrow {
          font-size: .9cqw;
          color: var(--mute);
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .facility-archive-stage h2 {
          margin: 1.1cqw 0 0;
          font-size: 2.3cqw;
          line-height: 1.05;
          letter-spacing: -.02em;
          color: var(--ink);
          font-weight: 700;
        }
        .facility-archive-stage h2 span {
          display: block;
          font-weight: 400;
          color: var(--mute);
        }
        .facility-archive-stage .txt p {
          font-size: .95cqw;
          line-height: 1.6;
          margin: 1.3cqw 0;
          color: #475569;
        }
        .facility-archive-stage .btn {
          display: inline-block;
          background: var(--btn);
          color: var(--btn-ink);
          font-size: .8cqw;
          padding: .8cqw 1.3cqw;
          border-radius: 99px;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .facility-archive-stage .btn:hover {
          opacity: 0.92;
          transform: scale(1.02);
        }
        .facility-archive-stage ul.list {
          list-style: none;
          margin: 0;
          padding: 0;
          line-height: 2.4;
        }
        .facility-archive-stage ul.list li {
          color: var(--mute);
          font-weight: 500;
        }
        .facility-archive-stage ul.list li::before {
          content: "↗";
          margin-right: .7cqw;
          font-size: .7cqw;
          color: var(--ink);
          font-weight: 600;
        }
        .facility-archive-stage .cta {
          font-size: .75cqw;
          font-weight: 600;
          color: var(--ink);
          margin-top: .6cqw;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .facility-archive-stage .cta:hover {
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .facility-archive-stage .facility-archive-header {
            width: 28% !important;
          }
          .facility-archive-stage .facility-archive-header .eyebrow { font-size: 8.5px; }
          .facility-archive-stage .facility-archive-header h2 { font-size: 19px; }
          .facility-archive-stage .facility-archive-header p { font-size: 8.5px; line-height: 1.4; margin: 6px 0 8px 0; }
          .facility-archive-stage .facility-archive-header .btn { font-size: 8px; padding: 5px 10px; }
          .facility-archive-stage .txt { font-size: 7.5px; }
          .facility-archive-stage .eyebrow { font-size: 8px; }
          .facility-archive-stage h2 { font-size: 16px; }
          .facility-archive-stage .txt p { font-size: 7.5px; }
          .facility-archive-stage .btn { font-size: 7.5px; padding: 4px 9px; }
          .facility-archive-stage .cta { font-size: 7.5px; }
        }
      `}</style>

      <section ref={secRef} id="gallery" className="facility-archive-sec my-12 sm:my-16">
        <div ref={gridRef} onClick={handleGridClick} className="facility-archive-stage" id="grid">
          {/* ITEM 1: Title & Lead Text (Static, Moved to Border of Section, Safe Width Avoiding Any Card) */}
          <div
            className="facility-archive-header"
            style={{
              left: "0%",
              top: "0%",
              width: "19.5%",
            }}
          >
            <div className="eyebrow">Section 05 — Facility Archive</div>
            <h2>
              Beyond Limits.
              <span>Pure Precision.</span>
            </h2>
            <p>
              Vibrant factory snapshots capturing micron machining, robotic welding, and high-speed laser profiling in full color.
            </p>
            <button
              onClick={() => openQuoteModal("Section 05 — Facility Archive Stories")}
              className="btn"
              type="button"
            >
              See the Stories ↗
            </button>
          </div>

          {/* ITEM 2: Card 1 */}
          <div
            className="it card"
            style={{
              left: "21.210%",
              top: "14.850%",
              width: "18.468%",
              height: "25.162%",
              // @ts-ignore
              "--d": 0.028,
            }}
          >
            <img
              alt="Heavy Structural Gantry Milling"
              src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 3: Card 2 */}
          <div
            className="it card"
            style={{
              left: "1.371%",
              top: "41.250%",
              width: "18.387%",
              height: "14.025%",
              // @ts-ignore
              "--d": 0.056,
            }}
          >
            <img
              alt="5-Axis Aerospace Spindle Milling"
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 4: Card 3 */}
          <div
            className="it card"
            style={{
              left: "41.129%",
              top: "10.065%",
              width: "18.387%",
              height: "18.810%",
              // @ts-ignore
              "--d": 0.084,
            }}
          >
            <img
              alt="Precision CNC Lathe Turning"
              src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 5: Card 4 */}
          <div
            className="it card"
            style={{
              left: "1.371%",
              top: "56.842%",
              width: "18.387%",
              height: "25.080%",
              // @ts-ignore
              "--d": 0.112,
            }}
          >
            <img
              alt="High-Power Fiber Laser Cutting"
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 6: Card 5 */}
          <div
            className="it card"
            style={{
              left: "21.210%",
              top: "41.250%",
              width: "18.468%",
              height: "14.025%",
              // @ts-ignore
              "--d": 0.14,
            }}
          >
            <img
              alt="Continuous 5-Axis Impeller"
              src="/gear_flower_bloom.jpg"
              loading="lazy"
            />
          </div>

          {/* ITEM 7: Text List 1 */}
          <div
            className="it txt"
            style={{
              left: "60.887%",
              top: "5.445%",
              width: "18.548%",
              // @ts-ignore
              "--d": 0.168,
            }}
          >
            <ul className="list">
              <li>Silent precision.</li>
              <li>Honest tolerances.</li>
              <li>Pure metallurgy.</li>
              <li>Zero-defect depth.</li>
            </ul>
          </div>

          {/* ITEM 8: Card 6 */}
          <div
            className="it card"
            style={{
              left: "41.129%",
              top: "30.195%",
              width: "18.387%",
              height: "25.080%",
              // @ts-ignore
              "--d": 0.196,
            }}
          >
            <img
              alt="Zeiss Bridge CMM Probe"
              src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 9: Text List 2 */}
          <div
            className="it txt"
            style={{
              left: "21.452%",
              top: "57.337%",
              width: "17.742%",
              // @ts-ignore
              "--d": 0.224,
            }}
          >
            <ul className="list">
              <li>Silent precision.</li>
              <li>Honest tolerances.</li>
              <li>Pure metallurgy.</li>
              <li>Zero-defect depth.</li>
            </ul>
          </div>

          {/* ITEM 10: Card 7 */}
          <div
            className="it card"
            style={{
              left: "80.887%",
              top: "2.557%",
              width: "18.387%",
              height: "14.107%",
              // @ts-ignore
              "--d": 0.252,
            }}
          >
            <img
              alt="Hydraulic Press Brake Forming"
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 11: Card 8 */}
          <div
            className="it card"
            style={{
              left: "60.968%",
              top: "30.195%",
              width: "18.468%",
              height: "25.080%",
              // @ts-ignore
              "--d": 0.28,
            }}
          >
            <img
              alt="Automated TIG/MIG Cell"
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 12: Card 9 */}
          <div
            className="it card"
            style={{
              left: "41.129%",
              top: "56.842%",
              width: "18.387%",
              height: "14.107%",
              // @ts-ignore
              "--d": 0.308,
            }}
          >
            <img
              alt="Turnkey Assembly Flow"
              src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 13: Card 10 */}
          <div
            className="it card"
            style={{
              left: "80.887%",
              top: "17.902%",
              width: "18.387%",
              height: "28.297%",
              // @ts-ignore
              "--d": 0.336,
            }}
          >
            <img
              alt="Sub-assembly Quality Inspection"
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 14: Card 11 */}
          <div
            className="it card"
            style={{
              left: "41.129%",
              top: "72.187%",
              width: "18.387%",
              height: "25.245%",
              // @ts-ignore
              "--d": 0.364,
            }}
          >
            <img
              alt="Structural Frame Prep"
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 15: Card 12 */}
          <div
            className="it card"
            style={{
              left: "60.968%",
              top: "56.842%",
              width: "18.468%",
              height: "28.380%",
              // @ts-ignore
              "--d": 0.392,
            }}
          >
            <img
              alt="Export Ready Packaging & Crating"
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 16: Text List 3 */}
          <div
            className="it txt"
            style={{
              left: "82.177%",
              top: "48.014%",
              width: "17.097%",
              // @ts-ignore
              "--d": 0.42,
            }}
          >
            <ul className="list">
              <li>Sub-micron concentricity.</li>
              <li>Multi-axis live tooling.</li>
              <li>Hardened alloy turning.</li>
              <li>Certified shaft runout.</li>
            </ul>
          </div>

          {/* ITEM 17: Card 13 */}
          <div
            className="it card"
            style={{
              left: "80.887%",
              top: "56.842%",
              width: "18.387%",
              height: "18.892%",
              // @ts-ignore
              "--d": 0.448,
            }}
          >
            <img
              alt="Technician at Precision CNC Control"
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 18: Card 14 */}
          <div
            className="it card"
            style={{
              left: "60.968%",
              top: "86.459%",
              width: "18.468%",
              height: "10.972%",
              // @ts-ignore
              "--d": 0.476,
            }}
          >
            <img
              alt="Ultra-Precision Cleanroom Calibration"
              src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800"
              loading="lazy"
            />
          </div>

          {/* ITEM 19: Engineering Desk & CTA */}
          <div
            className="it txt"
            style={{
              left: "80.887%",
              top: "88.274%",
              width: "18.387%",
              // @ts-ignore
              "--d": 0.504,
            }}
          >
            <div className="eyebrow">Engineering Desk</div>
            <ul className="list">
              <li>Rapid tooling review.</li>
              <li>Design for manufacturability.</li>
              <li>Zero-defect SLA dispatch.</li>
            </ul>
            <div
              className="cta"
              onClick={() => openQuoteModal("Direct Engineering Consultation & Rapid RFQ")}
            >
              Start Production ↗
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal: Opens and Displays Image Big */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center cursor-default"
            >
              {/* Close Button Top Right */}
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 sm:-top-14 right-0 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors backdrop-blur-md cursor-pointer border border-white/20 shadow-lg"
                title="Close image"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Big Image Display Container */}
              <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-black shadow-2xl flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-h-[78vh] w-auto max-w-full object-contain block select-none"
                />
              </div>

              {/* Caption / Title */}
              <div className="mt-3 flex items-center justify-between w-full px-2 text-white/90">
                <span className="text-sm sm:text-base font-medium tracking-tight">
                  {selectedImage.alt}
                </span>
                <span className="text-xs font-normal text-white/60 hidden sm:inline">
                  Click outside or press Esc to close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
