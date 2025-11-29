import { motion } from 'framer-motion';
import { Briefcase, Linkedin, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' }
  ];

  const resourceLinks = [
    { label: 'Help Center', href: '/help' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Guidelines', href: '/guidelines' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
  ];

  return (
    <footer className="bg-[#0a0b14] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <img 
                src="/icons8-space-60.png" 
                alt="Freelancer Space Logo" 
                className="w-10 h-10"
              />
              <span className="text-xl font-bold text-white">Freelancer Space</span>
            </Link>
            <p className="text-[#ffffffcc] leading-relaxed mb-6">
              The world's largest freelancing marketplace. Connect with talented professionals and get your projects done efficiently.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-[#ffffffcc] group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-[#ffffffcc] hover:text-white transition-colors hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Resources</h3>
            <ul className="space-y-4">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-[#ffffffcc] hover:text-white transition-colors hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Stay Updated</h3>
            <p className="text-[#ffffffcc] mb-4">
              Get the latest updates on new features and opportunities.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#ffffffcc] focus:outline-none focus:border-[#ff007f] transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-pink-gradient"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#ffffffcc] text-sm">
              © 2025 Freelancer Space. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/sitemap" className="text-[#ffffffcc] hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link to="/accessibility" className="text-[#ffffffcc] hover:text-white transition-colors">
                Accessibility
              </Link>
              <Link to="/security" className="text-[#ffffffcc] hover:text-white transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;