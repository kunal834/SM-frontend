import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { backendUrl } from '../context/authcontext.jsx';
/**
 * Flytics Institutional Contribution UI
 * Theme: Soft Focus (Breathable, Glassmorphic, Sophisticated)
 */
const InstitutionalPayment = ({ hospitalId }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInstitutionalPay = async () => {
    if (!amount || amount < 1) {
      alert("Please enter a valid contribution amount.");
      return;
    }
    console.log(backendUrl)
    setLoading(true);
    try {
     const response = await fetch(`${backendUrl}/api/users/create-checkout-session`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    amount: Number(amount) * 100, // Polar/Stripe often use subunits (paise/cents)
    product_id: 'your_polar_product_id', // Replace with your actual Product ID
    success_url: window.location.origin + '/success',
    customer_email: 'user@example.com' // Optional but recommended
  }),
});
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "No checkout URL received.");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <main style={styles.content}>
        
        {/* Top Decorative Badge */}
        <div style={styles.topBadge}>
          <span style={styles.dot}></span>
          CONTRIBUTE TO HEALTH ANALYTICS
        </div>

        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>
              Support the <span style={styles.italicTitle}>Future</span> of Focus.
            </h1>
            
            <p style={styles.contributionText}>
              We are raising funds to escape clinical noise. Your support fuels 
              a metabolic tracking experience that feels more like a morning breeze 
              than a medical chore.
            </p>
          </div>

          {/* Goal Indicator - Soft UI Style */}
          <div style={styles.goalBox}>
             <div style={styles.goalText}>
                <span>Research Fundraising Phase</span>
                <span>1% Complete</span>
             </div>
             <div style={styles.progressBar}>
                <div style={styles.progressFill}></div>
             </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <span style={styles.currencyPrefix}>₹</span>
              <input 
                type="number" 
                placeholder="Enter contribution amount" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.actionArea}>
            <button 
              onClick={handleInstitutionalPay}
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Processing...' : 'Begin Your Contribution'}
            </button>
            <Link to="/about" >
              About our mission —
            </Link  >
          </div>
          
          <p style={styles.footerNote}>
            Your contribution activates the institutional dashboard while 
            funding early-stage metabolic research.
          </p>
        </div>
      </main>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at center, #ffffff 0%, #f4f7f9 100%)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Inter", -apple-system, sans-serif',
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  topBadge: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    background: '#fff',
    border: '1px solid #eef2f5',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#6e7a8a',
    letterSpacing: '1px',
    marginBottom: '40px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  },
  dot: {
    width: '6px',
    height: '6px',
    background: '#2ecc71',
    borderRadius: '50%',
    marginRight: '10px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '40px',
    padding: '60px 40px',
    maxWidth: '540px',
    textAlign: 'center',
    boxShadow: '0 40px 100px rgba(0, 0, 0, 0.04)',
  },
  header: {
    marginBottom: '40px',
  },
  title: {
    fontFamily: '"Source Serif Pro", serif', // Use a Serif font to match the image
    fontSize: '42px',
    fontWeight: '500',
    color: '#0f172a',
    margin: '0 0 20px 0',
    lineHeight: '1.1',
  },
  italicTitle: {
    fontStyle: 'italic',
    color: '#e96d7b', // Soft pink from image logo
  },
  contributionText: {
    fontSize: '16px',
    color: '#71717a',
    lineHeight: '1.6',
    maxWidth: '420px',
    margin: '0 auto',
  },
  goalBox: {
    marginBottom: '40px',
    padding: '0 20px',
  },
  goalText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    fontWeight: '500',
    color: '#94a3b8',
    marginBottom: '12px',
  },
  progressBar: {
    height: '4px',
    background: '#f1f5f9',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressFill: {
    width: '1%',
    height: '100%',
    background: '#0f172a',
    borderRadius: '10px',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: '40px',
  },
  currencyPrefix: {
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    fontSize: '18px',
  },
  input: {
    width: '100%',
    padding: '20px 20px 20px 45px',
    borderRadius: '16px',
    border: '1px solid #eef2f5',
    fontSize: '18px',
    background: '#fff',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    color: '#0f172a',
  },
  actionArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px',
  },
  button: {
    padding: '18px 36px',
    background: '#0f172a', // Dark navy/black from Sign In button
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
  },
  aboutLink: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
    cursor: 'pointer',
  },
  footerNote: {
    fontSize: '12px',
    color: '#a1a1aa',
    lineHeight: '1.5',
    maxWidth: '380px',
    margin: '0 auto',
  }
};

export default InstitutionalPayment;