import { memo } from 'react';

import { Box } from '@mui/material';

const Page1 = memo(() => <Box>Page 1</Box>);

Page1.displayName = 'Page1';

export default Page1;
