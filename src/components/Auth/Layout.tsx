import { Suspense } from 'react';
import { styled, LinearProgress } from '@mui/material';

import { ILayoutProps } from '../../types';

const forwardProps = ['backgroundImage'];

const Background = styled('div', { shouldForwardProp: (prop) => !forwardProps.includes(prop as string) })<{
	backgroundImage: string;
}>(
	({ backgroundImage }) => `
	display: flex;
	flex-direction: row;
	overflow: hidden;
	height: 100%;
	animation: jss6 60s infinite;
	background-size: auto;
	background-color: #000;
	background-image: url(${backgroundImage});
	background-repeat: no-repeat;

	align-items: center;
	justify-content: center;

	content: '';
`,
);

const Container = styled('div')`
	max-width: 800px;
	min-height: 400px;
	max-height: 600px;
	overflow: hidden;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.8);
`;

export const AuthLayout = ({ id, renderedRoutes, activeRoute }: ILayoutProps) => (
	<Background id={id} backgroundImage={activeRoute?.layout?.backgroundImage}>
		<Container>
			<Suspense fallback={<LinearProgress />}>{renderedRoutes}</Suspense>
		</Container>
	</Background>
);
