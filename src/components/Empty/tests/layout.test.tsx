// import React from 'react'
import { render } from '@testing-library/react';

import 'jest-canvas-mock';

import { EmptyLayout } from '../Layout';

describe('Common render', () => {
	it('renders without crashing', () => {
		render(<EmptyLayout id="empty-layout" renderedRoutes={<div>Route</div>} activeRoute={{}} />);
	});
});
