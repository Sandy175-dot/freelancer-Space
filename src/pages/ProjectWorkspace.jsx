import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, FileText, Upload, Download, DollarSign,
  Clock, CheckCircle, User, Send, Paperclip, Target,
  TrendingUp, Shield, Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToastNotifications } from '../components/UI/Toast';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Avatar from '../components/UI/Avatar';
import Badge from '../components/UI/Badge';
import Tabs from '../components/UI/Tabs';

// Mock data
const mockMessages = [
  {
    id: 1,
    sender: 'client',
    senderName: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    message: 'Hi! Excited to start working with you on this project.',
    timestamp: '2024-01-20T10:30:00Z',
    type: 'text'
  },
  {
    id: 2,
    sender: 'freelancer',
    senderName: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    message: 'Thank you! I\'ll start with the wireframes and have the initial design ready by tomorrow.',
    timestamp: '2024-01-20T11:15:00Z',
    type: 'text'
  }
];

const mockMilestones = [
  {
    id: 1,
    title: 'Project Setup & Wireframes',
    description: 'Initial project setup, wireframes, and design mockups',
    amount: 8400,
    percentage: 30,
    status: 'completed',
    dueDate: '2024-01-25'
  },
  {
    id: 2,
    title: 'Frontend Development',
    description: 'React components, responsive design, and user interface',
    amount: 11200,
    percentage: 40,
    status: 'in_progress',
    dueDate: '2024-02-10',
    progress: 65
  }
];

const ProjectWorkspace = () => {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const { showSuccess } = useToastNotifications();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const { project, freelancer } = location.state || {
    project: {
      title: 'Build a Modern E-commerce Website',
      budget: 28000,
      deadline: '2024-03-01'
    },
    freelancer: {
      name: 'Rajesh Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    }
  };

  const isClient = user?.role === 'client';
  const currentUserRole = isClient ? 'client' : 'freelancer';

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: currentUserRole,
      senderName: user?.name || (isClient ? 'Sarah Johnson' : 'Rajesh Kumar'),
      avatar: user?.avatar || (isClient ? 
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' :
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      ),
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return new Date(date).toLocaleDateString();
  };

  const overallProgress = mockMilestones.reduce((acc, milestone) => {
    if (milestone.status === 'completed') return acc + milestone.percentage;
    if (milestone.status === 'in_progress') return acc + (milestone.progress || 0) * milestone.percentage / 100;
    return acc;
  }, 0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'messages', label: 'Messages', icon: MessageCircle, badge: messages.length },
    { id: 'files', label: 'Files', icon: FileText },
    { id: 'milestones', label: 'Milestones', icon: Target },
    { id: 'payments', label: 'Payments', icon: DollarSign }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <Card variant="glass" className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {project.title}
            </h2>
            <div className="flex items-center gap-4 text-white/70">
              <span>Budget: ₹{project.budget?.toLocaleString()}</span>
              <span>•</span>
              <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
            </div>
          </div>
          <Badge variant="success">Active</Badge>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-white font-semibold mb-3">Client</h3>
            <div className="flex items-center gap-3">
              <Avatar 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
                alt="Sarah Johnson"
                size="md"
              />
              <div>
                <div className="text-white font-medium">Sarah Johnson</div>
                <div className="text-white/60 text-sm">Project Owner</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-3">Freelancer</h3>
            <div className="flex items-center gap-3">
              <Avatar 
                src={freelancer.avatar}
                alt={freelancer.name}
                size="md"
              />
              <div>
                <div className="text-white font-medium">{freelancer.name}</div>
                <div className="text-white/60 text-sm">Developer</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="glass" className="p-4 text-center">
          <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">12</div>
          <div className="text-white/60 text-sm">Days Active</div>
        </Card>
        
        <Card variant="glass" className="p-4 text-center">
          <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{messages.length}</div>
          <div className="text-white/60 text-sm">Messages</div>
        </Card>
        
        <Card variant="glass" className="p-4 text-center">
          <FileText className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">4</div>
          <div className="text-white/60 text-sm">Files Shared</div>
        </Card>
        
        <Card variant="glass" className="p-4 text-center">
          <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">1</div>
          <div className="text-white/60 text-sm">Milestones Done</div>
        </Card>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.sender === currentUserRole ? 'flex-row-reverse' : ''}`}
          >
            <Avatar src={message.avatar} alt={message.senderName} size="sm" />
            
            <div className={`max-w-xs lg:max-w-md ${message.sender === currentUserRole ? 'text-right' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/80 text-xs font-medium">{message.senderName}</span>
                <span className="text-white/60 text-xs">{getTimeAgo(message.timestamp)}</span>
              </div>
              
              <div className={`
                p-3 rounded-lg text-sm
                ${message.sender === currentUserRole 
                  ? 'bg-primary text-white' 
                  : 'bg-white/10 text-white/90'
                }
              `}>
                {message.message}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
        
        <Button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="px-4"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  const renderFiles = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Project Files</h3>
        <Button size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Upload File
        </Button>
      </div>

      <div className="text-center py-12">
        <FileText className="w-12 h-12 text-white/30 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No files yet</h3>
        <p className="text-white/60">Upload files to share with your team</p>
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Project Milestones</h3>
        <div className="text-white/70 text-sm">
          {Math.round(overallProgress)}% Complete
        </div>
      </div>

      <div className="space-y-4">
        {mockMilestones.map((milestone) => (
          <Card key={milestone.id} variant="glass" className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-white font-semibold">{milestone.title}</h4>
                  <Badge 
                    variant={
                      milestone.status === 'completed' ? 'success' :
                      milestone.status === 'in_progress' ? 'warning' : 'secondary'
                    }
                  >
                    {milestone.status.replace('_', ' ')}
                  </Badge>
                </div>
                
                <p className="text-white/70 text-sm mb-3">
                  {milestone.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span>₹{milestone.amount.toLocaleString()}</span>
                  <span>•</span>
                  <span>{milestone.percentage}% of total</span>
                  <span>•</span>
                  <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {milestone.status === 'completed' && (
                  <Button size="sm" variant="outline" disabled>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Completed
                  </Button>
                )}
                
                {milestone.status === 'in_progress' && (
                  <Button
                    size="sm"
                    onClick={() => showSuccess('Payment request sent')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Request Payment
                  </Button>
                )}
              </div>
            </div>

            {milestone.status === 'in_progress' && milestone.progress && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-white/70 mb-1">
                  <span>Progress</span>
                  <span>{milestone.progress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${milestone.progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="glass" className="p-4 text-center">
          <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">₹{project.budget?.toLocaleString()}</div>
          <div className="text-white/60 text-sm">Total Budget</div>
        </Card>
        
        <Card variant="glass" className="p-4 text-center">
          <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">₹19,600</div>
          <div className="text-white/60 text-sm">In Escrow</div>
        </Card>
        
        <Card variant="glass" className="p-4 text-center">
          <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">₹8,400</div>
          <div className="text-white/60 text-sm">Released</div>
        </Card>
      </div>

      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Payment History</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <h4 className="text-white font-medium">Project Setup & Wireframes</h4>
              <p className="text-white/60 text-sm">Released on Jan 24, 2024</p>
            </div>
            
            <div className="text-right">
              <div className="text-white font-bold">₹8,400</div>
              <div className="text-green-400 text-sm flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Paid
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <h4 className="text-white font-medium">Frontend Development</h4>
              <p className="text-white/60 text-sm">In progress</p>
            </div>
            
            <div className="text-right">
              <div className="text-white font-bold">₹11,200</div>
              <div className="text-yellow-400 text-sm flex items-center gap-1">
                <Clock className="w-3 h-3" />
                In Escrow
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Project Workspace
              </h1>
              <p className="text-white/70">
                Collaborate and manage your project progress
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="success">Active Project</Badge>
              <div className="text-white/70 text-sm">
                {Math.round(overallProgress)}% Complete
              </div>
            </div>
          </div>
        </motion.div>

        <Card variant="glass" className="mb-8">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="border-b border-white/20"
          />
          
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {renderOverview()}
                </motion.div>
              )}
              
              {activeTab === 'messages' && (
                <motion.div
                  key="messages"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {renderMessages()}
                </motion.div>
              )}
              
              {activeTab === 'files' && (
                <motion.div
                  key="files"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {renderFiles()}
                </motion.div>
              )}
              
              {activeTab === 'milestones' && (
                <motion.div
                  key="milestones"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {renderMilestones()}
                </motion.div>
              )}
              
              {activeTab === 'payments' && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {renderPayments()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectWorkspace;