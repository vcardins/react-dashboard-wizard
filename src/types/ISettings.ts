import { CSSProperties } from 'react';

import { Positioning, LayoutStyle, LayoutMode } from './';

interface INavigationSettings {
	display: boolean;
	iconPositioning: Positioning;
	fontSize: CSSProperties['fontSize'];
}

export interface ISettings {
	style: LayoutStyle;
	mode: LayoutMode;
	containerWidth: CSSProperties['width'];
	navbar: INavigationSettings & {
		position: Positioning.Left | Positioning.Right;
	};
	toolbar: INavigationSettings;
}
