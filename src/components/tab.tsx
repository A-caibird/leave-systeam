import React, { useState } from 'react';
import { styled, css } from 'styled-components'
const TabItem = styled.div<{ active: boolean }>`
    color: red;
    font-size: 20px;
    position:  relative;
    padding-bottom: 5px;
    transition: color  0.3 ease-in-out;
    &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: red;
    transition: background-color  1s ease-in-out;
    transition: height 0.3s ease;
  }
    ${props => props.active &&
        css`
        color: blue;
        &::after{
        background-color: blue;
        height: 4px;
        }
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
