import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 545
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function ProfileCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmitClick = () => {
    console.log(this.state.text);
  };

  const [values, setValues] = React.useState({
    text: ""
  });

  const handleTextChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { profile } = props;
  const initialName = profile.name.charAt(0);

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {initialName}
          </Avatar>
        }
        title={profile.name}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Chip
          color="primary"
          label={profile.gender}
          className={{ margin: "25px" }}
        />{" "}
        <br /> <br />
        <Chip color="primary" label={profile.insomnia} /> <br /> <br />
        <Chip color="primary" label={profile.ratioEmailRead} /> <br /> <br />
        <Chip color="primary" label={profile.seasonality} /> <br /> <br />
        <Chip color="primary" label={profile.age} /> <br /> <br />
        <TextField
          id="standard-name"
          label="Text (email etc)"
          className={classes.textField}
          value={values.name}
          onChange={handleTextChange("text")}
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleSubmitClick}
        >
          Send for analysis
        </Button>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        ></IconButton>
      </CardActions>
    </Card>
  );
}

// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

// // export default function ProfileCard(props) {
// //   const classes = useStyles();
// //   const [value, setValue] = React.useState(0);

// //   const { profile } = this.props;

// //   return (
// //     <div className={classes.root}>
// //       Hello ProfileCard
// //     </div>
// //   );
// // }

// export default function ProfileCard(props) {
//     const { profile } = props;
//     return (
//         <div >
//             Hi {profile.name}
//         </div>
//     );
// }
