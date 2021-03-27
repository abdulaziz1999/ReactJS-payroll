import React, { useState } from 'react'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DateRangePickerCalendar, START_DATE } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

// reactstrap components
import {
  FormGroup,
  Input,
  Col,
  Row
} from "reactstrap";

const Calendar = () => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [focus, setFocus] = useState(START_DATE)
  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
  }
 
  return (
    <div>
      {/* <p>Currently selecting: {focus}.</p> */}
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <label>Start Date :</label>
                                <Input
                                name="start"
                                type="text"
                                value={startDate ? format(startDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                            <label>End Date :</label>
                                <Input
                                name="end"
                                type="text"
                                value={endDate ? format(endDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
      <DateRangePickerCalendar
        startDate={startDate}
        endDate={endDate}
        focus={focus}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFocusChange={handleFocusChange}
        locale={enGB}
      />
    </div>
  )
}

export default Calendar;