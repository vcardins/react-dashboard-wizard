import { Typography, styled } from '@mui/material';

import { useLayoutContext } from '../../../context';

export const StyledAppTitleWrapper = styled('div', { shouldForwardProp: (prop) => prop !== 'gapped' })<{
	gapped?: boolean;
}>(
	({ theme, gapped }) => `
	display: flex;
	flex-direction: column;
	margin-left: ${!gapped ? theme.spacing(2) : 0};
`,
);

export const StyledAppTitle = styled(Typography)`
	display: {
		xs: none;
		sm: block;
	}
	line-height: 1.4;
	cursor: default;
`;

export const StyledAppSubTitle = styled(StyledAppTitle)`
	opacity: 0.7;
`;

export const StyledAppHeaderWrapper = styled('div', { shouldForwardProp: (prop) => prop !== 'gapped' })<{
	gapped?: boolean;
}>(
	({ gapped }) => `
	display: flex;
	align-items: center;
	gap: ${gapped ? '2em' : 0};
`,
);

export const Title = () => {
	const { metadata, ids } = useLayoutContext();

	return (
		<StyledAppHeaderWrapper>
			<StyledAppTitleWrapper>
				<StyledAppTitle id={ids?.title} variant="h6" noWrap>
					{metadata.short_name}
				</StyledAppTitle>
				{metadata.name ? (
					<StyledAppSubTitle id={ids?.subTitle} variant="subtitle2" noWrap>
						{metadata.name}
					</StyledAppSubTitle>
				) : null}
			</StyledAppTitleWrapper>
		</StyledAppHeaderWrapper>
	);
};
