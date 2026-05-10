import React from 'react';
import { motion } from 'framer-motion';
import { mockAdvertisements } from '../data/mockData';

interface AdBannerProps {
  position: 'home_top' | 'home_sidebar' | 'course_detail';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  const ads = mockAdvertisements.filter(
    (ad) => ad.position === position && ad.is_active
  );

  if (ads.length === 0) return null;

  const ad = ads[0];

  const handleClick = () => {
    if (ad.link_url.startsWith('http')) {
      window.open(ad.link_url, '_blank');
    } else {
      window.location.hash = ad.link_url;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      className={`relative overflow-hidden rounded-xl cursor-pointer shadow-lg ${className}`}
    >
      <img
        src={ad.image_url}
        alt={ad.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg">{ad.title}</h3>
          <p className="text-white/80 text-sm mt-1">{ad.description}</p>
        </div>
      </div>
      <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
        广告
      </span>
    </motion.div>
  );
};

export default AdBanner;