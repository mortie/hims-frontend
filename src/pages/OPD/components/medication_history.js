import React,{ useState } from 'react';
import Alert from '@material-ui/lab/Alert';

import CodedType from './codedType'
import TextType from './textType'

export default function MedicationHistory(props) {

  var data = props.question;
  var dataType = props.question.datatype.display
  var [successcheck, setSuccesscheck] = useState(false);

  const handleChange = (event,cVal) => {
      setSuccesscheck(true)
      props.onChange(event,cVal)
  };

  if (dataType == "Coded") {
    return (
        <div>
        <CodedType
          codeddata={data}
          onChange = {handleChange}
        />
        </div>
      )
    }
  else if (dataType == "Text") {
    return (
      <div>
        <TextType
          textdata={data}
          onChange = {handleChange}
        />
      </div>
    )
    }
}