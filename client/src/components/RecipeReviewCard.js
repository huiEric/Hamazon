import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PayIcon from '@material-ui/icons/Payment';
import Client from "../Client";

function getSteps() {
    return ['Confirm product information', 'Confirm order', 'Pay the money'];
}

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class RecipeReviewCard extends React.Component {
    state = {
        expanded: false,
        open: false,
        activeStep: 0,
        addresses: this.props.addresses,
        quantity: 1,
        addrId: this.props.addrId,
        phone: "15812345678",
        productId: this.props.productId,
        userId: this.props.userId,
        shopId: this.props.shopId,
        address: "",
    };

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
        if (this.state.activeStep === getSteps().length-1){
            const order = {
                quantity: this.state.quantity,
                addrId: this.state.addrId,
                phone: "15812345678",
                productId: this.state.productId,
                userId: this.state.userId,
                shopId: this.state.shopId,
            };
            console.log(order);
            Client.addOrder(order, result => {
               const response = result[0].response;
               console.log(response);
               if (response.code === 0) {

               }
               else {
                   alert("购买失败");
               }
            });
        }
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };
    handleAddAddress = () => {
        const addr = prompt("Please input address:");
        this.setState({ addresses: this.state.addresses.append(addr) });
        console.log(this.state.addresses);
    };
    handleAddressChange = (e) => {
      this.setState({
          address: e.target.value,
      });
      const addresses = this.state.addresses;
      for (let i=0; i < addresses.length; i++) {
          const address = addresses[i];
          console.log(address.addr === e.target.value);
          if (address.addr === e.target.value)
              this.setState({
                  addrId: address.addrId,
              });
        }
    };

    getStepContent = (step) => {
        const { classes, title, time, image, name, description, originalPrice, reallyPrice } = this.props;
        const addresses = this.state.addresses;
        const phones = ["13612345678", "15812345678"];
        switch (step) {
            case 0:
                return (
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Recipe" className={classes.avatar}>
                                    {title[0]}
                                </Avatar>
                            }
                            action={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={title}
                            subheader={time}
                        />
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title={name}
                        />
                        <CardContent>
                            <Typography component="p">
                                {name}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography paragraph variant="subheading">
                                Price:
                            </Typography>
                            <GridList cellHeight={50} className={classes.gridList}>
                                <ListItem>
                                    <ListItemText primary={"原价"} secondary={originalPrice} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={"优惠价"} secondary={reallyPrice} />
                                </ListItem>
                            </GridList>
                        </CardContent>
                        <CardContent>
                            <Typography paragraph variant="subheading">
                                Description:
                            </Typography>
                            <GridList cellHeight={50} className={classes.gridList}>
                                {description.split(';').map(item => {
                                    if (item !== "") {
                                        const title = item.split('：')[0];
                                        const content = item.split('：')[1];
                                        return (
                                            <ListItem>
                                                <ListItemText primary={title} secondary={content} />
                                            </ListItem>
                                        );
                                    }
                                })}
                            </GridList>
                        </CardContent>
                    </Card>
                );
            case 1:
                return (
                    <div>
                        <TextField
                            id="number"
                            label="Quantity"
                            value={this.state.quantity}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            style={{ width: "400px" }}
                        />
                        <FormControl className={classes.formControl} style={{ width: "400px" }}>
                            <InputLabel htmlFor="address-auto-width">Address</InputLabel>
                            <Select
                                value={this.state.address}
                                onChange={this.handleAddressChange}
                                input={<Input name="age" id="age-auto-width" />}
                                autoWidth
                            >
                                {addresses.map(address => (
                                    <ListItem button key={address.addr} value={address.addr}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.avatar}>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={address.addr} />
                                    </ListItem>
                                ))}
                                <ListItem button onClick={() => this.handleAddAddress()}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AddIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="add address" />
                                </ListItem>
                            </Select>
                            <FormHelperText>{""}</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl} style={{ width: "400px" }}>
                            <InputLabel htmlFor="phone-auto-width">Phone</InputLabel>
                            <Select
                                value={this.state.phone}
                                onChange={this.handleChange}
                                input={<Input name="phone" id="phone-auto-width" />}
                                autoWidth
                            >
                                {phones.map(phone => (
                                    <ListItem button key={phone}>
                                        <ListItemAvatar>
                                            <Avatar className={classes.avatar}>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={phone} />
                                    </ListItem>
                                ))}
                                <ListItem button onClick={() => this.handleAddressClick('addPhone')}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AddIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="add phone" />
                                </ListItem>
                            </Select>
                            <FormHelperText>{""}</FormHelperText>
                        </FormControl>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <FormControl component="fieldset" required className={classes.formControl} style={{ width: "400px" }}>
                            <RadioGroup
                                aria-label="payment"
                                name="payment"
                                className={classes.group}
                                value={this.state.value}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="支付宝" />
                                <FormControlLabel value="male" control={<Radio />} label="微信支付" />
                                <FormControlLabel value="other" control={<Radio />} label="银联卡" />
                            </RadioGroup>
                        </FormControl>
                        <Button className={classes.button} variant="fab" style={{ marginLeft: "350px" }}>
                            <PayIcon/>
                        </Button>
                    </div>
                );
            default:
                return 'Unknown step';
        }
    };

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    handleBuy = () => {
      this.setState({ open: true });
    };
    handleClose = () => {
      this.setState({ open: false });
      if (this.state.activeStep === getSteps().length)
          this.setState({ activeStep: 0 });
    };

    render() {
        const { classes, title, time, image, name, description } = this.props;
        const { activeStep } = this.state;
        const steps = getSteps();

        return (
            <div>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                {title[0]}
                            </Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={title}
                        subheader={time}
                    />
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title={name}
                    />
                    <CardContent>
                        <Typography component="p">
                            {name}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites" onClick={this.handleBuy}>
                            <AddShoppingCartIcon/>
                        </IconButton>
                        <IconButton aria-label="Share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph variant="body2">
                                Description:
                            </Typography>
                            <Typography paragraph>
                                {description}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Take it home!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>

                        </DialogContentText>
                        <div className={classes.root}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((label, index) => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                            <StepContent>
                                                <Typography>{this.getStepContent(index)}</Typography>
                                                <div className={classes.actionsContainer} style={{ marginTop:"10px" }}>
                                                    <div>
                                                        <Button
                                                            disabled={activeStep === 0}
                                                            onClick={this.handleBack}
                                                            className={classes.button}
                                                        >
                                                            Back
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.handleNext}
                                                            className={classes.button}
                                                        >
                                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </StepContent>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep === steps.length && (
                                <Paper square elevation={0} className={classes.resetContainer} style={{ width: "400px" }}>
                                    <Typography>All steps completed - The good is on the way!</Typography>
                                </Paper>
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
