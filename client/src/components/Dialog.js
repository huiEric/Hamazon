import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class FormDialog extends React.Component {
    state = {
        open: true,
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Hamazon manager</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To login as a Hamazon Manager, please input the correct email and password.
                            Only the manager can visit the page.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default FormDialog;
