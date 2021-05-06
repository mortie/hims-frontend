import React from "react";
import clsx from "clsx";
import moment from "moment";
import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { GridContainer, GridItem, Card, CardBody } from "../../../components";

const AvailableTimeSlotsSkelton = () => {
  return (
    <GridItem item xs={12} sm={6} md={3}>
      <Card>
        <CardBody>
          <Skeleton animation="wave" style={{ margin: "10px 0px" }} />
          <Skeleton animation="wave" style={{ margin: "10px 0px" }} />
          <Skeleton animation="wave" style={{ margin: "10px 0px" }} />
          <Skeleton animation="wave" style={{ margin: "10px 0px" }} />
          <Skeleton animation="wave" style={{ margin: "10px 0px" }} />
          <Skeleton animation="wave" style={{ margin: "10px 0px" }} />
        </CardBody>
      </Card>
    </GridItem>
  );
};

function AvailableTimeSlots({
  loading,
  timeSlots,
  classes,
  selectedTimeSlot,
  setSelectedTimeSlot,
}) {
  return (
    <GridContainer>
      {loading ? (
        <>
          <AvailableTimeSlotsSkelton />
          <AvailableTimeSlotsSkelton />
          <AvailableTimeSlotsSkelton />
        </>
      ) : timeSlots.length > 0 ? (
        timeSlots.map((item, key) => {
          const {
            uuid,
            countOfAppointments,
            unallocatedMinutes,
            startDate,
            endDate,
            appointmentBlock,
          } = item;
          const { display: provider } = appointmentBlock.provider;
          const { display: location } = appointmentBlock.location;
          return (
            <GridItem item xs={12} sm={6} md={3} key={key}>
              <Card
                onClick={(e) => setSelectedTimeSlot(uuid)}
                className={clsx(
                  classes.card,
                  selectedTimeSlot === uuid && classes.cardSelected
                )}
              >
                <CardBody>
                  <h6 className={classes.cardBodyInfo}>
                    <strong>Location:</strong> {location}
                  </h6>
                  <h6 className={classes.cardBodyInfo}>
                    <strong>Provider:</strong> {provider}
                  </h6>
                  <h6 className={classes.cardBodyInfo}>
                    <strong>Start Time:</strong>{" "}
                    {moment(startDate).format("hh:mm A")}
                  </h6>
                  <h6 className={classes.cardBodyInfo}>
                    <strong>End Time:</strong>{" "}
                    {moment(endDate).format("hh:mm A")}
                  </h6>
                  <h6 className={classes.cardBodyInfo}>
                    <strong>No. of Appointments done:</strong>{" "}
                    {countOfAppointments}
                  </h6>
                  <h6 className={classes.cardBodyInfo}>
                    <strong>Minutes left:</strong> {unallocatedMinutes}
                  </h6>
                </CardBody>
              </Card>
            </GridItem>
          );
        })
      ) : (
        <GridItem>
          <Typography variant="h6">No Doctors Available</Typography>
        </GridItem>
      )}
    </GridContainer>
  );
}

export default AvailableTimeSlots;
