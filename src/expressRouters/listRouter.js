const express = require('express');

module.exports = (knex) => {
    const router = express.Router();

    router.get('/lists', (request, response) => {
        knex('lists').select('*').then(lists => response.json(lists))
    })

    router.post('/lists', (request, response) =>{
        console.log('Received request to add list:', request.body);
        let {listType, listName, listDescription} = request.body;
        knex('lists')
            .insert({
                name: listName,
                description: listDescription,
                list_type_id: listType,
                list_status_type_id: 1
            })
            .then(() => {
                response.status(200).send('List added successfully');
            })
            .catch((error) => {
                response.status(500).send('Error adding list: ' + error.message);
            });
    })

    router.get('/lists/:id', (request, response) => {
        knex('lists').select('*').where({id: request.params.id}).then(lists => response.json(lists))
    })

    router.patch('/lists/:id', (request, response) => {
        response.status(200).send("The patch endpoint")
    })

    return router;
};
