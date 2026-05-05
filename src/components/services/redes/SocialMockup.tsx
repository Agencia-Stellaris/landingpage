import {
  Heart,
  Send,
  MoreHorizontal,
  Home,
  Search,
  PlusSquare,
  Film,
  User,
  Bookmark,
  MessageCircle,
  Share2,
} from "lucide-react";

interface FeedPostData {
  author: string;
  handle: string;
  time: string;
  cover: "grad-cover-1" | "grad-cover-2" | "grad-cover-3" | "grad-cover-4";
  caption: { title: string; body: string };
  likes: string;
  comments: string;
  accent: string;
}

const POSTS: readonly FeedPostData[] = [
  {
    author: "@tu_marca",
    handle: "Patrocinado",
    time: "hace 2h",
    cover: "grad-cover-1",
    caption: {
      title: "Lanzamiento de temporada",
      body: "Nueva colección. La estrategia detrás del feed que más convierte.",
    },
    likes: "2 348",
    comments: "184",
    accent: "REEL · 24s",
  },
  {
    author: "@tu_marca",
    handle: "Publicación",
    time: "ayer",
    cover: "grad-cover-2",
    caption: {
      title: "Carrusel · 5 datos",
      body: "5 cosas que aprendimos esta semana del comportamiento de tu audiencia.",
    },
    likes: "1 102",
    comments: "92",
    accent: "CARRUSEL",
  },
  {
    author: "@tu_marca",
    handle: "Reel",
    time: "lun",
    cover: "grad-cover-3",
    caption: {
      title: "Detrás de cámaras",
      body: "Así producimos el contenido visual que mueve la conversación.",
    },
    likes: "3 765",
    comments: "241",
    accent: "REEL · 18s",
  },
  {
    author: "@tu_marca",
    handle: "Publicación",
    time: "vie",
    cover: "grad-cover-4",
    caption: {
      title: "Caso de éxito",
      body: "Cómo crecimos +320% en alcance con una estrategia editorial clara.",
    },
    likes: "1 894",
    comments: "156",
    accent: "POST",
  },
];

const STORIES: readonly string[] = [
  "Tienda",
  "Lanzam.",
  "Reel #2",
  "Detrás",
  "Tips",
];

function FeedPost({ post }: { post: FeedPostData }) {
  return (
    <div className="border-b border-white/[0.06] pb-3">
      {/* post header */}
      <div className="flex items-center gap-2.5 px-3 pt-3">
        <div className="story-ring">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[#0E0818] text-[10px] font-bold text-white">
            {post.author.charAt(1).toUpperCase()}
          </div>
        </div>
        <div className="flex-1 leading-tight">
          <div className="text-[12px] font-semibold text-white">
            {post.author}
          </div>
          <div className="text-[10px] text-white/40">
            {post.handle} · {post.time}
          </div>
        </div>
        <MoreHorizontal size={14} className="text-white/40" aria-hidden="true" />
      </div>
      {/* cover */}
      <div
        className={`mx-3 mt-2 h-44 overflow-hidden rounded-xl ${post.cover} relative`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <div className="font-heading text-[15px] font-bold leading-tight text-white drop-shadow">
            {post.caption.title}
          </div>
          <div className="metric-chip">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {post.accent}
          </div>
        </div>
      </div>
      {/* actions */}
      <div className="mt-2 flex items-center gap-4 px-3 text-white/70">
        <div className="flex items-center gap-1">
          <Heart
            size={18}
            strokeWidth={2}
            className="like-pulse text-accent-pink"
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] text-white/80">
            {post.likes}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle size={17} aria-hidden="true" />
          <span className="font-mono text-[11px] text-white/80">
            {post.comments}
          </span>
        </div>
        <Share2 size={17} aria-hidden="true" />
        <div className="flex-1" />
        <Bookmark size={17} aria-hidden="true" />
      </div>
      {/* caption */}
      <p className="mt-1.5 px-3 text-[11.5px] leading-snug text-white/70">
        <span className="font-semibold text-white">{post.author}</span>{" "}
        {post.caption.body}
      </p>
    </div>
  );
}

export function SocialMockup() {
  return (
    <div
      role="img"
      aria-label="Vista previa de feed de redes sociales gestionado por Stellaris"
      className="relative mx-auto w-full max-w-[330px]"
    >
      <div
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.34),transparent_70%)] blur-2xl"
        aria-hidden="true"
      />

      {/* Phone */}
      <div className="rounded-[2.4rem] border border-white/[0.08] bg-surface p-2.5 shadow-[0_30px_80px_-20px_rgba(124,58,237,0.45)]">
        <div className="overflow-hidden rounded-[2rem] bg-[#0B0712]">
          {/* App header */}
          <div
            className="flex items-center justify-between border-b border-white/[0.06] bg-[#0B0712] px-4 py-3"
            aria-hidden="true"
          >
            <div className="font-heading text-[15px] font-bold tracking-tight text-white">
              stellaris<span className="text-accent-pink">.</span>
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <Heart size={16} />
              <Send size={16} />
            </div>
          </div>

          {/* Stories strip */}
          <div
            className="flex gap-3 overflow-hidden border-b border-white/[0.06] px-3 py-3"
            aria-hidden="true"
          >
            {STORIES.map((label) => (
              <div
                key={label}
                className="flex w-12 shrink-0 flex-col items-center gap-1"
              >
                <div className="story-ring">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[#0B0712] text-[9px] font-bold text-white">
                    {label.charAt(0)}
                  </div>
                </div>
                <div className="truncate text-[9px] text-white/50">{label}</div>
              </div>
            ))}
          </div>

          {/* Feed (fixed shell + animated track) */}
          <div
            className="phone-shell relative overflow-hidden"
            aria-hidden="true"
          >
            <div className="feed-track">
              {POSTS.map((post) => (
                <FeedPost key={post.caption.title} post={post} />
              ))}
            </div>
            {/* gradient masks top/bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0B0712] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0B0712] to-transparent" />
          </div>

          {/* Bottom tab bar */}
          <div
            className="flex items-center justify-around border-t border-white/[0.06] bg-[#0B0712] px-3 py-2.5 text-white/70"
            aria-hidden="true"
          >
            <Home size={18} />
            <Search size={18} />
            <PlusSquare size={20} />
            <Film size={18} />
            <User size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
