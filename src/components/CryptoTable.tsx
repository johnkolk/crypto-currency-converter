import React from 'react';
import {TCoin} from "../types/types";

import { makeStyles } from '@material-ui/core/styles';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper/Paper";
import TableContainer from "@material-ui/core/TableContainer";


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    smallAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

interface ICryptoTable {
    coinsList: TCoin[]
}

export const CryptoTable: React.FC<ICryptoTable> = ({coinsList}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
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
                    {coinsList.length === 0 ? 'Loading' : coinsList.map((coin) => (
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
    );
};
