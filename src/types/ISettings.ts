import { CSSProperties } from 'react';

import { Positioning } from './';

interface INavigationSettings {
	display: boolean;
	iconPositioning: Positioning;
	fontSize: CSSProperties['fontSize'];
}

export interface ISettings {
	containerWidth: CSSProperties['width'];
	navbar: INavigationSettings & {
		position: Positioning.Left | Positioning.Right;
	};
	toolbar: INavigationSettings;
}
