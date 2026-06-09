import React, { useState, useEffect, useRef } from 'react';
import { Search, Check, X } from 'lucide-react';
import Card from './Card';

export default function BottomSheetSelector({ 
  isOpen, 
  onClose, 
  title, 
  options = [], 
  selectedValue, 
  onChange, 
  searchable = true 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Clear query on close or open
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      // Focus search input after modal animation finishes
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 150);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter options based on query
  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (opt.desc && opt.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelect = (val) => {
    onChange(val);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('bottom-sheet-overlay')) {
      onClose();
    }
  };

  return (
    <div className="bottom-sheet-overlay" onClick={handleBackdropClick}>
      <div className="bottom-sheet-container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
            {title}
          </h4>
          <button 
            type="button"
            onClick={onClose} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-secondary)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        {searchable && (
          <div className="input-container" style={{ margin: 0 }}>
            <Search size={16} className="input-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="form-input"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ minHeight: '40px', paddingLeft: '36px', fontSize: '0.85rem' }}
            />
          </div>
        )}

        {/* Options List */}
        <div 
          style={{ 
            overflowY: 'auto', 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '6px',
            paddingRight: '4px',
            maxHeight: '45vh'
          }}
        >
          {filteredOptions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              No matching options found.
            </div>
          ) : (
            filteredOptions.map((opt) => {
              const isSelected = selectedValue === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'var(--bg-accent)' : 'var(--bg-secondary)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--color-primary)' : 'var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  className="stay-tab-btn"
                >
                  <div style={{ textAlign: 'left', flex: 1, marginRight: '12px' }}>
                    <span 
                      style={{ 
                        display: 'block', 
                        fontSize: '0.85rem', 
                        fontWeight: '700', 
                        color: isSelected ? 'var(--color-primary)' : 'var(--text-primary)' 
                      }}
                    >
                      {opt.label}
                    </span>
                    {opt.desc && (
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {opt.desc}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <Check size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
