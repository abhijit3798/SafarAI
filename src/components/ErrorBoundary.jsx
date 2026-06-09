import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Card from './Card';
import Button from './Button';

/**
 * React Error Boundary component to catch rendering errors gracefully
 * and show a clean, branded recovery screen instead of crashing the app.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ErrorBoundary] Caught runtime error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    // Reset path back to home page & force reload
    window.location.hash = 'home';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            padding: '24px',
            textAlign: 'center',
            fontFamily: 'var(--font-sans)',
            animation: 'fadeIn var(--transition-normal)'
          }}
        >
          <Card 
            style={{ 
              maxWidth: '400px', 
              width: '100%', 
              padding: '32px 24px',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              background: 'rgba(244, 63, 94, 0.02)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div 
              style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                background: 'rgba(244, 63, 94, 0.1)', 
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}
            >
              <AlertTriangle size={28} />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
              Unexpected Application Error
            </h3>
            
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 20px 0', lineHeight: '1.4' }}>
              SafarAI encountered an unexpected issue while rendering this screen.
            </p>

            {this.state.error && (
              <div 
                style={{ 
                  background: 'var(--bg-tertiary)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-sm)', 
                  padding: '12px',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  color: 'var(--color-accent)',
                  textAlign: 'left',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  marginBottom: '24px',
                  maxHeight: '120px'
                }}
              >
                {this.state.error.toString()}
              </div>
            )}

            <Button onClick={this.handleReset} variant="primary" style={{ width: '100%', gap: '8px' }}>
              <RefreshCw size={14} />
              <span>Reload SafarAI</span>
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
