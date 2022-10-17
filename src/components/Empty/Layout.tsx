import { Suspense } from 'react';
import { styled, LinearProgress } from '@mui/material';

import { ILayoutProps } from '../../types';

export const Container = styled('div')`
	display: flex;
	height: 100vh;
	width: 100vw;
`;

export const Header = styled('header')(({ theme }) => `
	display: flex;
	padding: 1em;
	height: 50px;
	background-color: ${theme.palette.grey['50']};
`);

export const Content = styled('div')(({ theme }) => `
	display: flex;
	flex: 1;
	background-color: ${theme.palette.grey['50']};
`);

export const EmptyLayout = ({ id, renderedRoutes }: ILayoutProps) => (
	<Container id={id}>
		<Suspense fallback={<LinearProgress />}>
			{renderedRoutes}
		</Suspense>
	</Container>
);
