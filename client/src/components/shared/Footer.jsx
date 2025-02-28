// Footer.js
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import logo from '../../assets/psLogo.png';

const Footer = () => {
  return (
    <footer className=" w-full  dark:border-gray-100 bg-gray-100 dark:bg-black text-black dark:text-white py-6 px-4 md:px-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="text-2xl font-bold text-transparent flex items-center justify-center">
            <img
              src={logo}
              alt="porbo shobai"
              className="h-10 rounded-lg  bg-gray-100"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ignite your learning journey.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="mb-4 md:mb-0">
          <ul className="flex space-x-6">
            <li>
              <a
                href="/about"
                className="hover:text-gray-800 dark:hover:text-gray-400"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/courses"
                className="hover:text-gray-800 dark:hover:text-gray-400"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="/mentors"
                className="hover:text-gray-800 dark:hover:text-gray-400"
              >
                Mentors
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-gray-800 dark:hover:text-gray-400"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="#">
              <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#">
              <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#">
              <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#">
              <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white" />
            </a>
          </Button>
        </div>
      </div>

      <Separator className="my-4 bg-gray-300 dark:bg-gray-700" />

      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} Porbo Shobai. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
