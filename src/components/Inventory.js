import React, {useContext, useState, useEffect} from "react";
import {StateContext} from "../App";
import {  makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _ from "lodash";
import { EtherchestAPI, gemNames } from "../service/EtherchestAPI";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { FarmIcon, SubdivisionIcon, gemSvgIcon, DnaIcon, BongIcon, GiftIcon, LandIcon, CrystalIcon, DucatIcon } from './Icons';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import InventoryChart from './InventoryChart';
import CardActions from '@material-ui/core/CardActions';
import InventoryNav from "./InventoryNav";
import InventoryChartSwitch from './InventoryChartSwitch'; 
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  flex: {
    flexGrow: 1,
  },
  rootField: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  root: {
    flexGrow: 1,
    backgroundColor: "#000000",
  },
  rootCard: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginTop: theme.spacing(1)
  },
  background: {
    backgroundColor: "#000000"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
  },
  paperLeft: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#073232",
  },
  paperRight: {
    padding: theme.spacing(1),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#073232",
  },
  paperBadge: {
    padding: theme.spacing(1),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#3D1289",
  },
  paperBlack: {
    padding: theme.spacing(1),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
  },
  margin: {
    margin: theme.spacing(2),
    whiteSpace: 'wrap',
    scrollable: true
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  card: {
    backgroundColor: "#001E1E",
    whiteSpace: 'wrap',
    scrollable: true,
    fontFamily: '"Orbitron", sans-serif',
    backgroundColor: "#000000",
  },
  media: {
    height: 100,
  },
  paperFarming: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#515e90",
    height: "240px"
  },
  font: {
    fontFamily: '"Orbitron", sans-serif',
    color: '#DFB17B',
    whiteSpace: 'wrap',
    scrollable: true
  },
  fontBox: {
    fontFamily: '"Orbitron", sans-serif',
    color: '#DFB17B',
    whiteSpace: 'wrap',
    maxWidth: "225px",
    scrollable: true
  },
  fontPurchase: {
    fontFamily: '"Orbitron", sans-serif',
    color: '#ffffff',
    backgroundColor: '#000000',
    whiteSpace: 'wrap',
    textAlign: 'left',
    scrollable: true
  },
  fontGreen: {
    fontFamily: '"Orbitron", sans-serif',
    color: '#068D0C',
    whiteSpace: 'wrap',
    scrollable: true
  },
  fontRed: {
    fontFamily: '"Orbitron", sans-serif',
    color: '#9b111e',
    whiteSpace: 'wrap',
    scrollable: true
  }, 
  fontBlue: {
    fontFamily: '"Orbitron", sans-serif',
    color: '#0068D2',
    whiteSpace: 'wrap',
    scrollable: true
  },
  fontWhite: {
    fontFamily: '"Orbitron", sans-serif',
    color: '#ffffff',
    whiteSpace: 'wrap',
    scrollable: true
  },
  fontRight: {
    fontFamily: '"Orbitron", sans-serif',
    color: '#DFB17B',
    whiteSpace: 'wrap',
    textAlign: 'right',
    scrollable: true
  },
  extension: {
    backgroundColor: "DFB17B",
    whiteSpace: 'wrap',
    height: "47px"
  },
  
}));

function ResponsiveImage( { src, width, height } ) {
  return (
    <div
      style={ { 
        width,
      } }
      className="responsive-image">
      <div style={ {
          paddingBottom: ( height / width * 100 ) + '%'
        } } />
      <img
        src={ src }
        className="responsive-image__image" />
    </div>
  );
}

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#000000',
    color: '#DFB17B',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function Inventory() {
  const {username} = useContext(StateContext);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const [diamond, setDiamonds] = useState([0]);
  const [sapphire, setSapphires] = useState([0]);
  const [emerald, setEmeralds] = useState([0]);
  const [ruby, setRubys] = useState([0]);
  const [diamondValues, setDiamondValues] = useState([0]);
  const [sapphireValues, setSapphireValues] = useState([]);
  const [emeraldValues, setEmeraldValues] = useState([]);
  const [rubyValues, setRubyValues] = useState([]);
  const [totalGems, setTotalGems] = useState([]);
  const [totalDucats, setTotalDucats] = useState([]);
  const [totalEthValues, setTotalEthValues] = useState([]);
  const [registered, setRegistered] = useState(true)

  const isDesktop = window.innerWidth < 1000;

  const etherchestApi = new EtherchestAPI();

  const loadData = async (ourUsername) => {
    
    const urlAPI = 'https://etherchest-backend.herokuapp.com/u/'+ourUsername;
    
    const response = await fetch(urlAPI);
    const data = await response.json();
    
    setRegistered(data);

    
    console.log(data.diamond)

    if (data.diamond) {
    setDiamonds(data.diamond.length);
    setSapphires(data.sapphire.length);
    setEmeralds(data.emerald.length);
    setRubys(data.ruby.length);

    var diamondValue = data.diamond.length * 1;
    var sapphireValue = data.sapphire.length * .5;
    var emeraldValue = data.emerald.length * .25;
    var rubyValue = data.ruby.length * .1;
    setDiamondValues(diamondValue);
    setSapphireValues(sapphireValue);
    setEmeraldValues(emeraldValue);
    setRubyValues(rubyValue);

    var totalEthValue = diamondValue + sapphireValue + emeraldValue + rubyValue;
    setTotalEthValues(totalEthValue);

    var gemTotal = data.diamond.length + data.sapphire.length + data.emerald.length + data.ruby.length;
    setTotalGems(gemTotal);

    setTotalDucats(data.ducats);
    } 
  }

  useEffect(() => {
    loadData(username);
  }, [username]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
  <div className={classes.flex}>
      <Grid container spacing={1}>
          <Grid item xs={8}>

            <Grid container spacing={1}>
                
                <Grid item xs={3}>
                   <Paper className={classes.paper}>
                      <Card className={classes.root} variant="outlined">
                        <CardContent>
                          <Typography className={classes.fontWhite} color="textSecondary" gutterBottom>
                              Total Diamonds
                          </Typography>
                 
                        <CardMedia
                        className={classes.media}
                        image="/assets/layout/images/diamond_etherchest_ecosystem_qwoyn.png"
                        title="Diamond NFT"
                        />
                        <br/>
                          <Typography variant="h2" component="h2" className={classes.fontWhite}>
                          {diamond}
                          </Typography>
                        </CardContent>
                          <Typography className={classes.fontWhite} color="textSecondary" gutterBottom>
                            Value: {diamondValues} ETH
                          </Typography>
                      </Card>
                   </Paper>
                  </Grid>
                
                <Grid item xs={3}>
                <Paper className={classes.paper}>
                <Card className={classes.root} variant="outlined">
                  <CardContent>
                    <Typography className={classes.fontBlue} color="textSecondary" gutterBottom>
                    Total Sapphires
                    </Typography>
                  <CardMedia
                  className={classes.media}
                  image="/assets/layout/images/diamond_etherchest_ecosystem_qwoyn.png"
                  title="Paella dish"
                  />
                <br/>
                <Typography variant="h2" component="h2" className={classes.fontBlue}>
                {sapphire}
                </Typography>
                </CardContent>
                <Typography className={classes.fontBlue} color="textSecondary" gutterBottom>
                Value: {sapphireValues} ETH
                    </Typography>
                 </Card>
                </Paper>
                </Grid>

                <Grid item xs={3}>
                <Paper className={classes.paper}>
                <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.fontGreen} color="textSecondary" gutterBottom>
                Total Emeralds
                </Typography>
                <CardMedia
                className={classes.media}
                image="/assets/layout/images/diamond_etherchest_ecosystem_qwoyn.png"
                title="Paella dish"
                />
                <br/>
                <Typography variant="h2" component="h2" className={classes.fontGreen}>
                {emerald}
                </Typography>
                </CardContent>
                <Typography className={classes.fontGreen} color="textSecondary" gutterBottom>
                Value: {emeraldValues} ETH
                </Typography>
                </Card>
                </Paper>
                </Grid>

                <Grid item xs={3}>
                <Paper className={classes.paper}>
                    <Card className={classes.root} variant="outlined">
                <CardContent>
                <Typography className={classes.fontRed} color="textSecondary" gutterBottom>
                Total Rubys
                </Typography>
                <CardMedia
                className={classes.media}
                image="/assets/layout/images/diamond_etherchest_ecosystem_qwoyn.png"
                title="Paella dish"
                />
                 <br/>
                <Typography variant="h2" component="h2" className={classes.fontRed}>
                {ruby}
                </Typography>
                </CardContent>
                <Typography className={classes.fontRed} color="textSecondary" gutterBottom>
                Value: {rubyValues} ETH
                </Typography>
                </Card>
            </Paper>
            </Grid>
            <Grid item xs={12}>

          <Paper className={classes.paper}>
          <ResponsiveImage
            src="https://i.imgur.com/GAbKp9R.png"
            width={ 1000 }
            height={ 210 } />
          </Paper>

        </Grid>

            </Grid>
        </Grid>
        <Grid item xs={4}>
        <Paper className={classes.paper}>
        <Card className={classes.root} variant="outlined">
            <CardContent>
        <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
              <Avatar alt="Remy Sharp" src="https://i.imgur.com/TJP9RZ0.png" className={classes.large} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <Typography className={classes.font} color="textSecondary" gutterBottom>
          <b>{username}</b>
        </Typography>
        <hr/>
        <Typography className={classes.font} color="textSecondary">
        <b>Total ETH: {totalEthValues}</b>
        </Typography>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.paper}>
          <Typography className={classes.font} color="textSecondary" gutterBottom>
          Total Gems
        </Typography>
        <Typography className={classes.font} color="textSecondary" gutterBottom>
          {totalGems}
        </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
          <Typography className={classes.font} color="textSecondary" gutterBottom>
                Total Ducats
            </Typography>
            <Typography className={classes.font} color="textSecondary" gutterBottom>
          {totalDucats}
        </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
          </Paper>
        </Grid>
        <Grid item xs={12}>
        <hr/>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Typography className={classes.font} color="textSecondary" gutterBottom>
                Badges
            </Typography>
            <hr/>
          </Paper>
        </Grid>
        <Paper className={classes.paper}>
        <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paperBadge}>
          <Avatar alt="Remy Sharp" src="https://i.imgur.com/TJP9RZ0.png" className={classes.large} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperBadge}>
              <Avatar alt="Remy Sharp" src="https://i.imgur.com/TJP9RZ0.png" className={classes.large} />
          </Paper>
        </Grid>
        </Grid>
        </Paper>
      </Grid>
      
        </CardContent>
        </Card>
        
        </Paper>
        </Grid>
        <Grid item xs={6}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="error"
          aria-label="Action Tabs"
          className={classes.background}
          centered
        >
          <Tab label="Ducats" icon={<DucatIcon />} {...a11yProps(0)} className={classes.font} />
          <Tab label="Gems" icon={<CrystalIcon />} {...a11yProps(1)} className={classes.font} />
          <Tab label="Guild" icon={<LandIcon />} {...a11yProps(2)} className={classes.font} />
        </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
    <Paper className={classes.paper}>
    <TabPanel value={value} index={0} dir={theme.direction}>
    <Grid container spacing={2}>
        <Grid item xs={6}>
        <Card className={classes.root} variant="outlined">
      <CardContent>
          <Paper className={classes.fontPurchase}>
        <Typography variant="h5" component="h5" className={classes.font}>
         Purchase Hive Ducats
        </Typography>
        <br/>
        <Paper className={classes.fontBox}> 
        <TextField id="filled-basic" label="Enter Amount" variant="outlined" color="secondary" className={classes.font}/>
        </Paper>
        <br/><br/>
        <Button variant="contained" color="primary">Purchase</Button>
        <br/>
        <br/>
        </Paper>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={6}>
    <Card className={classes.root} variant="outlined">
      <CardContent>
          <Paper className={classes.paperBlack}>
        <Typography className={classes.font} color="textSecondary" gutterBottom>
          <u>Ducat Balance</u>
        </Typography>
        <Typography variant="h5" component="h2" className={classes.font}>
          2303
        </Typography>
        </Paper>
      </CardContent>
    </Card>
    </Grid>
   
    <Grid item xs={6}>
    <hr/>
    <Card className={classes.root} variant="outlined">
      <CardContent>
      <Paper className={classes.fontPurchase}>
        <Typography variant="h5" component="h5" className={classes.font}>
         Convert HIVE Ducats to ETH Ducats
        </Typography>
        <br/>
        <Paper className={classes.fontBox}> 
        <TextField id="filled-basic" label="Enter Amount" variant="filled" color="primary" className={classes.font}/>
        <TextField id="filled-basic" label="Enter Eth Address" variant="filled" color="secondary" className={classes.font}/>
        </Paper>
        <br/><br/>
        <Button variant="contained" color="primary">Convert</Button>
        <br/>
        <br/>
        </Paper>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={6}>
        <hr/>
    <Card className={classes.root} variant="outlined">
      <CardContent>
      <Paper className={classes.fontPurchase}>
        <Typography variant="h5" component="h5" className={classes.font}>
         Send Ducats to Hive User
        </Typography>
        <br/><br/>
        <Paper className={classes.fontBox}> 
        <TextField id="filled-basic" label="Enter Amount" variant="filled" color="primary" className={classes.font}/>
        <TextField id="filled-basic" label="Enter Hive User" variant="filled" color="secondary" className={classes.font}/>
        </Paper>
        <br/><br/>
        <Button variant="contained" color="primary">Send</Button>
        <br/>
        <br/>
        </Paper>
      </CardContent>
    </Card>
    </Grid>
   </Grid>
    </TabPanel>
    </Paper>

    <TabPanel value={value} index={1} dir={theme.direction}>
    <Grid container spacing={2}>
    <Grid item xs={6}>
        <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
         Purchase Hive Gems
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={6}>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Send
        </Typography>
        <Typography variant="h5" component="h2">
         Send Hive Gems
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          Send 
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={6}>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          Convert Hive Gem to Ethereum Gem
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Coming Soon
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={6}>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          Guilded Gems
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    </Grid>
    </TabPanel>

    <TabPanel value={value} index={2} dir={theme.direction}>
    <Grid container spacing={2}>
    <Grid item xs={6}>
        <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
         Purchase Hive Ducats
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={6}>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Ducat Balance
        </Typography>
        <Typography variant="h5" component="h2">
          2303
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          Send Ducats
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={6}>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          Convert Hive Ducats to Ethereum Ducats
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    <Grid item xs={6}>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          Send Ducats
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    </Grid>
    </TabPanel>


      </SwipeableViews>
      </Grid>
      <Grid item xs={6}>
      <Grid container spacing={2}>
      <Grid item xs={12}>
      <Paper className={classes.paper}>
          <InventoryChartSwitch />
          </Paper>
          </Grid>
        <Grid item xs={12}>
          <Paper>
          <InventoryChart />
          </Paper>
          </Grid>
          </Grid>
      </Grid>
      <Grid item xs={12}>
      <Paper className={classes.paper}>
          <InventoryNav />
      </Paper>
      </Grid>
    </Grid>
    </div>
  );
}
