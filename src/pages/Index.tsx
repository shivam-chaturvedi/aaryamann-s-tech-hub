import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { SkillBadges } from "@/components/SkillBadges";
import { projects, aboutData, contactData } from "@/data/portfolio";
import { MapPin, Mail, Github, Linkedin, Phone, Send, GraduationCap, Award, BookOpen, Users } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";
const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const categories = ["all", ...new Set(projects.map((p) => p.category))];
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

  const programExperiences = [
    ...aboutData.enrichmentPrograms,
    ...aboutData.codingExperiences,
    ...aboutData.engineeringExperiences,
    aboutData.aiClub,
    aboutData.researchProject,
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img
            src="/projects/spider-bot/img6.jpeg"
            alt="Spider Bot hero"
            className="w-full h-full object-cover transform -rotate-6"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </section>

        {/* Profile Section */}
        <section className="relative -mt-20 pb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                  <video
                    src="/projects/spider-bot/Spider_Bot_video.mp4"
                    className="w-full h-full object-cover transform scale-105"
                    autoPlay
                    muted
                    playsInline
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground">
                    {aboutData.name}
                  </h1>
                  <span className="text-2xl">🇮🇳</span>
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

        {/* Detailed Profile */}
        <section className="py-16 bg-secondary/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Detailed Profile
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mb-10">
              All the credentials, programs, leadership experiences, and interests that support the Spider Bot narrative.
            </p>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card icon={<MapPin />} title="Location & Contact">
                <p className="text-sm text-muted-foreground">{aboutData.address}</p>
                <p className="mt-4 text-sm text-muted-foreground">{aboutData.contactLine}</p>
              </Card>
              <Card icon={<GraduationCap />} title="Education & Credentials">
                <p className="text-sm text-muted-foreground">{aboutData.educationDetails.institution}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {aboutData.educationDetails.period} · {aboutData.educationDetails.graduation}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  {aboutData.educationDetails.grades.map((grade) => (
                    <span key={grade}>{grade}</span>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.4em] text-accent">Standardized Tests</p>
                  {aboutData.standardizedTests.map((test) => (
                    <p key={test} className="text-sm text-foreground">
                      {test}
                    </p>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.4em] text-accent">Additional Courses</p>
                  {aboutData.additionalCourses.map((course) => (
                    <p key={course} className="text-sm text-muted-foreground">
                      {course}
                    </p>
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid gap-6 mt-6 lg:grid-cols-2">
              <Card icon={<Award />} title="Programs & Research">
                <div className="space-y-6">
                  {programExperiences.map((program) => (
                    <div key={program.title} className="space-y-2 border-b border-border pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-muted-foreground">
                        <span className="text-foreground">{program.title}</span>
                        <span>{program.period}</span>
                      </div>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        {program.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
              <Card icon={<Users />} title="Leadership & Community">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-accent mb-2">Leadership Roles</p>
                    <div className="space-y-4">
                      {aboutData.leadershipRoles.map((role) => (
                        <div key={role.title}>
                          <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                            <span>{role.title}</span>
                            <span className="text-xs text-muted-foreground">{role.period}</span>
                          </div>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground">
                            {role.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-accent mb-2">Competitions</p>
                    <div className="space-y-4">
                      {aboutData.competitions.map((item) => (
                        <div key={item.title}>
                          <div className="flex justify-between text-sm font-semibold text-foreground">
                            <span>{item.title}</span>
                            <span className="text-xs text-muted-foreground">{item.period}</span>
                          </div>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground">
                            {item.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-accent mb-2">Community Service</p>
                    <div className="space-y-4">
                      {aboutData.communityService.map((item) => (
                        <div key={item.title}>
                          <div className="flex justify-between text-sm font-semibold text-foreground">
                            <span>{item.title}</span>
                            <span className="text-xs text-muted-foreground">{item.period}</span>
                          </div>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground">
                            {item.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-6">
              <Card icon={<BookOpen />} title="Languages, Tools & Hobbies">
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-accent">Languages</p>
                    <p>{aboutData.personalInterests.languages.join(" · ")}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-accent">Tools & Skills</p>
                    <p>{aboutData.personalInterests.tools.join(" · ")}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-accent">Hobbies</p>
                    <p>{aboutData.personalInterests.hobbies.join(" · ")}</p>
                  </div>
                </div>
              </Card>
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

        {/* About Section */}
        <section id="about" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 animate-slide-up">
              About Me
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mb-12 animate-slide-up">
              {aboutData.bio}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Technical Background */}
                <Card icon={<BookOpen />} title="Technical Background">
                  <ul className="space-y-2">
                    {aboutData.technicalBackground.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Key Achievements */}
                <Card icon={<Award />} title="Key Technical Achievements">
                  <ul className="space-y-2">
                    {aboutData.achievements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Leadership */}
                <Card icon={<Users />} title="Technical Leadership">
                  <ul className="space-y-2">
                    {aboutData.leadership.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Education */}
                <Card icon={<GraduationCap />} title="Education">
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">{aboutData.education.school}</p>
                    <p className="text-sm text-muted-foreground">{aboutData.education.graduation}</p>
                    <p className="text-sm text-muted-foreground mt-3">{aboutData.education.grades}</p>
                  </div>
                </Card>

                {/* Courses */}
                <Card icon={<BookOpen />} title="Technical Courses">
                  <ul className="space-y-2">
                    {aboutData.courses.map((course, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Skills */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                    Skills
                  </h3>
                  <SkillBadges />
                </div>
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
