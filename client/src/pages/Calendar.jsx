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
  Checkbox,
  Fade,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Header from "../components/Header";
import { tokens } from "../theme";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EVENTS } from "../graphql/queries/eventQueries";
import Input from "../components/form/Input";
import CustomButton from "../components/CustomButton";
import { CREATE_EVENT, DELETE_EVENT } from '../graphql/mutations/eventMutations';

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
  start: yup.string(),
  end: yup.string(),
  projectId: yup.string().nullable(),
  notify: yup.boolean(),
});

const Calendar = () => {
  const { loading, data } = useQuery(GET_EVENTS);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});
  
  const handleOpenModalCreate = () => setOpenModalCreate(!openModalCreate);
  const handleOpenModalDelete = () => setOpenModalDelete(!openModalDelete);
  
  const [createEvent, { postLoading, postError }] = useMutation(CREATE_EVENT, {
		refetchQueries: [
			{
				query: GET_EVENTS,
			},
			"getEvents",
		],
	});
  const [deleteEvent, { loading: deleting, error: deleteError }] = useMutation(DELETE_EVENT, {
    refetchQueries: ["getEvents"],
  });

  const handleDateClick = selected => {
    setSelectedDate(selected)
    setOpenModalCreate(true);
  };

  const handleEventClick = async (selected) => {
    setSelectedEvent(selected);
    setOpenModalDelete(true);
  };

  const onSubmit = async (values, actions) => {
    const calendarApi = selectedDate.view.calendar;
    const variables = {
      ...values,
      start: selectedDate.startStr,
      end: selectedDate.endStr,
      allDay: selectedDate.allDay,
    }
    console.log(variables)
    // const {data: {createEvent: newEvent} } = await createEvent({ variables });
    
    // calendarApi.unselect();
    // calendarApi.addEvent({
    //   id: newEvent._id,
    //   title: newEvent.title,
    //   start: newEvent.start,
    //   end: newEvent.end,
    // });

    // setOpenModalCreate(false);
    // actions.resetForm();
  }

  const handleDelete = async e => {
    e.preventDefault();

    const result = await deleteEvent({
			variables: { id: selectedEvent.event.id },
		});

		if (result.data.deleteEvent._id) {
      setOpenModalDelete(false)
    }

    selectedEvent.event.remove();
  }

  return (
    <Box m="20px">
      <Header title="CALENDAR" subtitle="Managing events" />
      
      {!loading ? (
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
              {data?.events.map((event) => (
                <ListItem
                  key={event._id}
                  sx={{
                    backgroundColor: colors.blueAccent[700],
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
              initialEvents={data?.events.map(({_id, ...props}) => (
                {id: _id, ...props}
              ))}
            />
          </Box>
        </Box>
      ) : (
        <h5>Loading...</h5>
      )}

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
            <Typography id="transition-modal-title" variant="h4" component="h2" mb={4}>
              Create an event
            </Typography>
            <Formik
              initialValues={{
                title: '',
                description: '',
                start: '',
                end: '',
                projectId: null,
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
                    <FormControlLabel 
                      control={
                        <Checkbox 
                          icon={<NotificationsNoneOutlinedIcon />} 
                          checkedIcon={<NotificationsIcon />}
                        />
                      }
                      name="notify"
                      label="Notify"
                    />
                    <CustomButton 
                      text='Create event' 
                      type="submit"  
                      loading={postLoading}
                    />
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModalDelete}
        onClose={handleOpenModalDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalDelete}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h4" mb={4}>
              Are you sure you want to delete the event "{ selectedEvent?.event?.title }"?
            </Typography>
            <form onSubmit={handleDelete}>
              <CustomButton
                text='Delete Event'
                btnstyle="primary"
                type='submit'
              />
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default Calendar