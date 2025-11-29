import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, Smartphone, Building2, Shield, Lock,
  CheckCircle, ArrowLeft, ArrowRight, AlertCircle,
  DollarSign, Clock, User, Briefcase, Zap, Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToastNotifications } from '../components/UI/Toast';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Avatar from '../components/UI/Avatar';

const PAYMENT_METHODS = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, Rupay',
    popular: true
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: Smartphone,
    description: 'Google Pay, PhonePe, Paytm'
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: Building2,
    description: 'All major banks supported'
  }
];

const Payment = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToastNotifications();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Get data from navigation state
  const { bid, project, type } = location.state || {};
  
  if (!bid || !project) {
    navigate(`/project/${id}`);
    return null;
  }

  const platformFee = Math.round(bid.amount * 0.05);
  const totalAmount = bid.amount + platformFee;

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
    setCurrentStep(2);
  };

  const handleCardInputChange = (field, value) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validatePayment = () => {
    if (selectedPaymentMethod === 'card') {
      return cardDetails.number.replace(/\s/g, '').length >= 16 &&
             cardDetails.expiry.length === 5 &&
             cardDetails.cvv.length >= 3 &&
             cardDetails.name.trim().length > 0;
    }
    return true;
  };

  const processPayment = async () => {
    if (!validatePayment()) {
      showError('Please fill in all payment details');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setPaymentSuccess(true);
      setCurrentStep(3);
      
      setTimeout(() => {
        navigate(`/project/${id}/workspace`, {
          state: { project, freelancer: bid.freelancer }
        });
      }, 3000);
      
    } catch (error) {
      showError('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const renderPaymentMethods = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Select Payment Method
      </h2>
      
      {PAYMENT_METHODS.map((method) => {
        const Icon = method.icon;
        return (
          <motion.button
            key={method.id}
            onClick={() => handlePaymentMethodSelect(method.id)}
            className="w-full p-4 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:border-white/40 transition-all duration-200 text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold">{method.name}</h3>
                  {method.popular && (
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-white/60 text-sm">{method.description}</p>
              </div>
              
              <ArrowRight className="w-5 h-5 text-white/60" />
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );

  const renderCardForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(1)}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold text-white">
          Enter Card Details
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Card Number
          </label>
          <input
            type="text"
            value={cardDetails.number}
            onChange={(e) => handleCardInputChange('number', formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              value={cardDetails.expiry}
              onChange={(e) => handleCardInputChange('expiry', formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              CVV
            </label>
            <input
              type="text"
              value={cardDetails.cvv}
              onChange={(e) => handleCardInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardDetails.name}
            onChange={(e) => handleCardInputChange('name', e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
      </div>

      <Button
        onClick={processPayment}
        disabled={isProcessing || !validatePayment()}
        className="w-full bg-gradient-to-r from-primary to-secondary py-3"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Pay ₹{totalAmount.toLocaleString()}
          </>
        )}
      </Button>
    </motion.div>
  );

  const renderUPIForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(1)}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold text-white">
          UPI Payment
        </h2>
      </div>

      <div className="text-center py-8">
        <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
          <div className="text-gray-800 text-sm">QR Code Placeholder</div>
        </div>
        
        <p className="text-white/80 mb-4">
          Scan QR code with any UPI app
        </p>
        
        <div className="text-center">
          <p className="text-white/60 text-sm mb-2">Or pay using UPI ID:</p>
          <p className="text-white font-mono bg-white/10 px-4 py-2 rounded">
            freelancehub@upi
          </p>
        </div>
      </div>

      <Button
        onClick={processPayment}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-primary to-secondary py-3"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Verifying Payment...
          </>
        ) : (
          <>
            I have completed the payment
          </>
        )}
      </Button>
    </motion.div>
  );

  const renderNetBankingForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(1)}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold text-white">
          Net Banking
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Select Your Bank
        </label>
        <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
          <option value="">Choose your bank</option>
          <option value="sbi">State Bank of India</option>
          <option value="hdfc">HDFC Bank</option>
          <option value="icici">ICICI Bank</option>
          <option value="axis">Axis Bank</option>
          <option value="kotak">Kotak Mahindra Bank</option>
          <option value="pnb">Punjab National Bank</option>
        </select>
      </div>

      <Button
        onClick={processPayment}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-primary to-secondary py-3"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Redirecting to Bank...
          </>
        ) : (
          <>
            Proceed to Bank Website
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-12 h-12 text-white" />
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-white mb-4"
      >
        Payment Successful!
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-white/70 text-lg mb-8"
      >
        Your payment of ₹{totalAmount.toLocaleString()} has been secured in escrow
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-8"
      >
        <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
          <Shield className="w-6 h-6" />
          <span className="font-semibold">Funds Secured in Escrow</span>
        </div>
        <p className="text-green-300/80 text-sm">
          Your money is safely held until the project is completed to your satisfaction
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-white/60 text-sm"
      >
        Redirecting to project workspace in 3 seconds...
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Secure Payment
            </h1>
            <p className="text-white/70">
              Complete your payment to start the project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card variant="glass" className="p-8">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && renderPaymentMethods()}
                  {currentStep === 2 && selectedPaymentMethod === 'card' && renderCardForm()}
                  {currentStep === 2 && selectedPaymentMethod === 'upi' && renderUPIForm()}
                  {currentStep === 2 && selectedPaymentMethod === 'netbanking' && renderNetBankingForm()}
                  {currentStep === 3 && renderSuccess()}
                </AnimatePresence>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Payment Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="glass" className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Payment Summary
                  </h3>
                  
                  <div className="space-y-3 mb-6">
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

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium text-sm">Payment Protection</span>
                    </div>
                    <p className="text-blue-300/80 text-xs">
                      Funds will be held securely in escrow until project completion
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Project Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="glass" className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Project Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-1">
                        {project.title}
                      </h4>
                      <p className="text-white/60 text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-white/5 rounded">
                        <DollarSign className="w-4 h-4 text-green-400 mx-auto mb-1" />
                        <div className="text-white text-sm font-medium">
                          ₹{bid.amount.toLocaleString()}
                        </div>
                        <div className="text-white/60 text-xs">Budget</div>
                      </div>
                      
                      <div className="text-center p-2 bg-white/5 rounded">
                        <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <div className="text-white text-sm font-medium">
                          {bid.deliveryDays} days
                        </div>
                        <div className="text-white/60 text-xs">Delivery</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Freelancer Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="glass" className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Freelancer
                  </h3>
                  
                  <div className="flex items-center gap-3">
                    <Avatar 
                      src={bid.freelancer.avatar} 
                      alt={bid.freelancer.name}
                      size="md"
                      className="ring-2 ring-white/20"
                    />
                    
                    <div className="flex-1">
                      <h4 className="text-white font-medium">
                        {bid.freelancer.name}
                      </h4>
                      <div className="flex items-center gap-1 text-sm text-white/70">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span>{bid.freelancer.rating}</span>
                        <span>({bid.freelancer.reviewsCount})</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Security Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card variant="glass" className="p-6 text-center">
                  <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    256-bit SSL Encryption
                  </h3>
                  <p className="text-white/70 text-sm">
                    Your payment information is encrypted and secure
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;