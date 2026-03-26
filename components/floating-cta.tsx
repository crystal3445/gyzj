"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContact = () => {
    const element = document.querySelector("#contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <Button
        onClick={scrollToContact}
        size="lg"
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl rounded-full px-6 py-6"
      >
        <span className="font-medium">立即合作</span>
      </Button>
    </div>
  )
}
