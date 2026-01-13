import React from 'react';
import Image from '../atoms/Image';
import Typography from '../atoms/Typography';

export default function WorkCard({ title, description, image, onClick }) {
    return (
        <div
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            onClick={onClick}
        >
            {/* Image Container with Overlay */}
            <div className="relative aspect-video w-full overflow-hidden">
                <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-110">
                    <Image
                        src={image}
                        alt={title}
                        width={400} // Default reasonable width
                        height={225}
                        variant="default"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            {/* Content Content - Positioned to overlay on bottom or just below */}
            <div className="relative z-20 p-6">
                <Typography
                    variant="h3"
                    className="mb-2 text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-blue-500"
                >
                    {title}
                </Typography>
                <Typography
                    variant="body"
                    className="line-clamp-2 text-gray-600 dark:text-gray-300"
                >
                    {description}
                </Typography>

                <div className="mt-4 flex items-center text-sm font-medium text-blue-500 dark:text-blue-400 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    View Project
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
