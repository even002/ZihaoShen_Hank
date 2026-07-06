import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      {/* Background decoration */}
      <div className="contact-bg-pattern" />

      <div className="content-container contact-inner">
        <div className="contact-content">
          <div className="section-label" style={{ justifyContent: 'center' }}>Let's Connect</div>

          <h2 className="contact-title">
            Want to create something
            <br />
            <span className="contact-title-accent">epic together?</span>
          </h2>

          <p className="contact-description">
            I'm always open to discussing game design, collaboration opportunities,
            or just nerding out about mythology in games.
          </p>

          <div className="contact-channels">
            <a href="mailto:hank.gamedesign@example.com" className="contact-channel">
              <div className="channel-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M2 6L10 11L18 6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <div className="channel-info">
                <span className="channel-label">Email</span>
                <span className="channel-value">hank.gamedesign@example.com</span>
              </div>
            </a>

            <a href="#" className="contact-channel">
              <div className="channel-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3C6 3 3 6 3 10C3 13.6 5.7 16.8 9 17.7C9.6 17.8 9.8 17.4 9.8 17.1V15.6C7.2 16.1 6.5 14.5 6.5 14.5C6 13.5 5.3 13.2 5.3 13.2C4.3 12.7 5.4 12.7 5.4 12.7C6.5 12.8 7 13.8 7 13.8C7.9 15.3 9.4 14.9 9.8 14.7C9.9 14 10.2 13.5 10.5 13.2C8 13 6 12 6 9.5C6 8.8 6.3 8.1 6.8 7.6C6.7 7.4 6.4 6.6 6.8 5.8C6.8 5.8 7.5 5.6 9.8 6.5C10.5 6.3 11.2 6.2 12 6.2C12.8 6.2 13.5 6.3 14.2 6.5C16.5 5.6 17.2 5.8 17.2 5.8C17.6 6.6 17.3 7.4 17.2 7.6C17.7 8.1 18 8.8 18 9.5C18 12 16 13 13.5 13.2C13.9 13.6 14.2 14.2 14.2 15.1V17.1C14.2 17.4 14.4 17.8 15 17.7C18.3 16.8 21 13.6 21 10C21 6 17 3 13 3H10Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <div className="channel-info">
                <span className="channel-label">GitHub</span>
                <span className="channel-value">github.com/hank-gamedev</span>
              </div>
            </a>

            <a href="#" className="contact-channel">
              <div className="channel-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16 2H4C3 2 2 3 2 4V16C2 17 3 18 4 18H16C17 18 18 17 18 16V4C18 3 17 2 16 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="6.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 13L6 9L8 11L12 7L18 13" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <div className="channel-info">
                <span className="channel-label">Portfolio</span>
                <span className="channel-value">hank-gamedesign.com</span>
              </div>
            </a>
          </div>

          <a href="mailto:hank.gamedesign@example.com" className="contact-cta">
            Send a Message
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <footer className="contact-footer">
          <div className="footer-rune">ᚺ</div>
          <p className="footer-text">
            Designed & built from scratch with React & Vite.
            <br />
            &copy; {new Date().getFullYear()} Hank. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  )
}
