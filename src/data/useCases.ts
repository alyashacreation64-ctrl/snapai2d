import type { UseCase } from '@/types';

export const USE_CASES: UseCase[] = [
  {
    icon: '✈️',
    title: 'Travel & Flights',
    description: 'Flight confirmations, boarding passes, check-in reminders, and travel itineraries.',
    example: 'Extract departure times, gate numbers, and check-in deadlines from flight screenshots.',
  },
  {
    icon: '📅',
    title: 'Appointments',
    description: 'Doctor appointments, meetings, salon visits, and scheduled services.',
    example: 'Get the date, time, and location from appointment confirmation screenshots.',
  },
  {
    icon: '💳',
    title: 'Bills & Payments',
    description: 'Utility bills, credit card statements, payment due dates, and amounts owed.',
    example: 'Identify the payment amount, due date, and account details from bill screenshots.',
  },
  {
    icon: '📧',
    title: 'Emails',
    description: 'Important emails requiring follow-up, action items, and deadline reminders.',
    example: 'Extract the required action and deadline from an email screenshot.',
  },
  {
    icon: '💬',
    title: 'Text Messages',
    description: 'Texts from friends, family, or colleagues with requests, plans, or information.',
    example: 'Turn a text about meeting up into a task with time and location.',
  },
  {
    icon: '📦',
    title: 'Delivery Notifications',
    description: 'Package tracking, delivery estimates, and shipping updates.',
    example: 'Get the expected delivery date and any action needed from a shipping notification.',
  },
  {
    icon: '🎟️',
    title: 'Events',
    description: 'Concert tickets, event registrations, and calendar invites.',
    example: 'Extract event date, time, venue, and what to bring from a ticket screenshot.',
  },
  {
    icon: '💼',
    title: 'Work Tasks',
    description: 'Slack messages, project updates, task assignments, and meeting notes.',
    example: 'Convert a Slack message into a task with deadline and priority.',
  },
  {
    icon: '🎓',
    title: 'School Tasks',
    description: 'Assignment deadlines, class schedules, exam dates, and study reminders.',
    example: 'Extract assignment due dates and instructions from a syllabus screenshot.',
  },
  {
    icon: '🛒',
    title: 'Shopping',
    description: 'Order confirmations, return deadlines, price alerts, and shopping lists.',
    example: 'Track order status and return windows from a purchase confirmation.',
  },
  {
    icon: '🏠',
    title: 'Home Tasks',
    description: 'Maintenance reminders, warranty info, service appointments, and home projects.',
    example: 'Turn a home repair reminder into a task with the recommended action.',
  },
  {
    icon: '🔧',
    title: 'Contractors & Service Professionals',
    description: 'Customer requests, job details, addresses, material lists, and pricing.',
    example: 'Extract the job, address, time, and materials needed from a customer message.',
  },
];
