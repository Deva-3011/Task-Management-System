import { Link } from 'react-router-dom';

function LandingPage() {
  const features = [
    {
      icon: '✓',
      title: 'Task Management',
      description: 'Create, organize, and track tasks with ease. Set status and priorities to stay on top of your work.'
    },
    {
      icon: '📊',
      title: 'Real-time Dashboard',
      description: 'View comprehensive statistics about your tasks. Monitor pending, in-progress, and completed work instantly.'
    },
    {
      icon: '🔍',
      title: 'Smart Search & Filter',
      description: 'Find tasks quickly with powerful search. Filter by status, sort by date, and paginate through your workload.'
    },
    {
      icon: '🌓',
      title: 'Dark Mode',
      description: 'Switch between light and dark themes. Work comfortably at any time of day with our theme toggle.'
    },
    {
      icon: '🔒',
      title: 'Secure Authentication',
      description: 'JWT-based authentication keeps your workspace secure. Each user sees only their own tasks.'
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Access your tasks from any device. Desktop, tablet, or mobile—your workspace is always available.'
    }
  ];

  const stats = [
    { label: 'Active Features', value: '6' },
    { label: 'Task Statuses', value: '3' },
    { label: 'User-Scoped', value: '✓' }
  ];

  return (
    <div className="landing-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <p className="eyebrow">Project Management Portal</p>
            <h1>Organize Your Work. Achieve Your Goals.</h1>
            <p className="hero-subtitle">
              A simple, powerful task management platform designed to keep your team on track and your projects moving forward.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-info btn-lg fw-semibold">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg fw-semibold">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-header">
          <p className="eyebrow">Features</p>
          <h2>Powerful Tools. Simple Interface.</h2>
          <p className="section-desc">Everything you need to manage tasks and keep projects on track.</p>
        </div>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to organize your workflow?</h2>
          <p>Join teams already using Task Portal to manage their projects efficiently.</p>
          <Link to="/register" className="btn btn-info btn-lg fw-semibold">
            Create Your Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Task Management Portal</h4>
            <p>A modern task management solution for teams and individuals.</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Tech Stack</h4>
            <p>React • Node.js • Express • MySQL</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Task Management Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
