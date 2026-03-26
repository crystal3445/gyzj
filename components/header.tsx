"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "品牌溯源", href: "#brand" },
  { label: "整店运营", href: "#output" },
  { label: "品牌优势", href: "#advantages" },
  { label: "合作模式", href: "#cooperation" },
  { label: "合作流程", href: "#process" },
  { label: "合作支持", href: "#support" },
  { label: "合作咨询", href: "#contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/images/logo.jpg" 
              alt="国医仲景" 
              className="w-12 h-12 object-contain"
            />
            <span className="font-serif text-xl font-bold text-foreground">国医仲景</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              合作咨询
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-card border-t border-border animate-in slide-in-from-top-2">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-3 text-foreground/80 hover:text-primary hover:bg-background transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                <Button
                  onClick={() => scrollToSection("#contact")}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  合作咨询
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
