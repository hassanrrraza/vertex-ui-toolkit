import React from 'react';
import Timeline from './Timeline';
import styles from './Timeline.module.scss';

const TimelineDemo = () => {
  // Sample timeline data
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
    <div className={styles.container}>
      <div className={styles.example}>
        <h3>Default Timeline</h3>
        <Timeline items={timelineItems} />
      </div>
      
      <div className={styles.example}>
        <h3>Compact Timeline</h3>
        <Timeline items={timelineItems} variant="compact" />
      </div>
      
      <div className={`${styles.example} ${styles.horizontalContainer}`}>
        <h3>Horizontal Timeline</h3>
        <Timeline items={timelineItems} variant="horizontal" />
      </div>
    </div>
  );
};

// Export TimelineDemo as the main component
export { Timeline } from './Timeline';
export { TimelineDemo as default };
