# NC State Sports Daily Predictor 🐺

A modern web application for predicting NC State sports game winners with live statistics, leaderboards, and championship recognition. Made in 1 hour during SOE Coding Hackathon so no real backend.

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-teal)

## Images
<img width="1750" height="1036" alt="image" src="https://github.com/user-attachments/assets/689eaef6-adc9-48ad-b768-347b21d780eb" />

<img width="1744" height="1040" alt="image" src="https://github.com/user-attachments/assets/1d407fa6-e827-4b64-b8f4-345d045accd6" />

<img width="1745" height="1034" alt="image" src="https://github.com/user-attachments/assets/008d6084-f856-4f95-95b9-98e26c586640" />


<img width="1739" height="1036" alt="image" src="https://github.com/user-attachments/assets/e3a12148-9024-4a24-bbe4-0af8ff168ebc" />


<img width="1737" height="1037" alt="image" src="https://github.com/user-attachments/assets/b7204b9f-afa6-404c-af21-76840baed494" />

## 🎯 Features

### Core Functionality
- **📅 Daily Sports Schedule**: View all NC State sports scheduled for today
- **🎲 Smart Predictions**: Pick winners based on team win percentages and stats
- **💾 Local Storage**: Predictions saved automatically in browser storage
- **🔄 One-Click Toggle**: Click team buttons to predict, click again to deselect
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop

### Leaderboard System
- **🏆 Champion Recognition**: Special Pack Madness Champ showcase for #1 player
- **📊 Accuracy Rankings**: Users ranked by prediction success rate
- **📈 Detailed Stats**: Win/loss records, accuracy percentages, progress bars
- **👤 User Identification**: Highlight current user in leaderboard
- **🎨 Visual Hierarchy**: Gold, silver, bronze styling for top performers

### User Experience
- **🌙 Dark/Light Theme**: Toggle between themes with system detection
- **🎉 Toast Notifications**: Success feedback for all prediction actions
- **🎯 Prediction Drawer**: View and manage all current selections
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **📊 Statistics Overview**: Total players, average accuracy, best scores

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/johnny0595/hackathonSOEWinner.git
cd soehackathon

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001) to view the application.

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Main predictions interface
│   ├── leaderboard/       # Leaderboard page
│   ├── layout.tsx         # Root layout with providers
│   └── globals.css        # Global styles and Tailwind
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui base components
│   ├── sports-header.tsx  # Sports selection navigation
│   ├── game-card.tsx      # Individual game prediction card
│   ├── games-list.tsx     # List of games for selected sport
│   ├── leaderboard.tsx    # Main leaderboard component
│   ├── leaderboard-card.tsx # Individual user ranking card
│   ├── prediction-sidebar.tsx # Current selections drawer
│   ├── submit-button.tsx  # Predictions submission
│   └── theme-toggle.tsx   # Dark/light theme switcher
├── hooks/                 # Custom React hooks
│   ├── use-sports.ts      # Sports data fetching
│   ├── use-games.ts       # Games data fetching
│   └── use-predictions.ts # Predictions management
├── services/             # Business logic and external services
│   └── predictions-storage.ts # LocalStorage operations
├── data/                 # Mock data and providers
│   ├── mock-provider.ts   # Mock API implementation
│   ├── http-provider.ts   # Real API stub
│   ├── data-provider.ts   # Provider factory
│   ├── mock-predictions.ts # Sample predictions
│   └── mock-leaderboard.ts # Sample leaderboard data
├── types/                # TypeScript type definitions
│   └── index.ts          # All app interfaces
├── lib/                  # Utility functions
│   ├── utils.ts          # General utilities
│   └── date-utils.ts     # Date formatting helpers
└── providers/            # React context providers
    ├── query-provider.tsx # React Query setup
    └── theme-provider.tsx # Theme management
```

## 🏗️ Architecture

### Data Layer
The application uses an abstracted data provider pattern:

- **MockProvider**: Local JSON files for development/demo
- **HttpProvider**: Real API integration (configurable via environment variables)
- **React Query**: Caching and synchronization

### State Management
- **React Query**: Server state and caching
- **LocalStorage**: Predictions persistence
- **React Context**: Theme and global providers
- **Local State**: Component-specific state

### Design System
- **shadcn/ui**: Base component library
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Consistent iconography
- **CSS Variables**: Dynamic theming

## 🎮 User Guide

### Making Predictions
1. **Select Sport**: Click sport tabs in the header to filter games
2. **Pick Winners**: Click team buttons to predict winners
3. **Change Mind**: Click the same team again to remove prediction
4. **View Selections**: Click "Predictions" button (shows count badge)
5. **Submit**: Use bottom submit button to save all predictions

### Leaderboard
1. **View Rankings**: Click "Leaderboard" in header navigation
2. **Champion Recognition**: Top player gets Pack Madness Champ showcase
3. **Track Progress**: See accuracy percentages and win/loss records
4. **Find Yourself**: Current user is highlighted with "You" badge

## 🔧 Configuration

### Environment Variables
```bash
# Enable real API (default: false, uses mock data)
NEXT_PUBLIC_USE_API=true

# API base URL (default: http://localhost:3001)
NEXT_PUBLIC_API_BASE_URL=https://your-api.com
```

### Mock Data Customization
Edit files in `/src/data/` to customize:
- `mock-predictions.ts`: Pre-loaded predictions
- `mock-leaderboard.ts`: User rankings and stats
- `public/mock/`: Sports and games JSON files

## 🛡️ API Integration

### Expected Endpoints
```typescript
GET /sports?date=YYYY-MM-DD        // Available sports for date
GET /games?sport={id}&date=YYYY-MM-DD  // Games for sport/date
GET /games/{gameId}                // Individual game details
POST /predictions                  // Submit user predictions
```

### Data Formats
See `/src/types/index.ts` for complete TypeScript interfaces.

### Automated Testing Setup
Framework configured for:
- **Vitest**: Unit testing
- **React Testing Library**: Component testing
- **ESLint**: Code quality
- **TypeScript**: Type checking

## 🎨 Customization

### Theming
- Colors: Edit CSS variables in `globals.css`
- Components: Customize shadcn/ui components
- Layout: Modify responsive breakpoints in Tailwind config

### Sports & Games
- Add new sports to `mock-provider.ts`
- Update team logos and branding
- Modify win percentage calculations
- Add new game statistics

### Leaderboard
- Customize ranking algorithms
- Add achievement badges
- Modify champion rewards
- Update user avatar system

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

**Go Pack! 🐺** Built with ❤️ for NC State Sports fans.
