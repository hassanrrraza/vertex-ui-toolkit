import React from 'react';
import Timeline from '../components/Timeline/Timeline';
import '../styles/TimelineDemo.scss';

const TimelineDemo = () => {
  const timelineItems = [
    {
      time: '2 hours ago',
      title: 'Project Created',
      description: 'New project has been initialized with basic setup.',
      completed: true
    },
    {
      time: '1 hour ago',
      title: 'Components Added',
      description: 'UI components library has been integrated.',
      active: true
    },
    {
      time: '30 minutes ago',
      title: 'Testing Complete',
      description: 'All components tested and working properly.'
    },
    {
      time: 'Just now',
      title: 'Deployment Started',
      description: 'Application is being deployed to production.'
    }
  ];

  return (
    <div className="container">
      <h1>Timeline Component</h1>
      
      <section className="demo-section">
        <h2>Default Timeline</h2>
        <Timeline items={timelineItems} />
      </section>
      
      <section className="demo-section">
        <h2>Compact Timeline</h2>
        <Timeline items={timelineItems} variant="compact" />
      </section>
      
      <section className="demo-section">
        <h2>Horizontal Timeline</h2>
        <div className="horizontal-timeline-container">
          <Timeline items={timelineItems} variant="horizontal" />
        </div>
      </section>
    </div>
  );
};

export default TimelineDemo;
