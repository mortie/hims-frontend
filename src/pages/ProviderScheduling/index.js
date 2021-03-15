import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { RRule, rrulestr } from "rrule";
import { deleteAPI, getAPI, postAPI } from "../../services";
import {
  Paper,
  TextField,
  LinearProgress,
  withStyles,
  makeStyles,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import styles from "./styles";
import {
  Scheduler,
  Resources,
  DayView,
  WeekView,
  MonthView,
  ViewSwitcher,
  Toolbar,
  Appointments,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
} from "@devexpress/dx-react-scheduler-material-ui";
import { addProviders } from "../../actions/providersActions";
import { addLocations } from "../../actions/locationActions";
import { addServices } from "../../actions/servicesActions";
import {
  fetchAppointmentBlockWithTimeSlot,
  addAppointmentBlockWithTimeSlot,
  updateAppointmentBlockWithTimeSlot,
  deleteAppointmentBlockWithTimeSlot,
} from "../../actions/appointmentBlockWithTimeSlotActions";

const messages = {
  moreInformationLabel: "",
  endRepeatLabel: "",
  repeatEveryLabel: "",
  daysLabel: "",
  yearsLabel: "",
  monthsLabel: "",
  weeksOnLabel: "",
  monthly: "Monday to Friday",
  yearly: "Monday to Saturday",
  repeatLabel: "Select Days",
};

const TextEditor = (props) => {
  return null;
};

const RadioGroupComponent = (props) => {
  return null;
};

const ToolbarWithLoading = withStyles(styles, { name: "Toolbar" })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  )
);

const useStyles = makeStyles(styles);

export default function ProviderScheduling() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const appointmentBlockWithTimeSlots = useSelector(
    (state) => state.appointmentBlockWithTimeSlots.appointmentBlockWithTimeSlot
  );
  const [data, setData] = useState(appointmentBlockWithTimeSlots || []);
  const [department, setDepartment] = useState(null);
  const providers = useSelector((state) => state.providers.providers);
  const locations = useSelector((state) => state.locations.locations);
  const services = useSelector((state) => state.services.services);

  const [currentViewName, setCurrentViewName] = useState("Month");
  const [resources, setResources] = useState([
    {
      fieldName: "types",
      title: "Department",
      instances: services || [],
      allowMultiple: true,
    },
    {
      fieldName: "location",
      title: "Location",
      instances: locations || [],
    },
    {
      fieldName: "provider",
      title: "Provider",
      instances: providers || [],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  function convertResponseData(response) {
    return response.data.results.map((item) => {
      return { id: item.uuid, text: item.display };
    });
  }

  function convertAppointmentData(response) {
    return response.data.results.map((item) => getAppointmentDataObject(item));
  }

  function getAppointmentDataObject(item) {
    return {
      id: item.uuid,
      title: `${item.provider.display} - ${item.location.display}`,
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
      provider: item.provider.uuid,
      location: item.location.uuid,
      types: item.types.map((type) => type.uuid),
    };
  }

  function getDifferenceInDays(startDate, endDate) {
    return (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  }

  function getFilteredAppointments(value) {
    return value
      ? appointmentBlockWithTimeSlots.filter(
          (element) => element.types.includes(value.id) && element
        )
      : appointmentBlockWithTimeSlots;
  }

  useEffect(() => {
    if (appointmentBlockWithTimeSlots.length === 0) {
      setLoading(true);
      const urls = [
        "/provider",
        "/location",
        "/appointmentscheduling/appointmenttype",
        "/appointmentscheduling/appointmentblockwithtimeslot?v=full",
      ];
      const requests = urls.map((url) => getAPI(url));

      Promise.all(requests).then((responses) => {
        setLoading(false);
        const provider = convertResponseData(responses[0]);
        const location = convertResponseData(responses[1]);
        const service = convertResponseData(responses[2]);
        const appointmentBlockWithTimeSlot = convertAppointmentData(
          responses[3]
        );

        const resorce = resources;
        resorce.find((a) => a.fieldName === "types").instances = service;
        resorce.find((a) => a.fieldName === "location").instances = location;
        resorce.find((a) => a.fieldName === "provider").instances = provider;
        setResources(resorce);

        dispatch(addProviders(provider));
        dispatch(addLocations(location));
        dispatch(addServices(service));
        dispatch(
          fetchAppointmentBlockWithTimeSlot(appointmentBlockWithTimeSlot)
        );
        setData(appointmentBlockWithTimeSlot);
      });
    }

    setData(getFilteredAppointments(department));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentBlockWithTimeSlots]);

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      delete added.allDay;
      const differenceInDays = getDifferenceInDays(
        added.startDate,
        added.endDate
      );

      if (differenceInDays < 0) {
        enqueueSnackbar("End date can not be smaller then start date.");
      } else if (differenceInDays > 1) {
        let daysToSchedule = [1, 2, 3, 4, 5, 6, 7];
        if (added?.rRule) {
          const { freq, byweekday } = rrulestr(added.rRule).options;
          if (RRule.FREQUENCIES.indexOf("WEEKLY") === freq) {
            daysToSchedule = byweekday.map((weekday) =>
              weekday === 6 ? 1 : weekday + 2
            );
          } else if (RRule.FREQUENCIES.indexOf("MONTHLY") === freq) {
            daysToSchedule = [2, 3, 4, 5, 6];
          } else if (RRule.FREQUENCIES.indexOf("YEARLY") === freq) {
            daysToSchedule = [2, 3, 4, 5, 6, 7];
          }
        }
        delete added.rRule;

        postAPI(
          "/appointmentscheduling/recurringappointmentblockwithtimeslot",
          {
            ...added,
            startDate: added.startDate.toISOString(),
            endDate: added.endDate.toISOString(),
            daysToSchedule: daysToSchedule,
            ismulti: "YES",
          }
        )
          .then((response) => {
            getAPI("/appointmentscheduling/appointmentblockwithtimeslot?v=full")
              .then((res) => {
                enqueueSnackbar("Appointments added successfully.");
                dispatch(
                  fetchAppointmentBlockWithTimeSlot(convertAppointmentData(res))
                );
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((error) => {
            enqueueSnackbar(
              "An error occured while saving the appointments. Please try again."
            );
            console.log(error);
          });
      } else {
        delete added.rRule;
        postAPI("/appointmentscheduling/appointmentblockwithtimeslot", {
          ...added,
          startDate: new Date(added.startDate).toISOString(),
          endDate: new Date(added.endDate).toISOString(),
        })
          .then((response) => {
            dispatch(
              addAppointmentBlockWithTimeSlot(
                getAppointmentDataObject(response.data)
              )
            );
            enqueueSnackbar("Appointment added successfully.");
            setLoading(false);
          })
          .catch((error) => {
            enqueueSnackbar(
              "An error occured while saving the appointment. Please try again."
            );
            setLoading(false);
            console.log(error);
          });
      }
    }
    if (changed) {
      console.log(changed);
      setLoading(true);
      for (const key in changed) {
        const updatedValues = changed[key];
        const startDate = Object.hasOwnProperty.call(updatedValues, "startDate")
          ? updatedValues.startDate
          : appointmentBlockWithTimeSlots.find((element) => element.id === key)
              .startDate;
        const endDate = Object.hasOwnProperty.call(updatedValues, "endDate")
          ? updatedValues.endDate
          : appointmentBlockWithTimeSlots.find((element) => element.id === key)
              .endDate;
        const differenceInDays = getDifferenceInDays(startDate, endDate);
        if (differenceInDays <= 0 && differenceInDays >= 1) {
          setLoading(false);
          enqueueSnackbar(
            "Start date and End date can not be different. However you can change the time."
          );
        } else {
          if (Object.hasOwnProperty.call(changed, key)) {
            postAPI(
              `/appointmentscheduling/appointmentblockwithtimeslot/${key}`,
              {
                ...changed[key],
              }
            )
              .then((response) => {
                dispatch(
                  updateAppointmentBlockWithTimeSlot(
                    getAppointmentDataObject(response.data)
                  )
                );
                enqueueSnackbar("Appointment updated successfully.");
                setLoading(false);
              })
              .catch((error) => {
                enqueueSnackbar(
                  "An error occured while updating the appointment. Please try again."
                );
                setLoading(false);
                console.log(error);
              });
          }
        }
      }
    }
    if (deleted !== undefined) {
      setLoading(true);
      deleteAPI(
        `/appointmentscheduling/appointmentblockwithtimeslot/${deleted}`
      )
        .then((response) => {
          dispatch(deleteAppointmentBlockWithTimeSlot(deleted));
          enqueueSnackbar("Appointment deleted successfully.");
          setLoading(false);
        })
        .catch((error) => {
          enqueueSnackbar(
            "An error occured while deleting the appointment. Please try again."
          );
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Autocomplete
          id="combo-box-demo"
          options={services || []}
          getOptionLabel={(option) => option.text}
          onChange={(e, newValue) => {
            setDepartment(newValue);
            setData(getFilteredAppointments(newValue));
          }}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Department"
              variant="outlined"
            />
          )}
        />
      </Paper>
      <Paper>
        <Scheduler data={data} height={500}>
          <ViewState
            currentViewName={currentViewName}
            onCurrentViewNameChange={(currentViewName) =>
              setCurrentViewName(currentViewName)
            }
          />
          <EditingState onCommitChanges={commitChanges} />
          <EditRecurrenceMenu />
          <DayView />
          <WeekView excludedDays={[0, 6]} />
          <MonthView />
          <Toolbar
            {...(loading ? { rootComponent: ToolbarWithLoading } : null)}
          />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip showDeleteButton showCloseButton showOpenButton />
          <AppointmentForm
            textEditorComponent={TextEditor}
            messages={messages}
            radioGroupComponent={RadioGroupComponent}
          />
          {providers && services && locations && (
            <Resources data={resources} mainResourceName="location" />
          )}
          <DragDropProvider />
        </Scheduler>
      </Paper>
    </>
  );
}
