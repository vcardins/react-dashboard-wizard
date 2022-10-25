import { mount } from '../../src'; // 'react-dashboard-wizard';

import { pages, navigation, buildTheme, Providers } from './app';
import metadata from './manifest.json';

mount({
	theme: buildTheme(),
	Icon: <img src="https://react-material.fusetheme.com/assets/images/logo/logo.svg" />,
	metadata,
	navigation,
	pages,
	version: process?.env?.['VERSION'],
	Providers,
});
