import React,{useState} from 'react';
import Alert from '@material-ui/lab/Alert';

import CodedType from './codedType'
import TextType from './textType'

export default function FamilyHistory(props) {

    var data = props.answer;
    var dataType = props.answer.datatype.display
    var [successcheck, setSuccesscheck] = useState(false);

    const handleChange = (event) => {
    //   setValue(event.target.value);
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
    else if (data.datatype.display == "Text" || data.datatype.display == "N/A") {
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