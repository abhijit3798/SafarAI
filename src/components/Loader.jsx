import React, { useState, useEffect } from 'react';
import { Compass, CheckCircle2, Circle, Sparkles } from 'lucide-react';

const STEPS = [
  { id: 1, label: "Analyzing destination", percent: 20 },
  { id: 2, label: "Building itinerary", percent: 40 },
  { id: 3, label: "Finding transport", percent: 60 },
  { id: 4, label: "Preparing stay options", percent: 80 },
  { id: 5, label: "Finalizing trip", percent: 100 }
];

export default function Loader({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Sync initial step progress
    setProgress(STEPS[0].percent);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 5) {
          const next = prev + 1;
          setProgress(STEPS[next - 1].percent);
          return next;
        } else {
          clearInterval(stepInterval);
          setProgress(100);
          
          // Hold at 100% for 200ms for visual satisfaction before completing
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 200);
          return prev;
        }
      });
    }, 600); // 600ms per stage (5 stages = 3 seconds)

    return () => clearInterval(stepInterval);
  }, [onComplete]);

  return (
    <div 
      className="animate-fade-in"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-primary)',
        backgroundImage: 'var(--grad-glow)',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      {/* Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h3 
          style={{ 
            fontSize: '1.45rem', 
            fontWeight: '800', 
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            marginBottom: '6px'
          }}
        >
          Creating Your Safar
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          SafarAI is compiling and cross-referencing real travel routes.
        </p>
      </div>

      {/* Visual Checklist Box */}
      <CardContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {STEPS.map((step) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;
            
            return (
              <div 
                key={step.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  transition: 'opacity var(--transition-fast)'
                }}
              >
                {/* Visual Circle Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {isCompleted ? (
                    <CheckCircle2 size={20} style={{ color: 'var(--color-success)' }} />
                  ) : isActive ? (
                    <Compass 
                      size={20} 
                      style={{ 
                        color: 'var(--color-primary-light)', 
                        animation: 'rotateSlow 2s linear infinite' 
                      }} 
                    />
                  ) : (
                    <Circle size={20} style={{ color: 'var(--text-tertiary)', opacity: 0.5 }} />
                  )}
                </div>

                {/* Step Text */}
                <span 
                  style={{ 
                    fontSize: '0.92rem',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive 
                      ? 'var(--text-primary)' 
                      : isCompleted 
                        ? 'var(--text-secondary)' 
                        : 'var(--text-tertiary)',
                    opacity: isCompleted ? 0.7 : 1
                  }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContainer>

      {/* Progress Track and Percent Indicator */}
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '320px', 
          marginTop: '36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <div 
          style={{ 
            width: '100%', 
            height: '6px', 
            backgroundColor: 'var(--bg-tertiary)', 
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            border: '1px solid var(--border-color)'
          }}
        >
          <div 
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-light)',
              backgroundImage: 'linear-gradient(90deg, var(--color-primary-light), var(--color-secondary-light))',
              transition: 'width 800ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </div>
        
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {progress}% Complete
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '48px', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
        <Sparkles size={12} className="animate-pulse-soft" />
        <span>SafarAI Custom Generation Engine</span>
      </div>

    </div>
  );
}

// Minimal inner Card container helper
function CardContainer({ children }) {
  return (
    <div 
      className="card glass-card"
      style={{ 
        width: '100%', 
        maxWidth: '320px', 
        padding: '20px 24px',
        border: '1px solid var(--border-color)'
      }}
    >
      {children}
    </div>
  );
}
