'use client';

import { useTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Chip,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AvatarGroup,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  LocalShipping as LocalShippingIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

// Stat Card Component
function StatCard({ title, value, change, changeType, icon, color, vsText }) {
  const theme = useTheme();
  const isPositive = changeType === 'positive';

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${color}.main`,
              color: 'white',
              boxShadow: `0 8px 16px -4px ${theme.palette[color].main}50`,
            }}
          >
            {icon}
          </Box>
          <IconButton size="small">
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {isPositive ? (
            <TrendingUpIcon sx={{ fontSize: 18, color: 'success.main' }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 18, color: 'error.main' }} />
          )}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: isPositive ? 'success.main' : 'error.main',
            }}
          >
            {change}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {vsText}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

// Chart Placeholder Card
function ChartCard({ title, subtitle, weekText, monthText, yearText, months }) {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" variant="outlined" sx={{ minWidth: 'auto', px: 2 }}>
              {weekText}
            </Button>
            <Button size="small" variant="contained" sx={{ minWidth: 'auto', px: 2 }}>
              {monthText}
            </Button>
            <Button size="small" variant="outlined" sx={{ minWidth: 'auto', px: 2 }}>
              {yearText}
            </Button>
          </Box>
        </Box>

        {/* Chart Bars */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 200, mt: 2 }}>
          {[65, 45, 75, 50, 80, 60, 70, 55, 85, 45, 70, 90].map((height, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                height: `${height}%`,
                borderRadius: 1,
                background:
                  index === 11
                    ? `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                    : theme.palette.mode === 'light'
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'rgba(129, 140, 248, 0.2)',
                transition: 'all 0.3s',
                '&:hover': {
                  background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                },
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          {months.map((month) => (
            <Typography key={month} variant="caption" color="text.secondary">
              {month}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// Progress Card
function ProgressCard({ title, viewAllText, tasks }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Button size="small" endIcon={<ArrowForwardIcon />}>
            {viewAllText}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {tasks.map((task, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {task.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {task.progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={task.progress}
                color={task.color}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'background.default',
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// Recent Orders Table
function RecentOrdersTable({ t }) {
  const orders = [
    {
      id: '#ORD-7892',
      customer: 'Emma Watson',
      product: 'iPhone 15 Pro',
      amount: '$1,299',
      status: 'Delivered',
      statusKey: 'delivered',
      date: 'Dec 28, 2024',
    },
    {
      id: '#ORD-7891',
      customer: 'John Smith',
      product: 'MacBook Pro 16"',
      amount: '$2,499',
      status: 'Shipped',
      statusKey: 'shipped',
      date: 'Dec 27, 2024',
    },
    {
      id: '#ORD-7890',
      customer: 'Sarah Johnson',
      product: 'AirPods Pro',
      amount: '$249',
      status: 'Processing',
      statusKey: 'processing',
      date: 'Dec 27, 2024',
    },
    {
      id: '#ORD-7889',
      customer: 'Michael Brown',
      product: 'iPad Pro 12.9"',
      amount: '$1,099',
      status: 'Delivered',
      statusKey: 'delivered',
      date: 'Dec 26, 2024',
    },
    {
      id: '#ORD-7888',
      customer: 'Lisa Davis',
      product: 'Apple Watch Ultra',
      amount: '$799',
      status: 'Cancelled',
      statusKey: 'cancelled',
      date: 'Dec 25, 2024',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircleIcon sx={{ fontSize: 16 }} />;
      case 'Shipped':
        return <LocalShippingIcon sx={{ fontSize: 16 }} />;
      case 'Processing':
        return <ScheduleIcon sx={{ fontSize: 16 }} />;
      case 'Cancelled':
        return <CancelIcon sx={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Shipped':
        return 'info';
      case 'Processing':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {t('orders.recentOrders')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('orders.latestPurchases')}
            </Typography>
          </Box>
          <Button size="small" endIcon={<ArrowForwardIcon />}>
            {t('dashboard.viewAll')}
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {t('orders.orderId')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {t('orders.customer')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {t('orders.product')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {t('orders.amount')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {t('orders.status')}
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {t('orders.date')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ '&:last-child td': { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem' }}>
                        {order.customer
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </Avatar>
                      <Typography variant="body2">{order.customer}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.product}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {order.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={t(`orders.${order.statusKey}`)}
                      size="small"
                      color={getStatusColor(order.status)}
                      variant="outlined"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {order.date}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

// Team Members Card
function TeamMembersCard({ t }) {
  const team = [
    { name: 'Alex Johnson', role: t('team.leadDeveloper'), avatar: 'AJ', online: true },
    { name: 'Sarah Williams', role: t('team.uiDesigner'), avatar: 'SW', online: true },
    { name: 'Mike Chen', role: t('team.productManager'), avatar: 'MC', online: false },
    { name: 'Emily Davis', role: t('team.qaEngineer'), avatar: 'ED', online: true },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('team.title')}
          </Typography>
          <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.75rem' } }}>
            {team.map((member) => (
              <Avatar key={member.name}>{member.avatar}</Avatar>
            ))}
          </AvatarGroup>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {team.map((member, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1.5,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'background.default',
                },
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>{member.avatar}</Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: member.online ? 'success.main' : 'grey.400',
                    border: 2,
                    borderColor: 'background.paper',
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {member.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {member.role}
                </Typography>
              </Box>
              <Chip
                label={member.online ? t('team.online') : t('team.offline')}
                size="small"
                color={member.online ? 'success' : 'default'}
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// Main Dashboard Content
export default function DashboardContent() {
  const { t } = useTranslation();

  const months = [
    t('months.jan'), t('months.feb'), t('months.mar'), t('months.apr'),
    t('months.may'), t('months.jun'), t('months.jul'), t('months.aug'),
    t('months.sep'), t('months.oct'), t('months.nov'), t('months.dec')
  ];

  const tasks = [
    { name: t('projects.websiteRedesign'), progress: 75, color: 'primary' },
    { name: t('projects.mobileApp'), progress: 45, color: 'secondary' },
    { name: t('projects.marketing'), progress: 90, color: 'success' },
    { name: t('projects.customerPortal'), progress: 30, color: 'warning' },
  ];

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          {t('dashboard.welcome', { name: 'Kabeer' })}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('dashboard.subtitle')}
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title={t('dashboard.totalRevenue')}
            value="$54,239"
            change={12.5}
            changeType="positive"
            icon={<AttachMoneyIcon />}
            color="primary"
            vsText={t('dashboard.vsLastMonth')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title={t('dashboard.totalOrders')}
            value="1,429"
            change={8.2}
            changeType="positive"
            icon={<ShoppingCartIcon />}
            color="success"
            vsText={t('dashboard.vsLastMonth')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title={t('dashboard.totalCustomers')}
            value="3,842"
            change={5.7}
            changeType="positive"
            icon={<PeopleIcon />}
            color="info"
            vsText={t('dashboard.vsLastMonth')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title={t('dashboard.totalProducts')}
            value="284"
            change={-2.4}
            changeType="negative"
            icon={<InventoryIcon />}
            color="warning"
            vsText={t('dashboard.vsLastMonth')}
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard
            title={t('dashboard.revenueOverview')}
            subtitle={t('dashboard.monthlyRevenue')}
            weekText={t('dashboard.week')}
            monthText={t('dashboard.month')}
            yearText={t('dashboard.year')}
            months={months}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ProgressCard
            title={t('dashboard.activeProjects')}
            viewAllText={t('dashboard.viewAll')}
            tasks={tasks}
          />
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentOrdersTable t={t} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <TeamMembersCard t={t} />
        </Grid>
      </Grid>
    </Box>
  );
}
