import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Moon, Sun, Menu, CircleUser } from 'lucide-react';
import logo from "../../assets/psLogo.png";
import logoWhite from "../../assets/pswhiteLogo.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/Hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";


const routes = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Competitions", path: "/competitions" },
  { name: "Contact", path: "/contact" },
];

const Navbar=() =>{
  const { user, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      // Update localStorage with the new theme
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast({
          variant: "default",
          title: "Logged Out Successfully",
          description: "See you soon",
          action: <ToastAction altText="Try again">OK!</ToastAction>,
        })
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Log Out Failed",
          description: "Something went wrong",
          action: <ToastAction altText="Try again">OK!</ToastAction>,
        })
        
      });
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
          {
            user ? (
           
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" >
                  <Avatar>
                  <AvatarImage src={user?.photoURL} alt="profile" />
                  <AvatarFallback>  <CircleUser className="h-7 w-7" /></AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
              <Link to="/dashboard">
                <DropdownMenuItem>
                 Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

              
            ) : (
              <>
                <Link to="/login"><Button className="w-full hidden md:block md:w-auto">Log In</Button></Link>
                <Link to="/register"><Button className="w-full hidden md:block md:w-auto">Sign Up</Button></Link>
              </>
            )
          }

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
                {
                  user ? (
                    <Button onClick={handleLogOut}>Logout</Button>
                  ) : (
                    <>
                      <Link to="/login"><Button className="w-full md:w-auto">Log In</Button></Link>
                      <Link to="/register"><Button className="w-full md:w-auto">Sign Up</Button></Link>
                    </>
                  ) 
                }
                
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;