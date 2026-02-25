import { Article } from '@/types/News.type';
import Image from 'next/image';
import Link from 'next/link';
import { User, ExternalLink } from 'lucide-react';

const NewsCard = ({ author, description, title, url, urlToImage }: Article) => {
  return (
    <Link
      href={url}
      target='_blank'
      className='group block bg-white/90 backdrop-blur-xl
      rounded-3xl shadow-xl border border-white/40
      overflow-hidden transition-all duration-500
      hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]'
    >
      {/* Image */}
      <div className='relative h-52 w-full overflow-hidden'>
        {urlToImage ? (
          <Image
            src={urlToImage}
            alt={title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-110'
          />
        ) : (
          <div className='h-full flex items-center justify-center bg-orange-100 text-orange-500'>
            <ExternalLink size={40} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className='p-5 space-y-3'>
        {/* Author */}
        {author && (
          <div className='flex items-center gap-2 text-sm text-gray-600'>
            <User size={16} />
            <span>{author}</span>
          </div>
        )}

        {/* Title */}
        <h2
          className='text-lg font-semibold text-gray-800
        group-hover:text-orange-600 transition-colors duration-300'
        >
          {title}
        </h2>

        {/* Description */}
        <p className='text-sm text-gray-600 line-clamp-3'>{description}</p>

        {/* Read more */}
        <div
          className='flex items-center gap-2 text-orange-600 text-sm font-medium 
        opacity-0 group-hover:opacity-100 transition-all duration-300'
        >
          Читати більше
          <ExternalLink size={14} />
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
