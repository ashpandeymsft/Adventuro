import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Compass, 
  MapPin, 
  Mail, 
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from "lucide-react";

export function Footer() {
  const quickLinks = [
    "Trail Discovery",
    "National Parks",
    "Gear Rentals",
    "Expert Guides",
    "Offline Maps",
    "AI Assistant"
  ];

  const support = [
    "Help Center",
    "Safety Guidelines",
    "Emergency Contacts",
    "Equipment Care",
    "Booking Policy",
    "Contact Us"
  ];

  const company = [
    "About Us",
    "Careers",
    "Press",
    "Partnerships",
    "Blog",
    "Privacy Policy"
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Compass className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold">TrailFinder</span>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Your ultimate companion for outdoor adventures. Discover trails, rent gear, 
              and explore nature with confidence and expert guidance.
            </p>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Stay Updated</h4>
              <p className="text-gray-300 text-sm">
                Get the latest trail conditions, gear tips, and adventure inspiration.
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">123 Adventure Ave, Outdoor City, CO 80424</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">(555) 123-TRAIL</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">hello@trailfinder.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2024 TrailFinder. All rights reserved. Adventure responsibly.</p>
        </div>
      </div>
    </footer>
  );
}