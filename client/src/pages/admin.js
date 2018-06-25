import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import EnhancedTable from '../components/Table';
import FormDialog from '../components/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Client from "../Client";
import TextField from "@material-ui/core/es/TextField/TextField";
import StoreOrderTable from '../components/StoreOrderTable';

const ITEM_HEIGHT = 48;
const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        // height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
    chip: {
        margin: theme.spacing.unit / 4,
    },
    // We had to use a lot of global selectors in order to style react-select.
    // We are waiting on https://github.com/JedWatson/react-select/issues/1679
    // to provide a much better implementation.
    // Also, we had to reset the default style injected by the library.
    '@global': {
        '.Select-control': {
            display: 'flex',
            alignItems: 'center',
            border: 0,
            height: 'auto',
            background: 'transparent',
            '&:hover': {
                boxShadow: 'none',
            },
        },
        '.Select-multi-value-wrapper': {
            flexGrow: 1,
            display: 'flex',
            flexWrap: 'wrap',
        },
        '.Select--multi .Select-input': {
            margin: 0,
        },
        '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
            padding: 0,
        },
        '.Select-noresults': {
            padding: theme.spacing.unit * 2,
        },
        '.Select-input': {
            display: 'inline-flex !important',
            padding: 0,
            height: 'auto',
        },
        '.Select-input input': {
            background: 'transparent',
            border: 0,
            padding: 0,
            cursor: 'default',
            display: 'inline-block',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            margin: 0,
            outline: 0,
        },
        '.Select-placeholder, .Select--single .Select-value': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.pxToRem(16),
            padding: 0,
        },
        '.Select-placeholder': {
            opacity: 0.42,
            color: theme.palette.common.white,
        },
        '.Select-menu-outer': {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
            position: 'absolute',
            left: 0,
            top: `calc(100% + ${theme.spacing.unit}px)`,
            zIndex: 2,
            maxHeight: ITEM_HEIGHT * 4.5,
        },
        '.Select.is-focused:not(.is-open) > .Select-control': {
            boxShadow: 'none',
        },
        '.Select-menu': {
            maxHeight: ITEM_HEIGHT * 4.5,
            overflowY: 'auto',
        },
        '.Select-menu div': {
            boxSizing: 'content-box',
        },
        '.Select-arrow-zone, .Select-clear-zone': {
            color: theme.palette.action.active,
            cursor: 'pointer',
            height: 21,
            width: 21,
            zIndex: 1,
        },
        // Only for screen readers. We can't use display none.
        '.Select-aria-only': {
            position: 'absolute',
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            height: 1,
            width: 1,
            margin: -1,
        },
    },
    table: {
        minWidth: 1020,
        tableLayout: 'auto',
        width: 'auto',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

const otherMailFolderListItems = (
    <div>

    </div>
);

class Option extends React.Component {
    handleClick = event => {
        this.props.onSelect(this.props.option, event);
    };

    render() {
        const { children, isFocused, isSelected, onFocus } = this.props;

        return (
            <MenuItem
                onFocus={onFocus}
                selected={isFocused}
                onClick={this.handleClick}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {children}
            </MenuItem>
        );
    }
}

function SelectWrapped(props) {
    const { classes, ...other } = props;

    return (
        <Select
            optionComponent={Option}
            noResultsText={<Typography>{'No results found'}</Typography>}
            arrowRenderer={arrowProps => {
                return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
            }}
            clearRenderer={() => <ClearIcon />}
            valueComponent={valueProps => {
                const { value, children, onRemove } = valueProps;

                const onDelete = event => {
                    event.preventDefault();
                    event.stopPropagation();
                    onRemove(value);
                };

                if (onRemove) {
                    return (
                        <Chip
                            tabIndex={-1}
                            label={children}
                            className={classes.chip}
                            deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
                            onDelete={onDelete}
                        />
                    );
                }

                return <div className="Select-value">{children}</div>;
            }}
            {...other}
        />
    );
}

class Admin extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isStore: true,
            single: null,
            multi: null,
            multiLabel: null,
            suggestions:[],
            shopId: 0,
        };
        Client.getShops(result => {
            const response = result[0].response;
            if (response.code === 0) {
                const suggestions = result[0].shop.slice(0, 100)
                    .map(suggestion => ({
                        value: suggestion.shopId,
                        label: suggestion.shopName,
                    }));
                this.setState({
                    suggestions: suggestions,
                });
            }
        });
    }
    handleStore = () => {
      this.setState({ isStore: true, })
    };
    handleOrder = () => {
        this.setState({ isStore: false, })
    };
    handleChange = name => value => {
        this.setState({
            [name]: value,
        });
        this.setState({ shopId: value });
        this.table.handleDataFilter(value);
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;
    mailFolderListItems = (
        <div>
            <ListItem button onClick={this.handleStore}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Commodity" />
            </ListItem>
            <ListItem button onClick={this.handleOrder}>
                <ListItemIcon>
                    <MailIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItem>
        </div>
    );

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {/*<FormDialog/>*/}
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            Hamazon Administrator
                        </Typography>
                        <TextField
                            style={{ width: "300px", marginLeft: "700px", color: "white"}}
                            value={this.state.multiLabel}
                            onChange={this.handleChange('multiLabel')}
                            placeholder="Select shop"
                            name="react-select-chip-label"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                inputComponent: SelectWrapped,
                                inputProps: {
                                    classes,
                                    multi: false,
                                    instanceId: 'react-select-chip-label',
                                    id: 'react-select-chip-label',
                                    simpleValue: true,
                                    options: this.state.suggestions,
                                },
                            }}
                        />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>{this.mailFolderListItems}</List>
                    <Divider />
                    <List>{otherMailFolderListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.isStore ?
                        <EnhancedTable onRef={ref => (this.table = ref)} /> :
                        <StoreOrderTable/>
                    }
                </main>
            </div>
        );
    }
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);