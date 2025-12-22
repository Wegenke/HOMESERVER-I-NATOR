const express = require('express');

module.exports = (knex) => {
    const router = express.Router();

    router.get('/', (req, res) =>{
        knex('master_type_enums').innerJoin('master_type_enum_items', 'master_type_enums.id', 'master_type_enum_items.enum_id')
            .select('master_type_enums.type_name as enum_type', 'master_type_enum_items.item_name', 'master_type_enum_items.item_display_text', 'master_type_enum_items.item_additional_info', 'master_type_enum_items.item_value')
            .orderBy(['master_type_enums.id', 'master_type_enum_items.item_value'])
            .then(data => {
                let groupedData = {};
                data.forEach(row => {
                    if (!groupedData[row.enum_type]) {
                        groupedData[row.enum_type] = [];
                    }
                    groupedData[row.enum_type].push({
                        item_name: row.item_name,
                        item_display_text: row.item_display_text,
                        item_additional_info: row.item_additional_info,
                        item_value: row.item_value
                    });
                })
                
                res.json(groupedData)
            })
    })
    return router;
};
