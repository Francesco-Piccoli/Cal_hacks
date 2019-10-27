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
import Divider from "@material-ui/core/Divider";

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
  const [text, setText] = React.useState("");
  const [solution, setSolution] = React.useState({});

  const handleSubmitClick = () => {
    console.log(text);
    fetch("/api/analysis", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        age: props.profile.age,
        gender: props.profile.gender,
        insomnia: props.profile.insomnia,
        ratioEmailRead: props.profile.ratioEmailRead
      })
    })
      .then(res => res.json())
      .then(solution => {
        setSolution(solution);
        console.log(solution);
      });
  };

  const [values, setValues] = React.useState({
    text: ""
  });

  const handleTextChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    setText(event.target.value);
  };

  const { profile } = props;
  const initialName = profile.name.charAt(0);

  return (
    <div>
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
          <Chip color="primary" label={"Insomnia: " + profile.insomnia} />{" "}
          <br /> <br />
          <Chip
            color="primary"
            label={profile.ratioEmailRead + "% emails read"}
          />{" "}
          <br /> <br />
          <Chip
            color="primary"
            label={"Seasonality: " + profile.seasonality}
          />{" "}
          <br /> <br />
          <Chip
            color="primary"
            label={profile.age + " years old"}
          /> <br /> <br />
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
        <CardActions disableSpacing></CardActions>
      </Card>
      {solution.description && (
        <Card className={classes.card} style={{ marginTop: 12 }}>
          <CardHeader title="Proposed solution" />
          <CardContent>
            {solution.description}
            <br />
            <Divider />
            <br />
            Content to help you
            <ul>
              {solution.urls.map(url => {
                return <li key={url}><a href={url} target="_blank">{url}</a></li>;
              })}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
