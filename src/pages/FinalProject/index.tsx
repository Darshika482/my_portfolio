import HeroScene from './components/HeroScene';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import EnvelopeLearningPath from './components/EnvelopeLearningPath';

const FinalProject = () => {
    return (
        <div style={{ width: '100%', minHeight: '100vh', background: '#020205' }}>
            <HeroScene />
            <HowItWorks />
            <Features />
            <EnvelopeLearningPath />
        </div>
    );
};

export default FinalProject;
