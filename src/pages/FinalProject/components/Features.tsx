import { motion } from 'framer-motion';

const features = [
    {
        id: 1,
        title: "Structured Learning",
        description: "Break big concepts into bite-sized steps. Never feel overwhelmed—just follow the path.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Real Projects",
        description: "Build actual things, not just theory. Every project leaves you with something you can show off.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        )
    },
    {
        id: 3,
        title: "Progress Tracking",
        description: "See where you are and what's next. The roadmap keeps you moving forward, always.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        )
    },
    {
        id: 4,
        title: "AI Assistant",
        description: "Get help when you're stuck. Ask questions, get explanations, keep learning without breaking flow.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        )
    },
    {
        id: 5,
        title: "Personalized Path",
        description: "Learn at your own pace, your way. Pick projects that match your style and interests.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        )
    },
    {
        id: 6,
        title: "Continue Anytime",
        description: "Life happens. Pick up exactly where you left off, whenever you're ready to keep going.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
        )
    }
];

const Features = () => {
    return (
        <section style={{ padding: '8rem 2rem', background: '#050505', color: '#fff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #a0a0a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                        What you get
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ fontSize: '1.2rem', color: '#a0a0a0' }}
                    >
                        Everything you need to learn by doing
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, borderColor: 'rgba(139, 92, 246, 0.5)' }}
                            style={{
                                background: 'linear-gradient(145deg, #121215, #0a0a0a)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                padding: '2.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                                cursor: 'default',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                color: '#a78bfa',
                                width: '48px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(139, 92, 246, 0.1)',
                                borderRadius: '12px'
                            }}>
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem', color: '#fff' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: '#a0a0a0', lineHeight: '1.6', fontSize: '1rem' }}>
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
