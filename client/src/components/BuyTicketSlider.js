import React from "react";
import './BuyTicketSlider.css'
import { updateTable, addTable } from "./NetworkRequests";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles({
    root: {
        width: 250
    },
    input: {
        width: 40,
        height: 80
    }
});


export default function BuyTicketSlider(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === "" ? "" : Math.min(props.raffle.total_tickets - props.raffle.tickets_sold, Math.max(1, Number(event.target.value))));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    const purchaseClick = () => {
        //is user logged in and is user valid?
        if (!props.user) {
            alert('You are not logged in, please do so to purchase tickets')
            return
        }
        if (!props.user.donated) {
            alert('Please verify billing information before purchasing a ticket')
            return
        }
        if (value <= 0) {
            alert('Please input a proper value')
            return
        }
        //update raffle table, purchase ticket amount by value 
        updateTable('raffle', props.raffle.raffle_id, { tickets_sold: props.raffle.tickets_sold + value })
        //create value amount of tickets in ticket table 
        for (let i = 0; i < value; i++) {
            addTable('ticket', { raffle_id: props.raffle.raffle_id, member_id: props.user.member_id })
        }
        //notify user of purchase
        alert('Thank you for your purchase, a receipt has been sent to your email')
        //refresh detailed view
        props.refresh()
        //closing modal after purchase
        props.closeWindow()
    }

    return (
        <div className={classes.root}>
            <Typography id="input-slider" gutterBottom>
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item></Grid>
                <Grid item xs>
                    <Slider
                        value={typeof value === "number" ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                        max={props.raffle.total_tickets - props.raffle.tickets_sold}
                        min={1}
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: 1,
                            max: props.raffle.total_tickets - props.raffle.tickets_sold,
                            type: "number",
                            "aria-labelledby": "input-slider"
                        }}
                    />
                    <span>Total: ${value * props.raffle.ticket_price}.00</span>
                </Grid>
            </Grid>
            <button id='purchaseButton' onClick={purchaseClick}>Purchase</button>
        </div>
    );
}
