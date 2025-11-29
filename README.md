# FreelanceHub �

### Modern Freelancer Marketplace Platform

*Connect talented freelancers with clients worldwide*

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoCoss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](#) • [Documentation](#-documentation) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 🌟 Overview

FreelanceHub is a **full-featured freelancer marketplace** built with modern web technologies. Inspired by platforms like Fiverr and Upwork, it offers a seamless experience for freelancers, clients, and administrators with a beautiful, responsive UI featuring **dark mode**, **interactive charts**, and **smooth animations**.

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [Design System](#-design-system)
- [Tech Stack](#-tech-stack)
- [Screenshots](#%EF%B8%8F-screenshots)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)
- [Project Structure](#%EF%B8%8F-project-structure)
- [Usage Guide](#-usage-guide)
- [Available Scripts](#-available-scripts)
- [Customization](#-customization)
- [Completed Features](#-recently-completed-features)
- [Roadmap](#-roadmap--future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## ✨ Key Features

### 🎨 Modern UI/UX
- 🌓 **Dark/Light Mode** - Seamless theme switching with persistent preferences
- 📊 **Interactive Charts** - Real-time analytics with Recharts (earnings, projects, activity)
- ⏳ **Skeleton Loaders** - Smooth loading states for better UX
- 💫 **Framer Motion Animations** - Fluid page transitions and hover effects
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern Color Palette** - Professional gradients and pastel accents

### 🌐 Public Pages
- **Landing Page** - Hero section with search, animated elements, and floating cards
- **Browse Jobs** - Advanced filtering with skeleton loaders and category tags
- **Browse Freelancers** - Find talent by skills, ratings, and availability
- **About Us** - Company mission and values
- **Help & FAQ** - Searchable knowledge base

### 🔐 Authentication
- **Sign Up** - Register as Freelancer or Client with role selection
- **Login** - Secure authentication with remember me option
- **Password Reset** - Forgot password functionality with email verification

### 💼 Freelancer Dashboard
- **📊 Analytics Dashboard** - Beautiful charts showing:
  - 📈 Earnings overview (6-month trend with area chart)
  - 🥧 Project distribution (pie chart by status)
  - 📅 Weekly activity (bar chart of hours worked)
- **📋 Stats Cards** - Animated progress bars for key metrics
- **🎯 Active Projects** - Project cards with progress tracking
- **💼 Job Search** - Browse and bid on jobs with cover letters
- **🎨 My Gigs** - Create and manage service offerings
- **👤 Profile Management** - Skills, experience, certifications, portfolio
- **💰 Earnings** - Income tracking with visual analytics
- **💬 Messages** - Communication system with clients

### 👔 Client Dashboard
- **Client Dashboard** - Overview of active jobs and hired freelancers
- **Post a Job** - Detailed job posting with skills, budget, and timeline
- **Payment & Escrow** - Secure payment system with escrow protection

### 🛡️ Admin Panel
- **Analytics Dashboard** - Comprehensive stats with revenue and user growth charts
- **User Management** - Manage all users with search, filter, and actions

## 🎨 Design System

### Color Palette
Professional gradients with extended scales:
- **Primary**: Purple `#A855F7` (50-900 scale)
- **Secondary**: Pink `#EC4899` (50-900 scale)
- **Accent**: Teal/Mint `#10B981` (50-900 scale)
- **Info**: Blue `#0EA5E9` (50-900 scale)
- **Coral**: `#F43F5E` for highlights

### Visual Elements
- **Gradients**: Purple → Pink for CTAs
- **Shadows**: Soft, elevated, and glow effects
- **Animations**: Entrance, hover, and loading states
- **Typography**: Clean, modern sans-serif hierarchy
- **Icons**: Lucide React icon set
- **Scrollbar**: Custom styled for both themes

## 🚀 Tech Stack

### Core
- **React 19** - Latest React with modern hooks and features
- **Vite 6** - Lightning-fast build tool and dev server
- **React Router v6** - Declarative client-side routing

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion** - Production-ready animations
- **Lucide React** - Beautiful, consistent icon library

### Data Visualization
- **Recharts** - Composable charting library for React
  - Area charts, Pie charts, Bar charts
  - Responsive and interactive tooltips

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - Authentication & user management
  - PostgreSQL database
  - Real-time subscriptions
  - Storage for file uploads

### Additional Tools
- **date-fns** - Modern date utility library
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## 🖼️ Screenshots

<div align="center">

### Light Mode
![Landing Page Light](docs/screenshots/landing-light.png)
*Modern landing page with hero section and search*

![Dashboard Light](docs/screenshots/dashboard-light.png)
*Freelancer dashboard with interactive charts*

### Dark Mode
![Landing Page Dark](docs/screenshots/landing-dark.png)
*Seamless dark mode experience*

![Dashboard Dark](docs/screenshots/dashboard-dark.png)
*Dark mode dashboard with vibrant charts*

</div>

> **Note**: Screenshots will be added soon. See the live demo for the actual experience!

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/freelancerhub.git
   cd freelancerhubsandip
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database** (Optional)
   
   If you want full functionality:
   ```bash
   # See DATABASE_SETUP.md for detailed instructions
   # Run the SQL schema in your Supabase SQL editor
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`
   
   🎉 You're all set! The app runs with hot module replacement.

## 📚 Documentation

- **[UI Improvements Summary](UI_IMPROVEMENTS_SUMMARY.md)** - Detailed UI/UX changes
- **[Hero Image Setup Guide](HERO_IMAGE_SETUP_GUIDE.md)** - Custom hero image integration
- **[Hero Image Prompts](HERO_IMAGE_PROMPTS.md)** - AI generation prompts
- **[Database Setup](DATABASE_SETUP.md)** - Supabase configuration
- **[Changelog](CHANGELOG.md)** - Version history and updates

---

## 🏭️ Project Structure

```
freelancerhubsandip/
├── public/
│   └── assets/              # Static assets (images, icons)
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx        # Navigation with dark mode toggle
│   │   │   └── Footer.jsx        # Site footer
│   │   └── Skeletons/         # Loading skeletons (NEW)
│   │       ├── JobCardSkeleton.jsx
│   │       ├── ProfileCardSkeleton.jsx
│   │       └── DashboardSkeleton.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx    # Authentication state
│   │   └── ThemeContext.jsx   # Dark/Light mode (NEW)
│   ├── pages/
│   │   ├── Landing.jsx        # Enhanced hero & animations
│   │   ├── BrowseJobs.jsx     # Jobs with skeleton loaders
│   │   ├── BrowseFreelancers.jsx
│   │   ├── About.jsx
│   │   ├── Help.jsx
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── Freelancer/
│   │   │   ├── Dashboard.jsx  # ⭐ Enhanced with charts
│   │   │   ├── JobSearch.jsx
│   │   │   ├── MyGigs.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Earnings.jsx
│   │   │   └── Messages.jsx
│   │   ├── Client/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── PostJob.jsx
│   │   │   └── Payment.jsx
│   │   └── Admin/
│   │       ├── Dashboard.jsx
│   │       └── UserManagement.jsx
│   ├── App.jsx             # Main app with providers
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── tailwind.config.js       # ⭐ Enhanced config
├── DATABASE_SETUP.md        # DB setup guide
├── UI_IMPROVEMENTS_SUMMARY.md  # UI changes doc
├── HERO_IMAGE_SETUP_GUIDE.md   # Hero image guide
└── package.json             # Dependencies
```

 ## 🎯 Usage Guide

### 🌓 Dark Mode
Click the **Sun/Moon icon** in the navbar to toggle between light and dark modes. Your preference is automatically saved.

### 📈 Dashboard Features
Navigate to the **Freelancer Dashboard** to see:
- Real-time earnings chart (6-month trend)
- Project distribution pie chart
- Weekly activity bar chart
- Animated progress bars on stats
- Active projects with progress tracking

### Testing the Application

**As a Freelancer:**
1. ✅ Sign up with role "Freelancer"
2. 🔍 Browse jobs with advanced filtering
3. 💼 Submit proposals with cover letters
4. 🎨 Create service gigs
5. 👤 Complete your profile
6. 📊 Track earnings with visual charts
7. 💬 Message clients

**As a Client:**
1. ✅ Sign up with role "Client"
2. 📝 Post jobs with detailed requirements
3. 📚 Review freelancer proposals
4. 🤝 Hire freelancers
5. 💳 Manage payments through escrow

**As an Admin:**
1. 🔑 Login with role "Admin"
2. 📊 View comprehensive analytics
3. 👥 Manage users and permissions
4. ⚙️ Configure system settings

### 🔐 Authentication with Supabase

**Features:**
- ✅ Email/Password authentication
- ✅ Email verification on signup
- ✅ Password reset with email
- ✅ Persistent sessions with auto-refresh
- ✅ Role-based access control
- ✅ Secure token management

**Setup Steps:**
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **API**
4. Copy your **Project URL** and **anon/public key**
5. Add them to `.env` file
6. (Optional) Run the SQL schema from `DATABASE_SETUP.md`

**Role Management:**
User roles are stored in `user_metadata.role` and can be:
- `freelancer` - Access to freelancer dashboard
- `client` - Access to client dashboard  
- `admin` - Access to admin panel

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR at `localhost:5173` |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Development Tips
```bash
# Run with specific port
npm run dev -- --port 3000

# Build and analyze bundle size
npm run build -- --mode production

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎨 Customization

### Changing Brand Colors

Edit `tailwind.config.js` to customize colors:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          // ... your color scale
          900: '#4c1d95',
        },
        // Add custom colors
      }
    }
  }
}
```

### Custom Hero Image

See **[HERO_IMAGE_SETUP_GUIDE.md](HERO_IMAGE_SETUP_GUIDE.md)** for:
- AI image generation prompts
- Optimization guidelines
- Integration instructions

### Adding New Features

1. **Create Component**: Add to `src/components/` or `src/pages/`
2. **Add Route**: Update `src/App.jsx` with new route
3. **Update Navigation**: Modify `src/components/Layout/Navbar.jsx`
4. **Add Styling**: Use Tailwind classes or extend config
5. **Test**: Verify in both light and dark modes

### Extending the Dashboard

Add new charts to `Freelancer/Dashboard.jsx`:
```jsx
import { LineChart, Line, ... } from 'recharts';

// Add your data
const myData = [{ name: 'Jan', value: 100 }, ...];

// Create responsive chart
<ResponsiveContainer width="100%" height={250}>
  <LineChart data={myData}>
    {/* Your chart config */}
  </LineChart>
</ResponsiveContainer>
```

## ✅ Recently Completed Features

- ✅ **Dark mode support** with persistent preferences
- ✅ **Mobile responsive optimization** across all devices
- ✅ **Interactive charts** for analytics dashboard
- ✅ **Skeleton loaders** for improved UX
- ✅ **Smooth animations** with Framer Motion
- ✅ **Enhanced color system** with gradients
- ✅ **Modern UI components** inspired by Fiverr/Upwork

## 🚧 Roadmap & Future Enhancements

### Phase 1: Core Functionality
- [ ] Real-time notifications system
- [ ] File upload for portfolios (Supabase Storage)
- [ ] Advanced search with filters and sorting
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications for key events

### Phase 2: Communication
- [ ] Real-time messaging (Supabase Realtime)
- [ ] Video call integration (Zoom/Google Meet API)
- [ ] Voice messages
- [ ] File sharing in messages

### Phase 3: Advanced Features
- [ ] Multi-language support (i18n)
- [ ] Dispute resolution system
- [ ] Freelancer verification badges
- [ ] Skills assessment tests
- [ ] Project milestones with escrow
- [ ] Rating and review system improvements

### Phase 4: Optimization
- [ ] PWA support (offline mode)
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Analytics integration (Google Analytics)
- [ ] A/B testing framework

## 📝 License

This project is **MIT licensed** and available for educational and commercial purposes.

```
MIT License - See LICENSE file for details
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style (Prettier + ESLint)
- Write clear commit messages
- Test your changes in both light and dark modes
- Update documentation if needed
- Add comments for complex logic
- Ensure responsive design on all devices

### Areas Where We Need Help

- 🐛 Bug fixes and testing
- 🎨 UI/UX improvements
- 📚 Documentation improvements
- 🌐 Translations and i18n
- ⚡ Performance optimizations
- ✨ New features from the roadmap

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and device info

## 💬 Support

Need help? Have questions?

- 📧 Email: support@freelancehub.com
- 💬 Discord: [Join our community](#)
- 📖 Docs: [Full Documentation](#)
- 🐦 Twitter: [@freelancehub](#)

## 🙏 Acknowledgments

Special thanks to:

- **React Team** - For the amazing framework
- **Tailwind Labs** - For Tailwind CSS
- **Framer** - For Framer Motion animations
- **Recharts Team** - For beautiful chart components
- **Supabase** - For backend infrastructure
- **Lucide Icons** - For the icon library
- **Unsplash** - For placeholder images
- **Vercel** - For hosting and deployment

## 🌟 Show Your Support

If you found this project helpful, please consider:

- ⭐ **Star this repository** on GitHub
- 🐦 **Share it** on social media
- 📝 **Write about it** on your blog
- 💰 **Sponsor** the development

---

<div align="center">

### Built with ❤️ by the FreelanceHub Team

**Using React • Tailwind CSS • Framer Motion • Recharts**

[Website](#) • [Documentation](#) • [Community](#) • [Twitter](#)

© 2024 FreelanceHub. All rights reserved.

</div>
