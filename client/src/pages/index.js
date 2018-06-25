import React from "react";
import RecipeReviewCard from '../components/RecipeReviewCard';
import Client from "../Client";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Appbar from '../components/Appbar';

const column = ['productId', 'productName', 'description', 'originalPrice', 'reallyPrice', 'imgUrl', 'categoryName', 'shopName'];

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: [],
            spacing: '32',
        };
        Client.getProducts(column, products => {
            // console.log(products[0]);
            this.setState({
                data: products.slice(0, 50)
            });
            // console.log(this.state.data);
        });
    }

    componentDidMount() {
        document.title = 'Hamazon - Buy what you like'
    }

    render() {
        const { classes } = this.props;
        const { data, spacing } = this.state;
        // console.log(data);
        return (
            <div>
                <Appbar title={'Hamazon'}/>
                {/*<SimpleMediaCard image={"https://images-na.ssl-images-amazon.com/images/I/514avTC0gfL._SL1024_.jpg"} />*/}
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
                            {data.map(product => {
                                return (
                                    <Grid key={product.productId} item>
                                        <RecipeReviewCard
                                            title={product.shopName}
                                            time={"September 14, 2016"}
                                            image={product.imgUrl}
                                            name={product.productName}
                                            description={product.description}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);