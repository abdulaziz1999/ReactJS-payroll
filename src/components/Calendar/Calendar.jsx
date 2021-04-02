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

const Calendar = (props) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [focus, setFocus] = useState(START_DATE)
  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE)
  }

  // console.log(startDate ? format(startDate, 'yyyy-MM-dd', { locale: enGB }) : 'none')
  // console.log(endDate ? format(endDate, 'yyyy-MM-dd', { locale: enGB }) : 'none')
  // console.log(props.tglnow)
  return (
    <div>
      {/* <p>Currently selecting: {focus}.</p> */}
                    <Row>
                        <Col sm={6}>
                            <FormGroup>
                                <label>Start Date :</label>
                                <Input
                                id="starTgl"
                                name="startDate"
                                type="date"
                                readOnly
                                value={startDate ? format(startDate, 'yyyy-MM-dd', { locale: enGB }) : ''}
                                // onChange={props.ubah}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                            <label>End Date :</label>
                                <Input
                                id="endTgl"
                                name="endDate"
                                type="date"
                                readOnly
                                value={endDate ? format(endDate, 'yyyy-MM-dd', { locale: enGB }) : ''}
                                // readOnly
                                // onChange={props.ubah}
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