import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Timeline.module.scss';

const Timeline = ({ items, variant = 'default', className }) => {
  const timelineClasses = classNames(
    styles.timeline,
    {
      [styles[`timeline--${variant}`]]: variant !== 'default',
    },
    className
  );

  return (
    <div className={classNames(styles['vertex-timeline'], 'vertex-timeline')}>
      <ul className={timelineClasses} role="list">
        {items.map((item, index) => (
          <li 
            key={`timeline-item-${index}`} 
            className={classNames(styles.item, {
              [styles['item--active']]: item.active,
              [styles['item--completed']]: item.completed,
            })}
            role="listitem"
            aria-current={item.active ? 'step' : undefined}
          >
            <div className={styles.marker}>
              {item.icon || (
                <div className={styles.dot} aria-hidden="true" />
              )}
            </div>
            <div className={styles.content}>
              <time className={styles.time} dateTime={item.dateTime}>
                {item.time}
              </time>
              <h3 className={styles.title}>{item.title}</h3>
              {item.description && (
                <p className={styles.description}>{item.description}</p>
              )}
              {item.children && (
                <div className={styles.children}>
                  {item.children}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Timeline.propTypes = {
  /** Array of timeline items */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      /** The time or date of the event (display text) */
      time: PropTypes.string.isRequired,
      /** ISO date string for machine-readable date */
      dateTime: PropTypes.string,
      /** The title of the event */
      title: PropTypes.string.isRequired,
      /** Optional description of the event */
      description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]),
      /** Whether this is the active/current event */
      active: PropTypes.bool,
      /** Whether this event has been completed */
      completed: PropTypes.bool,
      /** Custom icon for the event marker */
      icon: PropTypes.node,
      /** Additional content to display below the description */
      children: PropTypes.node,
    })
  ).isRequired,
  /** The visual style variant of the timeline */
  variant: PropTypes.oneOf(['default', 'compact', 'horizontal']),
  /** Additional class name for the timeline container */
  className: PropTypes.string,
};

Timeline.defaultProps = {
  variant: 'default',
  className: '',
};

export default Timeline;
