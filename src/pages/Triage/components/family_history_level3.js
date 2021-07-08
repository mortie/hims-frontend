import React,{useState} from 'react';
import CodedType from './codedType'
import TextType from './textType'

export default function Famiily_Level3_History(props) {
    var data = props.answer;
    var dataType = data.datatype.display

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
      );
    }
    else if (dataType= "Text" || dataType == "N/A") {
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