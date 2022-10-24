import { People as PeopleIcon, Pages as PagesIcon } from '@mui/icons-material';

import { INavigationZone, Positioning } from 'react-dashboard-wizard';

import { PageKey } from '../types';
import { Page1PageConfig } from './page1';
import { Page2PageConfig } from './page2';

import { getNavId } from './utils';

export const pages = [Page1PageConfig, Page2PageConfig];

export const navigation: INavigationZone = {
	side: [
		{
			id: getNavId(PageKey.Page1),
			label: 'Page 1',
			Icon: PeopleIcon,
			route: Page1PageConfig.routes.find(({ id }) => id === PageKey.Page1),
		},
		{
			id: getNavId(PageKey.Page2),
			label: 'Page 2',
			Icon: PagesIcon,
			route: Page2PageConfig.routes.find(({ id }) => id === PageKey.Page2),
		},
	],
	top: [
		{
			id: getNavId(PageKey.Page1),
			label: 'Page 1',
			Icon: PeopleIcon,
			route: Page1PageConfig.routes.find(({ id }) => id === PageKey.Page1),
		},
		{
			id: getNavId(PageKey.Page2),
			label: 'Page 2',
			Icon: PagesIcon,
			children: [
				{
					id: getNavId(PageKey.Page1),
					label: 'Page 1',
					Icon: PeopleIcon,
					route: Page1PageConfig.routes.find(({ id }) => id === PageKey.Page1),
				},
				{
					id: getNavId(PageKey.Page2),
					label: 'Page 2',
					Icon: PagesIcon,
					route: Page2PageConfig.routes.find(({ id }) => id === PageKey.Page2),
				},
			],
		},
	],
};
