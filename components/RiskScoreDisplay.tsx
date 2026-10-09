'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { RiskLevel } from '@/types';

const RISK_CONFIG = {
  LOW: { color: '#22D3EE', bg: 'rgba(34, 211, 238, 0.08)', label: 'LOW RISK', glow: 'rgba(34, 211, 238, 0.3)' },
  MODERATE: { color: '#FCD34D', bg: 'rgba(252, 211, 77, 0.08)', label: 'MODERATE RISK', glow: 'rgba(252, 211, 77, 0.3)' },
  SUSPICIOUS: { color: '#FB923C', bg: 'rgba(251, 146, 60, 0.08)', label: 'SUSPICIOUS', glow: 'rgba(251, 146, 60, 0.3)' },
  HIGH: { color: '#F87171', bg: 'rgba(248, 113, 113, 0.08)', label: 'HIGH RISK', glow: 'rgba(248, 113, 113, 0.3)' },
  CRITICAL: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'CRITICAL RISK', glow: 'rgba(239, 68, 68, 0.4)' },
};

interface RiskScoreDisplayProps {
  score: number;
  riskLevel: RiskLevel;
  classification: string;
  confidence: string;
}

export function RiskScoreDisplay({ score, riskLevel, classification, confidence }: RiskScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const config = RISK_CONFIG[riskLevel];

  // Animate count up
  useEffect(() => {
    const duration = 800;
    const steps = 40;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
      animate={{ scale: 1, opacity: 1, rotateX: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2, z: 20 }}
      style={{
        padding: '32px',
        background: config.bg,
        border: `1px solid ${config.color}30`,
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        boxShadow: `0 20px 40px -10px ${config.glow}40, inset 0 2px 10px rgba(255,255,255,0.05)`,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* SVG Ring */}
      <div style={{ position: 'relative', width: '140px', height: '140px', transform: 'translateZ(30px)' }}>
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background ring */}
          <circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
          />
          {/* Score ring */}
          <circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke={config.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ 
              transition: 'stroke-dashoffset 0.8s ease',
              filter: `drop-shadow(0 0 8px ${config.color}60)`,
            }}
          />
        </svg>

        {/* Center content */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '42px',
            fontWeight: 900,
            color: config.color,
            lineHeight: 1,
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '-0.02em',
            textShadow: `0 0 20px ${config.glow}`
          }}>
            {displayScore}
          </div>
          <div style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}>
            / 100
          </div>
        </div>
      </div>

      {/* Risk Level Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          padding: '6px 20px',
          background: `${config.color}15`,
          border: `1px solid ${config.color}40`,
          borderRadius: '100px',
          color: config.color,
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          transform: 'translateZ(20px)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {config.label}
      </motion.div>

      {/* Classification */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ textAlign: 'center', transform: 'translateZ(10px)' }}
      >
        <div style={{ color: 'var(--text-muted)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
          Classification
        </div>
        <div style={{ 
          color: 'var(--text-primary)',
          fontSize: '15px',
          fontWeight: 700,
        }}>
          {classification}
        </div>
      </motion.div>

      {/* Confidence */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-muted)',
          fontSize: '12px',
          transform: 'translateZ(10px)'
        }}
      >
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: confidence === 'high' ? '#22C55E' : confidence === 'medium' ? '#EAB308' : '#94A3B8',
          boxShadow: `0 0 10px ${confidence === 'high' ? '#22C55E' : confidence === 'medium' ? '#EAB308' : '#94A3B8'}`
        }} />
        <span>Confidence: <span style={{ color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'capitalize' }}>{confidence}</span></span>
      </motion.div>
    </motion.div>
  );
}
