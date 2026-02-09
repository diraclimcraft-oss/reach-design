'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { HousePlus, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Helper function to extract YouTube video ID
function getYouTubeID(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }
  // Try alternative pattern for youtu.be links with parameters
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  return shortMatch ? shortMatch[1] : null;
}

export default function ProjectDetail() {
  const params = useParams();
  const { slug } = params;
  const router = useRouter();
  const horizontalRef = useRef(null);
  const containerRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const [project, setProject] = useState(null);

  // Fetch project from Sanity
  useEffect(() => {
    client
      .fetch(
        `*[_type == "project" && slug.current == $slug][0]{
          title,
          category,
          mainImage,
          "images": images[].asset->url,
          description,
          video,
          location,
          noOfStories,
          siteArea
        }`,
        { slug }
      )
      .then((data) => {
        if (!data) notFound();
        setProject(data);
      })
      .catch(console.error);
  }, [slug]);

  // GSAP horizontal scroll
  useEffect(() => {
    if (!project) return;
    if (window.innerWidth < 768) return;

    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    if (!container || !horizontal) return;

    const scrollWidth = horizontal.scrollWidth;
    const windowWidth = window.innerWidth;

    const tl = gsap.to(horizontal, {
      x: -(scrollWidth - windowWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
      },
    });

    scrollTriggerRef.current = tl.scrollTrigger;

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  }, [project]);

  const handleBack = () => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
      scrollTriggerRef.current = null;
    }
    router.back();
  };

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const videoId = getYouTubeID(project.video);

  // Debug log
  console.log('Video URL from Sanity:', project.video);
  console.log('Extracted Video ID:', videoId);

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-8 md:top-4 left-4 md:left-8 right-4 md:right-8 flex justify-between items-center z-50">
        <Link href="/">
          <HousePlus className="h-6 md:h-8 w-6 md:w-8 text-white cursor-pointer drop-shadow-lg" />
        </Link>
        <button onClick={handleBack} className="text-white cursor-pointer">
          <X className="h-6 md:h-8 w-6 md:w-8 drop-shadow-lg" />
        </button>
      </div>

      <div className="bg-black text-white">
        {/* Mobile vertical scroll */}
        <div className="2xl:hidden min-h-screen">
          {project.mainImage && (
            <div className="flex items-center justify-center pt-20 px-4">
              <img
                src={urlFor(project.mainImage).width(1200).url()}
                alt={project.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          )}

          {/* Project details */}
          <div className="px-6 py-16">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">{project.title}</h1>

            <div className="space-y-2 text-sm text-gray-300 mb-6">
              {project.category && (
                    <p>
                      <span className="text-white font-semibold">Category:</span>{' '}
                      {project.category.replace(/-/g, ' ').toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                    </p>
                  )}
              {project.location && <p><span className="text-white font-semibold">Location:</span> {project.location}</p>}
              {project.noOfStories && <p><span className="text-white font-semibold">Stories:</span> {project.noOfStories}</p>}
              {project.siteArea && <p><span className="text-white font-semibold">Site Area:</span> {project.siteArea} m²</p>}
            </div>

            {project.description && (
              <p className="text-sm md:text-base leading-relaxed text-gray-200">{project.description}</p>
            )}
          </div>

          {/* Image gallery */}
          {project.images && project.images.map((img, idx) => (
            <div key={idx} className="px-2 py-8">
              <img
                src={img}
                alt={`${project.title} - Image ${idx + 1}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          ))}

          {/* Video section - Mobile */}
          {project.video && videoId && (
            <div className="px-4 py-8">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-900">
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center group"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          )}
          {project.video && !videoId && (
            <div className="px-4 py-8">
              <p className="text-sm text-gray-400 text-center">Invalid YouTube URL</p>
            </div>
          )}

          <div className="h-32" />
        </div>

        {/* Desktop horizontal scroll */}
        <div ref={containerRef} className="hidden 2xl:block relative h-screen overflow-hidden">
          <div ref={horizontalRef} className="flex h-full">
            {/* Main hero image */}
            {project.mainImage && (
              <div className="shrink-0 h-screen flex items-center justify-center w-screen pt-20">
                <img
                  src={urlFor(project.mainImage).width(1200).url()}
                  alt={project.title}
                  className="h-full w-auto object-cover rounded-lg"
                />
              </div>
            )}

            {/* Project details */}
            <div className="shrink-0 h-screen flex items-center justify-center px-16 bg-black" style={{ width: '50vw' }}>
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">{project.title}</h1>

                <div className="space-y-3 text-lg text-gray-300 mb-6">
                  {project.category && (
                    <p>
                      <span className="text-white font-semibold">Category:</span>{' '}
                      {project.category.replace(/-/g, ' ').toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                    </p>
                  )}
                  {project.location && <p><span className="text-white font-semibold">Location:</span> {project.location}</p>}
                  {project.noOfStories && <p><span className="text-white font-semibold">Stories:</span> {project.noOfStories}</p>}
                  {project.siteArea && <p><span className="text-white font-semibold">Site Area:</span> {project.siteArea} m²</p>}
                </div>

                {project.description && (
                  <p className="text-lg leading-relaxed text-gray-200">{project.description}</p>
                )}
              </div>
            </div>

            {/* Image gallery */}
            {project.images && project.images.map((img, idx) => (
              <div key={idx} className="shrink-0 h-screen flex items-center justify-center w-screen pt-20">
                <img
                  src={img}
                  alt={`${project.title} - Image ${idx + 1}`}
                  className="h-full w-auto object-cover rounded-lg"
                />
              </div>
            ))}

            {/* Video section - Desktop */}
            {project.video && videoId && (
              <div className="shrink-0 h-screen flex items-center justify-center w-screen px-16 bg-black">
                <div className="relative w-full max-w-5xl aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center group"
                    style={{
                      backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
                      <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            )}
            {project.video && !videoId && (
              <div className="shrink-0 h-screen flex items-center justify-center w-screen px-16 bg-black">
                <p className="text-gray-400">Invalid YouTube URL</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}