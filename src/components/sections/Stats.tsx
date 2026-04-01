import { STATS } from "../../data/content";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const reveal = { y: 30, stagger: 0.1 };

export function Stats() {
  const ref = useScrollReveal<HTMLDListElement>(reveal);

  return (
    <div
      className="border-y border-border bg-white/[0.02] px-[5%] py-5"
      role="region"
      aria-label="Estad&iacute;sticas de la agencia"
    >
      <dl ref={ref} className="mx-auto grid max-w-4xl grid-cols-2 gap-5 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="py-5 text-center">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-heading text-3xl font-extrabold gradient-text">
              {stat.value}
            </dd>
            <dd className="mt-1 text-sm text-text-muted">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
