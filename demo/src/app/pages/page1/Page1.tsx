import { memo } from 'react';

import { AccountBox as AccountBoxIcon } from '@mui/icons-material';

import { Frameset } from 'react-dashboard-wizard';

const Page1 = memo(() => (
	<Frameset
		id="page-page1"
		header={{ title: 'Page 1', icon: AccountBoxIcon }}
		contentProps={{ overflow: 'auto', padding: 2 }}
	>
		<div>Page 1</div>
	</Frameset>
));

Page1.displayName = 'Page1';

export default Page1;
