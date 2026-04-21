import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const PillNav = ({
  items,
  activeHref,
  className = "",
  ease = "power3.out",
}) => {
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);

  const normalize = (p) => (p || "/").replace(/\/+$/, "");

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const pillEl = circle.parentElement;
        const label = pillEl?.querySelector(".pill-label");
        const hover = pillEl?.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: h + 10, opacity: 0 });

        const i = circleRefs.current.indexOf(circle);
        if (i === -1) return;

        tlRefs.current[i]?.kill();

        const tl = gsap.timeline({ paused: true });


        tl.to(circle, {
          scale: 1.2,
          duration: 0.5,
          ease,
        }, 0);

        if (label) {
          tl.to(label, {
            y: -(h + 6),
            duration: 0.5,
            ease,
          }, 0);
        }

        if (hover) {
          tl.to(hover, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease,
          }, 0);
        }

        tlRefs.current[i] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, [items, ease]);

  // hover animation
  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;

    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.25,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;

    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const isExternal = (href) =>
    href?.startsWith("http") ||
    href?.startsWith("mailto:") ||
    href?.startsWith("tel:");

  return (
    <div className={`relative ${className}`}>
      <ul className="flex items-center gap-2 p-1 rounded-full ">
        {items.map((item, i) => {
          const isActive =
            normalize(activeHref) === normalize(item.href);

          const commonClass =
            "relative px-4 py-1.5 rounded-full text-sm font-medium flex items-center justify-center overflow-hidden cursor-pointer";

          const content = (
            <>
              {/* animated circle */}
              <span
                ref={(el) => (circleRefs.current[i] = el)}
                className="absolute left-1/2 bottom-0 rounded-full bg-blue-500"
              />

              <span className="relative z-10">
                <span className="pill-label block">{item.label}</span>
                <span className="pill-label-hover absolute left-0 top-0 text-white">
                  {item.label}
                </span>
              </span>
            </>
          );

          return (
            <li key={item.href}>
              {isExternal(item.href) ? (
                <a
                  href={item.href}
                  className={commonClass}
                  style={{
                    background: isActive ? "#3B82F6" : "#E5E7EB",
                    color: isActive ? "#fff" : "#111827",
                  }}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  {content}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={commonClass}
                  style={{
                    background: isActive ? "#3B82F6" : "#E5E7EB",
                    color: isActive ? "#fff" : "#111827",
                  }}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PillNav;