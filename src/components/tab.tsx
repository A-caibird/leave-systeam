import React, { useState } from 'react';

export interface TabProps {
    label: string;
    name: string;
    content: JSX.Element;
}

export const TabComponent: React.FC<{ Tabs: TabProps[] }> = ({ Tabs }) => {
    const [activeName, setActiveName] = useState('first');
    console.log(Tabs)

    const handleClick = (name: string) => {
        setActiveName(name);
    };

    return (
        <div className="demo-tabs">
            <div className="tab-header">
                {Tabs.map((tab) => (
                    <div
                        key={tab.name}
                        className={`tab-item ${activeName === tab.name ? 'active' : ''}`}
                        onClick={() => handleClick(tab.name)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                {Tabs.map((tab) => activeName === tab.name && tab.content)}
            </div>
        </div>
    );
};

export default TabComponent;
