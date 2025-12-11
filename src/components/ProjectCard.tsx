import { MediaItem, Project } from "@/data/portfolio";
import { useState, useEffect } from "react";

const fallbackImage = "/projects/beetlebot/beetlebot1.jpeg";
const fallbackMedia: MediaItem = {
  type: "image",
  src: fallbackImage,
  label: "Beetel Bot standing pose",
};

const getProjectCardMedia = (project: Project) => {
  if (project.thumbnail) {
    return {
      type: "image",
      src: project.thumbnail,
      label: project.title,
    };
  }

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

const getBeetleBotVideos = (project: Project) => {
  if (project.id === "beetlebot") {
    const videos = project.content.media?.filter((item) => item.type === "video" && item.src.includes("beetlebot_demo")) ?? [];
    return videos.length > 0 ? videos : [
      { type: "video" as const, src: "/projects/beetlebot/beetlebot_demo.mp4", label: "Demo 1" },
      { type: "video" as const, src: "/projects/beetlebot/beetlebot_demo2.mp4", label: "Demo 2" },
    ];
  }
  return [];
};

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const cardMedia = getProjectCardMedia(project);
  const isSpotlight = project.category === "Spotlight";
  const beetleBotVideos = getBeetleBotVideos(project);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (beetleBotVideos.length > 1) {
      const video = document.getElementById(`beetlebot-video-${project.id}`) as HTMLVideoElement;
      if (video) {
        const handleEnded = () => {
          setCurrentVideoIndex((prev) => (prev + 1) % beetleBotVideos.length);
        };
        video.addEventListener('ended', handleEnded);
        return () => video.removeEventListener('ended', handleEnded);
      }
    }
  }, [beetleBotVideos.length, project.id]);

  return (
    <div
      onClick={onClick}
      className={`project-card group animate-slide-up ${isSpotlight ? "border-2 border-yellow-500" : ""}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image/Video */}
      <div className="relative aspect-video overflow-hidden">
        {beetleBotVideos.length > 0 ? (
          <video
            id={`beetlebot-video-${project.id}`}
            key={beetleBotVideos[currentVideoIndex]?.src}
            src={beetleBotVideos[currentVideoIndex]?.src}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : project.image && project.image.endsWith('.mp4') ? (
          <video
            src={project.image}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={cardMedia.src}
            alt={cardMedia.label ?? project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Spotlight Badge */}
        {isSpotlight && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500 text-black flex items-center gap-1">
              ⭐ Spotlight
            </span>
          </div>
        )}
        
        {/* Category Badge */}
        {!isSpotlight && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground">
              {project.category}
            </span>
          </div>
        )}
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
