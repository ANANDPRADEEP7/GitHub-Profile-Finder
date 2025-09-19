import { useState } from "react";

type GitHubProfile = {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  public_repos: number;
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #000000 0%, #000000ff 35%, #000000 100%)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif'
  },
  wrapper: {
    width: '100%',
    maxWidth: '28rem',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '2rem'
  },
  headerIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4rem',
    height: '4rem',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50%',
    marginBottom: '1rem',
    fontSize: '1.875rem'
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.5rem',
    lineHeight: '1.2'
  },
  subtitle: {
    color: '#b0b0b0',
    fontSize: '1rem'
  },
  searchSection: {
    marginBottom: '1.5rem'
  },
  searchContainer: {
    display: 'flex',
    gap: '0.75rem'
  },
  inputWrapper: {
    flex: 1,
    position: 'relative' as const
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '0.75rem',
    color: '#ffffff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 200ms ease',
    fontFamily: 'inherit'
  },
  loadingSpinner: {
    position: 'absolute' as const,
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '1.25rem',
    height: '1.25rem',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  searchButton: {
    padding: '0.75rem 1.5rem',
    background: '#333333',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    fontSize: '1rem',
    fontFamily: 'inherit'
  },
  searchButtonHover: {
    background: '#555555',
    transform: 'scale(1.05)'
  },
  errorMessage: {
    marginBottom: '1.5rem',
    padding: '1rem',
    background: 'rgba(255, 0, 0, 0.1)',
    border: '1px solid rgba(255, 0, 0, 0.3)',
    borderRadius: '0.75rem',
    color: '#ff6b6b',
    textAlign: 'center' as const
  },
  profileCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    animation: 'slideInFromBottom 500ms ease-out forwards'
  },
  profileContent: {
    textAlign: 'center' as const
  },
  avatarContainer: {
    position: 'relative' as const,
    display: 'inline-block',
    marginBottom: '1rem'
  },
  avatar: {
    width: '6rem',
    height: '6rem',
    borderRadius: '50%',
    border: '4px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  onlineIndicator: {
    position: 'absolute' as const,
    bottom: '-0.25rem',
    right: '-0.25rem',
    width: '1.5rem',
    height: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.2)'
  },
  profileName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.25rem'
  },
  profileUsername: {
    color: '#b0b0b0',
    marginBottom: '0.25rem'
  },
  profileBio: {
    color: '#d4d4d4',
    marginBottom: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.5'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginBottom: '1.5rem'
  },
  statItem: {
    textAlign: 'center' as const
  },
  statIcon: {
    width: '3rem',
    height: '3rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
    margin: '0 auto 0.5rem',
    fontSize: '1.25rem',
    background: '#222222'
  },
  statNumber: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '0.125rem'
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#b0b0b0'
  },
  visitLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '0.75rem',
    fontWeight: '500',
    transition: 'all 200ms ease',
    fontSize: '1rem'
  },
  visitLinkHover: {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'scale(1.05)'
  },
  footer: {
    textAlign: 'center' as const,
    marginTop: '2rem',
    color: '#a0a0a0',
    fontSize: '0.875rem'
  },
  icon: {
    width: '1rem',
    height: '1rem'
  }
};

export default function GitHubProfileFinder() {
  const [username, setUsername] = useState<string>("");
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProfile = async () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setProfile(null);

      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        throw new Error("User not found!");
      }

      const data: GitHubProfile = await res.json();
      setProfile(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchProfile();
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: translateY(-50%) rotate(360deg); }
        }
        @keyframes slideInFromBottom {
          from { transform: translateY(1rem); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        input::placeholder { color: #b0b0b0; }
        input:disabled { opacity: 0.6; cursor: not-allowed; }
        button:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }
      `}</style>

      <div style={styles.container}>
        <div style={styles.wrapper}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerIcon}>🔍</div>
            <h1 style={styles.title}>GitHub Profile Finder</h1>
            <p style={styles.subtitle}>Discover GitHub profiles instantly</p>
          </div>

          {/* Search Bar */}
          <div style={styles.searchSection}>
            <div style={styles.searchContainer}>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={styles.searchInput}
                  disabled={loading}
                />
                {loading && <div style={styles.loadingSpinner}></div>}
              </div>
              <button
                onClick={fetchProfile}
                disabled={loading}
                style={styles.searchButton}
                onMouseEnter={(e) => {
                  if (!loading) Object.assign(e.currentTarget.style, styles.searchButtonHover);
                }}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.searchButton)}
              >
                {loading ? "..." : "Search"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <div style={styles.errorMessage}>{error}</div>}

          {/* Profile */}
          {profile && (
            <div style={styles.profileCard}>
              <div style={styles.profileContent}>
                <div style={styles.avatarContainer}>
                  <img src={profile.avatar_url} alt={profile.login} style={styles.avatar} />
                  <div style={styles.onlineIndicator}></div>
                </div>
                <h2 style={styles.profileName}>{profile.name || profile.login}</h2>
                <p style={styles.profileUsername}>@{profile.login}</p>
                {profile.bio && <p style={styles.profileBio}>{profile.bio}</p>}
                <div style={styles.statsContainer}>
                  <div style={styles.statItem}>
                    <div style={{ ...styles.statIcon, background: '#222222' }}>👥</div>
                    <p style={styles.statNumber}>{profile.followers}</p>
                    <p style={styles.statLabel}>Followers</p>
                  </div>
                  <div style={styles.statItem}>
                    <div style={{ ...styles.statIcon, background: '#222222' }}>📦</div>
                    <p style={styles.statNumber}>{profile.public_repos}</p>
                    <p style={styles.statLabel}>Repositories</p>
                  </div>
                </div>
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.visitLink}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, {...styles.visitLink, ...styles.visitLinkHover})}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.visitLink)}
                >
                  Visit Profile
                </a>
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={styles.footer}>Built with ❤️ using GitHub API</div>
        </div>
      </div>
    </>
  );
}
