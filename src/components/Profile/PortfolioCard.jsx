import { motion } from 'framer-motion';
import { ExternalLink, Eye, Heart, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';

const PortfolioCard = ({ portfolio, index = 0 }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(portfolio.likes || 0);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleCardClick = () => {
    if (portfolio.link) {
      window.open(portfolio.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onClick={handleCardClick}
      className="glass-premium rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Portfolio Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
        {portfolio.image ? (
          <img
            src={portfolio.image}
            alt={portfolio.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-50">🎨</div>
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2 text-white">
              <Eye className="w-5 h-5" />
              <span className="font-medium">{portfolio.views || 0}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="font-medium">{likes}</span>
            </div>
          </motion.div>
        </div>

        {/* Category Badge */}
        {portfolio.category && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
              {portfolio.category}
            </span>
          </div>
        )}

        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20 hover:bg-black/80 transition-colors"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </motion.button>
      </div>

      {/* Portfolio Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-indigo-300 transition-colors">
              {portfolio.title}
            </h3>
            <p className="text-white/70 text-sm line-clamp-2">
              {portfolio.description}
            </p>
          </div>
          {portfolio.link && (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="ml-2 p-2 glass-light rounded-lg"
            >
              <ExternalLink className="w-4 h-4 text-white/80" />
            </motion.div>
          )}
        </div>

        {/* Tags */}
        {portfolio.tags && portfolio.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {portfolio.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 glass-light text-white/80 text-xs rounded-lg border border-white/10 flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {portfolio.tags.length > 3 && (
              <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-lg border border-indigo-500/30">
                +{portfolio.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <Calendar className="w-4 h-4" />
            <span>{portfolio.date || 'Recently'}</span>
          </div>
          
          <div className="flex items-center gap-3 text-white/60 text-xs">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{portfolio.views || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
