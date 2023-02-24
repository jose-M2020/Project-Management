import { useEffect, useState } from "react";
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { formatDate } from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Header from "../components/Header";
import { tokens } from "../theme";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_EVENTS } from "../graphql/queries/eventQueries";
import Input from "../components/form/Input";
import CustomButton from "../components/CustomButton";
import { CREATE_EVENT, DELETE_EVENT } from '../graphql/mutations/eventMutations';
import CheckboxField from "../components/form/CheckboxField";
import { GET_PROJECTNAMES } from "../graphql/queries/projectQueries";
import AutoComplete from "../components/form/AutoComplete";
import CustomModal from "../components/CustomModal";
import { formatDateTime } from "../helpers/helpers";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  start: yup.string(),
  end: yup.string(),
  projectId: yup.string().nullable(),
  notify: yup.boolean(),
});

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({});
  
  // Apollo Client Events

  const { loading, data } = useQuery(GET_EVENTS);
  const [getProjects, { loading: loadingProjects, data: projectData = [] }] = useLazyQuery(GET_PROJECTNAMES);

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

  // Modals

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDetails, setOpenModalDetails] = useState(false);
  
  const handleOpenModalCreate = () => setOpenModalCreate(!openModalCreate);
  const handleOpenModalDelete  = () => setOpenModalDelete(!openModalDelete);
  const handleOpenModalDetails  = () => setOpenModalDetails(!openModalDetails);

  // FullCalendar events

  const handleDateClick = selected => {
    setSelectedDate(selected)
    setOpenModalCreate(true);
  };

  const handleEventClick = selected => {
    setSelectedEvent(selected);
    setOpenModalDelete(true);
  };
  
  const handleEventDetailsClick = selected => {
    setSelectedEvent(selected);
    setOpenModalDetails(true);
  };

  const onSubmit = async (values, actions) => {
    const calendarApi = selectedDate.view.calendar;
    const variables = {
      ...values,
      start: selectedDate.startStr,
      end: selectedDate.endStr,
      allDay: selectedDate.allDay,
    }
    
    const {data: {createEvent: newEvent} } = await createEvent({ variables });
    
    calendarApi.unselect();
    calendarApi.addEvent({
      id: newEvent._id,
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
    });

    setOpenModalCreate(false);
    actions.resetForm();
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

  // Async AutoComplete 

  const [open, setOpen] = useState(false);
  const loadingProjectField = open && (projectData?.length === 0);

  useEffect(() => {
    let active = true;
    if (!loadingProjectField) {
      return undefined;
    };

    (async () => {
      if (active && !loadingProjects) {
        await getProjects();
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingProjectField, getProjects, loadingProjects, projectData]);
  
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
                    cursor: 'pointer'
                  }}
                  onClick={() => handleEventDetailsClick(event)}
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
              initialEvents={data?.events.map(({_id, ...props}) => (
                {id: _id, ...props}
              ))}
            />
          </Box>
        </Box>
      ) : (
        <h5>Loading...</h5>
      )}

      
      <CustomModal
        title='Create an event'
        subtitle={`${formatDateTime(selectedDate.startStr)} - ${formatDateTime(selectedDate.endStr)}`}
        open={openModalCreate}
        handleModal={handleOpenModalCreate}
      >
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
                <AutoComplete
                  label="Project" 
                  name="projectId" 
                  options={projectData?.projects}
                  valueField='_id'
                  setLabel={option => option?.name}
                  async={true}
                  open={open}
                  setOpen={setOpen}
                  loading={loadingProjectField}
                />
                <CheckboxField
                  name='notify'
                  label='Notify'
                />
                <CustomButton 
                  text='Create event' 
                  type="submit"
                  btnstyle="primary"
                  loading={postLoading}
                />
              </Stack>
            </Form>
          )}
        </Formik>
      </CustomModal>
      <CustomModal
        title={`Are you sure you want to delete the event "${ selectedEvent?.event?.title }"?`}
        open={openModalDelete}
        handleModal={handleOpenModalDelete}
      >
        <form onSubmit={handleDelete}>
          <Box display='flex' justifyContent='end'>
            <CustomButton
              text='Delete Event'
              btnstyle="danger"
              type='submit'
              loading={deleting}
            />
          </Box>
            
        </form>
      </CustomModal>
      <CustomModal
        open={openModalDetails}
        handleModal={handleOpenModalDetails}
      >
        <Typography variant="span">
          {formatDateTime(selectedEvent.start)} - {formatDateTime(selectedEvent.end)}
        </Typography>
        <Typography variant="h3" mb={2}>{ selectedEvent?.title }</Typography>
        <List sx={{ width: '100%', padding: 0 }}>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: colors.blueAccent[300] }}>
                <DescriptionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Description"
              secondary={selectedEvent?.description || 'No description'} 
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: colors.blueAccent[300] }}>
                <AttachFileIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Project"
              secondary={selectedEvent?.project?.name || 'No linked project'} 
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: colors.blueAccent[300] }}>
                <NotificationsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Notify"
              secondary={selectedEvent?.notify ? 'Activated' : 'Disabled'} 
            />
          </ListItem>
        </List>
      </CustomModal>
    </Box>
  )
}

export default Calendar