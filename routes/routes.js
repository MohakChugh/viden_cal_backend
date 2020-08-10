// @ts-check
// TODO: Add try catch in all the routes

const express = require('express');
const router = express.Router();
const { addEvent, addGuestsForEvent, editEvent, acceptEvent, getEventsPerUser, getUserPerEvent } = require('../database/functions')

router.post('/insertevent', (req, res) => {
  const { date, event_name, event_description, type, location, start_time, end_time } = req.body;

  const result = addEvent(date, event_name, event_description, type, location, start_time, end_time);
  res.json({
    error: false,
    success: true,
    message: 'Event Added Successfully!',
    response: result
  })
})


router.post('/addGuestsForEvent', (req, res) => {
  // guests_ids is an array
  const { event_id, guest_ids } = req.body;

  const result = addGuestsForEvent(event_id, guest_ids);
  res.json({
    error: false,
    success: true,
    message: 'Guests Added Successfully!',
    response: result
  })
})

router.post('/editEvent', async (req, res) => {
  const { event_id, update_field, updated_value } = req.body;

  const result = await editEvent(event_id, update_field, updated_value);
  res.json({
    error: false,
    success: true,
    message: 'Edited Successfully!',
    response: result
  })
})

router.post('/acceptEvent', (req, res) => {
  const { event_id, user_id } = req.body;

  const result = acceptEvent(event_id, user_id);
  res.json({
    error: false,
    success: true,
    message: 'Invitation Accepted Successfully!',
    response: result
  })
})

// All events for a given user
router.post('/eventsUser', async (req, res) => {
  const { user_id } = req.body;

  const result = await getEventsPerUser(user_id);
  res.json({
    error: false,
    success: true,
    message: 'List of events the user is invited in!',
    response: result
  })
})

// All users for a given event
router.post('/userEvents', async (req, res) => {
  const { event_id } = req.body;
  const result = await getUserPerEvent(event_id);
  res.json({
    error: false,
    success: true,
    message: 'All users going to the event',
    response: result
  })
})

module.exports = router;
