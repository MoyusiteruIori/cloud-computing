import type { ReactNode } from 'react';

import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  badgeTooltip?: string;

  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '订单统计',
    items: [
      {
        name: '订单分类统计',
        icon: AssignmentIndTwoToneIcon,
        items: [
          {
            name: '按商品类别',
            link: '/order-statistics/bycategory'
          },
          {
            name: '按年份',
            link: '/order-statistics/byyear'
          }
        ]
      },
      {
        name: '商品统计',
        icon: AssignmentIndTwoToneIcon,
        items: [
          {
            name: '查看所有商品',
            link: '/products/rangefilter'
          },
          {
            name: '最受男/女性欢迎',
            link: '/products/sexpopular'
          },
          {
            name: '按商品查询订单',
            link: '/products/searchbyname'
          }
        ]
      },
    ]
  },
  {
    heading: 'Management',
    items: [
      {
        name: '顾客列表',
        icon: AssignmentIndTwoToneIcon,
        link: '/customers/customer-list',
        items: [
          {
            name: '全部',
            link: '/customers/customer-list'
          }
        ]
      },
    ]
  },
];

export default menuItems;
