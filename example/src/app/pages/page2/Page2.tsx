import { memo } from 'react';

import { AccountBox as AccountBoxIcon } from '@mui/icons-material';

import { Frameset } from '../../../../../src'; // 'react-dashboard-wizard';

const Page2 = memo(() => (
	<Frameset
		id="page-page2"
		header={{ title: 'Page 2', icon: AccountBoxIcon }}
		contentProps={{ overflow: 'auto', padding: 2 }}
	>
		<div>Page 2</div>
	</Frameset>
));

Page2.displayName = 'Page2';

export default Page2;
