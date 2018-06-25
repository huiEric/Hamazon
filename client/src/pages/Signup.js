import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { TextField, Button, Paper, Typography, Divider } from  '@material-ui/core';
import { withRouter, Redirect, Link } from  'react-router-dom';
import Client from '../Client';

const styles = theme => ({
    root: {
        flexGrow: 1,
        position: "relative",
        marginTop: "5%",
    },
    demo: {
        height: 240,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        width: "400px",
        color: theme.palette.text.secondary,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    button: {
        marginTop: "10px",
    }
});

class SignupForm extends React.Component {
    state = {
        user: {
            email: '',
            nickname: '',
            username: '',
            password: '',
        },
        isAuthenticated: false,
    };

    render() {
        const { classes, onLogin } = this.props;
        const { user } = this.state;
        const handleSignup = (history) => {
            console.log(user);
            Client.signup(user, result => {
                const response = result[0].response;
                if (response.code === 0) {
                    this.setState({
                        isAuthenticated: true,
                    });
                    history.push('/login');
                }
            });
        };
        const SignupButton = withRouter(({ history }) => (
            <Button
                variant="outlined"
                onClick={
                    () => {
                        handleSignup(history);
                    }
                }
                color={'primary'}
                className={classes.button}
                fullWidth
            >
                Signup
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
                                    Sign up
                                </Typography>
                                <TextField
                                    className={classes.email}
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
                                               nickname: this.state.user.nickname,
                                               username: this.state.user.username,
                                               password: this.state.user.password,
                                           }
                                        });
                                    }}
                                />
                                <TextField
                                    className={classes.nickname}
                                    margin="dense"
                                    id="name"
                                    label="Nickname"
                                    type="text"
                                    fullWidth
                                    value={this.state.user.nickname}
                                    onChange={(e) => {
                                        this.setState({
                                            user: {
                                                nickname: e.target.value,
                                                email: this.state.user.email,
                                                username: this.state.user.username,
                                                password: this.state.user.password,
                                            }
                                        });
                                    }}
                                />
                                <TextField
                                    className={classes.username}
                                    margin="dense"
                                    id="name"
                                    label="Username"
                                    type="text"
                                    fullWidth
                                    value={this.state.user.username}
                                    onChange={(e) => {
                                        this.setState({
                                            user: {
                                                username: e.target.value,
                                                email: this.state.user.email,
                                                nickname: this.state.user.nickname,
                                                password: this.state.user.password,
                                            }
                                        });
                                    }}
                                />
                                <TextField
                                    className={classes.password}
                                    margin="dense"
                                    id="name"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    value={this.state.user.password}
                                    onChange={(e) => {
                                        this.setState({
                                            user: {
                                                password: e.target.value,
                                                email: this.state.user.email,
                                                nickname: this.state.user.nickname,
                                                username: this.state.user.username,
                                            }
                                        });
                                    }}
                                />
                                <SignupButton/>
                            </Paper>
                            <Typography variant="caption" align="center" style={{ marginTop: "30px", }} gutterBottom>
                                Already have an account?
                            </Typography>
                            <Divider style={{ marginTop: "5px", marginBottom: "10px" }} />
                            <Button component={Link} to="/login" variant="outlined" color="secondary" fullWidth>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

SignupForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupForm);
