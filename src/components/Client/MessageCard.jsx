import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle,
  Circle,
  Shield,
  Award
} from 'lucide-react';

const MessageCard = ({ message, index }) => {
  const generateAvatar = (name) => {
    const colors = [
      'from-blue-500 to-indigo-500',
      'from-purple-500 to-violet-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-pink-500 to-rose-500',
      'from-cyan-500 to-blue-500'
    ];
    const colorIndex = name.charCodeAt(0) % colors.length;
    return colors[colorIndex];
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        x: 5,
        boxShadow: "0 10px 25px rgba(99, 102, 241, 0.1)"
      }}
      className={`glass-light rounded-2xl p-4 hover:glass-medium transition-all duration-300 cursor-pointer border-l-4 ${
        message.unread 
          ? 'border-indigo-500 bg-indigo-500/5' 
          : 'border-white/20'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className={`w-10 h-10 bg-gradient-to-r ${generateAvatar(message.sender.name)} rounded-full flex items-center justify-center shadow-lg`}>
            <span className="text-white font-bold text-sm">
              {message.sender.name.charAt(0)}
            </span>
          </div>
          {message.sender.verified && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-2.5 h-2.5 text-white" />
            </div>
          )}
          {message.sender.online && (
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h4 className={`font-semibold ${message.unread ? 'text-white' : 'text-white/80'}`}>
                {message.sender.name}
              </h4>
              {message.sender.verified && (
                <Shield className="w-3 h-3 text-green-400" />
              )}
              {message.sender.topRated && (
                <Award className="w-3 h-3 text-yellow-400" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-xs">{message.timestamp}</span>
              {message.unread ? (
                <Circle className="w-2 h-2 fill-indigo-400 text-indigo-400" />
              ) : (
                <CheckCircle className="w-3 h-3 text-white/40" />
              )}
            </div>
          </div>
          
          <p className="text-white/70 text-sm mb-2">{message.project}</p>
          
          <p className={`text-sm line-clamp-2 ${
            message.unread ? 'text-white/90' : 'text-white/70'
          }`}>
            {message.preview}
          </p>
          
          {message.attachments && message.attachments > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <MessageSquare className="w-3 h-3 text-white/60" />
              <span className="text-white/60 text-xs">
                {message.attachments} attachment{message.attachments > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageCard;