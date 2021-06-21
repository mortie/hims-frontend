import React,{ useState } from 'react';
import Alert from '@material-ui/lab/Alert';

import CodedType from './codedType'
import TextType from './textType'

export default function MedicationHistory(props) {

  var data = props.question;
  var dataType = props.question.datatype.display
  var [value,setValue] = useState()
  var [successcheck, setSuccesscheck] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    setSuccesscheck(true)
  };

  if (dataType == "Coded") {
    return (
        <div>
          <CodedType codeddata={data} />
          {successcheck &&
          <Alert severity="success">Saved Successfully!</Alert>
          }
        </div>
      )
    }
  else if (dataType == "Text") {
    return (
      <div>
      <TextType textdata={data} />
      {successcheck &&
      <Alert severity="success">Saved Successfully!</Alert>
      }
      </div>
    )
    }
}