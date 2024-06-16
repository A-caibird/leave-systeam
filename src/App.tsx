// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styled from 'styled-components';
import { TabComponent, TabProps } from '@/components/tab.tsx';
const Title = styled.h1.attrs({ className: 'bg-red-500' })`
  font-size: 1.5em;
  text-align: center;
`;

const tabs: TabProps[] = [
    { label: 'User', name: 'first', content: <div>User</div> },
    { label: 'Config', name: 'second', content: <div>Config</div> },
    { label: 'Role', name: 'third', content: <div>Role</div> },
    { label: 'Task', name: 'fourth', content: <div>Task</div> },
];
function App() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <div className='flex'>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <Title>fasfasdaf</Title>
            <div className='grid grid-row-2 w-[400px] h-[200px]'>
                <div className='bg-green-100 flex items-center justify-center'>
                    <span className='text-3xl'>
                        请假管理系统
                    </span>
                </div>
                <div className='bg-green-300'>
                    <TabComponent Tabs={tabs} />
                </div>
            </div>
        </>
    )
}

export default App
