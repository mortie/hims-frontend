import React,{useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import CodedType from './codedType'
import TextType from './textType'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Medication_Level2_History from './medication_history_level2'

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

export default function MedicationHistory(props) {

  const classes = useStyles();
  var data = props.question;
  var dataType = "Coded"
  var medication_level_1 = data.answers;
  var uuid = data.uuid;
  var MEDICATION = "Medication-Yes"
  var NO_MEDICATION = "Medication-No"
  var [showMedication, setShowMedication] = useState(false);
  var [showNonMedication, setShowNonMedication] = useState(false);
  var [medicationUuid, setMedicationUuid] = useState("");
  var [nonmedicationUuid,setNonmedicationUuid] = useState("")
  var [medicationDetails, setMedicationDetails] = useState([]);
  var [nonmedicationDetails, setNonmedicationDetails] = useState([]);
  var uuidList = [];
  var [allmedicationuuid, setAllmedicationuuid] = useState([]);

  medication_level_1.forEach(function (item, index) {
      if (item.display == MEDICATION) {
        if (medicationDetails.length == 0) {
          setMedicationUuid(item.uuid)
          setMedicationDetails(item.answers)
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
    if (btnvalue == MEDICATION) {
      setShowMedication(true);
      setShowNonMedication(false);
      medicationDetails.forEach(function (itemva, index) {
        uuidList.push(itemva.uuid)
        setAllmedicationuuid(uuidList);
        itemva.answers.forEach(function (itemvas, index) {
          uuidList.push(itemvas.uuid)
          setAllmedicationuuid(uuidList);
          itemvas.answers.forEach(function (itemvasl, index) {
            uuidList.push(itemvasl.uuid)
            setAllmedicationuuid(uuidList);
        });
        });
      });
    }
    else if (btnvalue == NO_MEDICATION) {
      setShowNonMedication(true);
      setShowMedication(false);
      props.onDelete(event,allmedicationuuid)
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
        {showMedication &&
          medicationDetails.map((item, index) => (
            <Medication_Level2_History
              answer={item}
              onChange={handleValueChange}
              key={item.uuid}
              uuidDrug={medicationUuid}
              onDelete={deleteChange}
            />
          ))
        }

      </div>
    )
  }

}