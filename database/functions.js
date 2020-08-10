'use-strict'
// @ts-check

const graphqlrequest = require('graphql-request');
const GraphQLClient = graphqlrequest.GraphQLClient;

const addEvent = async (date, event_name, event_description, type, location, start_time, end_time) => {
    const client = new GraphQLClient('https://wanted-lacewing-49.hasura.app/v1/graphql', {
        headers: {
            'content-type': 'application/json',
        }
    })
    const query = `mutation MyMutation {
        insert_events(objects: {
            date: "${date}", 
            end_time: "${end_time}", 
            event_description: "${event_description}", 
            event_name: "${event_name}", 
            location: "${location}", 
            start_time: "${start_time}", 
            type: "${type}"}) {
          affected_rows
        }
      }`;
    const result = await client.request(query)
        .then(data => {
            return data;
        })
        .catch((err) => { return err });
    console.log(result);
    return result;
};

const addGuestsForEvent = async (event_id, guest_ids) => {
    const client = new GraphQLClient('https://wanted-lacewing-49.hasura.app/v1/graphql', {
        headers: {
            'content-type': 'application/json',
        },
    })

    /**
        guests_ids should be of the type
        [{event_id: "",user_id: ""}, 
        {event_id: "", user_id: ""},
        {event_id: "", user_id: ""},
        {event_id: "", user_id: ""},
        {event_id: "", user_id: ""}]
     */

    const query = `mutation MyMutation {
        insert_event_goers(objects: ${guest_ids}) {
          affected_rows
        }
      }`;
    const result = await client.request(query)
        .then(data => {
            return data;
        })
        .catch((err) => { return err });
    console.log(result);
    return result;
};

const editEvent = async (event_id, update_field, updated_value) => {
    const client = new GraphQLClient('https://wanted-lacewing-49.hasura.app/v1/graphql', {
        headers: {
            'content-type': 'application/json',
        },
    })
    const query = `mutation MyMutation {
        update_events(where: {id: {_eq: "${event_id}"}}, _set: {${update_field}: "${updated_value}"}) {
          affected_rows
        }
      }
      `;
    const result = await client.request(query)
        .then(data => {
            return data;
        })
        .catch((err) => { return err });
    console.log(result);
    return result;
};

const acceptEvent = async (event_id, user_id) => {
    const client = new GraphQLClient('https://wanted-lacewing-49.hasura.app/v1/graphql', {
        headers: {
            'content-type': 'application/json',
        },
    })
    const query = `mutation MyMutation {
        update_event_goers(where: {
            event_id: {_eq: "${event_id}"}, 
            user_id: {_eq: "${user_id}"}},
            _set: {isGoing: true}) {
          affected_rows
        }
      }`;
    const result = await client.request(query)
        .then(data => {
            return data;
        })
        .catch((err) => { return err });
    console.log(result);
    return result;
};

const getEventsPerUser = async (user_id) => {
    const client = new GraphQLClient('https://wanted-lacewing-49.hasura.app/v1/graphql', {
        headers: {
            'content-type': 'application/json',
        },
    })
    const query = `query MyQuery {
        event_goers(where: {user_id: {_eq: "${user_id}"}}) {
          event_id
          id
          isGoing
          user_id
        }
      }`;
    return await client.request(query)
        .then(data => {return data})
        .catch((err) => { return err });
};

const getUserPerEvent = async (eventsID) => {
    const client = new GraphQLClient('https://wanted-lacewing-49.hasura.app/v1/graphql', {
        headers: {
            'content-type': 'application/json',
        },
    })
    const query = `query MyQuery {
        event_goers(where: {event_id: {_eq: "${eventsID}"}, isGoing: {_eq: true}}) {
          event_id
          id
          isGoing
          user_id
        }
      }
      `;
    return await client.request(query)
        .then(data => {
            return data;
        })
        .catch((err) => { return err });
};


exports.addEvent = addEvent;
exports.addGuestsForEvent = addGuestsForEvent;
exports.editEvent = editEvent;
exports.acceptEvent = acceptEvent;
exports.getUserPerEvent = getUserPerEvent;
exports.getEventsPerUser = getEventsPerUser;