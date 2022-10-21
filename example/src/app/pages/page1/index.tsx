import { Layouts, IPageConfig, UserRoles } from '../../../../../src/types'; //'react-pages-layouts';

import { PageKey } from '../../types';

import Page1 from './Page1';

export const Page1PageConfig: IPageConfig = {
	layout: Layouts.Dashboard,
	auth: [UserRoles.User],
	routes: [
		{
			id: PageKey.Page1,
			caseSensitive: true,
			path: '/',
			metadata: {
				title: 'Dashboard',
			},
			layout: {
				mode: Layouts.Dashboard,
			},
			element: <Page1 />,
		},
	],
};
