import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GemMarketCard from './GemMarketCard';
import InsideCard from './InsideCard';
import WelcomeCard from './WelcomeCard';
import WalletCard from './WalletCard';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router';
import { Parallax } from 'react-parallax';
import FooterPage from './FooterPage';
import InformationPage from './InformationPage';
import MoreInformation from './MoreInformation';

const useStyles = makeStyles(theme => ({
  navWidth: {
    width: "auto",
    backgroundColor: "transparent",
    borderColor: "#000000"
  },
  root: {
    flexGrow: 1,
    height: "auto",
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#294A0B",
  },
  paperBlue: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
  },
  paperBlack: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A"
  },
  paperBlacky: {
    padding: theme.spacing(1),
    backgroundColor: "#000000",
  },
  card: {
    maxWidth: 'auto',
    backgroundColor: "transparent",
  },
  media: {
    height: 140,
    width: 270,
  },
  mediaTwo: {
    height: 100,
    width: 270,
  },
  background: {
    width: "auto",
    height: "auto",
  },
  font: {
    fontFamily: '"Orbitron", sans-serif',
  }
}));

export const HomePage = () => {
const classes = useStyles();
const isDesktop = window.innerWidth < 1000;
const image1 = "https://i.imgur.com/kRCcCIe.png";

if (!isDesktop) {
  return(
    <Parallax strength={1000} bgImage={image1}>
    <div className={classes.root}>
      <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WelcomeCard />
          <br/>
        </Grid>
        <Grid container spacing={3}>
      <Grid item xs={12}> 
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={3}>
      </Grid>
    </Grid>
        <Grid item xs={3}>
          <GemMarketCard />
        </Grid>
        <Grid item xs={6}>
          <InsideCard />
        </Grid>
        <Grid item xs={3}>
          <WalletCard />
        </Grid>
      </Grid>
      <br/>
      <br/>
      <br/>
      <br/>
      <MoreInformation />
      <br/>
      <br/>
      <InformationPage />
      <hr/>
      <br/>
    <FooterPage />
      </Container>
    </div>
    </Parallax>
  );
 } else {
  return (
    <Parallax strength={1000} bgImage={image1}>
    <div className={classes.root}>
      <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <br/>
        </Grid>
        <Grid item xs>
          <GemMarketCard />
        </Grid>
        <Grid item xs>
          <WalletCard />
        </Grid>
        <Grid>
          <MoreInformation/>
        </Grid>
        <Grid>
          <InformationPage/>
        </Grid>
      </Grid>
      <br/>
      <hr/>
      <br/>

    <FooterPage />
      </Container>
    </div>
    </Parallax>
    );
  }
};

