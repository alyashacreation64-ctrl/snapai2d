import type { FAQItem } from '@/types';

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is Snap2Do AI?',
    answer: 'Snap2Do AI is a free tool that analyzes your screenshots and turns them into actionable tasks. Upload any screenshot, and the AI identifies what action is required, important dates, deadlines, times, locations, amounts, and the recommended next step — all without needing to create an account.',
  },
  {
    question: 'How does the AI screenshot analyzer work?',
    answer: 'When you upload a screenshot, Snap2Do AI sends it to a secure server-side AI model that reads the image and extracts actionable information. The AI identifies text, dates, times, locations, amounts, and instructions in the screenshot, then structures them into a clear action plan. The analysis happens instantly, and your results are displayed right on the screen.',
  },
  {
    question: 'Is Snap2Do free?',
    answer: 'Yes, Snap2Do AI is 100% free. There are no hidden fees, no credit card required, and no subscription. You can analyze as many screenshots as you need without paying anything.',
  },
  {
    question: 'Do I need an account?',
    answer: 'No. Snap2Do AI does not require login, signup, or any kind of account. You can use the tool immediately — just upload a screenshot and get your results.',
  },
  {
    question: 'Can I use Snap2Do on my phone?',
    answer: 'Yes. Snap2Do AI is fully responsive and works on mobile phones, tablets, and desktop computers. The upload tool is designed to be easy to use on any device, with touch-friendly buttons and drag-and-drop support on desktop.',
  },
  {
    question: 'What screenshots can I upload?',
    answer: 'You can upload screenshots in PNG, JPG, JPEG, or WEBP format, up to 10MB in size. Common examples include flight confirmations, text messages, emails, bills, appointment reminders, delivery notifications, event tickets, and customer messages.',
  },
  {
    question: 'Can Snap2Do detect deadlines?',
    answer: 'Yes. One of the core features of Snap2Do AI is detecting deadlines, due dates, and time-sensitive information in screenshots. The AI extracts dates and times and presents them clearly so you know exactly when action is needed.',
  },
  {
    question: 'Can Snap2Do extract tasks?',
    answer: 'Yes. Snap2Do AI is designed to identify actionable tasks within screenshots. Whether it is a flight check-in, a bill payment, an appointment, or a customer request, the AI determines what needs to be done and recommends a next step.',
  },
  {
    question: 'Can contractors use Snap2Do?',
    answer: 'Absolutely. Snap2Do AI is particularly useful for contractors and service professionals who receive screenshots containing customer requests, job details, addresses, appointment times, material lists, and pricing information. The AI extracts all of this and turns it into a clear action item. Learn more on our AI tools for contractors page.',
  },
  {
    question: 'Does Snap2Do store screenshots?',
    answer: 'Snap2Do AI does not permanently store your screenshots. When you upload a screenshot, it is sent securely to our AI processing service for analysis, and the result is returned to your browser. We do not save uploaded images to a database, and they are not publicly accessible. Your screenshots are processed in real-time and not retained after analysis.',
  },
  {
    question: 'What happens if there is no action required?',
    answer: 'If the AI determines that a screenshot does not contain actionable information, it will display "No Action Required" and explain that no tasks, deadlines, or instructions were detected. This can happen with generic images, memes, or screenshots that are purely informational.',
  },
  {
    question: 'How accurate is the AI?',
    answer: 'Snap2Do AI uses advanced vision-language models to analyze screenshots, and it is highly accurate at reading text, dates, times, and other structured information. However, AI is not perfect. Results may occasionally contain errors, especially with blurry images, unusual formatting, or handwriting. Always verify important information such as payment amounts, deadlines, travel details, and addresses before acting on them.',
  },
];
