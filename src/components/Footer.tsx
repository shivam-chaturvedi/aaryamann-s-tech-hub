import { Link } from "react-router-dom";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { contactData } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-lg">AG</span>
              </div>
              <span className="font-display font-semibold text-foreground">Aaryamann Goenka</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Aspiring engineer, tinkering with new frontiers in Robotics, Environment, and IoT.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <a 
                href={`mailto:${contactData.email}`} 
                className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm"
              >
                <Mail size={16} />
                {contactData.email}
              </a>
              <a 
                href={`tel:${contactData.phone}`} 
                className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm"
              >
                <Phone size={16} />
                {contactData.phone}
              </a>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin size={16} />
                {contactData.location}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a
                href={contactData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${contactData.email}`}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Aaryamann Goenka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
