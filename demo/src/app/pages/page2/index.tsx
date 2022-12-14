import { Layouts, IPageConfig, UserRoles } from 'react-dashboard-wizard';

import { PageKey } from '../../types';

import Page2 from './Page2';

export const Page2PageConfig: IPageConfig = {
	layout: Layouts.Dashboard,
	allowedRoles: [UserRoles.User],
	routes: [
		{
			id: PageKey.Page2,
			caseSensitive: true,
			path: '/page2',
			metadata: {
				title: 'Page 2',
			},
			layout: {
				mode: Layouts.Dashboard,
			},
			element: <Page2 />,
		},
	],
};
