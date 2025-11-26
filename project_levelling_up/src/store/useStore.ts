import { create } from 'zustand';

interface LevelUpState {
    currentModule: number;
    currentLesson: number;
    currentStep: number;
    xp: number;
    streak: number;
    completedSteps: string[]; // IDs of completed steps
    setCurrentStep: (step: number) => void;
    addXP: (amount: number) => void;
    completeStep: (stepId: string) => void;
}

export const useStore = create<LevelUpState>((set) => ({
    currentModule: 1,
    currentLesson: 1,
    currentStep: 1,
    xp: 0,
    streak: 1,
    completedSteps: [],
    setCurrentStep: (step) => set({ currentStep: step }),
    addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
    completeStep: (stepId) => set((state) => ({
        completedSteps: [...state.completedSteps, stepId],
        xp: state.xp + 50 // Bonus for completion
    })),
}));
