import SkillTags from "./SkillTags";

export default function SkillGap({ missingSkills }) {
    return (
        <div>
            <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                Skills required by top-matched jobs but missing from your resume:
            </p>
            <SkillTags skills={missingSkills} type="missing" />
            {missingSkills.length > 0 && (
                <p className="text-[10px] text-[var(--color-text-muted)] mt-3 italic">
                    💡 Tip: Consider learning these skills to improve your job match score.
                </p>
            )}
        </div>
    );
}
