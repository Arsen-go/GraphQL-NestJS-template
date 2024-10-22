import * as fs from 'fs';

const Tabs = [
  {
    endpoint: '/graphql',
    query: fs.readFileSync(
      'src/constants/playground/tabs/user-tab.gql',
      'utf8',
    ),
    name: 'user',
    headers: {
      authorization: `Bearer `,
    },
  },
];

export const CustomPlayGround = {
  tabs: process.env.NODE_ENV !== 'production' ? Tabs : [],
};
