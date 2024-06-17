import React, { useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components'
const TabItem = styled.div<{ active: boolean }>`
    color: black;
    font-size: 20px;
    position:  relative;
    padding-bottom: 5px;
    &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0px;
    height: 4px;
    background-color: blue;
    transition: all 1s ease;
  }
    ${props => props.active &&
        css`
        color: blue;
        &::after{
        width: 100%;
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
