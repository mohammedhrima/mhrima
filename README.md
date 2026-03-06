# Mohammed Hrima - Portfolio 💼

A modern, responsive portfolio website showcasing my software engineering projects, experience, and skills. Built with Next.js, React, and TypeScript with a clean, professional design.

🌐 **Live Site**: [mhrima.github.io](https://mhrima.github.io) *(or your custom domain)*

## 🎯 What Is This?

This is my personal portfolio website where I showcase:

- **Featured Projects**: Ura Language (compiled language), UraJS (SPA framework), Raytracer, MediSimpleGPT (AI browser agent)
- **Professional Experience**: Full-stack developer at Yakeey, freelance projects, GoQuant bootcamp, aerospace industry background
- **Technical Skills**: C/C++, JavaScript/TypeScript, Python, Java, React, Next.js, Spring Boot, FastAPI, AI/ML, Docker
- **Education & Certifications**: 42 School, mechanical engineering background, various technical certifications
- **Contact Information**: Easy ways to reach me for opportunities

## ✨ Key Features

### Interactive Project Showcase
- **Category Filtering**: Filter projects by All, Featured, Systems, Web, AI/ML, Backend
- **Detailed Project Pages**: Each project has comprehensive documentation with:
  - Technology stack
  - Key highlights and features
  - GitHub repository links
  - Live demo links (where applicable)
  - Tutorial links for major projects

### Professional Experience Timeline
- Chronological work history with detailed descriptions
- Company links and location information
- Technology tags for each role
- Bullet points highlighting key achievements

### Skills Visualization
- Categorized skill sets (Languages, Frontend, Backend, AI/ML, Databases, DevOps, CAD)
- Visual skill level indicators
- Comprehensive technology coverage

### Modern UI/UX
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Scroll-based reveal animations
- **Clean Navigation**: Easy-to-use navbar with mobile menu
- **Loading Screen**: Professional loading experience

### Contact Form
- Integrated EmailJS for direct contact
- Form validation
- Professional inquiry handling

## 🚀 For Visitors

### Exploring the Portfolio

1. **Home Page**: Overview with featured projects and quick links
2. **Projects**: Browse all projects with filtering options
3. **Experience**: View my professional work history
4. **Skills**: See my technical capabilities
5. **Education**: Academic background and certifications
6. **Resume**: Download my resume as PDF
7. **Contact**: Get in touch via contact form

### Featured Projects to Check Out

- **Ura Language**: A compiled programming language built from scratch in C with LLVM
- **UraJS**: A lightweight SPA framework inspired by React and Next.js
- **Raytracer**: 3D rendering engine with physically-based lighting
- **MediSimpleGPT**: Local medical AI assistant with browser automation
- **PharmaGest**: Professional pharmacy management system (client project)
- **Webserver**: HTTP/1.1 server built from RFC 2616 in C++

## 🛠️ For Developers

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/mohammedhrima/mhrima.git
cd mhrima

# Install dependencies
npm install
# or
yarn install
```

### Running Locally

```bash
# Development server
npm run dev
# or
yarn dev

# Open http://localhost:3000
```

### Building for Production

```bash
# Build static export
npm run build
# or
yarn build

# The output will be in the 'out' directory
```

### Deploying to GitHub Pages

```bash
# Deploy to GitHub Pages
npm run deploy
# or
yarn deploy
```

This will:
1. Build the project
2. Export static files to `out/` directory
3. Push to `gh-pages` branch
4. Make the site live at `https://yourusername.github.io`

## 📁 Project Structure

```
mhrima/
├── app/                      # Next.js app directory
│   ├── page.jsx             # Home page
│   ├── layout.jsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── projects/            # Projects page
│   ├── experience/          # Experience page
│   ├── skills/              # Skills page
│   ├── education/           # Education page
│   ├── resume/              # Resume page
│   ├── contact/             # Contact page
│   └── tutorials/           # Tutorials page
├── components/              # React components
│   ├── Navbar.jsx          # Navigation bar
│   ├── MobileMenu.jsx      # Mobile navigation
│   ├── ProjectCard.jsx     # Project display card
│   ├── FeaturedProjectCard.jsx
│   ├── LoadingScreen.jsx   # Loading animation
│   └── ui/                 # UI components
├── data/                    # Content data
│   ├── projects.json       # Projects data
│   ├── experience.json     # Work experience
│   ├── skills.json         # Skills data
│   ├── education.json      # Education data
│   └── tutorials.js        # Tutorial content
├── public/                  # Static assets
│   └── resume.pdf          # Resume PDF
├── out/                     # Build output (generated)
└── package.json            # Dependencies
```

## 🎨 Customization

### Updating Content

**Projects:**
Edit `data/projects.json` to add/modify projects:
```json
{
  "id": "project-id",
  "title": "Project Title",
  "tagline": "Short description",
  "description": "Full description...",
  "technologies": ["Tech1", "Tech2"],
  "github": "https://github.com/...",
  "category": "Web",
  "featured": true
}
```

**Experience:**
Edit `data/experience.json` to update work history.

**Skills:**
Edit `data/skills.json` to modify skill levels and categories.

**Resume:**
Replace `public/resume.pdf` with your updated resume.

### Styling

- **Theme Colors**: Edit `tailwind.config.js`
- **Global Styles**: Modify `app/globals.css`
- **Component Styles**: Update individual component files

### Contact Form

Configure EmailJS in `app/contact/page.jsx`:
```javascript
// Update with your EmailJS credentials
const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'your_template_id';
const PUBLIC_KEY = 'your_public_key';
```

## 🛠️ Technical Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript (JSX used for simplicity)
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Additional icons
- **[EmailJS](https://www.emailjs.com/)** - Contact form email service
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support
- **[gh-pages](https://www.npmjs.com/package/gh-pages)** - GitHub Pages deployment

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Deployment
npm run predeploy    # Build before deploy
npm run deploy       # Deploy to GitHub Pages

# Code Quality
npm run lint         # Run ESLint
```

## 🚀 Deployment Options

### GitHub Pages (Current Setup)

```bash
npm run deploy
```

Site will be live at: `https://yourusername.github.io`

### Vercel (Recommended for Next.js)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `out`

### Custom Domain

Add a `CNAME` file in the `public/` directory:
```
yourdomain.com
```

## 🎯 SEO & Performance

- Server-side rendering with Next.js
- Optimized images and assets
- Semantic HTML structure
- Meta tags for social sharing
- Fast page loads
- Mobile-first responsive design

## 📊 Analytics (Optional)

To add analytics, integrate:
- Google Analytics
- Vercel Analytics
- Plausible Analytics

Add tracking code in `app/layout.jsx`.

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome! Feel free to:
- Report bugs
- Suggest improvements
- Share feedback

## 📄 License

This project is open source and available for reference. Feel free to use the structure and design as inspiration for your own portfolio, but please don't copy content directly.

## 📞 Contact

- **Email**: [your-email@example.com]
- **GitHub**: [github.com/mohammedhrima](https://github.com/mohammedhrima)
- **LinkedIn**: [Your LinkedIn]
- **Portfolio**: [mhrima.github.io](https://mhrima.github.io)

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- Tailwind CSS for the utility-first approach
- Lucide for beautiful icons
- EmailJS for contact form functionality
- GitHub Pages for free hosting

---

**Built with ❤️ by Mohammed Hrima**