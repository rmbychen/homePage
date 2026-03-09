import type { Messages } from '@/types';
import styles from './About.module.css';

export function About({ messages }: { messages: Messages }) {
  const about = (messages.about as Record<string, string>) || {};
  return (
    <section className={styles.about}>
      <h2 className={styles.title}>{about.title || '关于我'}</h2>
      <div className={styles.row}>
        <div className={styles.label}>{about.doing || '正在做'}</div>
        <div className={styles.value}>{about.doingValue || ''}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>{about.interests || '兴趣'}</div>
        <div className={styles.value}>{about.interestsValue || ''}</div>
      </div>
      <div className={styles.motto}>{about.motto || ''}</div>
    </section>
  );
}
