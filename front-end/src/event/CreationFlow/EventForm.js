import 'date-fns'
import React from 'react'
import { TextField, Grid, Container } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

function EventForm(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container maxWidth="sm">
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={props.title}
            onChange={(event) => props.setTitle(event.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            multiline
            fullWidth
            label="Description"
            rows={6}
            name="description"
            autoComplete="description"
            autoFocus
            value={props.description}
            onChange={(event) => props.setDescription(event.target.value)}
          />

          <Grid container>
            <Grid item xs={12} sm={5}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={props.time}
                onChange={props.setTime}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={5}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Choose date"
                value={props.date}
                onChange={props.setDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </Grid>
        </form>
      </Container>
    </MuiPickersUtilsProvider>
  )
}

export default EventForm
