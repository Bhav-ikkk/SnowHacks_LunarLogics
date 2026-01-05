import { 
  IconHome,
  IconDashboard,
  IconDatabase,
  IconSettings,
  IconUsers,
  IconFileText,
  IconChartBar,
} from '@tabler/icons-react';

// action/subject used for CASL check (ability.can(action, subject))
export const menuItems = [
  { 
    label: 'Home', 
    icon: <IconHome size={20} />, 
    path: '/', 
    action: 'read', 
    subject: 'Home' 
  },
  { 
    label: 'Dashboard', 
    icon: <IconDashboard size={20} />, 
    path: '/dashboard', 
    action: 'read', 
    subject: 'Dashboard' 
  },
  {
    label: 'Masters',
    icon: <IconDatabase size={20} />,
    action: 'read',
    subject: 'Masters',
    children: [
      { 
        label: 'User Management', 
        path: '/masters/user-management', 
        icon: <IconUsers size={16} />, 
        action: 'manage', 
        subject: 'User' 
      },
    ]
  },
  {
    label: 'Reports',
    icon: <IconChartBar size={20} />,
    action: 'read',
    subject: 'Reports',
    children: [
      { 
        label: 'Analytics', 
        path: '/reports/analytics', 
        icon: <IconFileText size={16} />, 
        action: 'read', 
        subject: 'Reports' 
      },
    ]
  },
  {
    label: 'Administration', 
    icon: <IconSettings size={20} />, 
    action: 'manage', 
    subject: 'all',
    children: [
      { 
        label: 'Settings', 
        path: '/settings', 
        icon: <IconSettings size={18} />, 
        action: 'manage', 
        subject: 'all' 
      },
    ]
  }
];
