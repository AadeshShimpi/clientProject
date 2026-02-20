import contentData from '@/data/content.json';

const CONTENT_VERSION = '1.0';

export function getContent() {
  if (typeof window !== 'undefined') {
    const savedContent = localStorage.getItem('websiteContent');
    const savedVersion = localStorage.getItem('contentVersion');
    
    if (savedContent && savedVersion === CONTENT_VERSION) {
      try {
        return JSON.parse(savedContent);
      } catch (e) {
        console.error('Error loading saved content:', e);
      }
    }
  }
  return contentData;
}

export function saveContent(content: typeof contentData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('websiteContent', JSON.stringify(content));
    localStorage.setItem('contentVersion', CONTENT_VERSION);
  }
}


