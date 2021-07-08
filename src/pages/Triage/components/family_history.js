import React,{useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import CodedType from './codedType'
import TextType from './textType'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Famiily_Level2_History from './family_history_level2'

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

export default function FamilyHistory(props) {

  const classes = useStyles();
  var data = props.answer;
  var dataType = "Coded"
  var family_level_1 = data.answers;
  var uuid = data.uuid;
  var FAMILY = "Family History-Yes"
  var NO_FAMILY = "Family History-No"
  var [showFamily, setShowFamily] = useState(false);
  var [showNonFamily, setShowNonFamily] = useState(false);
  var [familyUuid, setFamilyUuid] = useState("");
  var [nonfamilyUuid,setNonfamilyUuid] = useState("")
  var [familyDetails, setFamilyDetails] = useState([]);
  var [nonfamilyDetails, setNonfamilyDetails] = useState([]);
  var uuidList = [];
  var [allfamilyuuid, setAllfamilyuuid] = useState([]);

  family_level_1.forEach(function (item, index) {
      if (item.display == FAMILY) {
        if (familyDetails.length == 0) {
          setFamilyUuid(item.uuid)
          setFamilyDetails(item.answers)
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
    if (btnvalue == FAMILY) {
      setShowFamily(true);
      setShowNonFamily(false);
      familyDetails.forEach(function (itemva, index) {
        uuidList.push(itemva.uuid)
        setAllfamilyuuid(uuidList);
        itemva.answers.forEach(function (itemvas, index) {
          uuidList.push(itemvas.uuid)
          setAllfamilyuuid(uuidList);
          itemvas.answers.forEach(function (itemvasl, index) {
            uuidList.push(itemvasl.uuid)
            setAllfamilyuuid(uuidList);
        });
        });
      });
    }
    else if (btnvalue == NO_FAMILY) {
      setShowNonFamily(true);
      setShowFamily(false);
      props.onDelete(event,allfamilyuuid)
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
        {showFamily &&
          familyDetails.map((item, index) => (
            <Famiily_Level2_History
              answer={item}
              onChange={handleValueChange}
              key={item.uuid}
              uuidDrug={familyUuid}
              onDelete={deleteChange}
            />
          ))
        }

      </div>
    )
  }

}