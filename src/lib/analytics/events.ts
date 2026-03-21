type GtagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sendEvent({ action, ...params }: GtagEvent) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

export const analytics = {
  heroCTAClick: (label: string, pagePath: string) =>
    sendEvent({ action: "hero_cta_click", cta_label: label, page_path: pagePath }),

  navigationBookClick: (pagePath: string) =>
    sendEvent({ action: "navigation_book_click", page_path: pagePath }),

  footerBookClick: (pagePath: string) =>
    sendEvent({ action: "footer_book_click", page_path: pagePath }),

  roomBookClick: (roomType: string, pagePath: string) =>
    sendEvent({ action: "room_book_click", room_type: roomType, page_path: pagePath }),

  packageBookClick: (packageName: string, pagePath: string) =>
    sendEvent({ action: "package_book_click", package_name: packageName, page_path: pagePath }),

  whatsappClick: (pagePath: string, sourceSection: string) =>
    sendEvent({ action: "whatsapp_click", page_path: pagePath, source_section: sourceSection }),

  galleryOpen: (imageCategory: string, imageIndex: number) =>
    sendEvent({ action: "gallery_open", image_category: imageCategory, image_index: imageIndex }),

  activityView: (activityName: string) =>
    sendEvent({ action: "activity_view", activity_name: activityName }),

  hanifaruPageView: () =>
    sendEvent({ action: "hanifaru_page_view" }),

  bookingWidgetOpen: (sourcePage: string, roomType?: string) =>
    sendEvent({ action: "booking_widget_open", source_page: sourcePage, room_type: roomType }),

  faqExpand: (question: string, category: string) =>
    sendEvent({ action: "faq_expand", faq_question: question.slice(0, 50), faq_category: category }),

  videoPause: (pagePath: string) =>
    sendEvent({ action: "video_pause", page_path: pagePath }),
};
