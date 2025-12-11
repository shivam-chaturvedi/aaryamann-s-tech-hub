import { useMemo, useState, useEffect } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { SkillBadges } from "@/components/SkillBadges";
import { projects, aboutData, contactData } from "@/data/portfolio";
import { MapPin, Mail, Linkedin, Award, BookOpen, Users, ChevronLeft, ChevronRight, GraduationCap, FileText } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [heroApi, setHeroApi] = useState<CarouselApi | null>(null);
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  const heroImages = useMemo(() => [
    { src: "/projects/beetlebot/beetlebot_at_fsai-02.jpeg", caption: "Beetlebot - Conference" },
    { src: "/projects/compost/compost-bin-01.jpeg", caption: "Khadify - Sensor Deck" },
    { src: "/projects/beetlebot/beetlebot_at_fsai-05.jpeg", caption: "Beetlebot - Presentation" },
    { src: "/projects/compost/compost-bin-02.jpeg", caption: "Khadify - Aeration Setup" },
    { src: "/projects/cyberdost-07.jpeg", caption: "CyberDost - Community Outreach" },
    { src: "/projects/hkiso_silver_award.jpeg", caption: "HKISO Silver Award" },
    { src: "/projects/beetlebot/beetlebot_at_fsai-11.jpeg", caption: "Beetlebot - Demo" },
    { src: "/projects/compost/compost-bin-04.jpeg", caption: "Khadify - System Overview" },
    { src: "/projects/beetlebot/fsai-speaker.jpeg", caption: "Beetlebot - Speaker Session" },
    { src: "/projects/compost/compost-bin-08.jpeg", caption: "Khadify - Field Testing" },
    { src: "/projects/cyberdost-08.jpeg", caption: "CyberDost - Policy Engagement" },
    { src: "/projects/crest_gold_award.jpeg", caption: "CREST Gold Award" },
    { src: "/projects/compost/compost-bin-11.jpeg", caption: "Khadify - Quality Analysis" },
    { src: "/projects/compost/compost-bin-12.jpeg", caption: "Khadify - Final Product" },
  ], []);
  
  useEffect(() => {
    if (!heroApi) return;
    
    const interval = setInterval(() => {
      if (heroApi.canScrollNext()) {
        heroApi.scrollNext();
      } else {
        heroApi.scrollTo(0);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [heroApi]);

  const categories = ["all", ...new Set(projects.map((p) => p.category).filter(c => c !== "Spotlight"))];
  const documentMedia = useMemo(
    () =>
      projects
        .map((project) => ({
          project,
          docs: [
            ...(project.content.media?.filter((m) => m.type === "pdf") ?? []),
            ...(project.id === "smart-compost"
              ? project.content.media?.filter((m) => m.type === "video" && m.src.includes("Khadify_DemoVideo")) ?? []
              : []),
            ...(project.id === "beetlebot"
              ? project.content.media?.filter((m) => m.type === "video" && (m.src.includes("beetlebot_demo") || m.src.includes("Spider_Bot"))) ?? []
              : []),
          ],
        }))
        .filter((entry) => entry.docs.length > 0),
    []
  );
  const filteredProjects = useMemo(() => {
    let filtered = activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);
    
    // Sort: spotlight projects first, then others
    return filtered.sort((a, b) => {
      if (a.category === "Spotlight" && b.category !== "Spotlight") return -1;
      if (a.category !== "Spotlight" && b.category === "Spotlight") return 1;
      return 0;
    });
  }, [activeFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Resume Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-end items-center gap-3">
          <a
            href="/Aaryamann_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-lg transition-colors flex items-center gap-2"
            aria-label="Download Resume"
          >
            <FileText size={18} />
            Download Resume
          </a>
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-accent/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            <span className="text-xl">{isDark ? "🌙" : "☀️"}</span>
          </button>
        </div>
      </div>
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-80 md:h-96 lg:h-[32rem] overflow-hidden">
          <Carousel opts={{ loop: true }} setApi={setHeroApi} className="h-full">
            <CarouselContent className="h-full">
              {heroImages.map((item, index) => (
                <CarouselItem key={index} className="h-80 md:h-96 lg:h-[32rem]">
                  <div className="relative h-full">
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center 30%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-sm md:text-base font-medium text-white drop-shadow-lg">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-background/80 hover:bg-background" />
            <CarouselNext className="right-4 bg-background/80 hover:bg-background" />
          </Carousel>
        </section>

        {/* Profile Section */}
        <section className="relative -mt-20 pb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                  <img
                    src="/profile-hero.png"
                    alt="Aaryamann Goenka"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground">
                    {aboutData.name}
                  </h1>
                </div>
                
                <p className="text-muted-foreground text-sm md:text-base mb-4 max-w-2xl">
                  {aboutData.title}
                </p>

                {/* Skills Preview */}
                <div className="mb-4">
                  <SkillBadges />
                </div>

                {/* Social & Contact */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex gap-2">
                    <a
                      href={contactData.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href={`mailto:${contactData.email}`}
                      className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Mail size={18} />
                    </a>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin size={14} />
                    {contactData.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="pt-0 pb-16 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 animate-slide-up">
              Projects
            </h2>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                    activeFilter === category
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category === "all" ? "All Projects" : category}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Documents Section */}
        {documentMedia.length > 0 && (
          <section className="py-12 border-t border-border bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground">Project Documents</h3>
                <p className="text-muted-foreground">
                  Expand to preview PDFs in-browser; use the top-right button to download.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentMedia.map(({ project, docs }) => (
                  <div key={project.id} className="p-4 rounded-xl border border-border bg-card">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Project</p>
                        <h4 className="text-lg font-semibold text-foreground">{project.title}</h4>
                      </div>
                      <span className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                        {project.id === "coastal-erosion" ? "Sustainability" : project.category}
                      </span>
                    </div>
                    <Accordion type="single" collapsible className="space-y-2">
                      {docs.map((doc, idx) => (
                        <AccordionItem key={`${project.id}-doc-${idx}`} value={`${project.id}-doc-${idx}`} className="border border-border rounded-lg overflow-hidden">
                          <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
                            <div className="flex items-center gap-4 w-full">
                              {doc.type === "video" && (
                                <div className="relative flex-shrink-0 w-24 h-16 rounded overflow-hidden bg-black">
                                  <video
                                    src={doc.src}
                                    className="w-full h-full object-cover"
                                    preload="metadata"
                                    muted
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                                      <svg className="w-5 h-5 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="flex-1 flex items-center justify-between gap-4">
                                <div>
                                  <span className="font-medium text-foreground block">{doc.label ?? "Document"}</span>
                                  {doc.description && (
                                    <span className="text-xs text-muted-foreground mt-0.5 block">{doc.description}</span>
                                  )}
                                </div>
                                <a
                                  href={doc.src}
                                  download={doc.type === "pdf"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-xs px-3 py-1 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex-shrink-0"
                                >
                                  {doc.type === "video" ? "Watch" : "Download"}
                                </a>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="border border-border rounded-lg overflow-hidden bg-background">
                              {doc.type === "video" ? (
                                <video
                                  controls
                                  playsInline
                                  className="w-full h-80 object-contain bg-black"
                                  src={doc.src}
                                >
                                  Your browser does not support the video tag.
                                </video>
                              ) : (
                                <object data={doc.src} type="application/pdf" className="w-full h-80">
                                  <p className="p-4 text-sm text-muted-foreground">
                                    PDF preview unavailable.{" "}
                                    <a href={doc.src} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                                      Open in new tab
                                    </a>
                                    .
                                  </p>
                                </object>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* About Section */}
        <section id="about" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                About Me
              </h2>
              <p className="text-foreground/80 text-base max-w-3xl leading-relaxed">
                {aboutData.bio}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Technical Background Card */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-foreground/60 font-medium">Expertise</p>
                    <h3 className="text-lg font-display font-semibold text-foreground">Technical Background</h3>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {aboutData.technicalBackground.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-foreground/90 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Achievements Card */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-foreground/60 font-medium">Impact</p>
                    <h3 className="text-lg font-display font-semibold text-foreground">Key Achievements</h3>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {aboutData.achievements.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-foreground/90 leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Leadership Card */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-foreground/60 font-medium">Leadership</p>
                    <h3 className="text-lg font-display font-semibold text-foreground">Roles</h3>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {aboutData.leadership.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-foreground/90 leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Card */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-foreground/60 font-medium mb-1">Skills</p>
                  <h3 className="text-lg font-display font-semibold text-foreground">Technical Skills</h3>
                </div>
                <SkillBadges />
              </div>

              {/* Academic Qualifications Card */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-foreground/60 font-medium">Education</p>
                    <h3 className="text-lg font-display font-semibold text-foreground">Academic Qualifications</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-sm">IGCSE Grade 10</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      9 A*s: Chemistry, Physics, International Math, Additional Math, History, Computer Science, English Literature, English as a first language, Hindi
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">SAT</h4>
                    <p className="text-sm text-muted-foreground">
                      Score: <span className="font-semibold text-foreground">1560</span>
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      SAT: <span className="font-semibold text-foreground">1560 (800 Math)</span> | AP Econ: <span className="font-semibold text-foreground">5</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </main>
      <Footer />
    </div>
  );
};

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border animate-slide-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          {icon}
        </div>
        <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default Index;
