import { MediaItem, Project } from "@/data/portfolio";

const fallbackImage = "/projects/spider-bot/img1.jpeg";
const fallbackMedia: MediaItem = {
  type: "image",
  src: fallbackImage,
  label: "Beetel Bot standing pose",
};

const getProjectCardMedia = (project: Project) => {
  const imageMedia = project.content.media?.find((item) => item.type === "image");
  if (imageMedia) return imageMedia;
  if (project.image) {
    return {
      type: "image",
      src: project.image,
      label: project.title,
    };
  }
  return fallbackMedia;
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const cardMedia = getProjectCardMedia(project);
  return (
    <div
      onClick={onClick}
      className="project-card group animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={cardMedia.src}
          alt={cardMedia.label ?? project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="skill-badge text-xs pointer-events-none cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
