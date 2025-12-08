import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MediaItem, Project } from "@/data/portfolio";
import { X, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

const fallbackImage = "/projects/spider-bot/img1.jpeg";
const fallbackMedia: MediaItem = {
  type: "image",
  src: fallbackImage,
  label: "Beetel Bot hero",
};

const getHeroMedia = (project: Project) => {
  const imageMedia = project.content.media?.find((item) => item.type === "image");
  if (imageMedia) return imageMedia;
  const videoMedia = project.content.media?.find((item) => item.type === "video");
  return videoMedia ?? fallbackMedia;
};

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  const heroMedia = getHeroMedia(project);
  const heroLabel = heroMedia.label ?? project.title;
  const isHeroVideo = heroMedia.type === "video";
  const pdfMedia = project.content.media?.filter((m) => m.type === "pdf") ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[96vw] sm:w-auto max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          {/* Hero Media */}
          <div className="relative aspect-video max-h-[420px]">
            {isHeroVideo ? (
              <video
                controls
                playsInline
                aria-label={heroLabel}
                className="w-full h-full object-cover"
              >
                <source src={heroMedia.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={heroMedia.src}
                alt={heroLabel}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            
            {/* Close Button */}
            <DialogClose asChild>
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/85 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-md"
                aria-label="Close project"
              >
                <X size={20} />
              </button>
            </DialogClose>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground mb-3 inline-block">
                {project.category}
              </span>
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-display text-foreground">
                  {project.title}
                </DialogTitle>
              </DialogHeader>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="skill-badge pointer-events-none cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            {/* Summary */}
            <p className="text-muted-foreground leading-relaxed">
              {project.summary}
            </p>

            {/* PDFs */}
            {pdfMedia.length > 0 && (
              <Section title="Supporting Documents">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {pdfMedia.map((doc, idx) => (
                    <AccordionItem key={`${project.id}-pdf-${idx}`} value={`${project.id}-pdf-${idx}`} className="border border-border rounded-lg">
                      <AccordionTrigger className="px-4 py-3 text-left">
                        <div className="flex items-center justify-between w-full gap-4">
                          <span className="font-medium text-foreground">{doc.label ?? "Document"}</span>
                          <a
                            href={doc.src}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm px-3 py-1 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            Download
                          </a>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="border border-border rounded-lg overflow-hidden bg-card">
                          <object data={doc.src} type="application/pdf" className="w-full h-96">
                            <p className="p-4 text-sm text-muted-foreground">
                              PDF preview unavailable.{" "}
                              <a href={doc.src} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                                Open in new tab
                              </a>
                              .
                            </p>
                          </object>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Section>
            )}

            {/* Project Story */}
            {project.content.contentFlow && project.content.contentFlow.length > 0 && (
              <Section title={`${project.title} Story`}>
                <div className="space-y-12">
                  {project.content.contentFlow.map((block, index) => {
                    const media = project.content.media?.[block.mediaIndex];
                    if (!media) return null;

                    return (
                      <div
                        key={index}
                        className={`flex flex-col gap-6 md:gap-8 items-center ${
                          index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                        }`}
                      >
                        <div className="w-full md:w-1/2 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                          {media.type === "image" ? (
                            <img
                              src={media.src}
                              alt={media.label}
                              className="w-full h-full min-h-[320px] object-cover"
                            />
                          ) : (
                            <video
                              controls
                              playsInline
                              className="w-full h-full min-h-[320px] object-cover"
                            >
                              <source src={media.src} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                        <div className="w-full md:w-1/2 space-y-3 text-left">
                          {block.subtitle && (
                            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">
                              {block.subtitle}
                            </p>
                          )}
                          <h3 className="text-xl font-semibold text-foreground">
                            {block.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {block.text}
                          </p>
                          {block.bullets && block.bullets.length > 0 && (
                            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                              {block.bullets.map((bullet, bulletIndex) => (
                                <li key={bulletIndex}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* Abstract */}
            {project.content.abstract && (
              <Section title="Abstract">
                <p className="text-muted-foreground leading-relaxed">
                  {project.content.abstract}
                </p>
              </Section>
            )}

            {/* Introduction */}
            {project.content.introduction && (
              <Section title="Introduction & Objective">
                <p className="text-muted-foreground leading-relaxed">
                  {project.content.introduction}
                </p>
              </Section>
            )}

            {/* Background */}
            {project.content.background && (
              <Section title="Background Research">
                <p className="text-muted-foreground leading-relaxed">
                  {project.content.background}
                </p>
              </Section>
            )}

            {/* Innovation */}
            {project.content.innovation && (
              <Section title="Innovation">
                <p className="text-muted-foreground leading-relaxed">
                  {project.content.innovation}
                </p>
              </Section>
            )}

            {/* Materials */}
            {project.content.materials && project.content.materials.length > 0 && (
              <Section title="Materials Used">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.content.materials.map((material, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {material}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Hardware & Lab Requirements */}
            {project.content.hardwareGroups && project.content.hardwareGroups.length > 0 && (
              <Section title="Hardware & Lab Requirements">
                <div className="space-y-6">
                  {project.content.hardwareGroups.map((group, index) => (
                    <div key={index} className="space-y-2">
                      <p className="font-medium text-foreground">{group.title}</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {group.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Architecture Comparison */}
            {project.content.comparisons && project.content.comparisons.length > 0 && (
              <Section title="Comparative Architecture">
                <div className="space-y-6">
                  {project.content.comparisons.map((stage, index) => (
                    <div key={index} className="space-y-3">
                      <p className="text-base font-medium text-foreground">{stage.title}</p>
                      {stage.note && (
                        <p className="text-sm text-muted-foreground">{stage.note}</p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-sm text-foreground mb-2">Key Hardware Components</p>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {stage.hardwareComponents.map((component, compIndex) => (
                              <li key={compIndex}>{component}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground mb-2">Functions</p>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {stage.functions.map((fn, fnIndex) => (
                              <li key={fnIndex}>{fn}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Methodology */}
            {project.content.methodology && (
              <Section title="Methodology">
                <p className="text-muted-foreground leading-relaxed">
                  {project.content.methodology}
                </p>
              </Section>
            )}

            {/* Results */}
            {project.content.results && (
              <Section title="Results & Conclusion">
                <p className="text-muted-foreground leading-relaxed">
                  {project.content.results}
                </p>
              </Section>
            )}

            {/* Sub-Projects (for Cybersecurity) */}
            {project.content.subProjects && project.content.subProjects.length > 0 && (
              <Section title="Project Collection">
                <div className="grid gap-4">
                  {project.content.subProjects.map((subProject, index) => (
                    <div key={index} className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <h4 className="font-display font-semibold text-foreground mb-2">
                        {subProject.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {subProject.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Citations */}
            {project.content.citations && project.content.citations.length > 0 && (
              <Section title="References">
                <div className="space-y-2">
                  {project.content.citations.map((citation, index) => (
                    <a
                      key={index}
                      href={citation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-accent hover:underline text-sm break-all"
                    >
                      <ExternalLink size={14} className="flex-shrink-0" />
                      {citation}
                    </a>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
        <span className="w-1 h-6 bg-accent rounded-full" />
        {title}
      </h3>
      {children}
    </div>
  );
}
