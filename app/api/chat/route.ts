import { NextRequest, NextResponse } from 'next/server';

const PROFILE = {
  zh: {
    role: '质量工程师',
    doing: '借助 AI 做一些有趣的事情。',
    skills: '质量管控、严谨细致。',
    hobbies: '钓鱼、做饭、刷抖音。',
    motto: '秉承人生不是成功就是成长。',
  },
  en: {
    role: 'quality engineer',
    doing: 'Exploring interesting things with AI.',
    skills: 'Quality control, rigor and detail.',
    hobbies: 'Fishing, cooking, Douyin.',
    motto: 'Life is either success or growth.',
  },
};

function answer(question: string, locale: 'zh' | 'en'): string {
  const p = PROFILE[locale];
  const q = question.toLowerCase().trim();
  const isZh = locale === 'zh';

  if (isZh) {
    if (/擅长|会什么|做什么的|技能|技术/.test(q)) return `我是${p.role}，擅长或关心的方向是：${p.skills}`;
    if (/最近|在做|现在做/.test(q)) return `我最近在做：${p.doing}`;
    if (/爱好|兴趣|喜欢/.test(q)) return `我的兴趣是：${p.hobbies}`;
    if (/特点|座右铭|记忆点/.test(q)) return p.motto;
    if (/谁|介绍|名字|叫什么/.test(q)) return '您好，我是陈亮，是一位质量工程师，喜欢用严谨来解决问题，一根头发都不放过。';
  } else {
    if (/good at|skill|what do you do|expertise/.test(q)) return `I'm a ${p.role}. I care about: ${p.skills}`;
    if (/recent|doing now|lately|working on/.test(q)) return `Lately I'm ${p.doing}`;
    if (/hobby|hobbies|interest|like/.test(q)) return `My interests: ${p.hobbies}`;
    if (/motto|character|remember/.test(q)) return p.motto;
    if (/who|introduce|name/.test(q)) return "I'm Chen Liang, a quality engineer who likes solving problems with rigor. Not a single hair gets past me.";
  }

  return isZh
    ? '你可以问我：我擅长什么？最近在做什么？有什么爱好？'
    : 'You can ask: What am I good at? What am I doing lately? What are my hobbies?';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = typeof body.question === 'string' ? body.question : '';
    const locale = body.locale === 'en' ? 'en' : 'zh';
    const reply = answer(question, locale);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: 'Sorry, something went wrong.' },
      { status: 500 }
    );
  }
}
