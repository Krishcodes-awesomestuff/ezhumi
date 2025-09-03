# 🌱 Team Registration System

This system allows users to register teams for the Ezhumi Agriculture Hackathon with full authentication and database integration.

## 🚀 Features

### ✅ **Authentication System**
- User registration with email confirmation
- Secure login with password validation
- Session management with Supabase Auth
- Protected routes for authenticated users

### ✅ **Team Registration**
- Dynamic team size selection (1-4 members)
- Team lead information capture
- Multiple participant details
- Form validation and error handling

### ✅ **Team Management**
- View all registered teams
- Detailed team information display
- Responsive design for all devices

### ✅ **Database Integration**
- Supabase PostgreSQL backend
- Row Level Security (RLS) policies
- Automatic data relationships
- Real-time updates

## 🛠️ Setup Instructions

### 1. **Supabase Setup**

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and paste the contents of `database/schema.sql`
4. Run the SQL to create tables and policies

### 2. **Environment Configuration**

1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. Find these values in your Supabase dashboard:
   - **Project URL**: Settings → API → Project URL
   - **Anon Key**: Settings → API → Project API keys → anon/public

### 3. **Email Configuration (Optional)**

For email confirmations during signup:

1. Go to Authentication → Settings in Supabase
2. Configure SMTP settings or use Supabase's default email service
3. Customize email templates as needed

## 📄 Database Schema

### **Teams Table**
- `id` - UUID primary key
- `team_name` - Team name
- `team_lead_name` - Team leader's name
- `team_lead_email` - Team leader's email
- `team_lead_phone` - Team leader's phone
- `team_lead_college` - Team leader's college
- `team_size` - Number of team members (1-4)
- `user_id` - Reference to authenticated user
- `created_at` - Registration timestamp

### **Participants Table**
- `id` - UUID primary key
- `team_id` - Reference to teams table
- `name` - Participant's name
- `email` - Participant's email
- `phone` - Participant's phone
- `college` - Participant's college

## 🔐 Security Features

### **Row Level Security (RLS)**
- Users can only view and manage their own teams
- Participants are linked to team ownership
- Automatic user association through JWT tokens

### **Data Validation**
- Client-side form validation
- Server-side constraints
- Email format validation
- Phone number validation

## 🎯 Pages & Routes

### **Public Routes**
- `/` - Landing page
- `/login` - User authentication
- `/signup` - User registration

### **Protected Routes**
- `/register-team` - Team registration form
- `/teams` - View registered teams

## 🔄 User Flow

1. **New User**: Signup → Email confirmation → Login
2. **Existing User**: Login directly
3. **Team Registration**: 
   - Click "Register Team" from hero or navigation
   - Fill team details and member information
   - Submit and receive confirmation
4. **Team Management**: View teams in `/teams` page

## 🎨 UI/UX Features

- **Swiss Design Principles**: Clean, minimal, functional
- **Responsive Design**: Works on mobile, tablet, desktop
- **Smooth Animations**: Framer Motion transitions
- **Dark Theme**: Consistent with site aesthetic
- **Accessibility**: WCAG compliant with proper focus management

## 🚨 Troubleshooting

### **Common Issues**

1. **"User not authenticated"**
   - Check if environment variables are set correctly
   - Verify Supabase project URL and API key

2. **"Permission denied for table"**
   - Ensure RLS policies are created correctly
   - Check if user is authenticated properly

3. **Email confirmation not working**
   - Configure SMTP settings in Supabase
   - Check spam folder for confirmation emails

### **Development Tips**

- Use browser dev tools to monitor network requests
- Check Supabase dashboard for database logs
- Test with different user accounts for isolation

## 📊 Data Export

To export team registration data:

```sql
-- Export all teams with participants
SELECT 
  t.team_name,
  t.team_lead_name,
  t.team_lead_email,
  t.team_lead_phone,
  t.team_lead_college,
  t.team_size,
  t.created_at,
  p.name as participant_name,
  p.email as participant_email,
  p.phone as participant_phone,
  p.college as participant_college
FROM teams t
LEFT JOIN participants p ON t.id = p.team_id
ORDER BY t.created_at DESC;
```

This system provides a complete solution for hackathon team registration with modern authentication and database management!
