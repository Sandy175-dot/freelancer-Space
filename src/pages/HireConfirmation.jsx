import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Star, MapPin, Briefcase, DollarSign, 
  Clock, Shield, CheckCircle, AlertTriangle,
  ArrowRight, ArrowLeft, Zap, Award, TrendingUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToastNotifications } from '../components/UI/Toast';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import RatingStars from '../components/UI/RatingStars';
import Avatar from '../components/UI/Avatar';
import Badge from '../components/UI/Badge';

const HireConfirmation = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToastNotifications();
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get data from navigation state
  const { bid, project } = location.state || {};
  
  if (!bid || !project) {
    navigate(`/project/${id}`);
    return null;
  }

  const handleConfirmHire = () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`/payment/${id}`, { 
        state: { 
          bid, 
          project,
          type: 'hire'
        } 
      });
    }, 2000);
  };

  const handleCancel = () => {
    navigate(`/project/${id}`);
  };

  const platformFee = Math.round(bid.amount * 0.05); // 5% platform fee
  const totalAmount = bid.amount + platformFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Hire Freelancer
            </h1>
            <p className="text-white/70">
              Review the details and confirm your hiring decision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Freelancer Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card variant="glass" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Freelancer Details
                  </h2>
                  
                  <div className="flex items-start gap-6">
                    <Avatar 
                      src={bid.freelancer.avatar} 
                      alt={bid.freelancer.name}
                      size="xl"
                      className="ring-4 ring-white/20"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">
                          {bid.freelancer.name}
                        </h3>
                        {bid.freelancer.verified && (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-white/70 mb-4">
                        <div className="flex items-center gap-1">
                          <RatingStars rating={bid.freelancer.rating} size="sm" readonly />
                          <span className="font-medium">
                            {bid.freelancer.rating} ({bid.freelancer.reviewsCount} reviews)
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {bid.freelancer.location}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-xl font-bold text-white">
                            {bid.freelancer.completedProjects}
                          </div>
                          <div className="text-xs text-white/60">Projects</div>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-xl font-bold text-white">
                            {bid.freelancer.successRate}%
                          </div>
                          <div className="text-xs text-white/60">Success Rate</div>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-xl font-bold text-white">
                            {bid.deliveryDays}
                          </div>
                          <div className="text-xs text-white/60">Days</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {bid.freelancer.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" size="sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Project Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="glass" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Project Summary
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="primary" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Proposal Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="glass" className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    Proposal Details
                  </h2>
                  
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <p className="text-white/80 text-sm leading-relaxed">
                      {bid.coverLetter}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <DollarSign className="w-8 h-8 text-green-400" />
                      <div>
                        <div className="text-white/60 text-sm">Bid Amount</div>
                        <div className="text-white font-bold text-lg">
                          ₹{bid.amount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <Clock className="w-8 h-8 text-blue-400" />
                      <div>
                        <div className="text-white/60 text-sm">Delivery Time</div>
                        <div className="text-white font-bold text-lg">
                          {bid.deliveryDays} days
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="glass" className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Payment Summary
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Project Amount</span>
                      <span className="text-white font-medium">
                        ₹{bid.amount.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Platform Fee (5%)</span>
                      <span className="text-white font-medium">
                        ₹{platformFee.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="border-t border-white/20 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">Total Amount</span>
                        <span className="text-white font-bold text-xl">
                          ₹{totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button
                      onClick={handleConfirmHire}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-primary to-secondary py-3"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Confirm & Proceed to Payment
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="w-full"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card variant="glass" className="p-6 text-center">
                  <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Secure Escrow Protection
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Payments are securely held in escrow until project completion. 
                    Release funds only when you're satisfied with the work.
                  </p>
                  
                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>100% Money Back Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Dispute Resolution Support</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>24/7 Customer Support</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Confirmation Message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card variant="glass" className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">
                        Confirm Your Decision
                      </h3>
                      <p className="text-white/70 text-sm">
                        Are you sure you want to hire <strong>{bid.freelancer.name}</strong> for 
                        <strong> ₹{bid.amount.toLocaleString()}</strong>?
                      </p>
                      <p className="text-white/60 text-xs mt-2">
                        This action will start the project and move funds to escrow.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Freelancer Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card variant="glass" className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Why Choose This Freelancer?
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-yellow-400" />
                      <span className="text-white/80 text-sm">
                        Top-rated freelancer with {bid.freelancer.successRate}% success rate
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-white/80 text-sm">
                        Completed {bid.freelancer.completedProjects}+ similar projects
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-blue-400" />
                      <span className="text-white/80 text-sm">
                        Fast delivery in {bid.deliveryDays} days
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireConfirmation;