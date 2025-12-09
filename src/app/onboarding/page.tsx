
import { WizardForm } from "@/components/onboarding/wizard-form";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-background rounded-2xl shadow-sm border p-6 md:p-12">
                <WizardForm />
            </div>
        </div>
    );
}
