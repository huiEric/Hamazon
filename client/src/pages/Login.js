import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { TextField, Button, Paper, Typography, Divider } from  '@material-ui/core';
import { withRouter, Redirect, Link, Router } from  'react-router-dom';
import Client from '../Client';
import { auth } from '../routes';

const styles = theme => ({
    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: "10%",
    },
    demo: {
        height: 240,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        // height: '100%',
        color: theme.palette.text.secondary,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    button: {
        marginTop: "10px",
    }
});

class LoginForm extends React.Component {
    state = {
        user: {
            email: '',
            password: '',
        },
    };

    render() {
        const { classes } = this.props;
        const { user } = this.state;
        const LoginButton = withRouter(({ history }) => (
            <Button
                className={classes.button}
                variant="outlined"
                onClick={
                    () => {
                        auth.handleLogin(user, history);
                    }
                }
                color={'primary'}
                fullWidth
            >
                Login
            </Button>
        ));

        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid
                        container
                        className={classes.logo}
                        justify="center"
                    >
                        <Grid key='title' item>
                            <Typography variant="display1" gutterBottom>
                                Hamazon
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        className={classes.form}
                        justify="center"
                    >
                        <Grid key={'login'} item>
                            <Paper className={classes.paper} elevation={4}>
                                <Typography variant="title" gutterBottom>
                                    Sign in
                                </Typography>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    value={this.state.user.email}
                                    onChange={(e) => {
                                        this.setState({
                                           user: {
                                               email: e.target.value,
                                               password: this.state.user.password,
                                           }
                                        });
                                    }}
                                />
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    value={this.state.user.password}
                                    onChange={(e) => {
                                        this.setState({
                                            user: {
                                                email: this.state.user.email,
                                                password: e.target.value,
                                            }
                                        });
                                    }}
                                />
                                <LoginButton/>
                            </Paper>
                            <Typography variant="caption" align="center" style={{ marginTop: "30px", }} gutterBottom>
                                New to Hamazon?
                            </Typography>
                            <Divider style={{ marginTop: "5px", marginBottom: "10px" }} />
                            <Button component={Link} to="/signup" variant="outlined" onClick={this.handleSignup} color="secondary" fullWidth>
                                Create your Hamazon account
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

LoginForm = withStyles(styles)(LoginForm);

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    };

    login = (user) => {
        Client.login(user.email, user.password, userInfo => {
            console.log(userInfo);
            if (userInfo.length > 0) {
                console.log("ok");
                auth.isAuthenticated = true;
                this.setState({redirectToReferrer: true});
                // Router.transitionTo('/home');
            }
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/home' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <div>
                <LoginForm onLogin={this.login} />
            </div>
        )
    }
}

export default Login;
