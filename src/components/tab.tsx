import React, { useState } from 'react';
import { styled, css } from 'styled-components'
const TabItem = styled.div<{ active: boolean }>`
    color:red;
    font-size: 20px;
    ${props =>
        props.active && css`
                color:blue;
            `
    }
`

export interface TabProps {
    label: string;
    name: string;
    content: JSX.Element;
}

export const TabComponent: React.FC<{ Tabs: TabProps[] }> = ({ Tabs }) => {
    const [activeName, setActiveName] = useState('first');
    const handleClick = (name: string) => {
        setActiveName(name);
    };
    return (
        <div className="demo-tabs">
            <div className="tab-header flex justify-around">
                {Tabs.map((tab) => (
                    <TabItem key={tab.name} onClick={() => handleClick(tab.name)} active={activeName === tab.name}>
                        {tab.label}
                    </TabItem>
                ))}
            </div>
            <div className="tab-content">
                {Tabs.map((tab) => activeName === tab.name && tab.content)}
            </div>
        </div>
    );
};

export default TabComponent;
