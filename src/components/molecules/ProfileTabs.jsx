import Button from "../atoms/Button";

export default function ProfileTabs({ activeTab, onTabChange, tabs }) {
    return (
        <div className="flex items-center gap-8 border-b border-zinc-800 mb-8 pt-4">
            {tabs.map((tab) => (
                <Button
                    key={tab.id}
                    variant="transparent"
                    size="small"
                    onClick={() => onTabChange(tab.id)}
                    className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab.id
                            ? 'text-white'
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full transition-all" />
                    )}
                </Button>
            ))}
        </div>
    );
}
