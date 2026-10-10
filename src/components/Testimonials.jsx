import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/parkingData';

export default function Testimonials() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el && el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = 420;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    });
  };

  return (
    <section className="bg-background py-16 text-foreground overflow-hidden md:py-32 border-t border-foreground/5">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header with Title and Nav Buttons */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:mb-16">
          <div>
            <span className="text-xs font-mono font-semibold tracking-widest text-muted-foreground uppercase bg-foreground/5 px-3 py-1 rounded inline-block mb-3">
              MUNICIPAL OPERATOR REVIEWS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
              What Operators Are Saying
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="cursor-pointer p-3 rounded-md bg-accent text-black transition-all duration-200 hover:scale-110 hover:bg-accent/80 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="cursor-pointer p-3 rounded-md bg-accent text-black transition-all duration-200 hover:scale-110 hover:bg-accent/80 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Snap Scroll Cards */}
        <div className="relative -mx-6 md:mx-0">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-6 md:px-0"
            style={{ scrollPaddingInline: '1.5rem' }}
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="flex-none w-[calc(100vw-3rem)] md:w-96 lg:w-[420px] min-h-[380px] bg-muted rounded-2xl p-8 md:p-10 flex flex-col justify-between snap-start border border-foreground/5 hover:border-foreground/15 transition-all"
              >
                <h3 className="text-2xl md:text-3xl font-medium leading-[1.2] tracking-tight text-foreground">
                  "{t.quote}"
                </h3>

                <div className="pt-8 mt-4 border-t border-foreground/10">
                  <p className="font-semibold text-foreground text-base">
                    {t.author}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient fade on the right for desktop */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-24 md:w-32 transition-opacity duration-300 hidden md:block"
            style={{
              background: 'linear-gradient(to right, transparent, var(--background))'
            }}
          />
        </div>
      </div>
    </section>
  );
}
