import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAPI } from "../../services";
import { Paper, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import {
  ViewState,
  GroupingState,
  IntegratedGrouping,
  IntegratedEditing,
  EditingState,
} from "@devexpress/dx-react-scheduler";
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
  AllDayPanel,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
  GroupingPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { appointments } from "./demo-data/resources";
import { addProviders } from "../../actions/providersActions";
import { addLocations } from "../../actions/locationActions";
import { addServices } from "../../actions/servicesActions";

const ExternalViewSwitcher = ({ currentViewName, onChange }) => (
  <RadioGroup
    aria-label="Views"
    style={{ flexDirection: "row" }}
    name="views"
    value={currentViewName}
    onChange={onChange}
  >
    <FormControlLabel value="Day" control={<Radio />} label="Day" />
    <FormControlLabel value="Week" control={<Radio />} label="Week" />
    <FormControlLabel value="Month" control={<Radio />} label="Month" />
  </RadioGroup>
);

export default function ProviderScheduling() {
  const providers = useSelector((state) => state.providers.providers);
  const locations = useSelector((state) => state.locations.locations);
  const services = useSelector((state) => state.services.services);
  const dispatch = useDispatch();
  const [data, setData] = useState(appointments);
  const [currentViewName, setCurrentViewName] = useState("Month");
  const [resources, setResources] = useState([
    {
      fieldName: "services",
      title: "Services",
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

  function convertResponseData(response) {
    return response.data.results.map((item) => {
      return { id: item.uuid, text: item.display };
    });
  }

  useEffect(() => {
    const urls = [
      "/provider",
      "/location",
      "/appointmentscheduling/appointmenttype",
    ];
    const requests = urls.map((url) => getAPI(url));

    Promise.all(requests).then((responses) => {
      const provider = convertResponseData(responses[0]);
      const location = convertResponseData(responses[1]);
      const service = convertResponseData(responses[2]);

      const resorce = resources;
      resorce.find((a) => a.fieldName === "services").instances = service;
      resorce.find((a) => a.fieldName === "location").instances = location;
      resorce.find((a) => a.fieldName === "provider").instances = provider;

      setResources(resorce);

      dispatch(addProviders(provider));
      dispatch(addLocations(location));
      dispatch(addServices(service));
    });
  }, []);

  const onCurrentViewNameChange = (e) => {
    setCurrentViewName(e.target.value);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      console.log(added);
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      console.log(changed);
      setData(
        data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        )
      );
    }
    if (deleted !== undefined) {
      console.log(deleted);
      setData(data.filter((appointment) => appointment.id !== deleted));
    }
    console.log(data);
  };

  return (
    <>
      <ExternalViewSwitcher
        currentViewName={currentViewName}
        onChange={onCurrentViewNameChange}
      />
      <Paper>
        <Scheduler data={data} height={500}>
          <ViewState
            defaultCurrentDate="2017-05-25"
            currentViewName={currentViewName}
          />
          <EditingState onCommitChanges={commitChanges} />
          <EditRecurrenceMenu />
          <DayView startDayHour={8} endDayHour={17} />
          <WeekView startDayHour={8} endDayHour={17} excludedDays={[0, 6]} />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip showDeleteButton showCloseButton showOpenButton />
          <AppointmentForm />
          {providers && services && locations && (
            <Resources data={resources} mainResourceName="providers" />
          )}
        </Scheduler>
      </Paper>
    </>
  );
}
