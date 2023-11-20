import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function TripRegistrationForm() {

        type ValuePiece = Date | null;

        type Value = ValuePiece | [ValuePiece, ValuePiece];

            const [value, onChange] = useState<Value>(new Date());

            return (
                <div>
                <Calendar onChange={onChange} value={value} />
                </div>
            );
        }

  
  export default TripRegistrationForm;
  