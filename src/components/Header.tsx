
import React from 'react';
import { ChevronDown, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-background/70 backdrop-blur-md border-b border-border/50 sticky top-0 z-30 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-primary font-bold text-xl tracking-tight animate-fade-in">Poupabem</span>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#" 
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Visão Geral
            </a>
            <a 
              href="#"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Transações
            </a>
            <a 
              href="#" 
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Relatórios
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-sm font-medium text-foreground transition-colors hover:text-primary">
                  <span>Mais</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass animate-fade-in">
                <DropdownMenuItem>Configurações</DropdownMenuItem>
                <DropdownMenuItem>Exportar Dados</DropdownMenuItem>
                <DropdownMenuItem>Ajuda & Suporte</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
