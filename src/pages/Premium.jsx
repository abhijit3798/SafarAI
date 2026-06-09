import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Button from '../components/Button';
import { Award, Check, Crown, CreditCard, Sparkles, Compass, Download, ShieldCheck } from 'lucide-react';

export default function Premium() {
  const [isPremium, setIsPremium] = useLocalStorage('safar_ai_premium_status', false);
  const [paymentState, setPaymentState] = useState('idle'); // idle | loading | success

  const handlePurchase = async () => {
    setPaymentState('loading');
    
    // Simulate payment gateway Razorpay / UPI redirect
    setTimeout(() => {
      setPaymentState('success');
      setIsPremium(true);
    }, 2000);
  };

  const handleCancelPremium = () => {
    if (window.confirm("Are you sure you want to cancel your Premium features for testing?")) {
      setIsPremium(false);
      setPaymentState('idle');
    }
  };

  const premiumFeatures = [
    { title: "Unlimited Custom Destinations", desc: "Plan trips to any small town or offbeat village in India, not just cities." },
    { title: "PDF & Document Exports", desc: "Export and share clean, print-ready PDF itineraries with your friends." },
    { title: "Offline Maps & Guides", desc: "Access full schedule contacts and local guidelines with zero internet connection." },
    { title: "Split Group Budgets", desc: "Estimate and divide shared expenses across up to 10 travelers in INR." },
    { title: "Zero Advertisements", desc: "Enjoy a pure, uninterrupted, premium travel planning experience." }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
        <Crown size={40} style={{ color: 'var(--color-warning)', marginBottom: '8px', animation: 'pulse-soft 2s infinite' }} />
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
          SafarAI Premium
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Elevate your journeys. Travel smarter.
        </p>
      </div>

      {/* RENDER SUCCESS STATE */}
      {paymentState === 'success' || isPremium ? (
        <Card 
          style={{ 
            textAlign: 'center', 
            padding: '32px 20px', 
            border: '2px solid var(--color-success)', 
            background: 'rgba(5, 150, 105, 0.04)' 
          }}
        >
          <ShieldCheck size={48} style={{ color: 'var(--color-success)', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-success)', marginBottom: '6px' }}>
            Explorer Pro Active!
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.4' }}>
            Thank you for upgrading! Your SafarAI account is now fully unlocked with unlimited AI queries, offline PDF downloads, and group budget splitters.
          </p>

          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px',
              maxWidth: '280px',
              margin: '0 auto'
            }}
          >
            <div 
              style={{ 
                background: 'var(--bg-tertiary)', 
                padding: '10px', 
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: '600',
                color: 'var(--text-secondary)'
              }}
            >
              Subscription: Lifetime Pass
            </div>
            
            <Button onClick={handleCancelPremium} variant="text" style={{ color: 'var(--color-accent)', fontSize: '0.8rem', fontWeight: '700' }}>
              Reset Subscription (Dev mode)
            </Button>
          </div>
        </Card>
      ) : paymentState === 'loading' ? (
        /* RENDER PAYMENT GATEWAY LOADER */
        <Card style={{ textAlign: 'center', padding: '48px 20px' }}>
          <div className="loader-spinner-wrapper" style={{ margin: '0 auto 24px auto', width: '80px', height: '80px' }}>
            <div className="loader-outer-ring" style={{ borderTopColor: 'var(--color-warning)' }}></div>
            <CreditCard size={28} style={{ position: 'absolute', inset: 0, margin: 'auto', color: 'var(--color-warning)', animation: 'pulse-soft 1s infinite' }} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px' }}>Securing Connection...</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Redirecting to Razorpay Secure UPI Gateway. Do not close or refresh this page.
          </p>
        </Card>
      ) : (
        /* RENDER UPGRADE CARD */
        <>
          <Card 
            glass
            style={{
              padding: '24px',
              border: '2px solid var(--color-warning)',
              backgroundImage: 'radial-gradient(circle at top right, rgba(234, 179, 8, 0.1), transparent 60%)',
              boxShadow: '0 10px 25px -5px rgba(234, 179, 8, 0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>Best Value</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginTop: '4px' }}>Lifetime Explorer Pass</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-warning)' }}>₹249</span>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>One-time payment</span>
              </div>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.4' }}>
              Gain complete access to all planning tools forever. No recurring charges.
            </p>

            <Button onClick={handlePurchase} variant="primary" style={{ width: '100%', background: 'var(--grad-warm)', boxShadow: '0 8px 16px -5px rgba(234, 179, 8, 0.3)', color: 'white' }}>
              <Sparkles size={16} />
              <span>Unlock Explorer Pro</span>
            </Button>
          </Card>

          {/* Features Checklist */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '14px', paddingLeft: '4px' }}>
              What's Included in Pro
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {premiumFeatures.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div 
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: 'rgba(234, 179, 8, 0.1)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <Check size={12} style={{ color: 'var(--color-warning)' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>{feat.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
}
