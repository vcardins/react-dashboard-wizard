import screenfull from 'screenfull';

import {
	People as PeopleIcon,
	Pages as PagesIcon,
	VerifiedUser as VerifiedUserIcon,
	Fullscreen as FullscreenIcon,
	FullscreenExit as FullscreenExitIcon,
	Settings as SettingsIcon,
} from '@mui/icons-material';

import { INavigation } from '../../../../src'; //'react-dashboard-wizard';

import { PageKey } from '../types';
import { Page1PageConfig } from './page1';
import { Page2PageConfig } from './page2';

import { getNavId } from './utils';

export const pages = [Page1PageConfig, Page2PageConfig];

export const navigation: INavigation = {
	navbar: [
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
	toolbar: [
		{
			id: 'fullscreen',
			tooltip: 'Fullscreen toggle',
			Icon: !screenfull.isFullscreen ? FullscreenIcon : FullscreenExitIcon,
			onClick: () => {
				if (screenfull.isEnabled) {
					screenfull.toggle();
				}
			},
		},
		{
			id: 'my-account',
			label: 'My Account',
			Icon: VerifiedUserIcon,
			children: [
				{
					id: 'user-profile',
					label: 'Profile',
					Icon: PeopleIcon,
				},
				{
					id: 'my-settings',
					label: 'Settings',
					Icon: SettingsIcon,
				},
			],
		},
	],
};
