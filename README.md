# Youth-Link 🚀

**Empowering Youth with AI-Driven Career Guidance and Job Opportunities**

Youth-Link is an intelligent web platform that connects young job seekers with employment opportunities, personalized learning resources, and AI-powered career guidance. The platform leverages artificial intelligence to analyze skill gaps, generate personalized career roadmaps, and provide multilingual support for better accessibility.

---

## 🌟 Key Features

### For Users
- 🎯 **Personalized Dashboard** - Track job applications, skill progress, and recommended resources
- 💼 **Job Discovery** - Browse curated job listings with skill-based matching
- 📚 **Learning Resources** - Access tailored learning materials based on skill gaps
- 🗺️ **AI Career Roadmap Generator** - Get phase-by-phase personalized career paths using AI
- 👤 **Smart Profile Management** - Generate professional CVs from user details
- 💬 **AI Chatbot** - Get instant career guidance and platform assistance
- 🌐 **Multilingual Support** - Available in English and Bangla (বাংলা)

### For Admins
- 📊 **Analytics Dashboard** - View platform statistics, skill demand trends, and user insights
- 🏢 **Manage Jobs** - Create, edit, and delete job listings
- 📖 **Manage Resources** - Curate learning resources for different skills
- 📈 **Skill Gap Analysis** - Identify common skill gaps and resource coverage

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **Recharts** - Data visualization
- **i18next** - Internationalization (English/Bangla)

### Backend & Services
- **Firebase Firestore** - NoSQL database
- **Firebase Authentication** - User authentication
- **Groq Cloud API** - AI model integration (Llama-3.1-8b-instant)

### AI Integration
- **LLM Model:** Llama-3.1-8b-instant via Groq Cloud
- **Use Cases:** 
  - Career roadmap generation
  - Skill gap analysis
  - CV generation
  - Chatbot assistance

---

## 📁 Project Structure

```
youth-link/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── JobCard.jsx
│   │   ├── ResourceCard.jsx
│   │   └── Chatbot.jsx
│   ├── pages/
│   │   ├── user/           # User-facing pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── Resources.jsx
│   │   │   ├── Roadmap.jsx
│   │   │   └── Profile.jsx
│   │   ├── admin/          # Admin pages
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageJobs.jsx
│   │   │   └── ManageResources.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── config/
│   │   └── firebase.js     # Firebase configuration
│   ├── context/            # Context API providers
│   ├── i18n/               # Translation files
│   │   ├── en.json
│   │   └── bn.json
│   ├── styles/             # CSS files
│   ├── App.js
│   └── index.js
├── .env                    # Environment variables
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Groq Cloud API key

### 1. Clone the Repository
```bash
git clone https://github.com/OarisaR/Youth-link.git
cd Youth-link
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the project root:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Groq Cloud API
REACT_APP_GROQ_API_KEY=your_groq_api_key
```

> **Note:** Get your Firebase credentials from [Firebase Console](https://console.firebase.google.com/) and Groq API key from [Groq Cloud](https://console.groq.com/)

### 4. Firebase Setup

1. Create a Firebase project
2. Enable Firestore Database
3. Enable Authentication (Email/Password)
4. Create the following collections in Firestore:
   - `users` - User profiles and skill data
   - `jobs` - Job listings
   - `learning_resources` - Learning materials

#### Sample Firestore Structure:

**users collection:**
```javascript
{
  email: "user@example.com",
  name: "John Doe",
  skills: ["React", "JavaScript", "Node.js"],
  missingSkillsByJob: [
    {
      jobId: "job1",
      missingSkills: ["TypeScript", "Docker"]
    }
  ]
}
```

**jobs collection:**
```javascript
{
  company: "Tech Corp",
  jobTitle: "Frontend Developer",
  jobType: "Full-time",
  location: "Remote",
  experienceLevel: "Mid Level",
  requiredSkills: ["React", "TypeScript", "CSS"]
}
```

**learning_resources collection:**
```javascript
{
  title: "React Complete Guide",
  platform: "Udemy",
  url: "https://example.com/course",
  cost: "Paid",
  relatedSkills: ["React", "JavaScript", "Redux"]
}
```

### 5. Start Development Server
```bash
npm start
```

The app will run at `http://localhost:3000`

---

## 🎨 Key Features Deep Dive

### AI Career Roadmap Generator
- Takes user's current skills as input
- Uses Llama-3.1-8b-instant model to generate personalized learning paths
- Provides phase-by-phase guidance with milestones
- Suggests relevant resources and timelines

### Smart CV Generator
- Extracts user profile information
- Generates professional, ATS-friendly CV
- Customizable templates
- Download as PDF

### Skill Gap Analysis
- Compares user skills with job requirements
- Identifies missing skills for each job
- Recommends targeted learning resources
- Tracks skill development progress

### Multilingual Support (i18next)
- English and Bangla (বাংলা) languages
- Seamless language switching
- Localized content for better accessibility

---

## 👥 User Roles

### User Account
- Browse and apply for jobs
- View personalized job recommendations
- Access learning resources
- Generate AI career roadmaps
- Chat with AI assistant
- Manage profile and CV

### Admin Account
- View analytics dashboard
- Create/edit/delete job listings
- Manage learning resources
- Monitor platform statistics
- Analyze skill demand trends

---

## 🔐 Authentication Flow

1. Users register with email and password
2. Firebase Authentication handles user sessions
3. Role-based access control (user/admin)
4. Protected routes for authenticated users

---

## 📊 Admin Dashboard Analytics

The admin dashboard provides insights on:
- Total users and job listings
- Most in-demand skills
- Common skill gaps among users
- Learning resource coverage
- User engagement metrics

---

## 🌐 Internationalization (i18n)

The platform uses `react-i18next` for multilingual support:

```javascript
// Usage example
import { useTranslation } from 'react-i18next';

function Component() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('bn')}>
        বাংলা
      </button>
    </div>
  );
}
```

---

## 🤖 AI Integration

### Groq Cloud (Llama-3.1-8b-instant)

```javascript
const generateRoadmap = async (userSkills, careerGoal) => {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Generate a career roadmap for someone with skills: ${userSkills} who wants to become a ${careerGoal}`
        }
      ]
    })
  });
  
  return await response.json();
};
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

---

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

---

## 🚀 Deployment

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init

# Deploy
firebase deploy
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**OarisaR**
- GitHub: [@OarisaR](https://github.com/OarisaR)

---

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- Groq Cloud for AI model access
- React community for excellent documentation
- i18next for internationalization support

---

## 📧 Contact

For questions or support, please open an issue on GitHub or contact the project maintainer.

---

**Built with ❤️ for empowering youth in their career journey**

## Notes

* All backend functionality (CRUD operations, authentication) is handled via Firebase.
* Code is organized logically with reusable components, pages, and Firebase helper functions.
* Ensure Firebase configuration is correct before running the app.
