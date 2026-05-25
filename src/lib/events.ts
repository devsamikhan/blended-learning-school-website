import { useEffect } from 'react';

// Public website events only
export const EVENTS = {
  ADMISSION_CHANGE: 'admission-storage-change',
  INQUIRY_CHANGE: 'inquiry-storage-change',
  NEWS_CHANGE: 'news-storage-change',
};

// BroadcastChannel for cross-tab real-time communication
const channel = typeof window !== 'undefined' ? new BroadcastChannel('bls_events') : null;

export function dispatchCustomEvent(eventName: string) {
  window.dispatchEvent(new Event(eventName));
  channel?.postMessage({ eventName });
}

export function useEventListener(eventName: string, callback: () => void) {
  useEffect(() => {
    window.addEventListener(eventName, callback);
    const handleBroadcast = (e: MessageEvent) => {
      if (e.data?.eventName === eventName) callback();
    };
    channel?.addEventListener('message', handleBroadcast);
    return () => {
      window.removeEventListener(eventName, callback);
      channel?.removeEventListener('message', handleBroadcast);
    };
  }, [eventName, callback]);
}