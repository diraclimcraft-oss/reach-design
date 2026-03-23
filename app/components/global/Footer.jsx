export default function Footer() {
    return (
        <footer className="bg-white text-black px-4 2xl:px-0 py-16">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10 md:mb-16">
                    {/* Column 1 - Navigation */}
                    <div>
                         <h3 className="text-xl font-extrabold tracking-tight mb-2 md:mb-4">REACH DESIGN STUDIOS</h3>
                        <nav className="flex flex-col gap-2 md:gap-3">
                            <a href="/projects" className="text-sm md:text-base tracking-wider hover:opacity-60 transition-opacity">
                                Our Projects
                            </a>
                            <a href="/about" className="text-sm md:text-base tracking-wider hover:opacity-60 transition-opacity">
                                Our Team
                            </a>
                            <a href="/about" className="text-sm md:text-base tracking-wider hover:opacity-60 transition-opacity">
                                Careers
                            </a>
                            <a href="/contact" className="text-sm md:text-base tracking-wider hover:opacity-60 transition-opacity">
                                Contact
                            </a>
                             <a href="/expertise" className="text-sm md:text-base tracking-wider hover:opacity-60 transition-opacity">
                                Expertise
                            </a>

                        </nav>
                    </div>

                    {/* Column 2 - Social Media */}
                    <div>
                        <h3 className="text-xl font-extrabold tracking-tight mb-2 md:mb-4">FOLLOW US</h3>
                        <nav className="flex flex-col gap-2 md:gap-3">
                            <a href="https://www.instagram.com/reachstudio.ke/" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base hover:opacity-60 transition-opacity">
                                Instagram
                            </a>
                            <a href="https://www.linkedin.com/company/reach-design-studio/" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base hover:opacity-60 transition-opacity">
                                LinkedIn
                            </a>
                            <a href="https://www.youtube.com/@TheMillenialArchitect" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base hover:opacity-60 transition-opacity">
                                YouTube
                            </a>
                             <a href="https://www.facebook.com/ReachStudio.ke" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base hover:opacity-60 transition-opacity">
                                Facebook
                            </a>
                            <a href="https://www.pinterest.com/reachstudiokenya/" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base hover:opacity-60 transition-opacity">
                                Pinterest
                            </a>
                        </nav>
                    </div>

                    {/* Column 3 - Phone Info */}
                    <div>
                        <h3 className="text-xl font-extrabold tracking-tight mb-2 md:mb-4">GET IN TOUCH</h3>
                        <div className="flex flex-col gap-2 md:gap-3 text-sm md:text-base">
                            <p  className="hover:opacity-60 transition-opacity">
                                +254 723 881 453
                            </p>
                            <p className="hover:opacity-60 transition-opacity">
                                +254 723 916 469
                            </p>

                        </div>
                    </div>

                    {/* Column 4 - Contact Info */}
                    <div>
                        <h3 className="text-xl font-extrabold tracking-tight mb-2 md:mb-4">GENERAL INQUIRIES</h3>
                        <div className="flex flex-col gap-2 md:gap-3 text-sm md:text-base">
                            <a href="mailto:architect@reachdesignstudio.com" className="hover:opacity-60 transition-opacity">
                                architect@reachdesignstudio.com
                            </a>
                            <p className="leading-relaxed mt-4">
                                Reach Design Studios<br />
                                Apic Center,
                                Muthithi Road,Westlands,
                                <br />
                                Nairobi, Kenya
                            </p>

                        </div>
                    </div>

                   
                </div>

                {/* Copyright */}
                <div className="border-t border-black/20 pt-6">
                    <p className="text-xs tracking-wide">
                        © 2026 Reach Design Studios. All Rigts Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
