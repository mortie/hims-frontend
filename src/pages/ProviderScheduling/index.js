import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAPI, getAPI, postAPI } from "../../services";
import { Paper } from "@material-ui/core";
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
import { addProviders } from "../../actions/providersActions";
import { addLocations } from "../../actions/locationActions";
import { addServices } from "../../actions/servicesActions";
import {
  fetchAppointmentBlockWithTimeSlot,
  addAppointmentBlockWithTimeSlot,
  updateAppointmentBlockWithTimeSlot,
  deleteAppointmentBlockWithTimeSlot,
} from "../../actions/appointmentBlockWithTimeSlotActions";

export default function ProviderScheduling() {
  const dispatch = useDispatch();
  const appointmentBlockWithTimeSlots = useSelector(
    (state) => state.appointmentBlockWithTimeSlots.appointmentBlockWithTimeSlot
  );
  const providers = useSelector((state) => state.providers.providers);
  const locations = useSelector((state) => state.locations.locations);
  const services = useSelector((state) => state.services.services);

  const [currentViewName, setCurrentViewName] = useState("Month");
  const [resources, setResources] = useState([
    {
      fieldName: "types",
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

  useEffect(() => {
    const urls = [
      "/provider",
      "/location",
      "/appointmentscheduling/appointmenttype",
      "/appointmentscheduling/appointmentblockwithtimeslot?v=full",
    ];
    const requests = urls.map((url) => getAPI(url));

    Promise.all(requests).then((responses) => {
      const provider = convertResponseData(responses[0]);
      const location = convertResponseData(responses[1]);
      const service = convertResponseData(responses[2]);
      const appointmentBlockWithTimeSlot = convertAppointmentData(responses[3]);

      const resorce = resources;
      resorce.find((a) => a.fieldName === "types").instances = service;
      resorce.find((a) => a.fieldName === "location").instances = location;
      resorce.find((a) => a.fieldName === "provider").instances = provider;
      setResources(resorce);

      dispatch(addProviders(provider));
      dispatch(addLocations(location));
      dispatch(addServices(service));
      dispatch(fetchAppointmentBlockWithTimeSlot(appointmentBlockWithTimeSlot));
    });
  }, []);

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      delete added.allDay;
      postAPI("/appointmentscheduling/appointmentblockwithtimeslot", {
        ...added,
        startDate: new Date(added.startDate).toISOString(),
        endDate: new Date(added.endDate).toISOString(),
      })
        .then((response) => {
          console.log(response);
          dispatch(
            addAppointmentBlockWithTimeSlot(
              getAppointmentDataObject(response.data)
            )
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (changed) {
      console.log(changed);
      for (const key in changed) {
        if (Object.hasOwnProperty.call(changed, key)) {
          postAPI(
            `/appointmentscheduling/appointmentblockwithtimeslot/${key}`,
            {
              ...changed[key],
            }
          )
            .then((response) => {
              console.log(response);
              dispatch(
                updateAppointmentBlockWithTimeSlot(
                  getAppointmentDataObject(response.data)
                )
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
    if (deleted !== undefined) {
      deleteAPI(
        `/appointmentscheduling/appointmentblockwithtimeslot/${deleted}`
      )
        .then((response) =>
          dispatch(deleteAppointmentBlockWithTimeSlot(deleted))
        )
        .catch((error) => console.log(error));
    }
  };

  return (
    <Paper>
      <Scheduler data={appointmentBlockWithTimeSlots} height={500}>
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
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip showDeleteButton showCloseButton showOpenButton />
        <AppointmentForm
          textEditorComponent={"div"}
          messages={{
            moreInformationLabel: null,
            endRepeatLabel: null,
            repeatEveryLabel: null,
            yearsLabel: null,
            monthsLabel: null,
            daysLabel: null,
            weeksOnLabel: null,
            yearly: null,
            daily: null,
            monthly: null,
          }}
          radioGroupComponent={"div"}
        />
        {providers && services && locations && (
          <Resources data={resources} mainResourceName="location" />
        )}
        <DragDropProvider />
      </Scheduler>
    </Paper>
  );
}
