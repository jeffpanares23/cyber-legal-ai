'use client';

import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false } // 👈 disables server-side rendering
);

export default LottiePlayer;
