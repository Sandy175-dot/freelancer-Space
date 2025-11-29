import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Briefcase, Users, TrendingUp, Shield, Zap, Globe,
  CheckCircle, ArrowRight, Star, Award, Target, Rocket
} from 'lucide-react';

const Solutions = () => {
  const solutions = [
    {
      title: 'For Businesses',
      icon: Briefcase,
      description: 'Find and hire top talent for your projects',
      features: [
        'Access to verified freelancers',
        'Secure payment system',
        'Project management tools',
        'Quality guarantee'
      ],
      cta: 'Hire Talent',
      link: '/browse-freelancers',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'For Freelancers',
      icon: Users,
      description: 'Find great projects and grow your career',
      features: [
        'Browse thousands of jobs',
        'Get paid on time',
        'Build your portfolio',
        'Flexible work schedule'
      ],
      cta: 'Find Work',
      link: '/browse-jobs',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'For Enterprises',
      icon: Globe,
      description: 'Scale your team with enterprise solutions',
      features: [
        'Dedicated account manager',
        'Custom workflows',
        'Advanced analytics',
        'Priority support'
      ],
      cta: 'Contact Sales',
      link: '/contact',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Escrow protection for all transactions'
    },
    {
      icon: Zap,
      title: 'Fast Hiring',
      description: 'Get proposals within minutes'
    },
    {
      icon: Award,
      title: 'Top Quality',
      description: 'Verified and rated professionals'
    },
    {
      icon: Target,
      title: 'Perfect Match',
      description: 'AI-powered talent matching'
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/pexels-pixabay-355465.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/85 to-indigo-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Solutions for Every Need
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Whether you're hiring talent or looking for work, we have the perfect solution for you
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass-premium rounded-2xl p-8 hover:shadow-2xl transition-all"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-xl flex items-center justify-center mb-6`}>
                <solution.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
              <p className="text-white/70 mb-6">{solution.description}</p>
              
              <ul className="space-y-3 mb-8">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-white/80">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to={solution.link}
                className={`w-full btn-premium text-white font-semibold rounded-xl flex items-center justify-center gap-2 group`}
              >
                {solution.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why Choose FreelanceHub?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="glass-premium rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="glass-premium rounded-2xl p-12 text-center"
        >
          <Rocket className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of businesses and freelancers who trust FreelanceHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 btn-premium text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Sign Up Free
            </Link>
            <Link
              to="/browse-freelancers"
              className="px-8 py-4 glass-light border border-white/20 text-white font-semibold rounded-xl hover:glass-medium transition-all"
            >
              Explore Talent
            </Link>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default Solutions;
