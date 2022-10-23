import { mount } from 'react-dashboard-wizard';

import { pages, navigation, buildTheme, Providers } from './app';
import metadata from './manifest.json';

mount({
	theme: buildTheme(),
	metadata,
	navigation,
	pages,
	version: process?.env?.['VERSION'],
	Providers,
});
