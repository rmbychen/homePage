'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Messages } from '@/types';
import styles from './Hero.module.css';

export function Hero({
  messages,
  name = 'Letitia',
  locale = 'zh',
}: {
  messages: Messages;
  name?: string;
  locale?: string;
}) {
  const [imgError, setImgError] = useState(false);
  const hero = (messages.hero as Record<string, string>) || {};
  const tagline = hero.tagline || '';
  const greeting = hero.greeting || '';
  const sep = locale === 'en' ? '. ' : '。';
  return (
    <section className={styles.hero}>
      <div className={styles.avatarWrap}>
        {!imgError ? (
          <Image
            className={styles.avatar}
            src="/avatar.jpg"
            alt={name}
            width={120}
            height={120}
            priority
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`${styles.avatar} ${styles.avatarFallback}`} aria-hidden>{name.charAt(0)}</div>
        )}
      </div>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.tagline}>{greeting} {name}{sep}{tagline}</p>
    </section>
  );
}
