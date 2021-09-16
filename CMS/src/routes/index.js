import { Blog } from 'features/Blog/pages';
import { CategoryList, CreateCategory, EditCategory } from 'features/Category/pages';
import { DashboardApp } from 'features/Dashboard/pages';
import { ListHisroty } from 'features/History/pages';
import { Products } from 'features/Product/pages';
import { CreateQuestion, ListQuestion } from 'features/Question/pages';
import { ListSubCategory } from 'features/SubCategory/pages';
import { CreateTopic, EditTopic, ListTopic } from 'features/Topic/pages';
import { EditUser, User } from 'features/User/pages';

const routes = [
  {
    component: DashboardApp,
    path: '/dashboard'
  },
  {
    component: DashboardApp,
    path: '/dashboard/app'
  },
  {
    component: CategoryList,
    path: '/dashboard/category'
  },
  {
    component: CreateCategory,
    path: '/dashboard/category/create'
  },
  {
    component: EditCategory,
    path: '/dashboard/category/edit/:id'
  },
  {
    component: ListSubCategory,
    path: '/dashboard/sub-category'
  },
  {
    component: User,
    path: '/dashboard/user'
  },
  {
    component: EditUser,
    path: '/dashboard/user/edit/:id'
  },
  {
    component: ListTopic,
    path: '/dashboard/topic'
  },
  {
    component: CreateTopic,
    path: '/dashboard/topic/create'
  },
  {
    component: EditTopic,
    path: '/dashboard/topic/edit/:id'
  },
  {
    component: ListQuestion,
    path: '/dashboard/question'
  },
  {
    component: CreateQuestion,
    path: '/dashboard/question/create'
  },
  {
    component: ListHisroty,
    path: '/dashboard/history'
  },
  {
    component: Products,
    path: '/dashboard/products'
  },
  {
    component: Blog,
    path: '/dashboard/blog'
  }
];

export default routes;
