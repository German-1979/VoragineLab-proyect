
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Menu,
  LogOut,
  Home,
  User,
  Settings,
  FileText,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = ({ user = null }: { user?: { name?: string; email?: string } | null }) => {
  const [isAuthenticated] = useState(!!user);
  
  const userInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("")
    : user?.email?.substring(0, 2).toUpperCase() || "VL";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 sm:max-w-xs">
            <MobileNav isAuthenticated={isAuthenticated} />
          </SheetContent>
        </Sheet>
        
        <Link to="/" className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-insight-500" />
          <span className="font-bold text-xl hidden sm:inline-block">Vorágine Lab</span>
        </Link>
        
        <div className="flex-1" />
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {isAuthenticated ? (
            <>
              <Button asChild variant="ghost">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/projects">Proyectos</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/datasets">Datasets</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/">Inicio</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/features">Características</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/pricing">Precios</Link>
              </Button>
            </>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-insight-500 text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Configuración</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Iniciar sesión</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Registrarse</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const MobileNav = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Link to="/" className="flex items-center space-x-2 pb-4">
        <BarChart3 className="h-6 w-6 text-insight-500" />
        <span className="font-bold text-xl">Vorágine Lab</span>
      </Link>
      
      {isAuthenticated ? (
        <>
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/projects" className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>Proyectos</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/datasets" className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <span>Datasets</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/profile" className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>Perfil</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/settings" className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span>Configuración</span>
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start text-destructive">
            <LogOut className="h-5 w-5 mr-2" />
            <span>Cerrar sesión</span>
          </Button>
        </>
      ) : (
        <>
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/">Inicio</Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/features">Características</Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/pricing">Precios</Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start">
            <Link to="/login">Iniciar sesión</Link>
          </Button>
          <Button asChild className="justify-start">
            <Link to="/signup">Registrarse</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default Navbar;
