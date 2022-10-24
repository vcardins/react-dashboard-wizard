import { CSSProperties } from 'react';

import { Positioning } from './Positioning';

interface INavigationSettings {
	labelPositioning?: Positioning;
	fontSize: CSSProperties['fontSize'];
}

export interface ISettings {
	sideNavigation?: INavigationSettings;
	topNavigation?: INavigationSettings;
}
