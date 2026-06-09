import React, { useState } from 'react';
import { SunDim, Sun, Moon, Lightbulb, CheckCircle2, Circle } from 'lucide-react';

export default function DayWiseItinerary({ itinerary }) {
  const [activeDay, setActiveDay] = useState(1);
  const [checkedActivities, setCheckedActivities] = useState({});

  if (!itinerary || itinerary.length === 0) return null;

  const currentDayData = itinerary.find(d => d.day === activeDay) || itinerary[0];

  const getTimeIcon = (time) => {
    switch (time) {
      case 'Morning':
        return <SunDim size={16} style={{ color: 'var(--color-warning)' }} />;
      case 'Afternoon':
        return <Sun size={16} style={{ color: '#f97316' }} />;
      case 'Evening':
        return <Moon size={16} style={{ color: 'var(--color-primary-light)' }} />;
      default:
        return <SunDim size={16} />;
    }
  };

  const toggleActivity = (dayIndex, actIndex) => {
    const key = `${dayIndex}-${actIndex}`;
    setCheckedActivities(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="itinerary-container animate-fade-in">
      {/* Day Tabs Scroll */}
      <div className="day-header-tabs">
        {itinerary.map((d) => (
          <button
            key={d.day}
            className={`day-tab ${activeDay === d.day ? 'active' : ''}`}
            onClick={() => setActiveDay(d.day)}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      {/* Day Theme Statement */}
      <div style={{ marginBottom: '16px', borderLeft: '3px solid var(--color-primary)', paddingLeft: '12px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>
          {currentDayData.theme}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Day {activeDay} schedule overview
        </p>
      </div>

      {/* Timeline List */}
      <div className="timeline">
        {currentDayData.activities.map((act, index) => {
          const isCompleted = checkedActivities[`${activeDay}-${index}`];
          return (
            <div key={index} className="timeline-item">
              {/* Dot Icon */}
              <div className="timeline-node" style={{ borderColor: isCompleted ? 'var(--color-success)' : 'var(--color-primary)' }}></div>

              <div 
                className="timeline-content"
                style={{ 
                  opacity: isCompleted ? 0.75 : 1,
                  borderLeft: isCompleted ? '3px solid var(--color-success)' : '1px solid var(--border-color)',
                  transition: 'opacity var(--transition-fast)'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="time-badge">
                    {getTimeIcon(act.time)}
                    <span>{act.time}</span>
                  </span>
                  
                  {/* Interactive Checkbox */}
                  <button 
                    onClick={() => toggleActivity(activeDay, index)}
                    style={{ color: isCompleted ? 'var(--color-success)' : 'var(--text-tertiary)', background: 'none', border: 'none' }}
                    title={isCompleted ? "Mark as active" : "Mark as completed"}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </button>
                </div>

                {/* Content */}
                <h4 
                  className="activity-title"
                  style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
                >
                  {act.title}
                </h4>
                <p className="activity-desc">{act.description}</p>

                {/* Footer details */}
                <div className="activity-footer">
                  <span className="activity-cost">
                    {act.cost === 0 ? 'Free Entry' : `Est. ₹${act.cost}`}
                  </span>
                  
                  {act.tip && (
                    <span className="activity-tip">
                      <Lightbulb size={12} />
                      <span>{act.tip}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
