import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    inputRow: {
        display: 'flex',
        alignItems: 'stretch',
        marginTop: 30,
    },
    inputBlock: {
        flexGrow: 1,
        marginRight: 10,
    },
    selectBlock: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
    },
    smallAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

type TCoin = {
    id: number;
    name: string;
    fullName: string;
    imgUrl: string;
    price: number;
    volume24Hour: number;
};

function App() {
    const classes = useStyles();
    const [allCoins, setAllCoins] = React.useState<TCoin[]>([]);

    useEffect(() => {
        fetch(
            'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
        )
            .then((response) => response.json())
            .then((data) => {
                const coins: TCoin[] = data.Data.map((coin: any) => {
                    return {
                        id: coin.CoinInfo.Id,
                        name: coin.CoinInfo.Name,
                        fullName: coin.CoinInfo.FullName,
                        imgUrl: 'https://www.cryptocompare.com' + coin.CoinInfo.ImageUrl,
                        price: coin.RAW.USD.PRICE.toFixed(2),
                        volume24Hour: coin.RAW.USD.VOLUME24HOUR.toFixed(2),
                    };
                });
                setAllCoins(coins);
            });
    }, []);

    return (
        <Container className={classes.root} maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Logo
                                    </TableCell>
                                    <TableCell align="right">
                                        Name
                                    </TableCell>
                                    <TableCell align="right">
                                        Full Name
                                    </TableCell>
                                    <TableCell align="right">
                                        Price, $
                                    </TableCell>
                                    <TableCell align="right">
                                        Volume 24h, $
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allCoins.map((coin) => (
                                    <TableRow key={coin.id}>
                                        <TableCell component="th" scope="row">
                                            <Avatar className={classes.smallAvatar} alt={coin.name} src={coin.imgUrl} />
                                        </TableCell>
                                        <TableCell align="right">{coin.name}</TableCell>
                                        <TableCell align="right">{coin.fullName}</TableCell>
                                        <TableCell align="right">${coin.price}</TableCell>
                                        <TableCell align="right">${coin.volume24Hour}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="subtitle1" gutterBottom>
                            1 Доллар США равно
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            2,56 Белорусский рубль
                        </Typography>
                        <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                        >
                            caption text
                        </Typography>
                        <div className={classes.inputRow}>
                            <FormControl className={classes.inputBlock}>
                                <TextField
                                    id="outlined-name"
                                    label="Value"
                                    size={'small'}
                                    value={0}
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl className={classes.selectBlock}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Curency"
                                    size={'small'}
                                    value="USD"
                                    // helperText="Please select your currency"
                                    variant="outlined"
                                >
                                    {currencies.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
