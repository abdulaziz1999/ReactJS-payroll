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

class Calendar extends React.Component {
  state = {
    startDate: "",
    endDate: "",
    focus : START_DATE,
  }
  setStartDate(){
    this.setState({
      startDate : startDate
    })
  }
  setEndDate(){
    this.setState({
      endDate : startDate
    })
  }
  setFocus(){
    this.setState({
      focus : ""
    })
  }
  handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE)
  }
    render(){
     const [startDate, setStartDate] = useState()
     const [endDate, setEndDate] = useState()
     const [focus, setFocus] = useState(START_DATE)
     const handleFocusChange = (newFocus) => {
       setFocus(newFocus || START_DATE)
   
     }
   //   console.log(startDate ? format(startDate, 'yyyy-dd-MM', { locale: enGB }) : 'none')
   //   console.log(endDate ? format(endDate, 'yyyy-dd-MM', { locale: enGB }) : 'none')
    return (
        <div>
          {/* <p>Currently selecting: {focus}.</p> */}
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <label>Start Date :</label>
                                    <Input
                                    name="startDate"
                                    type="text"
                                    value={startDate ? format(startDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}
                                    onChange={ubah}
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm={6}>
                                <FormGroup>
                                <label>End Date :</label>
                                    <Input
                                    name="endDate"
                                    type="text"
                                    value={endDate ? format(endDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}
                                    readOnly
                                    onChange={ubah}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
          <DateRangePickerCalendar
            startDate={this.startDate}
            endDate={this.endDate}
            focus={focus}
            onStartDateChange={this.setStartDate}
            onEndDateChange={this.setEndDate}
            onFocusChange={this.handleFocusChange}
            locale={enGB}
          />
        </div>
      )
 }
  
}

export default Calendar;