import { useMemo, useState, useEffect } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { SkillBadges } from "@/components/SkillBadges";
import { projects, aboutData, contactData } from "@/data/portfolio";
import { MapPin, Mail, Github, Linkedin, Phone, Send, Award, BookOpen, Users, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [heroApi, setHeroApi] = useState<CarouselApi | null>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const heroImages = useMemo(() => [
    { src: "/projects/fsai/beetlebot_at_fsai-01.jpeg", caption: "FSAI Conference - Team Presentation" },
    { src: "/projects/fsai/beetlebot_at_fsai-02.jpeg", caption: "FSAI Conference - Engineering Discussion" },
    { src: "/projects/fsai/beetlebot_at_fsai-03.jpeg", caption: "FSAI Conference - Technical Demo" },
    { src: "/projects/fsai/beetlebot_at_fsai-04.jpeg", caption: "FSAI Conference - Industry Leaders" },
    { src: "/projects/fsai/beetlebot_at_fsai-05.jpeg", caption: "FSAI Conference - Networking Session" },
    { src: "/projects/fsai/beetlebot_at_fsai-06.jpeg", caption: "FSAI Conference - Project Showcase" },
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

  const categories = ["all", ...new Set(projects.map((p) => p.category))];
  const spotlightProjects = useMemo(
    () => projects.filter((p) => ["beetlebot", "smart-compost", "coastal-erosion"].includes(p.id)),
    []
  );
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
          ],
        }))
        .filter((entry) => entry.docs.length > 0),
    []
  );
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <Carousel opts={{ loop: true }} setApi={setHeroApi} className="h-full">
            <CarouselContent className="h-full">
              {heroImages.map((item, index) => (
                <CarouselItem key={index} className="h-64 md:h-80 lg:h-96">
                  <div className="relative h-full">
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-full object-cover"
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
                  <span className="text-2xl">🌴 🤖 🌊</span>
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
                      href={contactData.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Github size={18} />
                    </a>
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
        <section id="projects" className="py-16 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 animate-slide-up">
              Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8 animate-slide-up">
              Explore my engineering projects spanning robotics, IoT, AI, and cybersecurity.
            </p>

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
                        {project.category}
                      </span>
                    </div>
                    <Accordion type="single" collapsible className="space-y-2">
                      {docs.map((doc, idx) => (
                        <AccordionItem key={`${project.id}-doc-${idx}`} value={`${project.id}-doc-${idx}`} className="border border-border rounded-lg">
                          <AccordionTrigger className="px-4 py-3 text-left">
                            <div className="flex items-center justify-between w-full gap-4">
                              <span className="font-medium text-foreground">{doc.label ?? "Document"}</span>
                              <a
                                href={doc.src}
                                download={doc.type === "pdf"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-3 py-1 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
                              >
                                {doc.type === "video" ? "Watch" : "Download"}
                              </a>
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
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 animate-slide-up">
              Get In Touch
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-12 animate-slide-up">
              Interested in collaborating on a project or just want to say hello? 
              Feel free to reach out!
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8 animate-slide-up">
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-4">
                    <ContactItem
                      icon={<Mail />}
                      label="Email"
                      value={contactData.email}
                      href={`mailto:${contactData.email}`}
                    />
                    <ContactItem
                      icon={<Phone />}
                      label="Phone"
                      value={contactData.phone}
                      href={`tel:${contactData.phone}`}
                    />
                    <ContactItem
                      icon={<MapPin />}
                      label="Location"
                      value={contactData.location}
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                    Connect With Me
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href={contactData.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-lg bg-card border border-border hover:border-accent hover:text-accent transition-all"
                    >
                      <Github size={20} />
                      <span className="font-medium">GitHub</span>
                    </a>
                    <a
                      href={contactData.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-lg bg-card border border-border hover:border-accent hover:text-accent transition-all"
                    >
                      <Linkedin size={20} />
                      <span className="font-medium">LinkedIn</span>
                    </a>
                  </div>
                </div>

                {/* Availability */}
                <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    Open to Opportunities
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    I'm always interested in hearing about new projects, 
                    research collaborations, or internship opportunities 
                    in robotics, AI, and IoT.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-slide-up">
                <div className="p-8 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                    Send a Message
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                        placeholder="Project Collaboration"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                        placeholder="Tell me about your project or inquiry..."
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      <Send size={18} />
                      Send Message
                    </button>
                  </form>
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

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}

export default Index;
