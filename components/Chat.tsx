'use client';

import { useState, useRef, useEffect } from 'react';
import type { Messages } from '@/types';
import styles from './Chat.module.css';

type ChatMessage = { role: 'user' | 'bot'; text: string; thinking?: boolean };

export function Chat({ messages, locale }: { messages: Messages; locale: string }) {
  const chat = (messages.chat as Record<string, string>) || {};
  const [list, setList] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [list]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setList((prev) => [...prev, { role: 'user', text }]);
    setLoading(true);
    setList((prev) => [...prev, { role: 'bot', text: chat.thinking || 'Thinking…', thinking: true }]);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, locale }),
      });
      const data = await res.json();
      const reply = data.reply || (locale === 'zh' ? '抱歉，我没理解你的问题。' : 'Sorry, I didn\'t get that.');
      setList((prev) =>
        prev.map((m) =>
          m.thinking ? { ...m, text: reply, thinking: false } : m
        )
      );
    } catch {
      setList((prev) =>
        prev.map((m) =>
          m.thinking
            ? {
                ...m,
                text: locale === 'zh' ? '网络出错，请稍后再试。' : 'Network error. Please try again.',
                thinking: false,
              }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.chat}>
      <h2 className={styles.title}>{chat.title || '数字分身'}</h2>
      <p className={styles.intro}>{chat.intro || ''}</p>
      <div className={styles.messages}>
        {list.length === 0 && (
          <div className={`${styles.msg} ${styles.msgBot}`}>
            <div className={styles.bubble}>{chat.intro}</div>
          </div>
        )}
        {list.map((m, i) => (
          <div
            key={i}
            className={`${styles.msg} ${m.role === 'user' ? styles.msgUser : styles.msgBot}${m.thinking ? ` ${styles.msgThinking}` : ''}`}
          >
            <div className={styles.bubble}>{m.text}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className={styles.inputRow}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder={chat.placeholder || 'Ask…'}
          disabled={loading}
        />
        <button type="button" onClick={send} disabled={loading}>
          {chat.send || 'Send'}
        </button>
      </div>
    </section>
  );
}
