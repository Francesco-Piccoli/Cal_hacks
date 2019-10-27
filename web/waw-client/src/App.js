import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import ProfileCard from "./ProfileCard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const createProfile = (
    name,
    gender,
    insomnia,
    age,
    ratioEmailRead,
    seasonality
  ) => {
    return {
      name: name,
      gender: gender,
      insomnia: insomnia,
      ratioEmailRead: ratioEmailRead,
      age: age,
      seasonality: seasonality
    };
  };

  const profiles = [
    createProfile("Arthur", 0, 1, 25, 1, 1),
    createProfile("Clara", 1, 0, 26, 0.05, 1),
    createProfile("Julie", 1, 1, 27, 0.1, 0),
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Profile 1" {...a11yProps(0)} />
          <Tab label="Profile 2" {...a11yProps(1)} />
          <Tab label="Profile 3" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProfileCard profile={profiles[0]}  />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProfileCard profile={profiles[1]} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProfileCard profile={profiles[2]} />
      </TabPanel>
    </div>
  );
}
