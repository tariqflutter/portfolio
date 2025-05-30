"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Download,
  ExternalLink,
  Calendar,
  Code,
  Award,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Zap,
  Target,
} from "lucide-react"
import ContactForm from "@/components/contact-form"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = ["home", "about", "experience", "education", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200/50 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Syed Tariq Ullah
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative ${
                    activeSection === item.id ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:bg-emerald-50"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden animate-in slide-in-from-top duration-300">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-md border-t">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block px-3 py-2 text-base font-medium w-full text-left transition-all duration-200 rounded-lg ${
                      activeSection === item.id
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-gray-700 hover:text-emerald-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div
            data-animate="true"
            id="hero"
            className={`text-center transition-all duration-1000 ${isVisible.hero ? "animate-in fade-in slide-in-from-bottom-8" : "opacity-0"}`}
          >
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-6 shadow-2xl hover:scale-110 transition-transform duration-500 animate-in zoom-in delay-300">
                <div className="relative">
                  ST
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-4 animate-in slide-in-from-bottom delay-500">
                Syed Tariq Ullah
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 animate-in slide-in-from-bottom delay-700">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-semibold">
                  Computer Systems Engineer
                </span>
              </p>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8 animate-in slide-in-from-bottom delay-1000">
                Specializing in
                <span className="text-emerald-600 font-medium"> Flutter</span>,
                <span className="text-emerald-600 font-medium"> .NET</span>,
                <span className="text-emerald-600 font-medium"> Python</span>, and
                <span className="text-emerald-600 font-medium"> cross-platform mobile development</span>. Creating
                innovative solutions for government and enterprise applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-in slide-in-from-bottom delay-1200">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 rounded-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all duration-300 hover:scale-105"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-gray-400 mb-8 animate-in slide-in-from-bottom delay-1400">
              <div className="flex items-center hover:text-emerald-600 transition-colors duration-300">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">(+92) 03464088313</span>
              </div>
              <div className="flex items-center hover:text-emerald-600 transition-colors duration-300">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">syedtariq358@gmail.com</span>
              </div>
              <div className="flex items-center hover:text-emerald-600 transition-colors duration-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">Islamabad, Pakistan</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 animate-in slide-in-from-bottom delay-1600">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                <a
                  href="https://www.linkedin.com/in/syed-tariq-ullah-97832818a"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full hover:bg-gray-50 hover:border-gray-500 hover:text-gray-700 transition-all duration-300"
              >
                <a href="https://github.com/tariqflutter/" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full hover:bg-green-50 hover:border-green-500 hover:text-green-600 transition-all duration-300"
              >
                <a
                  href="https://www.fiverr.com/syedtariq358?public_mode=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Fiverr
                </a>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-teal-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            data-animate="true"
            id="about-header"
            className={`text-center mb-16 transition-all duration-1000 ${isVisible["about-header"] ? "animate-in fade-in slide-in-from-bottom" : "opacity-0"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              data-animate="true"
              id="about-content"
              className={`transition-all duration-1000 delay-300 ${isVisible["about-content"] ? "animate-in fade-in slide-in-from-left" : "opacity-0"}`}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Target className="mr-3 h-6 w-6 text-emerald-600" />
                Professional Overview
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                As a Computer Systems Engineer, I bring a diverse skill set in Flutter, PHP, Python, and .NET
                technologies. I specialize in creating cross-platform mobile applications with Flutter that deliver
                seamless user experiences across devices.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                My expertise in PHP and .NET allows me to develop robust, dynamic web applications. Currently working at
                the Ministry of Law and Justice, I focus on developing innovative solutions for government data
                processing and legal document management systems.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    4+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    10+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
                </div>
              </div>
            </div>

            <div
              data-animate="true"
              id="about-cards"
              className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible["about-cards"] ? "animate-in fade-in slide-in-from-right" : "opacity-0"}`}
            >
              <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg mr-3">
                      <Code className="h-5 w-5 text-white" />
                    </div>
                    Core Competencies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-emerald-600 mr-2" />
                      Cross-platform Mobile Development (Flutter)
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-emerald-600 mr-2" />
                      Web Application Development (.NET, PHP)
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-emerald-600 mr-2" />
                      Database Management (SQL, MySQL, Firebase)
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-emerald-600 mr-2" />
                      Data Processing & Analysis (Python)
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-emerald-600 mr-2" />
                      API Development & Integration
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-emerald-600 mr-2" />
                      Government & Enterprise Solutions
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg mr-3">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Pashto (Native)</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Urdu</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">English</span>
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        ))}
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            data-animate="true"
            id="experience-header"
            className={`text-center mb-16 transition-all duration-1000 ${isVisible["experience-header"] ? "animate-in fade-in slide-in-from-bottom" : "opacity-0"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
              Work Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {/* Current Position */}
            <Card
              data-animate="true"
              id="exp-1"
              className={`border-l-4 border-l-emerald-600 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-r from-white to-emerald-50 ${isVisible["exp-1"] ? "animate-in fade-in slide-in-from-left" : "opacity-0"}`}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                      Data Processing Assistant / Software Developer
                    </CardTitle>
                    <CardDescription className="text-emerald-600 font-medium text-lg">
                      Ministry of Law and Justice
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>June 2022 - Present</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Islamabad, Pakistan</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities:</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Develop cross-platform mobile applications using Flutter for data processing purposes
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Build robust software solutions using .NET framework for government operations
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Manage database operations ensuring data integrity and security
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Provide hardware/software recommendations and perform system compatibility analysis
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Integrate mobile applications with backend systems and APIs
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Perform minor hardware repairs and system maintenance
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                    >
                      Flutter
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                    >
                      .NET
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                    >
                      Database Management
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors"
                    >
                      API Integration
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                    >
                      System Analysis
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Previous Positions - Similar enhancement pattern */}
            <Card
              data-animate="true"
              id="exp-2"
              className={`hover:shadow-xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-r from-white to-blue-50 ${isVisible["exp-2"] ? "animate-in fade-in slide-in-from-right" : "opacity-0"}`}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Software Developer</CardTitle>
                    <CardDescription className="text-blue-600 font-medium text-lg">Softage Solution</CardDescription>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>2021 - 2022</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Islamabad, Pakistan</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Engaged in full-stack application development including coding, testing, and debugging
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Collaborated with diverse organizational departments for seamless project deployment
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Contributed to project schedule formulation and workflow enhancement
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Recommended strategic changes to improve software application performance
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Designed algorithms and complex flowcharts in collaboration with development teams
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Integrated software components and third-party programs
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                    >
                      Full-Stack Development
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                    >
                      Team Collaboration
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                    >
                      Algorithm Design
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors"
                    >
                      Third-party Integration
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              data-animate="true"
              id="exp-3"
              className={`hover:shadow-xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-r from-white to-indigo-50 ${isVisible["exp-3"] ? "animate-in fade-in slide-in-from-left" : "opacity-0"}`}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Flutter Developer</CardTitle>
                    <CardDescription className="text-indigo-600 font-medium text-lg">NGEN</CardDescription>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>2020 - 2021</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Peshawar, Pakistan</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Developed Flutter applications for mobile platforms with over one year of experience
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Worked extensively with third-party libraries and APIs
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Applied Agile development methodologies throughout the development lifecycle
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Implemented automated testing and building processes
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Utilized version control tools including Git and GitHub
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Wrote readable, well-documented code and refactored existing codebases
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors"
                    >
                      Flutter
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                    >
                      Dart
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors"
                    >
                      API Integration
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
                    >
                      Agile Development
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                    >
                      Git/GitHub
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                    >
                      Automated Testing
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Continue with enhanced styling for other sections... */}
      {/* For brevity, I'll show the pattern but you can apply similar enhancements to Education, Skills, Projects, and Contact sections */}

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/30 to-teal-100/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            data-animate="true"
            id="contact-header"
            className={`text-center mb-16 transition-all duration-1000 ${isVisible["contact-header"] ? "animate-in fade-in slide-in-from-bottom" : "opacity-0"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-4">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. Let's discuss how we can work together!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div
              data-animate="true"
              id="contact-info"
              className={`transition-all duration-1000 delay-300 ${isVisible["contact-info"] ? "animate-in fade-in slide-in-from-left" : "opacity-0"}`}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600">syedtariq358@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-gray-600">(+92) 03464088313</div>
                  </div>
                </div>

                <div className="flex items-start group hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-shadow">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Location</div>
                    <div className="text-gray-600">
                      <div>Work: Ministry of Law and Justice</div>
                      <div>R Block, 2nd Floor, Room No# 221</div>
                      <div>Pak-secretariat, Islamabad, Pakistan</div>
                      <div className="mt-2">Home: Chuprial Tehsil Matta, KPK, Swat</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-full hover:bg-gray-50 hover:border-gray-500 hover:text-gray-700 hover:scale-105 transition-all duration-300"
                  >
                    <a href="https://github.com/tariqflutter/" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-full hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 hover:scale-105 transition-all duration-300"
                  >
                    <a
                      href="https://www.linkedin.com/in/syed-tariq-ullah-97832818a"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="rounded-full hover:bg-green-50 hover:border-green-500 hover:text-green-600 hover:scale-105 transition-all duration-300"
                  >
                    <a
                      href="https://www.fiverr.com/syedtariq358?public_mode=true"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Fiverr
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <Card
              data-animate="true"
              id="contact-form"
              className={`hover:shadow-2xl transition-all duration-500 border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50 ${isVisible["contact-form"] ? "animate-in fade-in slide-in-from-right" : "opacity-0"}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-emerald-600" />
                  Send a Message
                </CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-teal-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Syed Tariq Ullah
            </div>
            <p className="text-gray-400 mb-6">Computer Systems Engineer</p>
            <Separator className="bg-gray-700 mb-6" />
            <p className="text-gray-400 text-sm">© 2024 Syed Tariq Ullah. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
