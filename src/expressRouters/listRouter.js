const express = require('express');

module.exports = (knex) => {
    const router = express.Router();

    router.post('/', (request, response) =>{
        console.log('Received request to add list:', request.body);
        let list = request.body;
        knex('lists')
            .insert({
                list_name: list.list_name,
                list_description: list.list_description,
                list_items: JSON.stringify(list.list_items)
            })
            .then(() => {
                response.status(200).send('List added successfully');
            })
            .catch((error) => {
                response.status(500).send('Error adding list: ' + error.message);
            });
      
    })
    return router;
};
