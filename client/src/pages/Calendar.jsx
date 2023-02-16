import { useState } from "react";
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { formatDate } from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Backdrop,
  Box,
  Fade,
  List,
  ListItem,
  ListItemText,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../components/Header";
import { tokens } from "../theme";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../graphql/queries/eventQueries";
import Input from "../components/form/Input";
import CustomButton from "../components/CustomButton";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  start: yup.string().required(),
  end: yup.string().required(),
  projectId: yup.string(),
  notify: yup.boolean(),
});

const Calendar = () => {
  // const { loading, data } = useQuery(GET_EVENTS);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const handleOpenModalCreate = () => setOpenModalCreate(!openModalCreate);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedDAte, setSelectedDAte] = useState({});

  const handleDateClick = selected => {
    setSelectedDAte({
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
    })

    setOpenModalCreate(true);
    // const calendarApi = selected.view.calendar;
    // calendarApi.unselect();
    // console.log(selected);

    // if (title) {
    //   calendarApi.addEvent({
    //     id: `${selected.dateStr}-${title}`,
    //     title,
    //     start: selected.startStr,
    //     end: selected.endStr,
    //     allDay: selected.allDay,
    //   });
    // }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  const onSubmit = (values, actions) => {
    console.log(selectedDAte);
  }

  return (
    <Box m="20px">
      <Header title="CALENDAR" subtitle="Managing events" />
      
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                description: "dfsdsdsdsdsdsdsds-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalCreate}
        onClose={handleOpenModalCreate}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalCreate}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Formik
              initialValues={{
                title: '',
                description: '',
                start: '',
                end: '',
                notify: false,
              }}
              validationSchema={schema}
              onSubmit={onSubmit}
            >
              {() => (
                <Form>
                  <Stack spacing={2}
                  >
                    <Input label="Title*" name="title" />
                    <Input label="Description" name="description" multiline rows={4} />
                    {/* {!loading && (
                      <>
                        <AutoComplete label="Client" 
                                    name="clientID" 
                                    options={clientsOptions}
                        />
                        <AutoComplete label="Team" 
                                    name="team" 
                                    options={devsOptions}
                                    multiple
                        />
                      </>
                    )} */}          
                    <CustomButton text='Create event' type="submit" />
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default Calendar