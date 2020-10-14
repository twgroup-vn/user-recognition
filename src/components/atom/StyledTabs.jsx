import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

export const StyledTabs = withStyles({
    root: {
        background: '#f6f6f6'
    },
    indicator: {
      backgroundColor: '#FF704C',
    },
})(Tabs);

export const StyledTab = withStyles(() => ({
    root: {
        textTransform: 'none',
        '&:focus': {
            outline: 'none'
        },
    },
}))((props) => <Tab disableRipple {...props} />)