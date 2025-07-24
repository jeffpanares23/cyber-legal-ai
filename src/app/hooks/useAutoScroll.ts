// File: src/hooks/useAutoScroll.ts
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/types/ChatTypes" // ✅ adjust path as needed

export function useAutoScroll(messages: ChatMessage[], isTyping: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const userScrolledUpRef = useRef(false); // ✅ track if user scrolls up

  // ✅ Detect scroll activity
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;

      const isUserNearBottom = distanceFromBottom < 100;
      userScrolledUpRef.current = !isUserNearBottom;

      setShowScrollButton(!isUserNearBottom); // ✅ triggers scroll button
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Scroll to bottom only if user didn’t scroll away
  useEffect(() => {
    const container = containerRef.current;
    if (!container || userScrolledUpRef.current) return;

    const timeout = setTimeout(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }, 80); // ⚡ slight delay for layout

    return () => clearTimeout(timeout);
  }, [messages.length, isTyping]);

  // ✅ Manual button-based scroll to bottom
  const scrollToBottom = () => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });

    userScrolledUpRef.current = false;
    setShowScrollButton(false);
  };

  return {
    containerRef,
    showScrollButton,
    scrollToBottom,
  };
}
