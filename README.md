# Wain - Hyperlocal Event Discovery & Ticketing App for Qatar

Wain is a full-stack web application built for discovering and booking events in Qatar. From cultural festivals to business conferences, Wain connects event organizers with attendees in a seamless, user-friendly platform.

## 🚀 Features

### For Event Attendees
- **Event Discovery**: Browse events by category, location, and date
- **Advanced Search**: Find events with fuzzy search and filters
- **Event Details**: Comprehensive event information with host details
- **Ticket Booking**: Easy booking system with QR code generation
- **User Dashboard**: View booked tickets and event history

### For Event Organizers
- **Event Creation**: Simple form to create and publish events
- **Event Management**: Dashboard to manage hosted events
- **Real-time Updates**: Track attendee numbers and event status

### For Administrators
- **Event Moderation**: Approve or reject submitted events
- **Admin Dashboard**: Overview of platform statistics
- **User Management**: Monitor user activity and roles

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **QR Codes**: qrcode library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Google OAuth credentials

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd wain-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/wain_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio
npm run db:studio
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
wain-app/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   │   └── auth/          # NextAuth configuration
│   ├── dashboard/         # User dashboard
│   ├── events/            # Event pages
│   │   └── [id]/          # Dynamic event detail pages
│   ├── host/              # Event creation form
│   ├── login/             # Authentication page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── providers/         # Context providers
│   └── ui/                # UI components
├── lib/                   # Utility functions
├── prisma/                # Database schema
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

## 🎨 UI Components

The app includes several reusable components:

- **Button**: Versatile button component with variants
- **EventCard**: Event display card with booking functionality
- **Navbar**: Navigation with authentication state
- **CategoryFilter**: Event category filtering
- **Footer**: Site footer with links

## 🔐 Authentication

Wain uses NextAuth.js with Google OAuth for authentication. Users can:

1. Sign in with their Google account
2. Automatically get assigned a USER role
3. Access role-based features (ADMIN users can access admin panel)

## 📊 Database Schema

The application uses three main models:

- **User**: User accounts with roles (USER/ADMIN)
- **Event**: Event information with approval status
- **Ticket**: Booking records with QR codes

## 🚧 TODO Features

The following features are planned for future development:

- [ ] Google Maps integration for location selection
- [ ] Arabic/English language toggle
- [ ] Advanced search with geolocation
- [ ] Email notifications for bookings
- [ ] Payment integration
- [ ] Event analytics and reporting
- [ ] Mobile app development
- [ ] Social media sharing
- [ ] Event recommendations
- [ ] Waitlist functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@wain.qa or create an issue in the repository.

---

**Made with ❤️ for Qatar**
