'use client';

import Link from 'next/link';
import { Shield, Zap, Eye, Lock, AlertTriangle } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { HeroScene } from '@/components/3d/HeroScene';

const workflowSteps = [
  {
    number: '01',
    title: 'Paste',
    description: 'Drop in any suspicious URL, SMS, WhatsApp message, or email content.',
    icon: '📥',
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'AI + deterministic cybersecurity heuristics inspect it for 30+ threat indicators.',
    icon: '🔬',
  },
  {
    number: '03',
    title: 'Understand',
    description: 'See the exact warning signs with evidence, severity, and plain-language explanations.',
    icon: '🔍',
  },
  {
    number: '04',
    title: 'Act',
    description: 'Get a personalized response plan based on what you already did.',
    icon: '🛡️',
  },
];

const threatTypes = [
  { icon: '🎣', label: 'Phishing' },
  { icon: '💸', label: 'Financial Scams' },
  { icon: '🔑', label: 'Credential Theft' },
  { icon: '📱', label: 'OTP Scams' },
  { icon: '🎭', label: 'Impersonation' },
  { icon: '💼', label: 'Job Scams' },
  { icon: '📦', label: 'Delivery Scams' },
  { icon: '🕵️', label: 'Identity Theft' },
];

const capabilities = [
  {
    icon: Shield,
    title: 'Deterministic Engine',
    description: '30+ rule-based security checks that run before AI — not influenced by prompt injection.',
  },
  {
    icon: Eye,
    title: 'Explainable Results',
    description: 'Every finding shows what was detected, why it matters, and its severity level.',
  },
  {
    icon: Zap,
    title: 'Incident Response',
    description: 'Tell us what happened and get a step-by-step response plan tailored to your situation.',
  },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function HomePage() {
  return (
    <div suppressHydrationWarning>
      {/* Hero Section */}
      <section style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        
        {/* 3D Background */}
        <HeroScene />

        {/* Overlay gradient to ensure text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, var(--bg-base) 80%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <motion.div 
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          style={{ position: 'relative', zIndex: 10, maxWidth: '800px', textAlign: 'center' }}
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'rgba(56, 189, 248, 0.05)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: '100px',
            marginBottom: '32px',
            color: 'var(--cyan-primary)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.1), inset 0 0 10px rgba(56, 189, 248, 0.1)',
          }}>
            <Lock size={14} />
            AI-Powered Cybersecurity
          </motion.div>

          {/* Main headline */}
          <motion.h1 variants={fadeInUp} style={{
            fontSize: 'clamp(42px, 8vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '24px',
            color: 'var(--text-primary)',
            textShadow: '0 10px 30px rgba(0,0,0,0.8)'
          }}>
            Don&apos;t Just Detect{' '}
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #7DD3FC, #38BDF8, #0284C7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.4))'
            }}>
              the Threat.
            </span>
            <br />
            Know What to Do Next.
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeInUp} style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '48px',
            maxWidth: '600px',
            margin: '0 auto 48px',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}>
            CyberShield AI analyzes suspicious links and messages, explains every warning sign with evidence, and gives you a personalized response plan.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <Link href="/analyze" className="btn-primary" style={{ 
              fontSize: '15px', 
              padding: '16px 36px',
              textDecoration: 'none',
              borderRadius: '12px',
              boxShadow: '0 0 40px rgba(56, 189, 248, 0.4), inset 0 2px 4px rgba(255,255,255,0.4)',
            }}>
              <Shield size={18} />
              Analyze a Threat
            </Link>
            <Link href="/analyze?demo=true" className="btn-secondary" style={{ 
              fontSize: '15px',
              padding: '16px 32px',
              textDecoration: 'none',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              background: 'rgba(13, 24, 40, 0.6)'
            }}>
              Try Demo →
            </Link>
          </motion.div>

          {/* Warning notice */}
          <motion.div variants={fadeInUp} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 20px',
            background: 'rgba(234, 179, 8, 0.1)',
            border: '1px solid rgba(234, 179, 8, 0.2)',
            borderRadius: '12px',
            color: '#FCD34D',
            fontSize: '13px',
            backdropFilter: 'blur(5px)'
          }}>
            <AlertTriangle size={14} />
            Do not paste passwords, OTPs, private keys, or payment card information.
          </motion.div>
        </motion.div>
      </section>

      {/* Threat Types */}
      <section style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '32px 24px',
        background: 'linear-gradient(90deg, var(--bg-surface), var(--bg-base), var(--bg-surface))',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Detects
            </span>
            {threatTypes.map(({ icon, label }) => (
              <motion.div 
                key={label}
                whileHover={{ scale: 1.05, y: -2, borderColor: 'var(--cyan-primary)' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '100px',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                  backdropFilter: 'blur(5px)'
                }}
              >
                <span>{icon}</span>
                {label}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '120px 24px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <motion.div variants={fadeInUp} className="section-label" style={{ marginBottom: '16px' }}>Workflow</motion.div>
            <motion.h2 variants={fadeInUp} style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.02em', textShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
              From Suspicious to Secure <br />in <span style={{ color: 'var(--cyan-primary)' }}>4 Steps</span>
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '32px',
            }}
          >
            {workflowSteps.map((step) => (
              <motion.div 
                key={step.number} 
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -5 }}
                className="card"
                style={{
                  padding: '40px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  fontSize: '120px',
                  fontWeight: 900,
                  color: 'rgba(56, 189, 248, 0.03)',
                  lineHeight: 1,
                  fontFamily: 'JetBrains Mono, monospace',
                  userSelect: 'none',
                }}>
                  {step.number}
                </div>
                <div style={{ fontSize: '40px', marginBottom: '24px', filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.3))' }}>{step.icon}</div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  color: 'var(--cyan-primary)',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}>
                  Step {step.number}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={{ 
        padding: '120px 24px',
        background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-base) 100%)',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <motion.div variants={fadeInUp} className="section-label" style={{ marginBottom: '16px' }}>Why CyberShield AI</motion.div>
            <motion.h2 variants={fadeInUp} style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Engineered for Precision
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            {capabilities.map(({ icon: Icon, title, description }) => (
              <motion.div 
                key={title} 
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="card"
                style={{ padding: '40px' }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(56, 189, 248, 0.05))',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  boxShadow: '0 0 20px rgba(56, 189, 248, 0.1), inset 0 2px 5px rgba(255,255,255,0.1)'
                }}>
                  <Icon size={26} color="var(--cyan-primary)" style={{ filter: 'drop-shadow(0 0 5px rgba(56,189,248,0.5))' }} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>{title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '120px 24px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 40 }}
            style={{
              padding: '80px 48px',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(13, 24, 40, 0.8) 100%)',
              border: '1px solid var(--border-active)',
              borderRadius: '24px',
              maxWidth: '800px',
              margin: '0 auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 2px 10px rgba(255,255,255,0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Ambient inner glow */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(ellipse at top, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ fontSize: '64px', marginBottom: '24px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 20px rgba(56,189,248,0.4))' }}>🛡️</div>
            <h2 style={{ 
              fontSize: 'clamp(32px, 5vw, 48px)', 
              fontWeight: 900, 
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              position: 'relative',
              zIndex: 1,
              textShadow: '0 4px 10px rgba(0,0,0,0.5)'
            }}>
              Command Your Security
            </h2>
            <p style={{ 
              color: 'var(--text-secondary)', 
              marginBottom: '40px',
              fontSize: '18px',
              lineHeight: 1.7,
              position: 'relative',
              zIndex: 1
            }}>
              Paste any suspicious content. Get a deterministic analysis and an actionable response plan in seconds.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <Link href="/analyze" className="btn-primary" style={{ 
                textDecoration: 'none',
                fontSize: '15px',
                padding: '16px 36px',
                boxShadow: '0 10px 30px rgba(56, 189, 248, 0.3)',
              }}>
                <Shield size={16} />
                Initiate Scan
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
