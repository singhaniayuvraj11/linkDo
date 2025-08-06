// 1. Make this a Client Component to use hooks
"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const VideoBackground = () => {
  // 2. State to ensure the component is mounted on the client
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. Determine the video source based on the current theme
  const videoSrc = theme === 'dark' 
    ? '/dark-background.mp4' 
    : '/light-background.mp4';
  
  // 4. Don't render until mounted on the client to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full "></div>
      
      {/* 5. Use the dynamic videoSrc */}
      <video
        // The key forces React to re-render the video tag when the src changes
        key={videoSrc}
        className="w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default VideoBackground;