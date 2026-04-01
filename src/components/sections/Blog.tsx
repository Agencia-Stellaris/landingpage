import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";
import { BLOG_POSTS } from "../../data/content";
import { useScrollReveal, useReveal } from "../../hooks/useScrollReveal";
import { HighlightText } from "../ui/HighlightText";

const headerReveal = { y: 40 };
const gridReveal = { y: 50, stagger: 0.15 };

export function Blog() {
  const headerRef = useReveal<HTMLDivElement>(headerReveal);
  const gridRef = useScrollReveal<HTMLDivElement>(gridReveal);

  return (
    <Container id="blog" alternate>
      <div ref={headerRef}>
        <SectionHeader
          label="Blog"
          titleContent={<><HighlightText>Aprende</HighlightText> con nosotros</>}
          subtitle="Art&iacute;culos, gu&iacute;as y tendencias del mundo digital para que tu marca siempre est&eacute; un paso adelante."
          centered
        />
      </div>
      <div ref={gridRef} className="mt-13 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => {
          const Icon = post.icon;
          return (
            <Card key={post.title} className="overflow-hidden">
              {/* Blurred gradient background */}
              <div className="relative flex h-36 items-center justify-center overflow-hidden bg-bg-primary">
                <div
                  className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${post.gradient} opacity-70 blur-2xl`}
                  aria-hidden="true"
                />
                <div
                  className={`absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-tl ${post.gradient} opacity-50 blur-2xl`}
                  aria-hidden="true"
                />
                <span className="relative z-10" aria-hidden="true">
                  <Icon size={32} className="text-white/40" />
                </span>
              </div>
              <div className="p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-purple">
                  {post.tag}
                </p>
                <h3 className="mb-2 font-heading text-[0.95rem] font-bold leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-text-muted">{post.meta}</p>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="mt-9 text-center">
        <Button variant="secondary" href="#">
          Ver todos los art&iacute;culos &rarr;
        </Button>
      </div>
    </Container>
  );
}
