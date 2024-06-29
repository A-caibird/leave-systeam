// 'use client';
import { BarChart, Card, Divider, Switch } from '@tremor/react';
import { useState } from 'react';

const data = [
    {
        date: 'CS 1',
        '2025届': 68560,
        '2024届': 28560,
    },
    {
        date: 'CS 2 ',
        '2025届': 70320,
        '2024届': 30320,
    },
    {
        date: 'CS 3',
        '2025届': 80233,
        '2024届': 70233,
    },
    {
        date: 'CS 4',
        '2025届': 55123,
        '2024届': 45123,
    },
    {
        date: 'CS 5',
        '2025届': 56000,
        '2024届': 80600,
    },
    {
        date: 'CS 6',
        '2025届': 100000,
        '2024届': 85390,
    },
];

function valueFormatter(number: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
        notation: 'compact',
        compactDisplay: 'short',
        style: 'currency',
        currency: 'USD',
    });

    return formatter.format(number);
}

export default function StudentBarChart() {
    const [showComparison, setShowComparison] = useState(false);
    return (
        <>
            <Card className="sm:mx-auto sm:max-w-2xl bg-green-200">
                <h3 className="ml-1 mr-1 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    班级人数表
                </h3>
                <BarChart
                    data={data}
                    index="date"
                    categories={
                        showComparison ? ['2025届', '2024届'] : ['2024届']
                    }
                    colors={showComparison ? ['cyan', 'blue'] : ['blue']}
                    valueFormatter={valueFormatter}
                    yAxisWidth={45}
                    className="mt-6 hidden h-40 sm:block"
                />
                <BarChart
                    data={data}
                    index="date"
                    categories={
                        showComparison ? ['2025届', '2024届'] : ['2025届']
                    }
                    colors={showComparison ? ['cyan', 'blue'] : ['blue']}
                    valueFormatter={valueFormatter}
                    showYAxis={false}
                    className="mt-4 h-56 sm:hidden"
                />
                <Divider />
                <div className="mb-2 flex items-center space-x-3">
                    <Switch
                        id="comparison"
                        onChange={() => setShowComparison(!showComparison)}
                    />
                    <label
                        htmlFor="comparison"
                        className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
                    >
                        显示所有年级班级学生人数
                    </label>
                </div>
            </Card>
        </>
    );
}
