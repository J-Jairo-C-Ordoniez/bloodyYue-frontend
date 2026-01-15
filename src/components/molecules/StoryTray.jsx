import StoryCircle from './StoryCircle';

export default function StoryTray({ stories = [] }) {
    return (
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {stories.map((story, index) => (
                <StoryCircle
                    key={index}
                    {...story}
                />
            ))}
        </div>
    );
}
