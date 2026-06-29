import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';

const PhilsFriendsPage: React.FC = () => {
  return (
    <div
      className="relative w-full min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1a4d1a 0%, #2d7a2d 45%, #4caf50 100%)' }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 14 }}
        className="relative"
      >
        <PandaLogo className="w-28 h-28 rounded-3xl shadow-2xl" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.35, type: 'spring' }}
          className="absolute -top-2 -right-2 bg-amber-400 rounded-full p-2 shadow-lg"
        >
          <Sparkles className="h-4 w-4 text-white" />
        </motion.div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-6 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-white"
      >
        Coming Soon
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-4 text-3xl font-bold text-white"
      >
        Phil&apos;s Friends
      </motion.h1>

      {/* Message from Phil — speech-bubble card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 max-w-md rounded-2xl bg-white/95 p-5 shadow-2xl"
      >
        <div className="flex items-center gap-2 justify-center mb-2">
          <PandaLogo className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-emerald-900">A note from Phil</span>
        </div>
        <p className="text-sm leading-relaxed text-gray-700">
          I&apos;m hard at work building Phil&apos;s Friends — short, fun videos to help you
          learn money and career skills from people who&apos;ve been there. It&apos;s not
          quite ready yet, but it&apos;s coming. Thanks for your patience — it&apos;ll be
          worth the wait! 🐼
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-xs text-white/70"
      >
        Keep exploring the rest of the app while you wait.
      </motion.p>
    </div>
  );
};

export default PhilsFriendsPage;
