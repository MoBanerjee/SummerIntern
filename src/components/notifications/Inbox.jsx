import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Badge, Typography, Paper, Pagination, Menu } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';

// Sample notification data
const sampleNotifications = [
  { id: 1, message: 'New comment on your post', details: 'John commented on your post: "Great post!"', timestamp: '2024-05-23 14:00:00', read: false },
  { id: 2, message: 'You have a new follower', details: 'Alice started following you.', timestamp: '2024-05-23 13:45:00', read: false },
  { id: 3, message: 'Your password was changed', details: 'Your password was successfully changed.', timestamp: '2024-05-23 12:30:00', read: true },
  // Add more sample notifications as needed
];

const InAppInbox = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const itemsPerPage = 5;

  const handleMailIconClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleNotificationClick = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true, expanded: !notification.expanded } : notification
    ));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotifications = notifications.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box m={2}>
      <IconButton onClick={handleMailIconClick} style={{color:'blue'}}>
        <Badge badgeContent={notifications.filter(notification => !notification.read).length} color="primary">
          <MailIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMailIconClick}
        PaperProps={{
          style: {
            width: '300px',
          },
        }}
      >
        <Paper elevation={3}>
          <Box p={2}>
            <Typography variant="h6">Notifications</Typography>
            <List>
              {paginatedNotifications.map(notification => (
                <ListItem
                  key={notification.id}
                  button
                  onClick={() => handleNotificationClick(notification.id)}
                  sx={{
                    backgroundColor: notification.read ? 'white' : '#f0f0f0',
                  }}
                >
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.expanded ? notification.details : notification.timestamp}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleDelete(notification.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Box mt={2} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(notifications.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          </Box>
        </Paper>
      </Menu>
    </Box>
  );
};

export default InAppInbox;
