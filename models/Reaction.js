const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');
const formatDate = require('../utils/utils');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max: [280, 'No more than 280 characters allowed'],
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: dayjs(),
            get: formatDate,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;