import React, { useContext } from "react";
import Buygem from "./Buygem";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router';
import { Parallax } from 'react-parallax';
import {StateContext} from "../App";
import DiamondCard from './DiamondCard';
import SapphireCard from './SapphireCard';
import EmeraldCard from './EmeraldCard';
import RubyCard from './RubyCard';
import MarketMedia from "./MarketMedia";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  transparentPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: "transparent",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperBlack: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A",
  },
  paperBlacky: {
    padding: theme.spacing(1),
    backgroundColor: "#000000",
  },
  card: {
    maxWidth: 345,
    backgroundColor: "#154A4A",
  },
  media: {
    height: "100%",
  },
  font: {
    fontFamily: '"Orbitron", sans-serif',
  },
}));

export const MarketGems = () => {
  const {username} = useContext(StateContext);
  const gemBackground = "https://i.imgur.com/kRCcCIe.png";

  const theme = createMuiTheme({
    palette: {
      primary: { 500: '#00211B' }, // custom color in hex 
    },
  });
  
  const classes = useStyles();
  
  if (username) {
  return(
    
    <div className={classes.root}>
      <Parallax blur={1} bgImage={gemBackground} strength={1000}>
<Grid container spacing={3}>
  <Grid item xs={12}>
    <center>
  <Typography variant="h2" className={classes.font} component="h2"><font color="#fffffff">
          EtherChest Ecosystem</font>
        </Typography>
        <Typography variant="h5" className={classes.font} component="h5"><font color="#fffffff">
          Gem Market</font>
        </Typography>
        <hr/>
        </center>
  </Grid>
  <Grid item xs={6}>
  <MarketMedia />
  </Grid>
  <Grid item xs={3}>
    <DiamondCard />
  </Grid>
  <Grid item xs={3}>
    <SapphireCard />
  </Grid>
  <Grid item xs={6}>
  </Grid>
  <Grid item xs={3}>
    <EmeraldCard />
  </Grid>
  <Grid item xs={3}>
    <RubyCard />
  </Grid>
  <Grid item xs={3}>
    <Paper className={classes.paper}>xs=3</Paper>
  </Grid>
  <Grid item xs={3}>
    <Paper className={classes.paper}>xs=3</Paper>
  </Grid>
  <Grid item xs={3}>
    <Paper className={classes.paper}>xs=3</Paper>
  </Grid>
  <Grid item xs={3}>
    <Paper className={classes.paper}>xs=3</Paper>
  </Grid>
</Grid>
</Parallax>
</div>
  )
} else {
  return (
  <Redirect to='/login'/>
  );
}
};