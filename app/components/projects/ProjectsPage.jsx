'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef(null);

  const categories = [
    { title: 'All Projects', value: 'all' },
    { title: 'Residential', value: 'residential' },
    { title: 'Hospitality', value: 'hospitality' },
    { title: 'Commercial', value: 'commercial' },
    { title: 'Public', value: 'public' },
    { title: 'Master Planning', value: 'master-planning' },
    { title: 'Mixed Use', value: 'mixed-use' },
  ];

  // IntersectionObserver for fade/slide-in animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      {
        threshold: window.innerWidth < 768 ? 0.1 : 0.25,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    observer.observe(section);
    return () => observer.unobserve(section);
  }, []);

  // Fetch projects from Sanity
  useEffect(() => {
    client
      .fetch(`*[_type == "project"] | order(priority desc){
        title,
        "slug": slug.current,
        mainImage,
        category
      }`)
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  // Filter projects by category
  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section
      ref={sectionRef}
      className="bg-white text-black px-4 2xl:px-0 pt-32 pb-32"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight w-full md:w-[70%] mb-12">
          Selected projects that met our clients' lot conditions, lifestyle, and budget.
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-24">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`
                px-5 py-2 text-base md:text-lg font-medium tracking-tight transition-all duration-300
                ${selectedCategory === cat.value
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-200'
                }
              `}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-light text-gray-600">
              No projects in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 2xl:gap-x-8 gap-y-14">
            {filteredProjects.map((project, idx) => (
              <Link
                key={`${project.slug}-${idx}`}
                href={`/projects/${project.slug}`}
                style={{ transitionDelay: `${idx * 140}ms` }}
                className={`
                  group cursor-pointer block
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
              >
                <div className="relative overflow-hidden">
                  {project.mainImage && (
                    <img
                      src={urlFor(project.mainImage).width(1200).url()}
                      alt={project.title}
                      className="w-full h-[70vh] object-cover transition-all duration-300 ease-out group-hover:grayscale"
                    />
                  )}

                  {/* Title and Category inside the image */}
                  <div className="absolute bottom-0 left-0 px-4 py-2 bg-white transition-colors duration-300 ease-out group-hover:bg-black">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black transition-colors duration-300 ease-out group-hover:text-white">
                      {project.title.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}