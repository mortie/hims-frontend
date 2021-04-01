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
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

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
  var [firstNameVal, setfirstNameVal] = useState("");
  var [firstName, setfirstName] = useState("");
  var [phone, setphone] = useState("");
  var [identifier, setidentifier] = useState("");
  var [age, setage] = useState("");
  var [lvd, setlvd] = useState("");
  var [lvdapprox, setlvdapprox] = useState("");
  var [genderValue, setgenderValue] = useState("");
  var [resultAge, setresultAge] = useState(0);


  var [minage, setminage] = useState(0);
  var [maxage, setmaxage] = useState(5);
  var [loading, setLoading] = useState(false);

  var [errors, setErrors] = useState({ phoneData: true, nameData: true, identifierData: true });
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
      width: 80,
    },
    {
      field: "address",
      headerName: "Address",
      type: "string",
      width: 150,
      height: 300,
    },
    {
      field: "lvd",
      headerName: "Last Visited",
      type: "string",
      width: 120,
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

  const isEnteredPressed = (charLen, event, name, eventName) => {
    
    if ((event.key === isEnter && event.target.value.length > charLen) ||
      (event.key === isEnter && name == "age")) {
      if ((name != "phone") || ((name == "phone") && (event.target.value.length > 9))) {
        return true
      }
    }
    else if (event.key === isEnter && event.target.value.length <= charLen) {
      if (name == "firstName") {
        setErrors({ nameData: !firstName ? false : true })
        if (firstName) {
          var nameLen = firstName.length;
        }
        if (nameLen && (nameLen <= charLen) && (nameLen > 0)) {
          setNameErrorMsj("Atleast 3 characters is required")
        }
        else if (errors.nameData) {
          setNameErrorMsj("Name is required")
        }
      }

      if (name == "phone") {
        setErrors({ phoneData: !phone ? false : true })
        if (phone) {
          var phoneLen = phone.length;
        }
        if (phoneLen && (phoneLen <= charLen) && (phoneLen > 0)) {
          setPhoneErrorMsj("Atleast 10 characters is required")
        }
        else if (errors.phoneData) {
          setPhoneErrorMsj("Phone is required")
        }
      }
      if (name == "identifier") {
        setErrors({ identifierData: !identifier ? false : true })
        if (identifier) {
          var idenLen = identifier.length;
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
    if (eventName == "clicked") {
      if ((phone && phone.length) > charLen ||
        (firstName && firstName.length > charLen) ||
        (identifier && identifier.length > charLen)) {
        return true;
      }
      else {
        var nameLen = ""
        var phoneLen = ""
        var idenLen = ""
        setErrors({ nameData: !firstName ? false : true })
        setErrors({ phoneData: !phone ? false : true })
        setErrors({ identifierData: !identifier ? false : true })
          if (firstName) {
          nameLen = firstName.length;
          }
          if (nameLen && (nameLen <= charLen) && (nameLen > 0)) {
          setNameErrorMsj("Atleast 3 characters is required")
          }
          else if (errors.nameData) {
          setNameErrorMsj("Name is required")
          }
            

          if (phone) {
            phoneLen = phone.length;
          }
          if (phoneLen && (phoneLen <= charLen) && (phoneLen > 0)) {
            setPhoneErrorMsj("Atleast 10 characters is required")
          }
          else if (errors.phoneData) {
            setPhoneErrorMsj("Phone is required")
          }
        
        
          if (identifier) {
            idenLen = identifier.length;
          }
          if (idenLen && (idenLen < charLen) && (idenLen > 0)) {
            setIdenErrorMsj("Atleast 3 characters is required")
          }
          else if (errors.identifierData) {
            setIdenErrorMsj("Identifier is required")
          }   

        return false
      }
    }
  }
  
  const isValueChanged = (charLen, event, name, eventName) => {
    if ((name == "gender" && eventName == "press") ||
      (name == "lvd" && eventName == "press")
    )
    {
      if ((phone && phone.length) > charLen ||
        (firstName && firstName.length > charLen) ||
        (identifier && identifier.length > charLen))
      {
        return true;
      }
      else {
        return false;
      }
    }
    else if (name == "lastvisit" && eventName == "press")
    {
      if (((phone && phone.length) > charLen ||
        (firstName && firstName.length > charLen) ||
        (identifier && identifier.length > charLen))
      )
      {
        return true;
      }
      else {
        return false;
      }
    }
    else if (name == "range" && eventName == "press")
    {
      if ((age != "") && ((phone && phone.length) > charLen ||
        (firstName && firstName.length > charLen) ||
        (identifier && identifier.length > charLen))
      )
      {
        return true;
      }
      else {
        return false;
      }
    }        
    else {
      return false;
    }
  }

  var isValueEntered = (event, name, eventName) => {
    var charLen = 2;
    if (event.key === isEnter) {
      return isEnteredPressed(charLen, event, name, eventName)
    }
    if (eventName == "clicked") {
      return isSearchClicked(charLen, event, name, eventName)
    }
    if (eventName == "press" && event.key != isEnter) {
      return isValueChanged(charLen, event, name, eventName)
    }
    
  }

  var multiFilter = (products, filters,isExactLvd,isApproxLvd) => {
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
            if (filterProperty == "lvd") {
              if (filterValues.length > 0) {
              var searchTokens = filterValues[0].split(" ");
              var searchString = product[filterProperty];
              var searchRegex = new RegExp(searchTokens.join('|'), 'g');
              var numOfMatches = searchString.match(searchRegex);
              if (numOfMatches != null) {
                return true;
              }
              else if(isApproxLvd == true){
                var searchvals = searchTokens[0].split("-");
                var newdatestring = searchvals[1] + '-' + searchvals[0] + '-' + searchvals[2];
                var comparesearchvals = searchString.split("-");
                var comparevalues = comparesearchvals[1] + '-' + comparesearchvals[0] + '-' + comparesearchvals[2];
                if (new Date(newdatestring) < new Date(comparevalues)) {
                  return true;
                }
                else {
                  return false;
                }
              }
              }
            }
            else if (filterProperty == "identifier") {
              var searchTokens = filterValues[0].split(" ");
              var searchString = product[filterProperty];
              var searchRegex = new RegExp(searchTokens.join('|'), 'g');
              var numOfMatches = searchString.match(searchRegex);
              if (numOfMatches != null) {
                return true;
              }
              else {
                return false;
              }
            }
            else if (filterProperty != "name") {
              return filterValues.includes(product[filterProperty]);
            }
            else {
              var searchTokens = filterValues[0].split(" ");
              var searchString = product[filterProperty];
              var searchRegex = new RegExp(searchTokens.join('|'), 'g');
              var numOfMatches = searchString.match(searchRegex);
              if (numOfMatches != null) {
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

  function lvdApproxCal(lvdValueApprox,paramLvd) {
    let date = new Date();
    let month = "";

    if (lvdValueApprox == "LM") {
      month = new Date().getMonth();
      let formatprevOneMonth = new Date(date.setMonth(month - 1));
      paramLvd = "&lastvisitapprox=" + new Date(formatprevOneMonth).toISOString().split('T')[0].split("-").reverse().join("-")
    }
    else if (lvdValueApprox == "L6M") {
      month = new Date().getMonth();
      let formatprev6Month = new Date(date.setMonth(month - 6));
      paramLvd = "&lastvisitapprox=" + new Date(formatprev6Month).toISOString().split('T')[0].split("-").reverse().join("-")
    }
    else if (lvdValueApprox == "LY") {
      month = new Date().getMonth();
      let formatprev6Month = new Date(date.setMonth(month - 12));
      paramLvd = "&lastvisitapprox=" + new Date(formatprev6Month).toISOString().split('T')[0].split("-").reverse().join("-")
    }
    return paramLvd;
  }

  var filters = {};
  function checkData(param, firstNameVal, phoneVal, identifierVal, ageVal, ageRange, lvd, lvdValueApprox) {
    var paramLvd = "";
    paramLvd = lvdApproxCal(lvdValueApprox,paramLvd)
    if (firstNameVal) {
      if (firstNameVal && ageVal) {
        param = firstNameVal + "&agerange=" + ageRange + "&age=" + ageVal
      }
      else if (firstNameVal && lvdValueApprox) {
        param = firstNameVal + paramLvd
      }
      else if (firstNameVal && lvd) {
        param = firstNameVal + "&lastvisitexact=" + lvd
      }
      else {
        param = firstNameVal;
      }
    }
    if (phoneVal) {
      if (phoneVal && ageVal) {
        param = phoneVal + "&agerange=" + ageRange + "&age=" + ageVal
      }
      else if (phoneVal && lvdValueApprox) {
        param = phoneVal + + paramLvd
      }
      else if (phoneVal && lvd) {
        param = phoneVal + "&lastvisitapprox=" + lvd
      }
      else {
        param = phoneVal;
      }
    }
    if (firstNameVal && phoneVal) {
      if (phoneVal && ageVal) {
        param = phoneVal + "&agerange=" + ageRange + "&age=" + ageVal
      }
      else if (phoneVal && lvdValueApprox) {
        param = phoneVal + paramLvd
      }
      else if (phoneVal && lvd) {
        param = phoneVal + "&lastvisitapprox=" + lvd
      }
      else {
        param = phoneVal;
      }
    }
    if (identifierVal) {
      if (identifierVal && ageVal) {
        param = identifierVal + "&agerange=" + ageRange + "&age=" + ageVal
      }
      else if (identifierVal && lvdValueApprox) {
        param = identifierVal + paramLvd
      }
      else if (identifierVal && lvd) {
        param = identifierVal + "&lastvisitapprox=" + lvd
      }
      else {
        param = identifierVal
      }
    }

    return param
  }

  const searchOnKey = (event, name, eventName) => {

    
    var searchValue = event.target.value;

    if (name == "firstName") {
      setfirstName(searchValue)
    }
    if (name == "phone") {
      setphone(searchValue)
    }
    if (name == "identifier") {
      setidentifier(searchValue)
    }
    if (name == "age") {
      setage(searchValue)
    }
    if (name == "lvd") {
      setlvd(searchValue)
    }
    if (name == "gender") {
        setgenderValue(searchValue)
    }
    if (name == "range") {
      setresultAge(searchValue)
    }
    if (name == "lastvisit") {
      setlvdapprox(searchValue)
    }
  
    let ageValue = "";
    let lvdValue = "";
    var minageRange = "";
    var maxageRange = "";
    let ageRange = resultAge;
    var rangeToSend = [];
    var lvdValueApprox = "";
    var lvdParams = "";
    var paramLvd = "";
    let lvdVal = "";
    let isExactLvd = false;
    let isApproxLvd = false;

    if(name == "lastvisit") {
      lvdValueApprox = searchValue;
    }
    else if (lvdapprox) {
      lvdValueApprox = lvdapprox;
    }
    if (name == "range") {
      ageRange = searchValue;
    }
    else if (resultAge) {
      ageRange = resultAge;
    }
    if (firstName) {
    var firstNameValue = firstName.toUpperCase();
    }
    let phoneValue = phone;
    let identifierValue = identifier;


    if (isValueEntered(event, name, eventName)) {
      setIdenErrorMsj("");
      setNameErrorMsj("");
      setPhoneErrorMsj("");
      setErrors({ phoneData: true, nameData: true, identifierData: true });
      setLoading(true);
      setapihit(false);

      if (name == "age") {
        ageValue = event.target.value;
      }
      else if (age) {
        ageValue = age;
      }
      if (genderValue) {
          genderValue = genderValue;
      }
      if(name == "gender") {
        genderValue = event.target.value
      }

      if (name == "lvd") {
        lvdValue = event.target.value;
        lvdValue = event.target.value.split("-").reverse().join("-")
      }
      else if (lvd) {
        lvdValue = lvd;
        lvdValue = lvdValue.split("-").reverse().join("-")
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
        else if (age) {
          if (ageRange) {
            minageRange = Number(age) - Number(ageRange);
            maxageRange = Number(age) + Number(ageRange);
            for (let k = minageRange; k <= maxageRange; k++) {
              rangeToSend.push(String(k));
            }
            filters["age"] = rangeToSend
          }
          else {
            filters["age"] = [String(age)];
          }
        }
        if (name == "gender") {
          filters["gender"] = [event.target.value.toUpperCase()];
        }
        if (name == "lvd") {
          lvdVal = event.target.value.split("-").reverse().join("-")
          filters["lvd"] = [lvdVal];
          isExactLvd = true;
        }
        else if (lvd) {
          filters["lvd"] = [lvdValue];
          isExactLvd = true;
        }
        if (name == "lastvisit") {
          if (!lvd) {
            var paramLvdval = lvdApproxCal(lvdValueApprox, paramLvd)
            paramLvdval = paramLvdval.split("=")[1]
            filters["lvd"] = [paramLvdval];
            isApproxLvd = true;
          }
        }
        else if (lvdapprox) {
          if (!lvdVal) {
            var paramLvdval = lvdApproxCal(lvdValueApprox, paramLvd)
            paramLvdval = paramLvdval.split("=")[1]
            filters["lvd"] = [paramLvdval];
            isApproxLvd = true;
          }
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
        let filterOutput = multiFilter(searchDataAlready, filters,isExactLvd,isApproxLvd);
        if (filterOutput.length > 0) {
          alreadystoredata = filterOutput;
        }
        if (alreadystoredata.length > 0) {
          setsearchData(alreadystoredata);
          setisDataPresent(true);
          setLoading(false);
        }
        else {
          let param = firstNameValue;
          var username = "bhavana";
          var password = "Test1234";
          param = checkData(param, firstNameValue, phoneValue, identifierValue, ageValue, ageRange, lvdValue,lvdValueApprox)
          if (firstNameValue || phoneValue || identifierValue) {
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
                        minageRange = Number(age) - Number(ageRange);
                        maxageRange = Number(age) + Number(ageRange);
                        for (let i = minageRange; i <= maxageRange; i++) {
                          rangeToSend.push(String(i));
                        }
                        filters["age"] = rangeToSend
                      }
                      else {
                        filters["age"] = [ageValue];
                      }
                    }
                    if (genderValue) {
                      filters["gender"] = [genderValue.toUpperCase()];
                    }
                    if(name == "gender") {
                      filters["gender"] = [event.target.value.toUpperCase()];
                    }
                    if (firstNameValue) {
                      filters["name"] = [firstNameValue];
                    }
                    if (phoneValue) {
                      filters["phone"] = [phoneValue];
                    }
                    if (lvdValue) {
                      filters["lvd"] = [lvdValue];
                    }
                    filterOutput = multiFilter(storedata, filters,isExactLvd,isApproxLvd);

                    if (filterOutput.length > 0) {
                      storedata = filterOutput;
                      setsearchData(storedata);
                      setLoading(false);
                      setapihit(false);
                      setisDataPresent(true);
                    } else {
                      // setsearchData(storedata);
                      setsearchData([]);
                      setLoading(false);
                      setapihit(true);
                      setisDataPresent(false);
                    }
                  } else {
                    setisDataPresent(false);
                    setLoading(false);
                    setapihit(true);
                  }

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
      else {
        let param = firstNameValue;
        var username = "bhavana";
        var password = "Test1234";
        param = checkData(param, firstNameValue, phoneValue, identifierValue, ageValue, ageRange, lvdValue,lvdValueApprox)
        if (firstNameValue || phoneValue || identifierValue) {
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
                  if (ageValue) {
                    if (ageRange) {
                      minageRange = Number(age) - Number(ageRange);
                      maxageRange = Number(age) + Number(ageRange);
                      for (let i = minageRange; i <= maxageRange; i++) {
                        rangeToSend.push(String(i));
                      }
                      filters["age"] = rangeToSend
                    }
                    else {
                      filters["age"] = [ageValue];
                    }
                  }
                  if (genderValue) {
                    filters["gender"] = [genderValue.toUpperCase()];
                  }
                  if(name == "gender") {
                      filters["gender"] = [event.target.value.toUpperCase()];
                  }
                  if (firstNameValue) {
                    filters["name"] = [firstNameValue];
                  }
                  if (phoneValue) {
                    filters["phone"] = [phoneValue];
                  }
                  if (lvdValue) {
                    filters["lvd"] = [lvdValue];
                  }
                  filterOutput = multiFilter(storedata, filters,isExactLvd,isApproxLvd);

                  if (filterOutput.length > 0) {
                    storedata = filterOutput;
                    setsearchData(storedata);
                    setLoading(false);
                    setapihit(false);
                    setisDataPresent(true);
                  } else {
                    // setsearchData(storedata);
                    setsearchData([]);
                    setLoading(false);
                    setapihit(true);
                    setisDataPresent(false);
                  }
                } else {
                  setisDataPresent(false);
                  setLoading(false);
                  setapihit(true);
                }

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
  setlvdapprox("");
  setgenderValue("");
  setfirstName("");
  setphone("");
  setage("");
  setlvd("");
  setresultAge("");
  setidentifier("");
  setsearchData([]);
  setisDataPresent(false);
  setIdenErrorMsj("");
  setNameErrorMsj("");
  setPhoneErrorMsj("");
  setLoading(false);
  setErrors({ phoneData: true, nameData: true, identifierData: true });
  document.getElementById("searchForm").reset();  
}

function outputScreen(classes, searchdat,genderValue) {
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
                  onKeyUp={(e) => searchOnKey(e, "phone", "press")}
                  value={classes.phone}
                  type="number"
                  className="phoneID"
                  onInput = {(e) =>{
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  }}
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
                  onKeyUp={(e) => searchOnKey(e, "firstName", "press")}
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
                  onKeyUp={(e) => searchOnKey(e, "identifier", "press")}
                  value={classes.identifier}
                  className="identifier"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="date"
                  label="Last day of visit"
                  type="date"
                  name="lvd"
                  defaultValue=""
                  id="lvd"
                  maxDate={new Date()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => searchOnKey(e, "lvd", "press")}

                />                
            </Grid>
            <br></br>
              <Grid item xs={3} className="lvdClass">
                <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="uncontrolled-native" className="formslvd">Last visit</InputLabel>
                      <NativeSelect
                        defaultValue={resultAge}
                        inputProps={{
                        name: 'name',
                        id: 'uncontrolled-native',
                        }}
                    onChange={(e) => searchOnKey(e, "lastvisit", "press")}
                    className="formslvdss"
                  >
                    <option value={"C"}>Select</option>
                        <option value={"LM"}>Last month</option>
                        <option value={"L6M"}>Last 6 months</option>
                        <option value={"LY"}>Last year</option>
                      </NativeSelect>
                </FormControl>
                
              </Grid>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Grid item xs={2}>

                  <Grid container spacing={2} alignItems="center">
                      <Grid item className="AgeClass">

                      <TextField

                      id="standard-number"
                      label="Age"
                      type="number"
                      onKeyUp={(e) => searchOnKey(e, "age", "press")}
                      InputLabelProps={{
                      shrink: true,
                      }}
                      />

                    </Grid>
                    <FormControl >
                      <InputLabel htmlFor="uncontrolled-native">Range</InputLabel>
                      <NativeSelect
                        defaultValue={resultAge}
                        inputProps={{
                        name: 'name',
                        id: 'uncontrolled-native',
                        }}
                      onChange={(e) => searchOnKey(e, "range", "press")}
                        >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </NativeSelect>
                    </FormControl>
                    </Grid>
                
              </Grid>
         
                <Grid item xs={5} className="genderID">
                <InputLabel htmlFor="uncontrolled-native" className="genderClass">Gender</InputLabel>
                <FormControl>
                  <RadioGroup
                    className="gendergroup"
                    value={genderValue}
                    onChange={(e) => searchOnKey(e, "gender", "press")}

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
                onClick={(e) => searchOnKey(e, { searchDetails }, "clicked")}
              >
                Search
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                size="small"
                className="searchbtn"
                onClick={(e) => resetOnKey(e, { searchDetails }, "clicked")}
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

function inputScreen(classes, searchdat,genderValue) {
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
                  onKeyUp={(e) => searchOnKey(e, "phone", "press")}
                  value={classes.phone}
                  type="number"
                  className="phoneID"
                  onInput = {(e) =>{
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                  }}
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
                  onKeyUp={(e) => searchOnKey(e, "firstName", "press")}
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
                  onKeyUp={(e) => searchOnKey(e, "identifier", "press")}
                  value={classes.identifier}
                  className="identifier"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="date"
                  label="Last day of visit"
                  type="date"
                  name="lvd"
                  defaultValue=""
                  id="lvd"
                  maxDate={new Date()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => searchOnKey(e, "lvd", "press")}

                />                
            </Grid>
            <br></br>
              <Grid item xs={3} className="lvdClass">
                <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="uncontrolled-native" className="formslvd">Last visit</InputLabel>
                      <NativeSelect
                        defaultValue={resultAge}
                        inputProps={{
                        name: 'name',
                        id: 'uncontrolled-native',
                        }}
                    onChange={(e) => searchOnKey(e, "lastvisit", "press")}
                    className="formslvdss"
                  >
                    <option value={"C"}>Select</option>
                        <option value={"LM"}>Last month</option>
                        <option value={"L6M"}>Last 6 months</option>
                        <option value={"LY"}>Last year</option>
                      </NativeSelect>
                </FormControl>
                
              </Grid>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Grid item xs={2}>

                  <Grid container spacing={2} alignItems="center">
                      <Grid item className="AgeClass">

                      <TextField

                      id="standard-number"
                      label="Age"
                      type="number"
                      onKeyUp={(e) => searchOnKey(e, "age", "press")}
                      InputLabelProps={{
                      shrink: true,
                      }}
                      />

                    </Grid>
                    <FormControl >
                      <InputLabel htmlFor="uncontrolled-native">Range</InputLabel>
                      <NativeSelect
                        defaultValue={resultAge}
                        inputProps={{
                        name: 'name',
                        id: 'uncontrolled-native',
                        }}
                      onChange={(e) => searchOnKey(e, "range", "press")}
                        >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </NativeSelect>
                    </FormControl>
                    </Grid>
                
              </Grid>
         
                <Grid item xs={5} className="genderID">
                <InputLabel htmlFor="uncontrolled-native" className="genderClass">Gender</InputLabel>
                <FormControl>
                  <RadioGroup
                    className="gendergroup"
                    value={genderValue}
                    onChange={(e) => searchOnKey(e, "gender", "press")}

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
                onClick={(e) => searchOnKey(e, { searchDetails }, "clicked")}
              >
                Search
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                size="small"
                className="searchbtn"
                onClick={(e) => resetOnKey(e, { searchDetails }, "clicked")}
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


const classes = useStyles();
const searchdat = searchData;
var genderValue = genderValue;
  
if (isDataPresent) {
  return outputScreen(classes, searchdat,genderValue)
}
else {
  return inputScreen(classes, searchdat,genderValue)
}
}
