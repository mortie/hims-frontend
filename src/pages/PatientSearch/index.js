import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';




import { DataGrid } from "@material-ui/data-grid";
import CustomizedMenus from "./ActionButton";


import axios from "axios";
import styles from "./styles";
import "./styles.css";
import { ErrorSharp } from "@material-ui/icons";

const useStyles = makeStyles(styles);

function createData(
  identifier: any,
  name: any,
  phone: any,
  gender: any,
  age: any,
  address: any,
  lvd: any,
  action: any,
  id: any
) {
  return { identifier, name, phone, gender, age, address, lvd, action, id };
}

export default function PatientSearch(props) {
  var [searchDetails, setsearchDetails] = useState({
    phone: "",
    firstName: "",
    identifier: "",
    age: "",
    gender: "",
    lvd: "",
  });
  var [searchData, setsearchData] = useState([]);
  var [minage, setminage] = useState(0);
  var [maxage, setmaxage] = useState(5);
  var [resultAge, setresultAge] = useState(minage);
  var [loading, setLoading] = useState(false);
  var [errors, setErrors] = useState({ phoneData: true, nameData: true,identifierData:true });
  var [isDataPresent, setisDataPresent] = useState(false);
  var [phoneData, setphoneData] = useState(false);
  var [nameData, setnameData] = useState(false);
  var [apihit, setapihit] = useState(false);
  var [charErrorMsj, setcharErrorMsj] = useState("");
  var isEnter = "Enter";
  var [PhoneErrorMsj, setPhoneErrorMsj] = useState();
  var [NameErrorMsj, setNameErrorMsj] = useState();
  var [IdenErrorMsj, setIdenErrorMsj] = useState();


  const columns = [
    { field: "identifier", headerName: "Patiend ID", width: 120 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "phone", headerName: "Phone", width: 115 },
    {
      field: "gender",
      headerName: "Gender",
      type: "number",
      width: 100,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 100,
    },
    {
      field: "address",
      headerName: "Address",
      type: "string",
      width: 200,
      height: 300,
    },
    {
      field: "lvd",
      headerName: "Last Visited",
      type: "string",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      type: "string",
      width: 100,
      renderCell: (params) => (
        <strong>
          <CustomizedMenus patiendData={params} />
        </strong>
      ),
    },
  ];


  const handleChange = (event, newValue) => {
                    //     setsearchDetails({
                    //   ...searchDetails,
                    //   age: newValue,
                    // })
    //     setminage(Number(newValue) - 5)
    // setmaxage(Number(newValue) + 5)
    setresultAge(newValue)
  };

  const handleInputChange = (event) => {

    var handleValues = Number(event.target.value);
    setsearchDetails({
      ...searchDetails,
      age: handleValues === '' ? '' : handleValues,
    })    

  };

  const isEnteredPressed = (charLen,event, name, eventName) => {
    
    if ((event.key === isEnter && event.target.value.length > charLen) || (event.key === isEnter && name == "age")) {     
      if ((name != "phone") ||((name == "phone" ) && (event.target.value.length > 9))) {
        return true
      }
    }
    else if (event.key === isEnter && event.target.value.length <= charLen) {
      if (name == "firstName") {
        setErrors({nameData: !searchDetails.firstName ? false : true})
        if (searchDetails.firstName) {
          var nameLen = searchDetails.firstName.length;
        }
        if (nameLen && (nameLen <= charLen) && (nameLen > 0)) {
        setNameErrorMsj("Atleast 3 characters is required")
        }
        else if (errors.nameData) {
        setNameErrorMsj("Name is required")
        }
      }

      if (name == "phone") {
        setErrors({phoneData: !searchDetails.phone ? false : true})
        if (searchDetails.phone) {
        var phoneLen = searchDetails.phone.length;
        }
        if (phoneLen && (phoneLen <= charLen) && (phoneLen > 0)) {
        setPhoneErrorMsj("Atleast 10 characters is required")
        }
        else if (errors.phoneData) {
        setNameErrorMsj("Phone is required")
        }
      }
      if (name == "identifier") {
      setErrors({identifierData:!searchDetails.identifier?false:true})
      if (searchDetails.identifier) {
      var idenLen = searchDetails.identifier.length;
      }
      if (idenLen && (idenLen < charLen) && (idenLen > 0)) {
      setIdenErrorMsj("Atleast 3 characters is required")
      }

      else if (errors.identifierData) {
      setIdenErrorMsj("Identifier is required")
      }
      }    
    }
  }

  const isSearchClicked = (charLen, event, name, eventName) => {
      if (eventName =="clicked") {
      if ((searchDetails.phone && searchDetails.phone.length) > charLen ||
        (searchDetails.firstName && searchDetails.firstName.length > charLen) ||
        (searchDetails.identifier && searchDetails.identifier.length>charLen)) {
              return true;
      }
      else {
        if (Object.keys(name.searchDetails).length != 0) {
          Object.keys(name.searchDetails).forEach(function (previouskey) {
          if (previouskey == "firstName") {
        setErrors({nameData: !searchDetails.firstName ? false : true})
        if (searchDetails.firstName) {
          var nameLen = searchDetails.firstName.length;
        }
        if (nameLen && (nameLen <= charLen) && (nameLen > 0)) {
        setNameErrorMsj("Atleast 3 characters is required")
        }
        else if (errors.nameData) {
        setNameErrorMsj("Name is required")
        }
      }

      if (previouskey == "phone") {
        setErrors({phoneData: !searchDetails.phone ? false : true})
        if (searchDetails.phone) {
        var phoneLen = searchDetails.phone.length;
        }
        if (phoneLen && (phoneLen <= charLen) && (phoneLen > 0)) {
        setPhoneErrorMsj("Atleast 10 characters is required")
        }
        else if (errors.phoneData) {
        setPhoneErrorMsj("Phone is required")
        }
      }
      if (previouskey == "identifier") {
      setErrors({identifierData:!searchDetails.identifier?false:true})
      if (searchDetails.identifier) {
      var idenLen = searchDetails.identifier.length;
      }
      if (idenLen && (idenLen < charLen) && (idenLen > 0)) {
      setIdenErrorMsj("Atleast 3 characters is required")
      }

      else if (errors.identifierData) {
      setIdenErrorMsj("Identifier is required")
      }
      }
          });
    
          
        }
        
        return false
      }
    }
   }
  
  const isValueChanged = (charLen,event, name, eventName) => {
        if ((name == "gender" && eventName == "press") || (name == "lvd" && eventName == "press")) {
            if ((searchDetails.phone && searchDetails.phone.length) > charLen ||
        (searchDetails.firstName && searchDetails.firstName.length > charLen) ||
        (searchDetails.identifier && searchDetails.identifier.length>charLen)) {
              return true;
      }    
    }
    else {
      return false;
    }
  }

  var isValueEntered = (event, name, eventName) => {
    var charLen = 2;
    if (event.key === isEnter) {
          return isEnteredPressed(charLen,event,name,eventName)
    }
    if (eventName == "clicked") {
         return isSearchClicked(charLen, event, name, eventName) 
    }
    if (eventName == "press" && event.key != isEnter) {
        return isValueChanged(charLen,event,name,eventName)
    }
    
  }

  var multiFilter = (products, filters) => {
    return products.filter((product) => {
      return Object.entries(filters).every(([filterProperty, filterValues]) => {
        switch (Object.prototype.toString.call(product[filterProperty])) {
          case "[object Object]":
            return Object.entries(filterValues).every(
              ([extFilterProperty, extFilterValue]) => {
                return (
                  new Map(Object.entries(product[filterProperty])).get(
                    extFilterProperty
                  ) === extFilterValue
                );
              }
            );
          case "[object Array]":
            return product[filterProperty].some((productValue) => {
              return filterValues.includes(productValue);
            });
          default:
            if (filterProperty != "name") {
              console.log("compare this :", filterValues, " to ", product[filterProperty], "results :", filterValues.includes(product[filterProperty]))
              return filterValues.includes(product[filterProperty]);
            }
            else{
              var searchTokens = filterValues[0].split(" ");
              var searchString = product[filterProperty];
              var searchRegex = new RegExp(searchTokens.join('|'), 'g');
              var numOfMatches = searchString.match(searchRegex);
              console.log("compare this for Name :", filterValues, " to ", product[filterProperty], "results :", numOfMatches)
              if (numOfMatches.length > 0) {
                return true;
              }
              else {
                return false;
              }
            }
        }
      });
    });
  };

  var filters = {};

  function checkData(param,firstNameVal, phoneVal, identifierVal, ageVal,ageRange,lvd) {
      if (firstNameVal) {
        if (firstNameVal && ageVal) {
          param = firstNameVal + "&agerange="+ageRange+"&age=" + ageVal
        }
        else if (firstNameVal && lvd) {
          param = firstNameVal + "&lastvisitapprox="+lvd
        }
        else {
          param = firstNameVal;
        }
      }
      if (phoneVal) {
        if (phoneVal && ageVal) {
          param = phoneVal + "&agerange="+ageRange+"&age=" + ageVal
        }
        else if (phoneVal && lvd) {
          param = phoneVal + "&lastvisitapprox="+lvd
        }
        else {
          param = phoneVal;
        }
      }
      if (firstNameVal && phoneVal) {
        if (phoneVal && ageVal) {
          param = phoneVal + "&agerange="+ageRange+"&age=" + ageVal
        }
        else if (phoneVal && lvd) {
          param = phoneVal + "&lastvisitapprox="+lvd
        }
        else {
          param = phoneVal;
        }
      }
      if (identifierVal) {
        if (identifierVal && ageVal) {
          param = identifierVal + "&agerange="+ageRange+"&age=" + ageVal
        }
        else if (identifierVal && lvd) {
          param = identifierVal + "&lastvisitapprox="+lvd
        }
        else {
          param = identifierVal
        }
      }

    return param
  }

  const postSearchKey = () =>{
    
  }
  const searchOnKey = (event, name, eventName) => {

    setsearchDetails({
      ...searchDetails,
      [name]: event.target.value,
    });
    
    if (isValueEntered(event,name, eventName)) {

      setLoading(true);
      setapihit(false);


      if (searchDetails.firstName) {
      var firstName = searchDetails.firstName.toUpperCase();
      }
      let phone = searchDetails.phone;
      let identifier = searchDetails.identifier;
      let age = "";
      let lvd = "";
      var minageRange = "";
      var maxageRange = "";
      let ageRange = resultAge;
      var rangeToSend = [];
      let gender = "";
      if (name == "age") {
        age = event.target.value;
      }
      else if (searchDetails.age) {
        age = searchDetails.age;
      }
      if (name == "gender") {
      gender = event.target.value;
      }
      else if (searchDetails.gender) {
      gender = searchDetails.gender;
      }
      if (name == "lvd") {
      lvd = event.target.value;

      }
      else if(searchDetails.lvd) {
      lvd = searchDetails.lvd;
      }
      let searchDataAlready = searchData;

      let isDataAlready = false;
      let alreadystoredata = [];
      if (searchDataAlready.length > 0 && isDataPresent == true) {
        isDataAlready = true;
      }
      if (isDataAlready) {
        if (name == "age") {
          if (ageRange) {
            minageRange = Number(event.target.value) - Number(ageRange);
            maxageRange = Number(event.target.value) + Number(ageRange);
            for (let k = minageRange; k <= maxageRange; k++) {
                  rangeToSend.push(String(k));
            }
            filters["age"] = rangeToSend
          }
          else {
            filters["age"] = [String(event.target.value)];
          }

        }
        else if (searchDetails.age) {
          if (ageRange) {
            minageRange = Number(searchDetails.age) - Number(ageRange);
            maxageRange = Number(searchDetails.age) + Number(ageRange);
            for (let k = minageRange; k <= maxageRange; k++){
                  rangeToSend.push(String(k));
            }
            filters["age"] = rangeToSend
          }
          else {
            filters["age"] = [String(searchDetails.age)];
          }
        }
      if (name == "gender") {
        filters["gender"] = event.target.value;
      }
      else if (searchDetails.gender) {
        if (searchDetails.gender) {
          filters["gender"] = [searchDetails.gender.toUpperCase()];
        }
        }
        if (name == "lvd") {
        let lvdVal = event.target.value.split("-").reverse().join("-")
        filters["lvd"] = [lvdVal];
      }
        else if (searchDetails.lvd) {    
          let lvdVal = searchDetails.lvd.split("-").reverse().join("-")  
          filters["lvd"] = [lvdVal];
        
      }
      if (firstName) {
        filters["name"] = [firstName.toUpperCase()];
      }
      if (phone) {
        filters["phone"] = [phone];
        }
      if (identifier) {
        filters["identifier"] = [identifier];
        }
      let filterOutput = multiFilter(searchDataAlready, filters);
      if (filterOutput.length > 0) {
        alreadystoredata = filterOutput;
      }
      if (alreadystoredata.length > 0) {
        setsearchData(alreadystoredata);
        setisDataPresent(true);
        setLoading(false);
      }
      else
      {
        let param = firstName;
        var username = "admin";
        var password = "Admin123";
        param = checkData(param,firstName,phone,identifier,age,ageRange,lvd)
        if (firstName || phone || identifier) {
          setnameData(false);
          setphoneData(false);

          const headers = {
            Authorization: "Basic " + btoa(`${username}:${password}`),
          };
          const url = `https://ln3.hispindia.org/openmrs/ws/hisp/rest/patient_search?name=${param}`;
          axios
            .get(url, { headers: headers })
            .then((response) => {
              setapihit(true);
              var phoneNo = "";
              var searchdatanew = [];
              var visitdate = "";
              setsearchData([]);
              var storedata = [];
              for (let i = 0; i < response.data.length; i++) {
                var addressrarr = [];
                searchdatanew.push(response.data);
                let identifierid = searchdatanew[0][i]["identifier"];
                let nameval = searchdatanew[0][i]["name"].toUpperCase();
                let genval = searchdatanew[0][i]["gender"];
                let ageval = searchdatanew[0][i]["age"];
                if (searchdatanew[0][i]["address"]) {
                  let addr1 = searchdatanew[0][i]["address"]["Address1"];
                  let addr2 = searchdatanew[0][i]["address"]["Address2"];
                  let district = searchdatanew[0][i]["address"]["City Village"];
                  let country = searchdatanew[0][i]["address"]["Country"];
                  let pincode = searchdatanew[0][i]["address"]["Postal Code"];
                  let statecode =
                    searchdatanew[0][i]["address"]["State Province"];
                  // let addr = ho_no + " " + district + " - " + statecode + " " + country + " " + pincode
                  let addr = district + " - " + statecode;
                  addressrarr.push(addr);
                }
                if (searchdatanew[0][i]["person_attributes"]) {
                  phoneNo =
                    searchdatanew[0][i]["person_attributes"][
                      "Telephone Number"
                    ];
                }
                if (searchdatanew[0][i]["visit_date"] != undefined) {
                  visitdate = searchdatanew[0][i]["visit_date"];
                } else {
                  visitdate = "N-A";
                }
                let id = i;

                storedata.push(
                  createData(
                    identifierid,
                    nameval,
                    phoneNo,
                    genval,
                    ageval,
                    addressrarr[0],
                    visitdate,
                    "",
                    id
                  )
                );
              }
       try {
              if (storedata.length > 0) {
                let filterOutput = [];
                setsearchData([]);
                if (age) {
                  if (ageRange) {
                    minageRange = Number(searchDetails.age) - Number(ageRange);
                    maxageRange = Number(searchDetails.age) + Number(ageRange);
                    for (let i = minageRange; i <= maxageRange; i++) {
                      rangeToSend.push(String(i));
                    }
                    filters["age"] = rangeToSend
                  }
                  else {
                    filters["age"] = [age];
                  }
                }
                if (gender) {
                  filters["gender"] = [gender.toUpperCase()];
                }
                if (firstName) {
                  filters["name"] = [firstName];
                }
                if (phone) {
                  filters["phone"] = [phone];
                }
                if (lvd) {
                let lvdVal = lvd.split("-").reverse().join("-")
                filters["lvd"] = [lvdVal];
                }         
                filterOutput = multiFilter(storedata, filters);

                if (filterOutput.length > 0) {
                  storedata = filterOutput;
                  setsearchData(storedata);
                } else {
                  setsearchData(storedata);
                }
                setisDataPresent(true);
                setLoading(false);
                setapihit(false);
              } else {
                setisDataPresent(false);
              }
                setLoading(false);
                                }
                catch (e) {
                    setLoading(false);
                }

            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          setnameData(true);
          setphoneData(true);
          setLoading(false);
        }
      }
      }
      else
      {
      let param = firstName;
      var username = "admin";
      var password = "Admin123";
      param = checkData(param,firstName,phone,identifier,age,ageRange,lvd)
      if (firstName || phone || identifier) {
        setnameData(false);
        setphoneData(false);

        const headers = {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        };
        const url = `https://ln3.hispindia.org/openmrs/ws/hisp/rest/patient_search?name=${param}`;
        axios
          .get(url, { headers: headers })
          .then((response) => {
            setapihit(true);
            var phoneNo = "";
            var searchdatanew = [];
            var visitdate = "";
            setsearchData([]);
            searchdatanew = searchData;
            var storedata = [];

            for (let i = 0; i < response.data.length; i++) {
              var addressrarr = [];
              searchdatanew.push(response.data);
              let identifierid = searchdatanew[0][i]["identifier"];
              let nameval = searchdatanew[0][i]["name"].toUpperCase();
              let genval = searchdatanew[0][i]["gender"];
              let ageval = searchdatanew[0][i]["age"];
              if (searchdatanew[0][i]["address"]) {
                let addr1 = searchdatanew[0][i]["address"]["Address1"];
                let addr2 = searchdatanew[0][i]["address"]["Address2"];
                let district = searchdatanew[0][i]["address"]["City Village"];
                let country = searchdatanew[0][i]["address"]["Country"];
                let pincode = searchdatanew[0][i]["address"]["Postal Code"];
                let statecode =
                  searchdatanew[0][i]["address"]["State Province"];
                // let addr = ho_no + " " + district + " - " + statecode + " " + country + " " + pincode
                let addr = district + " - " + statecode;
                addressrarr.push(addr);
              }
              if (searchdatanew[0][i]["person_attributes"]) {
                phoneNo =
                  searchdatanew[0][i]["person_attributes"]["Telephone Number"];
              }
              if (searchdatanew[0][i]["visit_date"] != undefined) {
                visitdate = searchdatanew[0][i]["visit_date"];
              } else {
                visitdate = "N-A";
              }
              let id = i;

              storedata.push(
                createData(
                  identifierid,
                  nameval,
                  phoneNo,
                  genval,
                  ageval,
                  addressrarr[0],
                  visitdate,
                  "",
                  id
                )
              );
            }
          try {
            if (storedata.length > 0) {
              let filterOutput = [];
              setsearchData([]);
              if (age) {
                if (ageRange) {
                    minageRange = Number(searchDetails.age) - Number(ageRange);
                    maxageRange = Number(searchDetails.age) + Number(ageRange);
                    for (let i = minageRange; i <= maxageRange; i++) {
                      rangeToSend.push(String(i));
                    }
                    filters["age"] = rangeToSend
                  }
                  else {
                    filters["age"] = [age];
                  }
              }
              if (gender) {
                filters["gender"] = [gender.toUpperCase()];
              }
              if (firstName) {
                filters["name"] = [firstName];
              }
              if (phone) {
                filters["phone"] = [phone];
              }
                    if (lvd) {
                let lvdVal = lvd.split("-").reverse().join("-")
                filters["lvd"] = [lvdVal];
                }
                filterOutput = multiFilter(storedata, filters);

              if (filterOutput.length > 0) {
                storedata = filterOutput;
                setsearchData(storedata);
              } else {
                setsearchData(storedata);
              }
              setisDataPresent(true);
            } else {
              setisDataPresent(false);
            }
                        setLoading(false);
            setapihit(false);
              }
          catch (e) {
            setLoading(false);
            setapihit(true);
              }

            
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setnameData(true);
        setphoneData(true);
        setLoading(false);
      }
    }
     } 
  }


  function valuetext(value) {
  return `${value}°C`;
}

  const resetOnKey = (event, name, eventName) => {
    setsearchDetails({
      ...searchDetails,
      [name]: "",
    });
    setsearchData([])
    setisDataPresent(false);
    document.getElementById("searchForm").reset();
  }
  const classes = useStyles();
  const searchdat = searchData;
  var fName = searchDetails.firstName;
  
  if (isDataPresent) {
    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <form className={classes.form} noValidate id="searchForm">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  error={(!errors.phoneData && !errors.nameData && !errors.identifierData)
                  }
                  helperText={
                    (!errors.phoneData &&
                    !errors.nameData && !errors.identifierData &&
                      PhoneErrorMsj)
                    ||
                    (errors.phoneData && PhoneErrorMsj)
                  }
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  onKeyUp={(e)=>searchOnKey(e,"phone","press")}
                  value={classes.phone}

                  className="phoneID"
                />
              </Grid>
              <Grid item sm={3}>
                <TextField
                  error={(!errors.phoneData && !errors.nameData && !errors.identifierData)}
                  helperText={
                    (!errors.phoneData && !errors.nameData && !errors.identifierData && 
                      NameErrorMsj) ||
                    (errors.nameData && 
                      NameErrorMsj)
                  }
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  autoFocus
                  onKeyUp={(e)=>searchOnKey(e,"firstName","press")}
                  value={classes.firstName}
                  className="firstName"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  error={!errors.phoneData && !errors.nameData && !errors.identifierData}
                  helperText={
                    (!errors.phoneData && !errors.nameData && !errors.identifierData &&
                      IdenErrorMsj) ||
                    (errors.identifierData && IdenErrorMsj)
                  }
                  variant="outlined"
                  fullWidth
                  id="identifier"
                  label="Identifier"
                  name="identifier"
                  autoComplete="lname"
                  onKeyUp={(e)=>searchOnKey(e,"identifier","press")}
                  value={classes.identifier}
                  className="identifier"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="date"
                  label="Last visited"
                  type="date"
                  name="lvd"
                  defaultValue=""
                  className={classes.textField}
                  maxDate={new Date()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e)=>searchOnKey(e,"lvd","press")}

                />
              </Grid>
            <Grid item >

            <Typography id="input-slider" variant="subtitle1" display="block" gutterBottom>
            Age
            </Typography>
              </Grid>
              <Grid item xs={3}>

                <div className={classes.rootage}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Input
                      className={classes.input}
                      margin="dense"
                      onKeyUp={(e)=>searchOnKey(e,"age","press")}
                      type="number"
                      />
                    </Grid>
                    &nbsp;&nbsp;
                <Typography id="input-slider" variant="body2" display="block" gutterBottom>
                Range  &nbsp;&nbsp;
                </Typography>
                <Grid item xs>
                <Slider
                value={resultAge}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                min={minage}
                max={maxage}
                step="1"
                />
                </Grid>
                <Grid item>
                <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
                {resultAge}
                </Box>
                </Grid>
              </Grid>
            </div>
            </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  display="block"
                  gutterBottom
                  className="genderLabel"
                >
                  Gender &nbsp;&nbsp;
                </Typography>
                <FormControl>
                  <RadioGroup
                    className="gendergroup"
                    value={searchDetails.gender}
                  onChange={(e)=>searchOnKey(e,"gender","press")}

                  >
                    <FormControlLabel
                      control={<Radio />}
                      label="Female"
                      value="F"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Male"
                      value="M"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Other"
                      value="O"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                className="searchbtn"
                size="small"
                onClick={(e) => searchOnKey(e,{searchDetails},"clicked")}
              >
                Search
              </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                size="small"
                className="searchbtn"
                onClick={(e) => resetOnKey(e,{searchDetails},"clicked")}
              >
                Reset
              </Button>
            </Grid>
          </form>
          <br></br>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        {apihit && (
          <Typography variant="overline" display="block" gutterBottom>
            No Results Found
          </Typography>
        )}
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rowHeight={40}
            wrap="wrap"
            rows={searchdat}
            columns={columns}
            pageSize={10}
            density="standard"
          />
        </div>
      </Container>
    );
  } 
  else 
  {
    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <form className={classes.form} noValidate id="searchForm">
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  error={(!errors.phoneData && !errors.nameData && !errors.identifierData)
                  }
                  helperText={
                    (!errors.phoneData &&
                    !errors.nameData && !errors.identifierData &&
                      PhoneErrorMsj)
                    ||
                    (errors.phoneData && PhoneErrorMsj)
                  }
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  onKeyUp={(e)=>searchOnKey(e,"phone","press")}
                  value={classes.phone}
                  type = "number"
                  className="phoneID"
                />
              </Grid>
              <Grid item sm={3}>
                <TextField
                  error={(!errors.phoneData && !errors.nameData && !errors.identifierData)}
                  helperText={
                    (!errors.phoneData && !errors.nameData && !errors.identifierData && 
                      NameErrorMsj) ||
                    (errors.nameData && 
                      NameErrorMsj)
                  }
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  id="firstName"
                  label="Name"
                  autoFocus
                  onKeyUp={(e)=>searchOnKey(e,"firstName","press")}
                  className="firstName"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  error={!errors.phoneData && !errors.nameData && !errors.identifierData}
                  helperText={
                    (!errors.phoneData && !errors.nameData && !errors.identifierData &&
                      IdenErrorMsj) ||
                    (errors.identifierData && IdenErrorMsj)
                  }
                  variant="outlined"
                  fullWidth
                  id="identifier"
                  label="Identifier"
                  name="identifier"
                  autoComplete="lname"
                  onKeyUp={(e)=>searchOnKey(e,"identifier","press")}
                  value={classes.identifier}
                  className="identifier"
                />
              </Grid>
                <Grid item xs={3}>
                <TextField
                  id="date"
                  label="Last visited"
                  type="date"
                  name="lvd"
                  defaultValue=""
                  className={classes.textField}
                  maxDate={new Date()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e)=>searchOnKey(e,"lvd","press")}

                />
              </Grid>

            <Grid item >

            <Typography id="input-slider" variant="subtitle1" display="block" gutterBottom>
            Age
            </Typography>
              </Grid>             
            <Grid item xs={3}>
            <div className={classes.rootage}>
            <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Input
              className={classes.input}
              margin="dense"
              onKeyUp={(e)=>searchOnKey(e,"age","press")}
              type="number"
              />
            </Grid>
            &nbsp;&nbsp;
          <Typography id="input-slider" variant="body2" display="block" gutterBottom>
          Range  &nbsp;&nbsp;
          </Typography>
          <Grid item xs>
            <Slider
            value={resultAge}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            min={minage}
            max={maxage}
            step="1"
            />
          </Grid>
          <Grid item>
          <Box component="div" display="inline" p={1} m={1} bgcolor="background.paper">
              {resultAge}
            </Box>
              </Grid>
            </Grid>
          </div>
        </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  display="block"
                  gutterBottom
                  className="genderLabel"
                >
                  Gender &nbsp;&nbsp;
                </Typography>
                <FormControl>
                  <RadioGroup
                    className="gendergroup"
                    value={searchDetails.gender}
                  onChange={(e)=>searchOnKey(e,"gender","press")}

                  >
                    <FormControlLabel
                      control={<Radio />}
                      label="Female"
                      value="F"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Male"
                      value="M"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Other"
                      value="O"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                className="searchbtn"
                size="small"
                onClick={(e) => searchOnKey(e,{searchDetails},"clicked")}
              >
                Search
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                size="small"
                className="searchbtn"
                onClick={(e) => resetOnKey(e,{searchDetails},"clicked")}
              >
                Reset
              </Button>
            </Grid>
          </form>
          <br></br>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        {apihit && (
          <Typography variant="overline" display="block" gutterBottom>
            No Results Found
          </Typography>
        )}
      </Container>
    );
  }
}
