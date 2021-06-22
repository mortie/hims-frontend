import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DrugHistory from './drug_allergies'

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

export default function AllergyHistory(props) {

  const classes = useStyles();
  var data = props.answer;
  var dataType = props.answer.datatype.display
  var allergy_level_1 = data.answers;
  var uuid = data.uuid;
  var DRUG_ALLERGY = "Drug Allergy"
  var NON_DRUG_ALLERGY = "Non Drug Allergy"
  var NO_ALLERGY = "No Known Allergies"
  var [showDrug, setShowDrug] = useState(false);
  var [showNonDrug, setShowNonDrug] = useState(false);
  var [successcheck, setSuccesscheck] = useState(false);
  var [drugAllergy, setDrugAllergy] = useState([]);
  var [nondrugAllergy, setNondrugAllergy] = useState([]);
  var [concetVal, setConcetVal] = useState({"concept":"","value":""});

  allergy_level_1.forEach(function (item, index) {
    if (item.display == DRUG_ALLERGY) {
      if (drugAllergy.length == 0) {
        setDrugAllergy(item.answers)
      }
    }
    else if (item.display == NON_DRUG_ALLERGY) {
      if (nondrugAllergy.length == 0) {
        setNondrugAllergy(item.answers)
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
    if (btnvalue == DRUG_ALLERGY) {
      setShowDrug(true);
      setShowNonDrug(false);
    }
    else if (btnvalue == NON_DRUG_ALLERGY) {
      setShowNonDrug(true);
      setShowDrug(false);
    }
    else if (btnvalue == NO_ALLERGY) {
      setShowNonDrug(false);
      setShowDrug(false);
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
        <FormControl component="fieldset" className="medication">
          <RadioGroup aria-label="gender" name="gender1" className="medi" >
          {data.answers.map((smoker, index) => (
            <FormControlLabel
              value={smoker.display}
              control={<Radio id={smoker.uuid} onChange={handleChange} />}
              label={smoker.display}
              className="yesClass"
              key={smoker.uuid}
            />
          ))}
          </RadioGroup>
        </FormControl>
        <br></br>
          <br></br>
          {showDrug &&
              drugAllergy.map((item, index) => (
                    <DrugHistory
                  answer={item}
                  onChange={handleValueChange}
                  key={item.uuid}
                    />
              ))
          }

          {showNonDrug &&
              nondrugAllergy.map((item, index) => (
                    <DrugHistory
                  answer={item}
                  onChange={handleValueChange}
                  key={item.uuid}
                    />
              ))
          }

        {successcheck &&
        <Alert severity="success">Saved Successfully!</Alert>
        }
      </div>
      );
      }
}