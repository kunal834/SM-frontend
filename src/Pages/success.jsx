import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

/**
 * Optimized Success Page for Flytics
 * Focus: Soft-shadows, Serif/Sans-serif contrast, and breathable white space.
 */
const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const checkoutId = searchParams.get('checkout_id') || 'FLY-992031';

  useEffect(() => {
    // Analytics or verification logic here
    console.log(`Activation confirmed: ${checkoutId}`);
  }, [checkoutId]);

  return (
    <div style={styles.pageWrapper}>
      {/* Navigation Simulation */}
      <nav style={styles.navbar}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}></div>
          <span style={styles.logoText}>flytics</span>
        </div>
        <div style={styles.navLinks}>
          <span style={styles.navLink}>Support</span>
          <button style={styles.navBtn}>Sign Out</button>
        </div>
      </nav>

      <main style={styles.content}>
        {/* Status Chip */}
        <div style={styles.statusChip}>
          <span style={styles.dot}></span>
          ACTIVATION COMPLETE
        </div>

        {/* Success Icon */}
        <div style={styles.iconBox}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 style={styles.title}>
          Institutional Activation <br /> 
          <span style={styles.italicTitle}>Successful</span>
        </h1>

        <p style={styles.subtitle}>
          The transition is complete. Your hospital’s digital dashboard is now live, 
          replacing manual folders with real-time metabolic health analytics.
        </p>

        <div style={styles.actionGroup}>
          <button 
            onClick={() => navigate('/')}
            style={styles.primaryBtn}
          >
            Enter Physician Dashboard
          </button>
        </div>

        <div style={styles.footerInfo}>
          <p>Transaction Reference: <strong>{checkoutId}</strong></p>
          <p style={styles.legal}>Certified Digital Health Records • {new Date().getFullYear()}</p>
        </div>
      </main>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at 10% 20%, rgba(243, 247, 250, 1) 0%, rgba(255, 255, 255, 1) 90.1%)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Inter", sans-serif',
    color: '#0F172A',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 8%',
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10px)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    width: '24px',
    height: '24px',
    backgroundColor: '#0F172A',
    borderRadius: '6px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    fontFamily: '"Source Serif Pro", serif',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  navLink: {
    fontSize: '14px',
    color: '#64748B',
    cursor: 'pointer',
  },
  navBtn: {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '1px solid #E2E8F0',
    background: '#0F172A',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    textAlign: 'center',
  },
  statusChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    padding: '8px 16px',
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: '0.05em',
    marginBottom: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  },
  dot: {
    width: '6px',
    height: '6px',
    background: '#4ADE80',
    borderRadius: '50%',
  },
  iconBox: {
    marginBottom: '20px',
  },
  title: {
    fontFamily: '"Source Serif Pro", serif',
    fontSize: '48px',
    fontWeight: '500',
    lineHeight: '1.1',
    margin: '0 0 24px 0',
  },
  italicTitle: {
    fontStyle: 'italic',
    color: '#F472B6', // Soft pink/focus color
  },
  subtitle: {
    fontSize: '18px',
    color: '#64748B',
    maxWidth: '600px',
    lineHeight: '1.6',
    margin: '0 auto 40px auto',
  },
  primaryBtn: {
    padding: '18px 40px',
    background: '#0F172A',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '40px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  footerInfo: {
    marginTop: '60px',
    fontSize: '14px',
    color: '#94A3B8',
  },
  legal: {
    marginTop: '8px',
    fontSize: '12px',
    opacity: 0.7,
  }
};

export default Success;