import { motion } from 'framer-motion';
import { 
  Calendar, 
  DollarSign, 
  Clock, 
  User, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause
} from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'in-progress':
        return 'from-blue-500 to-indigo-500';
      case 'pending':
        return 'from-yellow-500 to-orange-500';
      case 'paused':
        return 'from-gray-500 to-slate-500';
      default:
        return 'from-indigo-500 to-purple-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'in-progress':
        return <Play className="w-5 h-5" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5" />;
      case 'paused':
        return <Pause className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-premium rounded-2xl p-6 hover-glow group cursor-pointer"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-gradient-primary transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-white/70 font-medium">{project.client}</p>
        </div>
        <div className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(project.status)} rounded-full flex items-center gap-2`}>
          {getStatusIcon(project.status)}
          <span className="text-white text-sm font-medium capitalize">
            {project.status.replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/80 text-sm">Progress</span>
          <span className="text-white font-semibold">{project.progress}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-2 bg-gradient-to-r ${getStatusColor(project.status)} rounded-full`}
          />
        </div>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white/60 text-xs">Budget</p>
            <p className="text-white font-semibold text-sm">{project.budget}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white/60 text-xs">Deadline</p>
            <p className="text-white font-semibold text-sm">{project.deadline}</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {project.skills.slice(0, 3).map((skill, skillIndex) => (
          <span
            key={skillIndex}
            className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white/90 rounded-lg text-xs font-medium border border-white/20"
          >
            {skill}
          </span>
        ))}
        {project.skills.length > 3 && (
          <span className="px-3 py-1 bg-white/10 text-white/70 rounded-lg text-xs font-medium border border-white/20">
            +{project.skills.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;