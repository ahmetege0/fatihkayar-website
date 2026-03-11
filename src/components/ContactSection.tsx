'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';

const LINKEDIN_URL =
    'https://www.linkedin.com/in/fatihbu%C4%9Frakayar/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B4%2Fbq%2B%2BaqTkGGpQfQf7iZEA%3D%3D';

const CONTACT_EMAIL = 'fatihkayarsite@gmail.com';
const CONTACT_PHONE = '+90 541 306 21 76';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactSection() {
    const locale = useLocale();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<Status>('idle');

    const labels = locale === 'tr'
        ? {
            heading: 'İletişime Geç',
            subheading: 'Seninle konuşmak isterim.',
            subjectPlaceholder: 'Konu',
            messagePlaceholder: 'Mesajın...',
            send: 'Gönder',
            sending: 'Gönderiliyor...',
            sent: 'Mesaj iletildi ✓',
            error: 'Bir hata oluştu. Tekrar dene.',
          }
        : {
            heading: 'Get in Touch',
            subheading: "I'd love to hear from you.",
            subjectPlaceholder: 'Subject',
            messagePlaceholder: 'Your message...',
            send: 'Send',
            sending: 'Sending...',
            sent: 'Message sent ✓',
            error: 'Something went wrong. Try again.',
          };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim() || !message.trim()) return;
        setStatus('sending');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, message }),
            });
            if (res.ok) {
                setStatus('sent');
                setSubject('');
                setMessage('');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section style={styles.section}>
            {/* Thin top divider */}
            <div style={styles.dividerLine} />

            {/* Heading */}
            <div style={styles.headingGroup}>
                <h2 className="font-helvetica" style={styles.heading}>{labels.heading}</h2>
                <p className="font-ibm" style={styles.subheading}>{labels.subheading}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder={labels.subjectPlaceholder}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={styles.input}
                    className="font-ibm"
                    disabled={status === 'sending' || status === 'sent'}
                />
                <textarea
                    placeholder={labels.messagePlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={styles.textarea}
                    className="font-ibm"
                    rows={5}
                    disabled={status === 'sending' || status === 'sent'}
                />
                <div style={styles.formFooter}>
                    <button
                        type="submit"
                        style={{
                            ...styles.sendBtn,
                            opacity: status === 'sending' || status === 'sent' ? 0.5 : 1,
                        }}
                        className="font-ibm"
                        disabled={status === 'sending' || status === 'sent'}
                    >
                        {status === 'sending' ? labels.sending : status === 'sent' ? labels.sent : labels.send}
                    </button>
                    {status === 'error' && (
                        <span className="font-ibm" style={styles.errorText}>{labels.error}</span>
                    )}
                </div>
            </form>

            {/* Contact links */}
            <div style={styles.links}>
                <a href={`mailto:${CONTACT_EMAIL}`} style={styles.link} className="font-ibm">
                    <span style={styles.linkLabel}>mail</span>
                    <span style={styles.linkValue}>{CONTACT_EMAIL}</span>
                </a>
                <span style={styles.linkSep}>·</span>
                <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} style={styles.link} className="font-ibm">
                    <span style={styles.linkLabel}>phone</span>
                    <span style={styles.linkValue}>{CONTACT_PHONE}</span>
                </a>
                <span style={styles.linkSep}>·</span>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={styles.link} className="font-ibm">
                    <span style={styles.linkLabel}>linkedin</span>
                    <span style={styles.linkValue}>fatihbugrakayar</span>
                </a>
            </div>

            {/* Bottom spacing */}
            <div style={{ height: '80px' }} />
        </section>
    );
}

const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px',
    padding: '14px 18px',
    color: 'rgba(240,240,240,0.85)',
    fontSize: '14px',
    letterSpacing: '0.02em',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    fontFamily: 'IBM Plex Sans, sans-serif',
};

const styles: Record<string, React.CSSProperties> = {
    section: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 48px',
        maxWidth: '640px',
        margin: '0 auto',
        width: '100%',
    },
    dividerLine: {
        width: '40px',
        height: '1px',
        background: 'rgba(255,255,255,0.08)',
        marginBottom: '64px',
    },
    headingGroup: {
        textAlign: 'center',
        marginBottom: '48px',
    },
    heading: {
        fontSize: 'clamp(28px, 4vw, 48px)',
        letterSpacing: '0.12em',
        color: 'rgba(240,240,240,0.88)',
        marginBottom: '10px',
    },
    subheading: {
        fontSize: '14px',
        color: 'rgba(240,240,240,0.35)',
        letterSpacing: '0.04em',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
    },
    input: {
        ...inputBase,
    },
    textarea: {
        ...inputBase,
        resize: 'vertical',
        minHeight: '120px',
    },
    formFooter: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginTop: '4px',
    },
    sendBtn: {
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: '6px',
        color: 'rgba(240,240,240,0.85)',
        fontSize: '13px',
        letterSpacing: '0.12em',
        padding: '12px 32px',
        cursor: 'pointer',
        transition: 'background 0.2s ease, opacity 0.2s ease',
    },
    errorText: {
        fontSize: '12px',
        color: 'rgba(255,80,80,0.8)',
        letterSpacing: '0.04em',
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '56px',
    },
    linkSep: {
        color: 'rgba(255,255,255,0.12)',
        fontSize: '18px',
    },
    link: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        textDecoration: 'none',
    },
    linkLabel: {
        fontSize: '9px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(240,240,240,0.25)',
    },
    linkValue: {
        fontSize: '13px',
        color: 'rgba(240,240,240,0.6)',
        letterSpacing: '0.04em',
        transition: 'color 0.2s ease',
    },
};
