import React,{useState} from 'react';
import Alert from '@material-ui/lab/Alert';

import CodedType from './codedType'
import TextType from './textType'
import PS_Level2_History from './ps_level2_history';

export default function PS_History(props) {
    var data = props.answer;
    var dataType = props.answer.datatype.display
    var [successcheck, setSuccesscheck] = useState(false);
    var NON_SMOKE = "Never Smoker"
    var NON_ALCOHOLIC = "Non Alcoholic"
  var ps_level_1 = data.answers;
  var uuid= data.uuid;
    var [showSmoke, setShowSmoke] = useState(false);
    var [showNonSmoke, setShowNonSmoke] = useState(false);
    var [showAlcoholic, setShowAlcoholic] = useState(false);
    var [showNonAlcoholic, setShowNonAlcoholic] = useState(false);
    var [successcheck, setSuccesscheck] = useState(false);
    var [smokingCap, setSmokingCap] = useState([]);
    var [alcoholCap, setAlcoholCap] = useState([]);
  var level_2_smoke = [];
  var level_2_alcohol = [];


  ps_level_1.forEach(function (item, index) {
    if (item.display != NON_SMOKE) {
      if (smokingCap.length == 0) {
        level_2_smoke.push(item)
        setSmokingCap(level_2_smoke)
      }
    }
    else if (item.display != NON_ALCOHOLIC) {
      if (alcoholCap.length == 0) {
        level_2_alcohol.push(item)
        setAlcoholCap(level_2_alcohol)
      }
    }
  });

  const handleChange = (event) => {
    var btnid = event.target.id
    var btnvalue = event.target.value
    var cVal = {
      "name": uuid,
      "value":btnid
    }
    if (btnvalue != NON_SMOKE) {
      setShowSmoke(true);
      setShowNonSmoke(false);
    }
    else if (btnvalue != NON_ALCOHOLIC) {
      setShowAlcoholic(true);
      setShowNonAlcoholic(false);
    }
    setSuccesscheck(false);
    props.onChange(cVal)
  };

  const handleValueChange = (cVal) => {
    setSuccesscheck(false);
    props.onChange(cVal)
  };

  if (dataType == "Coded") {
      return (
        <div>
  
          <CodedType codeddata={data} />

          {showSmoke &&
              smokingCap.map((item, index) => (
                    <PS_Level2_History
                  answer={item}
                  onChange={handleValueChange}
                  key={item.uuid}
                    />
              ))
          }

          {showAlcoholic &&
              alcoholCap.map((item, index) => (
                    <PS_Level2_History
                  answer={item}
                  onChange={handleValueChange}
                  key={item.uuid}
                    />
              ))
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