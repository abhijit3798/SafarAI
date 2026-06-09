import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Plane, Home, Heart, Compass, DollarSign, Sliders, ArrowLeft, ArrowRight, Check, Sparkles, AlertTriangle, Pencil } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const POPULAR_SOURCES = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Pune'];
const POPULAR_DESTINATIONS = ['Goa', 'Jaipur', 'Kerala', 'Leh Ladakh', 'Manali'];

const MONTHS_LIST = [
  { short: 'Jan', full: 'January' },
  { short: 'Feb', full: 'February' },
  { short: 'Mar', full: 'March' },
  { short: 'Apr', full: 'April' },
  { short: 'May', full: 'May' },
  { short: 'Jun', full: 'June' },
  { short: 'Jul', full: 'July' },
  { short: 'Aug', full: 'August' },
  { short: 'Sep', full: 'September' },
  { short: 'Oct', full: 'October' },
  { short: 'Nov', full: 'November' },
  { short: 'Dec', full: 'December' }
];

const TRAVEL_MODES = [
  { id: 'Any', label: 'Any Mode', icon: Compass },
  { id: 'Flight', label: 'Flight', icon: Plane },
  { id: 'Train', label: 'Train', icon: Compass }, // Will render Train placeholder
  { id: 'Car', label: 'Road Trip', icon: Compass }
];

const OPTIMIZATIONS = [
  { id: 'Fastest', label: 'Fastest' },
  { id: 'Balanced', label: 'Balanced' },
  { id: 'Cheapest', label: 'Cheapest' }
];

const STAY_BUDGETS = [
  { id: 'Budget', label: 'Budget', desc: 'Hostels & local cafes' },
  { id: 'Moderate', label: 'Moderate', desc: '3-star hotels & dining' },
  { id: 'Luxury', label: 'Luxury', desc: '5-star heritage resorts' }
];

const STAY_TYPES = [
  { id: 'Hotel', label: 'Hotel' },
  { id: 'Resort', label: 'Resort' },
  { id: 'Homestay', label: 'Homestay' },
  { id: 'Apartment', label: 'Apartment' }
];

const TRIP_TYPES = [
  { id: 'Solo', label: 'Solo Trip' },
  { id: 'Couple', label: 'Couple' },
  { id: 'Family', label: 'Family' },
  { id: 'Friends', label: 'Friends' }
];

const INTERESTS = [
  'Nature', 'Adventure', 'Spiritual', 'Food',
  'Culture', 'Shopping', 'Photography', 'Relaxation'
];

export default function TripPlannerForm({ initialDestination = '', initialVibe = '', initialSearchParams = null, onSubmit, loading = false }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});

  // Core Form States
  const [formData, setFormData] = useState({
    source: 'Delhi',
    destination: initialDestination,
    days: 4,
    month: 'June',
    groupSize: 1,
    travelPref: 'Any',
    optimization: 'Balanced',
    budgetLevel: 'Moderate',
    stayType: 'Hotel',
    tripType: 'Solo',
    interests: [],
    tripStyle: 'Balanced',
    avoid: [],
    totalBudget: 25000,
    budgetSplit: { travel: 30, stay: 35, food: 20, activities: 15 },
    advanced: {
      hiddenGems: false,
      localExperience: true,
      childFriendly: false,
      seniorFriendly: false,
      rainSafe: false,
      flexibleDates: false
    }
  });

  // Prefill when landing via Inspiration screen deep links or Edit flow
  useEffect(() => {
    if (initialSearchParams) {
      setFormData(prev => ({
        ...prev,
        ...initialSearchParams
      }));
    } else {
      if (initialDestination) {
        setFormData(prev => ({ ...prev, destination: initialDestination }));
      }
      if (initialVibe) {
        if (INTERESTS.includes(initialVibe)) {
          setFormData(prev => ({ ...prev, interests: [initialVibe] }));
        } else {
          const matchedTripType = TRIP_TYPES.find(t => t.id === initialVibe);
          if (matchedTripType) {
            setFormData(prev => ({ ...prev, tripType: initialVibe }));
          }
        }
      }
    }
  }, [initialDestination, initialVibe, initialSearchParams]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const adjustCounter = (field, amount, min = 1, max = 15) => {
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(min, Math.min(max, prev[field] + amount))
    }));
  };

  const handleToggleInterest = (interest) => {
    setFormData(prev => {
      const isSelected = prev.interests.includes(interest);
      if (!isSelected && prev.interests.length >= 5) {
        // Enforce maximum of 5 selections
        alert("Maximum of 5 interests can be selected.");
        return prev;
      }
      return {
        ...prev,
        interests: isSelected 
          ? prev.interests.filter(i => i !== interest)
          : [...prev.interests, interest]
      };
    });
  };

  const handleBudgetSplitChange = (key, value) => {
    const numericVal = Math.max(0, Math.min(100, parseInt(value) || 0));
    setFormData(prev => {
      const updatedSplit = { ...prev.budgetSplit, [key]: numericVal };
      return { ...prev, budgetSplit: updatedSplit };
    });
  };

  const validateStep = (step) => {
    const errors = { ...validationErrors };
    if (step === 1) {
      delete errors.source;
      delete errors.destination;
      delete errors.days;
      if (!formData.source || !formData.source.trim()) errors.source = "Starting location is required.";
      if (!formData.destination || !formData.destination.trim()) errors.destination = "Destination (India) is required.";
      if (formData.days < 1 || formData.days > 10) errors.days = "Duration must be between 1 and 10 days.";
    }
    if (step === 2) {
      delete errors.travelPref;
      if (!formData.travelPref) errors.travelPref = "Travel Mode is required.";
    }
    if (step === 6) {
      delete errors.totalBudget;
      delete errors.budgetSplit;
      if (formData.totalBudget <= 0) errors.totalBudget = "Please enter a valid budget amount.";
      const totalSplit = Object.values(formData.budgetSplit).reduce((a, b) => a + b, 0);
      if (totalSplit !== 100) {
        errors.budgetSplit = `Budget splits must sum to 100% (currently ${totalSplit}%).`;
      }
    }
    setValidationErrors(errors);
    
    if (step === 1) return !errors.source && !errors.destination && !errors.days;
    if (step === 2) return !errors.travelPref;
    if (step === 6) return !errors.totalBudget && !errors.budgetSplit;
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Complete validation on all required inputs before final submit
    const errors = {};
    if (!formData.source || !formData.source.trim()) errors.source = "Starting location is required.";
    if (!formData.destination || !formData.destination.trim()) errors.destination = "Destination (India) is required.";
    if (formData.days < 1 || formData.days > 10) errors.days = "Duration must be between 1 and 10 days.";
    if (!formData.travelPref) errors.travelPref = "Travel Mode is required.";
    
    if (formData.totalBudget <= 0) errors.totalBudget = "Please enter a valid budget amount.";
    const totalSplit = Object.values(formData.budgetSplit).reduce((a, b) => a + b, 0);
    if (totalSplit !== 100) {
      errors.budgetSplit = `Budget splits must sum to 100% (currently ${totalSplit}%).`;
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      // Direct user to the first step that contains validation failures
      if (errors.source || errors.destination || errors.days) {
        setCurrentStep(1);
      } else if (errors.travelPref) {
        setCurrentStep(2);
      } else if (errors.totalBudget || errors.budgetSplit) {
        setCurrentStep(6);
      }
      return;
    }

    onSubmit(formData);
  };

  const budgetSplitSum = Object.values(formData.budgetSplit).reduce((a, b) => a + b, 0);

  // SVG Donut Chart Calculation metrics
  const getDonutSegments = () => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius; // ~219.91
    const { travel, stay, food, activities } = formData.budgetSplit;
    
    const segments = [
      { key: 'Travel', value: travel, color: '#6366F1' },
      { key: 'Stay', value: stay, color: '#10B981' },
      { key: 'Food', value: food, color: '#F59E0B' },
      { key: 'Activities', value: activities, color: '#EF4444' }
    ];

    let currentOffset = 0;
    return segments.map(seg => {
      const strokeLength = (seg.value / 100) * circumference;
      const strokeOffset = circumference - currentOffset;
      currentOffset += strokeLength;
      
      return {
        ...seg,
        strokeDasharray: `${strokeLength} ${circumference}`,
        strokeDashoffset: strokeOffset
      };
    });
  };

  const donutSegments = getDonutSegments();

  return (
    <Card 
      className="glass-card animate-slide-up"
      style={{ 
        padding: '24px', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
        backgroundImage: 'var(--grad-glow)'
      }}
    >
      {/* Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
          Plan your perfect trip
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px', margin: '4px 0 0 0' }}>
          Configure your travel route settings step by step
        </p>
      </div>

      {/* Step Indicator Header (1-7 dots) */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '10px', 
          marginBottom: '28px' 
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7].map(num => {
          const isActive = currentStep === num;
          const isCompleted = currentStep > num;
          return (
            <div
              key={num}
              onClick={() => validateStep(currentStep) && setCurrentStep(num)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all var(--transition-normal)',
                background: isActive ? 'var(--grad-primary)' : isCompleted ? 'var(--color-primary-light)' : 'transparent',
                color: isActive || isCompleted ? 'white' : 'var(--text-secondary)',
                border: isActive || isCompleted ? 'none' : '2px solid var(--border-color)'
              }}
              className="tap-scale"
            >
              {num}
            </div>
          );
        })}
      </div>

      {/* STEP CONTAINER */}
      <div style={{ minHeight: '360px', marginBottom: '24px' }}>
        
        {/* STEP 1: BASICS */}
        {currentStep === 1 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              Trip Basics
            </h4>
            
            {/* From */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.72rem' }}>Starting Location</label>
              <div className="input-container">
                <MapPin size={14} className="input-icon" />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Where do you start?"
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  style={{ borderColor: validationErrors.source ? 'var(--color-accent)' : 'var(--border-color)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>
              {validationErrors.source && (
                <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: '600', marginTop: '2px', display: 'block' }}>
                  {validationErrors.source}
                </span>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                {POPULAR_SOURCES.map(city => (
                  <button
                    key={city}
                    type="button"
                    className="stay-feature-tag tap-scale"
                    style={{
                      cursor: 'pointer',
                      background: formData.source === city ? 'var(--color-primary)' : 'var(--bg-tertiary)',
                      color: formData.source === city ? 'white' : 'var(--text-secondary)',
                      fontSize: '0.7rem'
                    }}
                    onClick={() => handleInputChange('source', city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.72rem' }}>Destination (India)</label>
              <div className="input-container">
                <MapPin size={14} className="input-icon" style={{ color: 'var(--color-secondary)' }} />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Where do you want to go?"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  style={{ borderColor: validationErrors.destination ? 'var(--color-accent)' : 'var(--border-color)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>
              {validationErrors.destination && (
                <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: '600', marginTop: '2px', display: 'block' }}>
                  {validationErrors.destination}
                </span>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                {POPULAR_DESTINATIONS.map(city => (
                  <button
                    key={city}
                    type="button"
                    className="stay-feature-tag tap-scale"
                    style={{
                      cursor: 'pointer',
                      background: formData.destination === city ? 'var(--color-secondary)' : 'var(--bg-tertiary)',
                      color: formData.destination === city ? 'white' : 'var(--text-secondary)',
                      fontSize: '0.7rem'
                    }}
                    onClick={() => handleInputChange('destination', city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Counters */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Duration (Days)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <button
                    type="button"
                    className="btn-icon tap-scale"
                    onClick={() => adjustCounter('days', -1, 1, 10)}
                    style={{ width: '32px', height: '32px' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '1rem', fontWeight: '800', minWidth: '20px', textAlign: 'center' }}>
                    {formData.days}
                  </span>
                  <button
                    type="button"
                    className="btn-icon tap-scale"
                    onClick={() => adjustCounter('days', 1, 1, 10)}
                    style={{ width: '32px', height: '32px' }}
                  >
                    +
                  </button>
                </div>
                {validationErrors.days && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: '600', marginTop: '4px', display: 'block' }}>
                    {validationErrors.days}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.72rem' }}>Travelers</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <button
                    type="button"
                    className="btn-icon tap-scale"
                    onClick={() => adjustCounter('groupSize', -1, 1, 15)}
                    style={{ width: '32px', height: '32px' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '1rem', fontWeight: '800', minWidth: '20px', textAlign: 'center' }}>
                    {formData.groupSize}
                  </span>
                  <button
                    type="button"
                    className="btn-icon tap-scale"
                    onClick={() => adjustCounter('groupSize', 1, 1, 15)}
                    style={{ width: '32px', height: '32px' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Month Selection Grid (No drop-downs) */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.72rem', marginBottom: '6px' }}>Month of Travel</label>
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(4, 1fr)', 
                  gap: '6px' 
                }}
              >
                {MONTHS_LIST.map(m => {
                  const isSelected = formData.month === m.full;
                  return (
                    <button
                      key={m.short}
                      type="button"
                      onClick={() => handleInputChange('month', m.full)}
                      style={{
                        padding: '6px 0',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        textAlign: 'center',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--color-primary)' : 'var(--border-color)',
                        background: isSelected ? 'var(--bg-accent)' : 'var(--bg-secondary)',
                        color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                      className="tap-scale"
                    >
                      {m.short}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: TRAVEL MODE */}
        {currentStep === 2 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Transit Preference
            </h4>

            {/* Mode Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {TRAVEL_MODES.map(mode => {
                const isSelected = formData.travelPref === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => handleInputChange('travelPref', mode.id)}
                    style={{
                      padding: '16px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--color-primary)' : 'var(--border-color)',
                      background: isSelected ? 'var(--bg-accent)' : 'var(--bg-secondary)',
                      color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all var(--transition-fast)'
                    }}
                    className="tap-scale"
                  >
                    <span style={{ fontSize: '1.25rem' }}>
                      {mode.id === 'Flight' ? '✈️' : mode.id === 'Train' ? '🚊' : mode.id === 'Car' ? '🚗' : '🗺️'}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800' }}>{mode.label}</span>
                  </button>
                );
              })}
            </div>
            {validationErrors.travelPref && (
              <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: '600', marginTop: '4px', display: 'block' }}>
                {validationErrors.travelPref}
              </span>
            )}

            {/* Optimization Selector */}
            <div style={{ marginTop: '10px' }}>
              <label className="form-label" style={{ fontSize: '0.72rem', marginBottom: '8px' }}>Route Optimization Priority</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {OPTIMIZATIONS.map(opt => {
                  const isSelected = formData.optimization === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleInputChange('optimization', opt.id)}
                      style={{
                        padding: '10px 0',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--color-secondary)' : 'var(--border-color)',
                        background: isSelected ? 'rgba(16, 119, 113, 0.05)' : 'var(--bg-secondary)',
                        color: isSelected ? 'var(--color-secondary)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                      className="tap-scale"
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: STAY PREFERENCE */}
        {currentStep === 3 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Accommodation Preferences
            </h4>

            {/* Stay Budgets */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.72rem', marginBottom: '6px' }}>Stay Budget Tier</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {STAY_BUDGETS.map(tier => {
                  const isSelected = formData.budgetLevel === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => handleInputChange('budgetLevel', tier.id)}
                      style={{
                        padding: '12px 4px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.72rem',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--color-primary)' : 'var(--border-color)',
                        background: isSelected ? 'var(--bg-accent)' : 'var(--bg-secondary)',
                        color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                      className="tap-scale"
                    >
                      <strong style={{ display: 'block' }}>{tier.label}</strong>
                      <span style={{ fontSize: '0.55rem', opacity: 0.8, display: 'block', marginTop: '2px' }}>{tier.desc.split('&')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stay Types */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.72rem', marginBottom: '6px' }}>Stay Style Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {STAY_TYPES.map(type => {
                  const isSelected = formData.stayType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleInputChange('stayType', type.id)}
                      style={{
                        padding: '14px 10px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--color-secondary)' : 'var(--border-color)',
                        background: isSelected ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-secondary)',
                        color: isSelected ? 'var(--color-secondary)' : 'var(--text-primary)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        fontSize: '0.8rem',
                        fontWeight: '700'
                      }}
                      className="tap-scale"
                    >
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* STEP 4: INTERESTS */}
        {currentStep === 4 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                Travel Interests
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', marginTop: '4px', margin: '4px 0 0 0' }}>
                Select up to 5 categories to customize attractions ({formData.interests.length}/5 selected)
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
              {INTERESTS.map(interest => {
                const isSelected = formData.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleToggleInterest(interest)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--color-secondary)' : 'var(--border-color)',
                      background: isSelected ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-secondary)',
                      color: isSelected ? 'var(--color-secondary)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all var(--transition-fast)'
                    }}
                    className="tap-scale"
                  >
                    {isSelected && <Check size={12} />}
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: TRIP STYLE */}
        {currentStep === 5 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Itinerary Style & Pace
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Relaxed', 'Balanced', 'Packed'].map(style => {
                const isSelected = formData.tripStyle === style;
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => handleInputChange('tripStyle', style)}
                    style={{
                      padding: '18px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--color-primary)' : 'var(--border-color)',
                      background: isSelected ? 'var(--bg-accent)' : 'var(--bg-secondary)',
                      color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all var(--transition-fast)'
                    }}
                    className="tap-scale"
                  >
                    <div style={{ textAlign: 'left' }}>
                      <strong style={{ fontSize: '0.9rem', display: 'block' }}>
                        {style === 'Relaxed' ? '🍵 Relaxed Pace' : style === 'Balanced' ? '🚶 Balanced Pace' : '🏃 Packed Schedule'}
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px', display: 'block' }}>
                        {style === 'Relaxed' ? 'Slower walks, single main sight per day' : style === 'Balanced' ? 'Comfortable walks, 2-3 sights per day' : 'Fast-paced explorer, multiple spots daily'}
                      </span>
                    </div>
                    {isSelected && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: BUDGET SPLITS & DONUT CHART */}
        {currentStep === 6 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Budget Split & Metrics
            </h4>

            {/* Total Budget Numeric Input */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '0.72rem' }}>Total Budget (INR)</label>
              <div className="input-container">
                <DollarSign size={14} className="input-icon" />
                <input
                  type="number"
                  className="form-input"
                  placeholder="E.g. 25000"
                  value={formData.totalBudget}
                  onChange={(e) => handleInputChange('totalBudget', Math.max(0, parseInt(e.target.value) || 0))}
                  style={{ borderColor: validationErrors.totalBudget ? 'var(--color-accent)' : 'var(--border-color)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>
              {validationErrors.totalBudget && (
                <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: '600', marginTop: '2px', display: 'block' }}>
                  {validationErrors.totalBudget}
                </span>
              )}
            </div>

            {/* Donut Chart and sliders Side-by-Side on Desktop, stacked on Mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
              
              {/* SVG Donut Chart */}
              <div style={{ position: 'relative', width: '110px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="35" fill="transparent" stroke="var(--bg-tertiary)" strokeWidth="10" />
                  {donutSegments.map(seg => (
                    <circle
                      key={seg.key}
                      cx="50"
                      cy="50"
                      r="35"
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth="10"
                      strokeDasharray={seg.strokeDasharray}
                      strokeDashoffset={seg.strokeDashoffset}
                      transform="rotate(-90 50 50)"
                      style={{ transition: 'stroke-dasharray 0.35s, stroke-dashoffset 0.35s' }}
                    />
                  ))}
                </svg>
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Total</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: '800' }}>₹{formData.totalBudget >= 1000 ? `${(formData.totalBudget / 1000).toFixed(0)}k` : formData.totalBudget}</span>
                </div>
              </div>

              {/* Sliders splits */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: '750', color: budgetSplitSum === 100 ? 'var(--color-secondary)' : 'var(--color-accent)' }}>
                  <span>Custom Split Adjustments</span>
                  <span>Sum: {budgetSplitSum}% (Must be 100%)</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#6366F1', fontWeight: '700' }}>✈️ Travel ({formData.budgetSplit.travel}%)</span>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.budgetSplit.travel}
                      onChange={(e) => handleBudgetSplitChange('travel', e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '0.8rem', marginTop: '2px', height: '32px', borderRadius: 'var(--radius-sm)' }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#10B981', fontWeight: '700' }}>🏨 Stay ({formData.budgetSplit.stay}%)</span>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.budgetSplit.stay}
                      onChange={(e) => handleBudgetSplitChange('stay', e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '0.8rem', marginTop: '2px', height: '32px', borderRadius: 'var(--radius-sm)' }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#F59E0B', fontWeight: '700' }}>🍔 Food ({formData.budgetSplit.food}%)</span>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.budgetSplit.food}
                      onChange={(e) => handleBudgetSplitChange('food', e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '0.8rem', marginTop: '2px', height: '32px', borderRadius: 'var(--radius-sm)' }}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#EF4444', fontWeight: '700' }}>🎟️ Activities ({formData.budgetSplit.activities}%)</span>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.budgetSplit.activities}
                      onChange={(e) => handleBudgetSplitChange('activities', e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '0.8rem', marginTop: '2px', height: '32px', borderRadius: 'var(--radius-sm)' }}
                    />
                  </div>
                </div>

                {validationErrors.budgetSplit && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: '600', marginTop: '4px', display: 'block' }}>
                    {validationErrors.budgetSplit}
                  </span>
                )}
              </div>

            </div>
          </div>
        )}

        {/* STEP 7: REVIEW SUMMARY & EDIT LINKS */}
        {currentStep === 7 && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Confirm your itinerary
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              
              {/* Row 1: Basics */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'block' }}>1. Trip Basics</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    From {formData.source} to {formData.destination}, {formData.days} Days in {formData.month} ({formData.groupSize} Travelers)
                  </span>
                </div>
                <button type="button" onClick={() => setCurrentStep(1)} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                  <Pencil size={14} />
                </button>
              </div>

              {/* Row 2: Transit */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'block' }}>2. Transit Prefer</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Mode: {formData.travelPref} ({formData.optimization})
                  </span>
                </div>
                <button type="button" onClick={() => setCurrentStep(2)} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                  <Pencil size={14} />
                </button>
              </div>

              {/* Row 3: Stays */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'block' }}>3. Accommodation</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Tier: {formData.budgetLevel} ({formData.stayType} Preferred)
                  </span>
                </div>
                <button type="button" onClick={() => setCurrentStep(3)} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                  <Pencil size={14} />
                </button>
              </div>

              {/* Row 4: Interests */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'block' }}>4. Attractions / Interests</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {formData.interests.length > 0 ? formData.interests.join(', ') : 'No special interests selected'}
                  </span>
                </div>
                <button type="button" onClick={() => setCurrentStep(4)} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                  <Pencil size={14} />
                </button>
              </div>

              {/* Row 5: Style Pace */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'block' }}>5. Pace Style</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Itinerary Pace: {formData.tripStyle}
                  </span>
                </div>
                <button type="button" onClick={() => setCurrentStep(5)} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                  <Pencil size={14} />
                </button>
              </div>

              {/* Row 6: Budget splits */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'block' }}>6. Budget Split Metrics</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    ₹{formData.totalBudget.toLocaleString('en-IN')} (Splits: {formData.budgetSplit.travel}%/{formData.budgetSplit.stay}%/{formData.budgetSplit.food}%/{formData.budgetSplit.activities}%)
                  </span>
                </div>
                <button type="button" onClick={() => setCurrentStep(6)} style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}>
                  <Pencil size={14} />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* FOOTER WIZARD ACTIONS */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          gap: '12px', 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '16px',
          alignItems: 'center'
        }}
      >
        {currentStep > 1 ? (
          <button
            type="button"
            className="btn btn-secondary tap-scale"
            onClick={handleBack}
            style={{ 
              flex: 1, 
              borderRadius: 'var(--radius-md)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '6px',
              minHeight: '44px'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        ) : (
          <div style={{ flex: 1 }}></div>
        )}

        {currentStep < 7 ? (
          <button
            type="button"
            className="btn btn-primary tap-scale"
            onClick={handleNext}
            style={{ 
              flex: 1, 
              borderRadius: 'var(--radius-md)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '6px',
              background: 'var(--grad-primary)',
              minHeight: '44px'
            }}
          >
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            onClick={handleSubmit}
            style={{
              flex: 1,
              height: '44px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--grad-primary)',
              margin: 0,
              boxShadow: 'var(--shadow-indigo)'
            }}
            className="tap-scale"
          >
            <span>{loading ? 'Creating...' : 'Generate Trip'}</span>
            <Sparkles size={16} />
          </Button>
        )}
      </div>

    </Card>
  );
}
