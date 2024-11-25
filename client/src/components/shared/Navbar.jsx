import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Moon, Sun, Menu } from 'lucide-react';
import logo from "../../assets/psLogo.png";
import logoWhite from "../../assets/pswhiteLogo.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Button } from "../ui/button";


const routes = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const Navbar=() =>{
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300  ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container  flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            <img src={theme === "dark" ? logoWhite : logo} alt="porbo shobai" className="h-10" />
          </span>
        </NavLink>

        {/* Navigation Menu (Desktop) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {routes.map((route) => (
              <NavigationMenuItem key={route.path}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `${navigationMenuTriggerStyle()} ${
                      isActive ? "bg-accent text-accent-foreground" : ""
                    } transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`
                  }
                >
                  {route.name}
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Login/Signup and Theme Toggle */}
        <div className="flex items-center space-x-2">

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="mr-2"
            onClick={toggleTheme}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" className="hidden sm:inline-flex hover:bg-accent hover:text-accent-foreground">
            Log In
          </Button>
          <Button className="hidden sm:inline-flex">Sign Up</Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open mobile menu"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                {routes.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className={({ isActive }) =>
                      `text-lg font-medium ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      } hover:text-primary transition-colors`
                    }
                  >
                    {route.name}
                  </NavLink>
                ))}
                <Button className="w-full mt-4">Log In</Button>
                <Button className="w-full">Sign Up</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

