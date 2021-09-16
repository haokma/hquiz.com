import fileTextFill from '@iconify/icons-eva/file-text-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Sub Category',
    path: '/dashboard/sub-category',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'question',
    path: '/dashboard/question',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'topic',
    path: '/dashboard/topic',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'history',
    path: '/dashboard/history',
    icon: getIcon(peopleFill)
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  }
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
