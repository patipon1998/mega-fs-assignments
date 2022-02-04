import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styled from 'styled-components'

const CssTextField = styled(TextField)({
    'input, select, textarea': {
        color: 'white'
    },
    '& label': {
        color: 'white',
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
});

type propType = {
    actionType: number
    accountBalance?: number
    onSubmit: (eth: number) => Promise<void>
}

const ActionCard = ({
    actionType,
    accountBalance,
    onSubmit,
}: propType): JSX.Element => {
    const [input, setInput] = React.useState<undefined | string>()
    const action = actionType === 1 ? "Supply" : "Withdraw"
    return (
        <Card sx={{ maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'rgba(9, 15, 31, 0.9)' }}>
            <CardContent>
                <Typography sx={{ fontSize: 32 }} gutterBottom>
                    {action}
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="body2">
                    {`Your ${actionType === 1 ? 'account balance' : 'current supplied'}: ${accountBalance ? Math.round(accountBalance * 1000) / 1000 : '0'} ETH`}
                </Typography>
                <CssTextField
                    id="outlined-basic"
                    label={`ETH To ${action}`}
                    variant="outlined"
                    value={input}
                    type="number"
                    onChange={(e) => setInput(e.target.value)}
                />
                <br />
                <Button size="small" onClick={() => accountBalance && setInput(`${accountBalance}`)}>Max</Button>
                <Typography variant="body2">
                    {`${actionType === 1 ? 'Receiving' : "Cost"} - cETH`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    onClick={() => onSubmit(Number(input))}
                    disabled={!input || Number(input) <= 0 || !accountBalance || Number(input) > accountBalance}
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    variant="contained"
                >{action}</Button>
            </CardActions>
        </Card>
    );
}

export default ActionCard