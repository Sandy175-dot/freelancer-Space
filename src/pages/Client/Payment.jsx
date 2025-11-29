import { useState } from 'react';
import { CreditCard, DollarSign, Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const escrowTransactions = [
    {
      id: 1,
      project: 'E-commerce Website Development',
      freelancer: 'John Doe',
      amount: '₹5000',
      status: 'In Escrow',
      milestone: 'Frontend Development',
      date: '2025-01-15',
      releaseDate: '2025-01-25'
    },
    {
      id: 2,
      project: 'Mobile App UI/UX Design',
      freelancer: 'Sarah Smith',
      amount: '₹3000',
      status: 'Released',
      milestone: 'Final Delivery',
      date: '2025-01-10',
      releaseDate: '2025-01-20'
    },
    {
      id: 3,
      project: 'Content Writing for Blog',
      freelancer: 'Mike Johnson',
      amount: '₹800',
      status: 'Pending Release',
      milestone: 'Article Delivery',
      date: '2025-01-18',
      releaseDate: 'Pending'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      icon: '💳',
      details: '•••• •••• •••• 4242',
      expiry: '12/25',
      default: true
    },
    {
      id: 2,
      type: 'PayPal',
      icon: '🅿️',
      details: 'john@example.com',
      expiry: null,
      default: false
    },
    {
      id: 3,
      type: 'Bank Transfer',
      icon: '🏦',
      details: 'Account ending in 7890',
      expiry: null,
      default: false
    }
  ];

  const stats = [
    { label: 'In Escrow', value: '₹8,000', icon: <Shield className="h-6 w-6" />, color: 'pastel-purple' },
    { label: 'Released This Month', value: '₹12,500', icon: <CheckCircle className="h-6 w-6" />, color: 'pastel-mint' },
    { label: 'Pending Release', value: '₹1,800', icon: <Clock className="h-6 w-6" />, color: 'pastel-yellow' },
    { label: 'Total Spent', value: '₹45,200', icon: <DollarSign className="h-6 w-6" />, color: 'pastel-coral' }
  ];

  const handleReleaseFunds = (transactionId) => {
    alert(`Funds released for transaction ${transactionId}`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
          Payment & Escrow
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <div className={`w-12 h-12 rounded-lg bg-${stat.color}/20 flex items-center justify-center mb-4 text-${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Escrow Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Escrow Transactions</h2>
              
              <div className="space-y-4">
                {escrowTransactions.map((transaction) => (
                  <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{transaction.project}</h3>
                        <p className="text-sm text-gray-600">
                          Freelancer: <span className="font-medium">{transaction.freelancer}</span>
                        </p>
                        <p className="text-sm text-gray-600">Milestone: {transaction.milestone}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-pastel-mint mb-1">{transaction.amount}</div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          transaction.status === 'In Escrow'
                            ? 'bg-pastel-purple/20 text-purple-700'
                            : transaction.status === 'Released'
                            ? 'bg-pastel-mint/30 text-green-700'
                            : 'bg-pastel-yellow/30 text-yellow-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>Deposited: {transaction.date}</span>
                      <span>Release: {transaction.releaseDate}</span>
                    </div>

                    {transaction.status === 'Pending Release' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReleaseFunds(transaction.id)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition text-sm"
                        >
                          Release Funds
                        </button>
                        <button className="px-4 py-2 bg-pastel-coral/20 text-red-700 rounded-lg hover:bg-pastel-coral/30 transition text-sm">
                          Raise Dispute
                        </button>
                      </div>
                    )}

                    {transaction.status === 'In Escrow' && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>Waiting for milestone completion</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* How Escrow Works */}
            <div className="bg-gradient-to-r from-pastel-purple/20 to-pastel-pink/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>How Escrow Works</span>
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-pastel-purple/30 rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                  <p>You deposit funds into escrow when hiring a freelancer</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-pastel-purple/30 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                  <p>Freelancer completes the work according to milestones</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-pastel-purple/30 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                  <p>You review and approve the work</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-pastel-purple/30 rounded-full flex items-center justify-center text-xs font-semibold">4</span>
                  <p>Funds are released to the freelancer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Payment Methods</h2>
                <button className="text-pastel-purple hover:text-pastel-pink text-sm">
                  + Add New
                </button>
              </div>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedPayment === method.id || method.default
                        ? 'border-pastel-purple bg-pastel-purple/5'
                        : 'border-gray-200 hover:border-pastel-purple/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{method.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{method.type}</h3>
                        <p className="text-sm text-gray-600">{method.details}</p>
                        {method.expiry && (
                          <p className="text-xs text-gray-500">Expires {method.expiry}</p>
                        )}
                      </div>
                      {method.default && (
                        <span className="px-2 py-1 bg-pastel-mint/30 text-green-700 rounded text-xs">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-pastel-blue/20 text-gray-700 rounded-lg hover:bg-pastel-blue/30 transition text-left">
                  <div className="font-medium">Add Funds to Balance</div>
                  <div className="text-xs text-gray-600">Preload your account</div>
                </button>
                <button className="w-full px-4 py-3 bg-pastel-mint/20 text-gray-700 rounded-lg hover:bg-pastel-mint/30 transition text-left">
                  <div className="font-medium">View Transaction History</div>
                  <div className="text-xs text-gray-600">See all payments</div>
                </button>
                <button className="w-full px-4 py-3 bg-pastel-purple/20 text-gray-700 rounded-lg hover:bg-pastel-purple/30 transition text-left">
                  <div className="font-medium">Download Invoices</div>
                  <div className="text-xs text-gray-600">Get receipts</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
