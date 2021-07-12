import React,{useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import CodedType from './codedType'
import TextType from './textType'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Surgical_Level2_History from './surgical_history_level2'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function SurgicalHistory(props) {

  const classes = useStyles();
  var data = props.answer;
  var dataType = "Coded"
  var surgical_level_1 = data.answers;
  var uuid = data.uuid;
  var SURGICAL = "Surgical History-Yes"
  var NO_SURGICAL = "Surgical History-No"
  var [showSurgical, setShowSurgical] = useState(false);
  var [showNonSurgical, setShowNonSurgical] = useState(false);
  var [surgicalUuid, setSurgicalUuid] = useState("");
  var [nonfamilyUuid,setNonfamilyUuid] = useState("")
  var [surgicalDetails, setSurgicalDetails] = useState([]);
  var [nonfamilyDetails, setNonfamilyDetails] = useState([]);
  var uuidList = [];
  var [allsurgicaluuid, setAllsurgicaluuid] = useState([]);

  surgical_level_1.forEach(function (item, index) {
      if (item.display == SURGICAL) {
        if (surgicalDetails.length == 0) {
          setSurgicalUuid(item.uuid)
          setSurgicalDetails(item.answers)
        }
      }
  });

  const handleChange = (event,cVal) => {
    var btnid = event.target.id
    var btnvalue = event.target.value
    var cVal = {
      "name": uuid,
      "value":btnid
    }
    if (btnvalue == SURGICAL) {
      setShowSurgical(true);
      setShowNonSurgical(false);
      surgicalDetails.forEach(function (itemva, index) {
        uuidList.push(itemva.uuid)
        setAllsurgicaluuid(uuidList);
        itemva.answers.forEach(function (itemvas, index) {
          uuidList.push(itemvas.uuid)
          setAllsurgicaluuid(uuidList);
          itemvas.answers.forEach(function (itemvasl, index) {
            uuidList.push(itemvasl.uuid)
            setAllsurgicaluuid(uuidList);
        });
        });
      });
    }
    else if (btnvalue == NO_SURGICAL) {
      setShowNonSurgical(true);
      setShowSurgical(false);
      props.onDelete(event,allsurgicaluuid)
    }
    // props.onChange(event,cVal)
  };

  const handleValueChange = (event, cVal) => {
    props.onChange(event,cVal)
  };

  const deleteChange = (event,cVal) => {
    props.onDelete(event,cVal)
  };

  if (dataType == "Coded") {
    return (
      <div>
        <FormControl component="fieldset" className="medication">
          <RadioGroup aria-label="gender" name="gender1" className="medi" >
            {data.answers.map((smoker, index) => (
              <FormControlLabel
                value={smoker.display}
                control={<Radio id={smoker.uuid} onChange={handleChange} />}
                label={smoker.display}
                className="yesClass"
                id={smoker.uuid}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <br></br>
        <br></br>
        {showSurgical &&
          surgicalDetails.map((item, index) => (
            <Surgical_Level2_History
              answer={item}
              onChange={handleValueChange}
              key={item.uuid}
              uuidDrug={surgicalUuid}
              onDelete={deleteChange}
            />
          ))
        }

      </div>
    )
  }

}