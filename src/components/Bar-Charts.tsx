// 'use client';
import { BarChart, Card, Divider, Switch } from '@tremor/react';
import { useState } from 'react';

const data = [
    {
        date: 'CS 1',
        '2025届': 40,
        '2024届': 35,
    },
    {
        date: 'CS 2 ',
        '2025届': 38,
        '2024届': 32,
    },
    {
        date: 'CS 3',
        '2025届': 39,
        '2024届': 37,
    },
    {
        date: 'CS 4',
        '2025届': 40,
        '2024届': 33,
    },
    {
        date: 'CS 5',
        '2025届': 33,
        '2024届': 34,
    },
    {
        date: 'CS 6',
        '2025届':38,
        '2024届': 34,
    },
];

function valueFormatter(number: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
        notation: 'compact',
        compactDisplay: 'short',
        style: 'currency',
        currency: 'CNY',
    });

    return formatter.format(number);
}

export default function StudentBarChart() {
    const [showComparison, setShowComparison] = useState(false);
    return (
        <>
            <Card className="sm:mx-auto sm:max-w-2xl lg:min-w-[700px] min-w-[462px] w-full bg-green-200 !m-0">
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
                    className="mt-6 hidden h-40 sm:block !w-full"
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
                    className="mt-4 h-56 sm:hidden w-full"
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
