import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  CircularProgress,
  InputLabel,
  Box,
  makeStyles,
  Paper,
  Select,
  FormLabel,
  MenuItem,
} from "@material-ui/core/";
import { DataGrid } from "@material-ui/data-grid";
import AddIcon from "@material-ui/icons/Add";
import { GridContainer, GridItem } from "../../components/Grid";
import {ADRESSBASE_URL_API} from "../../utils/constants"

import CustomizedMenus from "./ActionButton";
import { getAPI, postAPI,getaddressAPI } from "../../services/index";


import axios from "axios";
import styles from "./styles";
import "./styles.css";

const useStyles = makeStyles(styles);

const createData = (
  uuid,
  identifier,
  name,
  phone,
  gender,
  age,
  address,
  lvd,
  action,
  id
) => {
  return { uuid,identifier, name, phone, gender, age, address, lvd, action, id };
};

export default function PatientSearch(props) {
  const classes = useStyles();
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
  var [loading, setLoading] = useState(false);
  var [errors, setErrors] = useState({
    phoneData: true,
    nameData: true,
    identifierData: true,
  });
  var [isDataPresent, setisDataPresent] = useState(false);
  var [phoneData, setphoneData] = useState(false);
  var [nameData, setnameData] = useState(false);
  var [apihit, setapihit] = useState(false);
  var [charErrorMsj, setcharErrorMsj] = useState("");
  var isEnter = "Enter";
  var [PhoneErrorMsj, setPhoneErrorMsj] = useState();
  var [NameErrorMsj, setNameErrorMsj] = useState();
  var [IdenErrorMsj, setIdenErrorMsj] = useState();
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [patientCategoryTypes, setPatientCategoryTypes] = useState([]);
  const [mlcResp, setMlcResp] = useState([]);

  const columns = [
    { field: "uuid", hide:true },
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
          <CustomizedMenus patiendData={params} mlc = {mlcResp} />
        </strong>
      ),
    },
  ];

  const isEnteredPressed = (charLen, event, name, eventName) => {
    if (
      (event.key === isEnter && event.target.value.length > charLen) ||
      (event.key === isEnter && name == "age")
    ) {
      if (
        name != "phone" ||
        (name == "phone" && event.target.value.length > 9)
      ) {
        return true;
      }
    } else if (event.key === isEnter && event.target.value.length <= charLen) {
      if (name == "firstName") {
        setErrors({ nameData: !firstName ? false : true });
        if (firstName) {
          var nameLen = firstName.length;
        }
        if (nameLen && nameLen <= charLen && nameLen > 0) {
          setNameErrorMsj("Atleast 3 characters is required");
        } else if (errors.nameData) {
          setNameErrorMsj("Name is required");
        }
      }

      if (name == "phone") {
        setErrors({ phoneData: !phone ? false : true });
        if (phone) {
          var phoneLen = phone.length;
        }
        if (phoneLen && phoneLen <= charLen && phoneLen > 0) {
          setPhoneErrorMsj("Atleast 10 characters is required");
        } else if (errors.phoneData) {
          setPhoneErrorMsj("Phone is required");
        }
      }
      if (name == "identifier") {
        setErrors({ identifierData: !identifier ? false : true });
        if (identifier) {
          var idenLen = identifier.length;
        }
        if (idenLen && idenLen < charLen && idenLen > 0) {
          setIdenErrorMsj("Atleast 3 characters is required");
        } else if (errors.identifierData) {
          setIdenErrorMsj("Identifier is required");
        }
      }
    }
  };

  const isSearchClicked = (charLen, event, name, eventName) => {
    if (eventName == "clicked") {
      if (
        (phone && phone.length) > charLen ||
        (firstName && firstName.length > charLen) ||
        (identifier && identifier.length > charLen)
      ) {
        return true;
      } else {
        var nameLen = "";
        var phoneLen = "";
        var idenLen = "";
        setErrors({ nameData: !firstName ? false : true });
        setErrors({ phoneData: !phone ? false : true });
        setErrors({ identifierData: !identifier ? false : true });
        if (firstName) {
          nameLen = firstName.length;
        }
        if (nameLen && nameLen <= charLen && nameLen > 0) {
          setNameErrorMsj("Atleast 3 characters is required");
        } else if (errors.nameData) {
          setNameErrorMsj("Name is required");
        }

        if (phone) {
          phoneLen = phone.length;
        }
        if (phoneLen && phoneLen <= charLen && phoneLen > 0) {
          setPhoneErrorMsj("Atleast 10 characters is required");
        } else if (errors.phoneData) {
          setPhoneErrorMsj("Phone is required");
        }

        if (identifier) {
          idenLen = identifier.length;
        }
        if (idenLen && idenLen < charLen && idenLen > 0) {
          setIdenErrorMsj("Atleast 3 characters is required");
        } else if (errors.identifierData) {
          setIdenErrorMsj("Identifier is required");
        }

        return false;
      }
    }
  };

  const isValueChanged = (charLen, event, name, eventName) => {
    if (
      (name == "gender" && eventName == "press") ||
      (name == "lvd" && eventName == "press")
    ) {
      if (
        (phone && phone.length) > charLen ||
        (firstName && firstName.length > charLen) ||
        (identifier && identifier.length > charLen)
      ) {
        return true;
      } else {
        return false;
      }
    } else if (name == "lastvisit" && eventName == "press") {
      if (
        (phone && phone.length) > charLen ||
        (firstName && firstName.length > charLen) ||
        (identifier && identifier.length > charLen)
      ) {
        return true;
      } else {
        return false;
      }
    } else if (name == "range" && eventName == "press") {
      if (
        age != "" &&
        ((phone && phone.length) > charLen ||
          (firstName && firstName.length > charLen) ||
          (identifier && identifier.length > charLen))
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  var isValueEntered = (event, name, eventName) => {
    var charLen = 2;
    if (event.key === isEnter) {
      return isEnteredPressed(charLen, event, name, eventName);
    }
    if (eventName == "clicked") {
      return isSearchClicked(charLen, event, name, eventName);
    }
    if (eventName == "press" && event.key != isEnter) {
      return isValueChanged(charLen, event, name, eventName);
    }
  };

  var multiFilter = (products, filters, isExactLvd, isApproxLvd) => {
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
            if (filterProperty === "lvd") {
              if (filterValues.length > 0) {
                var searchTokens = filterValues[0].split(" ");
                var searchString = product[filterProperty];
                var searchRegex = new RegExp(searchTokens.join("|"), "g");
                var numOfMatches = searchString.match(searchRegex);
                if (numOfMatches != null) {
                  return true;
                } else if (isApproxLvd) {
                  var searchvals = searchTokens[0].split("-");
                  var newdatestring =
                    searchvals[1] + "-" + searchvals[0] + "-" + searchvals[2];
                  var comparesearchvals = searchString.split("-");
                  var comparevalues =
                    comparesearchvals[1] +
                    "-" +
                    comparesearchvals[0] +
                    "-" +
                    comparesearchvals[2];
                  if (new Date(newdatestring) < new Date(comparevalues)) {
                    return true;
                  } else {
                    return false;
                  }
                }
              }
            } else if (filterProperty == "identifier") {
              var searchTokens = filterValues[0].split(" ");
              var searchString = product[filterProperty];
              var searchRegex = new RegExp(searchTokens.join("|"), "g");
              var numOfMatches = searchString.match(searchRegex);
              if (numOfMatches != null) {
                return true;
              } else {
                return false;
              }
            } else if (filterProperty != "name") {
              return filterValues.includes(product[filterProperty]);
            } else {
              var searchTokens = filterValues[0].split(" ");
              var searchString = product[filterProperty];
              var searchRegex = new RegExp(searchTokens.join("|"), "g");
              var numOfMatches = searchString.match(searchRegex);
              if (numOfMatches != null) {
                return true;
              } else {
                return false;
              }
            }
        }
      });
    });
  };

  function lvdApproxCal(lvdValueApprox, paramLvd) {
    let date = new Date();
    let month = "";

    if (lvdValueApprox == "LM") {
      month = new Date().getMonth();
      let formatprevOneMonth = new Date(date.setMonth(month - 1));
      paramLvd =
        "&lastvisitapprox=" +
        new Date(formatprevOneMonth)
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-");
    } else if (lvdValueApprox == "L6M") {
      month = new Date().getMonth();
      let formatprev6Month = new Date(date.setMonth(month - 6));
      paramLvd =
        "&lastvisitapprox=" +
        new Date(formatprev6Month)
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-");
    } else if (lvdValueApprox == "LY") {
      month = new Date().getMonth();
      let formatprev6Month = new Date(date.setMonth(month - 12));
      paramLvd =
        "&lastvisitapprox=" +
        new Date(formatprev6Month)
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-");
    }
    return paramLvd;
  }

  var filters = {};
  function checkData(
    param,
    firstNameVal,
    phoneVal,
    identifierVal,
    ageVal,
    ageRange,
    lvd,
    lvdValueApprox
  ) {
    var paramLvd = "";
    paramLvd = lvdApproxCal(lvdValueApprox, paramLvd);
    if (firstNameVal) {
      if (firstNameVal && ageVal) {
        param = firstNameVal + "&agerange=" + ageRange + "&age=" + ageVal;
      } else if (firstNameVal && lvdValueApprox) {
        param = firstNameVal + paramLvd;
      } else if (firstNameVal && lvd) {
        param = firstNameVal + "&lastvisitexact=" + lvd;
      } else {
        param = firstNameVal;
      }
    }
    if (phoneVal) {
      if (phoneVal && ageVal) {
        param = phoneVal + "&agerange=" + ageRange + "&age=" + ageVal;
      } else if (phoneVal && lvdValueApprox) {
        param = phoneVal + +paramLvd;
      } else if (phoneVal && lvd) {
        param = phoneVal + "&lastvisitapprox=" + lvd;
      } else {
        param = phoneVal;
      }
    }
    if (firstNameVal && phoneVal) {
      if (phoneVal && ageVal) {
        param = phoneVal + "&agerange=" + ageRange + "&age=" + ageVal;
      } else if (phoneVal && lvdValueApprox) {
        param = phoneVal + paramLvd;
      } else if (phoneVal && lvd) {
        param = phoneVal + "&lastvisitapprox=" + lvd;
      } else {
        param = phoneVal;
      }
    }
    if (identifierVal) {
      if (identifierVal && ageVal) {
        param = identifierVal + "&agerange=" + ageRange + "&age=" + ageVal;
      } else if (identifierVal && lvdValueApprox) {
        param = identifierVal + paramLvd;
      } else if (identifierVal && lvd) {
        param = identifierVal + "&lastvisitapprox=" + lvd;
      } else {
        param = identifierVal;
      }
    }

    return param;
  }

  const searchOnKey = (event, name, eventName) => {
    var searchValue = event.target.value;

    if (name == "firstName") {
      setfirstName(searchValue);
    }
    if (name == "phone") {
      setphone(searchValue);
    }
    if (name == "identifier") {
      setidentifier(searchValue);
    }
    if (name == "age") {
      setage(searchValue);
    }
    if (name == "lvd") {
      setlvd(searchValue);
    }
    if (name == "gender") {
      setgenderValue(searchValue);
    }
    if (name == "range") {
      setresultAge(searchValue);
    }
    if (name == "lastvisit") {
      setlvdapprox(searchValue);
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

    if (name == "lastvisit") {
      lvdValueApprox = searchValue;
    } else if (lvdapprox) {
      lvdValueApprox = lvdapprox;
    }
    if (name == "range") {
      ageRange = searchValue;
    } else if (resultAge) {
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
      } else if (age) {
        ageValue = age;
      }
      if (genderValue) {
        genderValue = genderValue;
      }
      if (name == "gender") {
        genderValue = event.target.value;
      }

      if (name == "lvd") {
        lvdValue = event.target.value;
        lvdValue = event.target.value.split("-").reverse().join("-");
      } else if (lvd) {
        lvdValue = lvd;
        lvdValue = lvdValue.split("-").reverse().join("-");
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
            filters["age"] = rangeToSend;
          } else {
            filters["age"] = [String(event.target.value)];
          }
        } else if (age) {
          if (ageRange) {
            minageRange = Number(age) - Number(ageRange);
            maxageRange = Number(age) + Number(ageRange);
            for (let k = minageRange; k <= maxageRange; k++) {
              rangeToSend.push(String(k));
            }
            filters["age"] = rangeToSend;
          } else {
            filters["age"] = [String(age)];
          }
        }
        if (name == "gender") {
          filters["gender"] = [event.target.value.toUpperCase()];
        }
        if (name == "lvd") {
          lvdVal = event.target.value.split("-").reverse().join("-");
          filters["lvd"] = [lvdVal];
          isExactLvd = true;
        } else if (lvd) {
          filters["lvd"] = [lvdValue];
          isExactLvd = true;
        }
        if (name == "lastvisit") {
          if (!lvd) {
            var paramLvdval = lvdApproxCal(lvdValueApprox, paramLvd);
            paramLvdval = paramLvdval.split("=")[1];
            filters["lvd"] = [paramLvdval];
            isApproxLvd = true;
          }
        } else if (lvdapprox) {
          if (!lvdVal) {
            var paramLvdval = lvdApproxCal(lvdValueApprox, paramLvd);
            paramLvdval = paramLvdval.split("=")[1];
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
        let filterOutput = multiFilter(
          searchDataAlready,
          filters,
          isExactLvd,
          isApproxLvd
        );
        if (filterOutput.length > 0) {
          alreadystoredata = filterOutput;
        }
        if (alreadystoredata.length > 0) {
          setsearchData(alreadystoredata);
          setisDataPresent(true);
          setLoading(false);
        } else {
          let param = firstNameValue;
          var username = "bhavana";
          var password = "Admin123";
          param = checkData(
            param,
            firstNameValue,
            phoneValue,
            identifierValue,
            ageValue,
            ageRange,
            lvdValue,
            lvdValueApprox
          );
          if (firstNameValue || phoneValue || identifierValue) {
            setnameData(false);
            setphoneData(false);

            const headers = {
              Authorization: "Basic " + btoa(`${username}:${password}`),
            };
            const url = `${ADRESSBASE_URL_API}/patient_search?name=${param}`;
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
                  console.log(" SEARCH DATA ", searchdatanew[0][i])
                  let uuidID = searchdatanew[0][i]["uuid"];
                  let identifierid = searchdatanew[0][i]["identifier"];
                  let nameval = searchdatanew[0][i]["name"].toUpperCase();
                  let genval = searchdatanew[0][i]["gender"];
                  let ageval = searchdatanew[0][i]["age"];
                  if (searchdatanew[0][i]["address"]) {
                    let addr1 = searchdatanew[0][i]["address"]["Address1"];
                    let addr2 = searchdatanew[0][i]["address"]["Address2"];
                    let district =
                      searchdatanew[0][i]["address"]["City Village"];
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
                      searchdatanew[0][i]["person_attributes"]["Phone Number*"];
                  }
                  if (searchdatanew[0][i]["visit_date"] !== undefined) {
                    visitdate = searchdatanew[0][i]["visit_date"];
                  } else {
                    visitdate = "N-A";
                  }
                  let id = i;

                  storedata.push(
                    createData(
                      uuidID,
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
                        filters["age"] = rangeToSend;
                      } else {
                        filters["age"] = [ageValue];
                      }
                    }
                    if (genderValue) {
                      filters["gender"] = [genderValue.toUpperCase()];
                    }
                    if (name == "gender") {
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
                    filterOutput = multiFilter(
                      storedata,
                      filters,
                      isExactLvd,
                      isApproxLvd
                    );

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
                } catch (e) {
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
      } else {
        let param = firstNameValue;
        var username = "bhavana";
        var password = "Admin123";
        param = checkData(
          param,
          firstNameValue,
          phoneValue,
          identifierValue,
          ageValue,
          ageRange,
          lvdValue,
          lvdValueApprox
        );
        if (firstNameValue || phoneValue || identifierValue) {
          setnameData(false);
          setphoneData(false);

          const headers = {
            Authorization: "Basic " + btoa(`${username}:${password}`),
          };
          const url = `${ADRESSBASE_URL_API}/patient_search?name=${param}`;
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
                console.log(" SEARCH DATA ",searchdatanew[0][i])
                let uuidID = searchdatanew[0][i]["uuid"];
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
                    searchdatanew[0][i]["person_attributes"]["Phone Number*"];
                }
                if (searchdatanew[0][i]["visit_date"] != undefined) {
                  visitdate = searchdatanew[0][i]["visit_date"];
                } else {
                  visitdate = "N-A";
                }
                let id = i;

                storedata.push(
                  createData(
                    uuidID,
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
                      filters["age"] = rangeToSend;
                    } else {
                      filters["age"] = [ageValue];
                    }
                  }
                  if (genderValue) {
                    filters["gender"] = [genderValue.toUpperCase()];
                  }
                  if (name == "gender") {
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
                  filterOutput = multiFilter(
                    storedata,
                    filters,
                    isExactLvd,
                    isApproxLvd
                  );

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
              } catch (e) {
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
  };

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
  };



    useEffect(() => {


    getAPI(
      `/concept?q="Registration Attribute"&v=custom:(answers:(display,answers:(uuid,display,datatype:(display),synonyms:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType),answers:(uuid,display,datatype:(display),names:(display,conceptNameType)))))`
    )
      .then((response) => {

          var visitinfo = response.data.results[0].answers.map((item1, index) => {
              if (item1.display == "Visit Info") {

            var abc = item1.answers.map((item2, index) => {
              if (item2.display == "Medico Legal Case*") {
                  setMlcResp(item2.answers)
              }
            })
              }
              else if (item1.display == "Payment Info") {
                var abc2 = item1.answers.map((item3, index) => {
              if (item3.display == "Patient Category*") {
                  setPatientCategoryTypes(item3.answers)
              }
            })

              }
             return item1
         })

      })
      .catch((error) => console.log(error));





        getAPI("/appointmentscheduling/appointmenttype?v=custom:(uuid,display)")
            .then((response) => {
                setAppointmentTypes(response.data.results);
            })
            .catch((error) => console.log(error));
    }, []);


  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          startIcon={<AddIcon />}
          component={Link}
          to="/app/patient-registration"
        >
          NEW PATIENT
        </Button>
      </Box>

      <Paper className={classes.paper}>
        <form noValidate id="searchForm">
          <GridContainer>
            <GridItem item xs={12} sm={6} md={3}>
              <TextField
                error={
                  !errors.phoneData &&
                  !errors.nameData &&
                  !errors.identifierData
                }
                helperText={
                  (!errors.phoneData &&
                    !errors.nameData &&
                    !errors.identifierData &&
                    NameErrorMsj) ||
                  (errors.nameData && NameErrorMsj)
                }
                name="firstName"
                variant="outlined"
                margin="dense"
                required
                fullWidth
                type="text"
                id="firstName"
                label="Name"
                autoFocus
                onKeyUp={(e) => searchOnKey(e, "firstName", "press")}
                className={classes.field}
              />
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <TextField
                error={
                  !errors.phoneData &&
                  !errors.nameData &&
                  !errors.identifierData
                }
                helperText={
                  (!errors.phoneData &&
                    !errors.nameData &&
                    !errors.identifierData &&
                    PhoneErrorMsj) ||
                  (errors.phoneData && PhoneErrorMsj)
                }
                variant="outlined"
                required
                fullWidth
                margin="dense"
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                onKeyUp={(e) => searchOnKey(e, "phone", "press")}
                value={classes.phone}
                type="number"
                className={classes.field}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                }}
              />
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <TextField
                error={
                  !errors.phoneData &&
                  !errors.nameData &&
                  !errors.identifierData
                }
                helperText={
                  (!errors.phoneData &&
                    !errors.nameData &&
                    !errors.identifierData &&
                    IdenErrorMsj) ||
                  (errors.identifierData && IdenErrorMsj)
                }
                variant="outlined"
                fullWidth
                margin="dense"
                required
                id="identifier"
                label="Identifier"
                name="identifier"
                autoComplete="lname"
                onKeyUp={(e) => searchOnKey(e, "identifier", "press")}
                value={classes.identifier}
                className={classes.field}
              />
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <TextField
                variant="outlined"
                label="Last day of visit"
                type="date"
                margin="dense"
                name="lvd"
                id="lvd"
                defaultValue=""
                maxDate={new Date()}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                className={classes.field}
                onChange={(e) => searchOnKey(e, "lvd", "press")}
              />
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.field}
                margin="dense"
              >
                <InputLabel id="lastVistSelectLabel">Last visit</InputLabel>
                <Select
                  labelId="lastVistSelectLabel"
                  label="Last visit"
                  value={lvdapprox}
                  id="lastVistSelect"
                  onChange={(e) => searchOnKey(e, "lastvisit", "press")}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"LM"}>Last month</MenuItem>
                  <MenuItem value={"L6M"}>Last 6 months</MenuItem>
                  <MenuItem value={"LY"}>Last year</MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <GridContainer>
                <GridItem item xs={12} sm={6} md={6}>
                  <TextField
                    id="standard-number"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    label="Age"
                    type="number"
                    className={classes.field}
                    onKeyUp={(e) => searchOnKey(e, "age", "press")}
                  />
                </GridItem>
                <GridItem item xs={12} sm={6} md={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    className={classes.field}
                  >
                    <InputLabel id="ageRangeLabel">Range</InputLabel>
                    <Select
                      labelId="ageRangeLabel"
                      label="Range"
                      value={resultAge}
                      onChange={(e) => searchOnKey(e, "range", "press")}
                    >
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <FormControl component="fieldset">
                <FormLabel
                  component="legend"
                  style={{ marginBottom: "0px", fontSize: "12px" }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  value={genderValue}
                  onChange={(e) => searchOnKey(e, "gender", "press")}
                  row
                >
                  <FormControlLabel
                    value="F"
                    control={<Radio style={{ paddingRight: "2px" }} />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="M"
                    control={<Radio style={{ padding: "2px" }} />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="O"
                    control={<Radio style={{ padding: "2px" }} />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </GridItem>
            <GridItem item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => searchOnKey(e, { searchDetails }, "clicked")}
                className={clsx(classes.button, classes.field)}
              >
                Search
              </Button>
              <Button
                variant="contained"
                onClick={(e) => resetOnKey(e, { searchDetails }, "clicked")}
                className={classes.field}
              >
                Reset
              </Button>
            </GridItem>
          </GridContainer>
        </form>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}

        {apihit && (
          <Typography variant="overline" display="block" gutterBottom>
            No Results Found
          </Typography>
        )}
      </Paper>
      {isDataPresent && (
        <Paper className={classes.paper} style={{ height: "50vh" }}>
          <DataGrid
            rowHeight={40}
            wrap="wrap"
            rows={searchData}
            columns={columns}
            pageSize={10}
            density="standard"
          />
        </Paper>
      )}
    </>
  );
}
