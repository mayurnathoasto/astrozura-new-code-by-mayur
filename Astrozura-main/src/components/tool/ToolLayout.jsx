import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function ToolInputPanel({ title, description, action, children, className = "" }) {
  return (
    <section className={`rounded-[2rem] border border-[#EFE3D1] bg-white p-4 shadow-sm sm:p-5 md:p-6 ${className}`}>
      {(title || description || action) && (
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          {(title || description) && (
            <div className="max-w-3xl">
              {title ? <h2 className="text-xl font-bold text-[#1E3557] sm:text-2xl">{title}</h2> : null}
              {description ? <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">{description}</p> : null}
            </div>
          )}
          {action ? <div className="w-full md:w-[28rem] md:max-w-[45%]">{action}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}

export function RelatedToolTabs({ title = "Related tools", items = [], className = "" }) {
  const visibleItems = items.filter(Boolean);
  const containerRef = useRef(null);
  const activeTabRef = useRef(null);

  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeEl = activeTabRef.current;
      const scrollPos = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollPos), behavior: "smooth" });
    }
  }, [items]);

  if (!visibleItems.length) return null;

  const scrollByAmount = (amount) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <nav className={`rounded-[2rem] border border-[#EFE3D1] bg-white p-4 shadow-sm ${className}`} aria-label={title}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A73C]">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-[#D4A73C] sm:text-xs sm:font-semibold sm:text-slate-500">
            ← Swipe tabs →
          </span>
          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollByAmount(-200)}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-slate-600 transition hover:bg-[#D4A73C] hover:text-[#1E3557]"
              aria-label="Scroll tabs left"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(200)}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-bold text-slate-600 transition hover:bg-[#D4A73C] hover:text-[#1E3557]"
              aria-label="Scroll tabs right"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <div ref={containerRef} className="-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-2 scroll-smooth [scrollbar-width:thin] sm:gap-3">
          {visibleItems.map((item) => {
            const icon = item.icon || item.image || item.iconUrl;
            return (
              <Link
                key={item.to || item.href || item.label}
                ref={item.isActive ? activeTabRef : null}
                to={item.to || item.href || "#"}
                aria-current={item.isActive ? "page" : undefined}
                className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-extrabold transition sm:min-h-11 sm:px-4 sm:py-2 sm:text-sm ${
                  item.isActive
                    ? "border-[#1E3557] bg-[#1E3557] text-white shadow-sm"
                    : "border-[#EFE3D1] bg-[#FFF9EA] text-[#1E3557] hover:border-[#D4A73C] hover:bg-[#FFF3CE]"
                }`}
              >
                {typeof icon === "string" ? (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/80 p-0.5 sm:h-7 sm:w-7 sm:p-1">
                    <img src={icon} alt="" className="h-full w-full object-contain" />
                  </span>
                ) : null}
                <span className="whitespace-nowrap">{item.label || item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
