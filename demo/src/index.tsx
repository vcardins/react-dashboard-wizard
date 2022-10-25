import { mount } from 'react-dashboard-wizard';

import { pages, navigation, buildTheme, Providers } from './app';
import metadata from './manifest.json';

mount({
	theme: buildTheme(undefined, metadata.theme_color),
	metadata,
	navigation,
	pages,
	version: process?.env?.['VERSION'],
	Providers,
});
