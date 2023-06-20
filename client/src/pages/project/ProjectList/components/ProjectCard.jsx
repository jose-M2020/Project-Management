import { 
  AvatarGroup,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../../../theme";
import { formatDateTime } from "../../../../helpers/dateTime";
import ProfileAvatar from "../../../../components/user/ProfileAvatar";
import { hexToRgba } from "../../../../helpers/colors";
import useProjectStatus from "../../../../hooks/useProjectStatus";

export default function ProjectCard({ project }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { color } = useProjectStatus(project.status)
  
  return (
      <CardActionArea 
        sx={{ height: '100%', maxWidth: 500 }}
        component={Link}
        to={`/projects/${project._id}/overview`}
      >
        <Card 
          sx={{ 
            backgroundColor: colors.primary[500],
            boxShadow: `1px 1px 6px ${colors.blueAccent[800]}`,
            height: '100%',
            marginX: 'auto',
            padding: '15px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              gap: '15px'
            }}
          >
            {/* Header */}
            <Box 
              sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {/* <Typography component='div' variant="subtitle2">
                {formatDateTime(+project?.createdAt, false)}
              </Typography> */}
              <ProfileAvatar userData={{firstname: project.name}} />
              <Typography 
                variant="subtitle2"
                color={color}
                bgcolor={hexToRgba(color, .2)}
                p='5px'
                borderRadius='7px'
              >
                <Typography
                  variant="span"
                  sx={{
                    backgroundColor: color,
                    borderRadius: '50%',
                    width: '8px',
                    display: 'inline-block',
                    aspectRatio: '1/1',
                    marginRight: '3px'
                  }}
                ></Typography>  
                <strong>{project.status}</strong>
              </Typography>
            </Box>
            {/* Content */}
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                flex: '1 0 auto',
                padding: '0 !important'
              }}
            >
              <Stack spacing={1}>
                <Typography 
                  component="div"
                  variant="h4"
                  fontWeight='600'
                  noWrap={true}
                >
                  {project.name}
                </Typography>
                <Typography 
                  component="div"
                  variant="p"
                  sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      color: colors.grey[100]
                  }}
                >
                  {project.description}
                </Typography>
              </Stack>

              { project?.duration?.length > 0 && (
                <Box display='flex'>
                  <Box sx={{
                    position: 'relative',
                    p: '6px 10px 6px',
                    border: `1px solid ${colors.grey[600]}`,
                    borderRadius: '4px',
                    lineHeight: '1px',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: '3px',
                      height: '100%',
                      bgcolor: colors.blueAccent[300],
                      borderRadius: '12px',
                      marginRight: '8px'
                    }
                  }}>
                    <Typography>
                      { project?.duration[0] } - { project.duration[1] }
                    </Typography>
                    <Typography component='span' fontSize='12px' color={colors.blueAccent[200]}>Due date</Typography>
                  </Box>
                </Box>
              )}

              <Box display="flex" gap={1}>
                {project?.tags?.map( (item, i) => (
                  <Chip key={i} label={item} variant="outlined" color="secondary" />
                ))}
              </Box>
              <Box display='flex'>
                {!!(project?.members?.length) && (
                  <AvatarGroup max={3}>
                    {project.members.map((item, index) => (
                      <ProfileAvatar
                        key={index}
                        userData={item}
                        sx={{
                          // bgcolor: colors.blueAccent[500],
                          width: 28, height: 28,
                          borderColor: `${colors.primary[400]} !important`
                        }}
                      />
                    ))}
                  </AvatarGroup>
                )}
              </Box>
            </CardContent>
            {/* Footer */}
          </Box>
        </Card>
      </CardActionArea>
    );
  }