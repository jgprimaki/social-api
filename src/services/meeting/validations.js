import { ApolloError } from "apollo-server";

import Meeting from "../../models/meeting.model";

/**
 * Validate if already there is a meeting with the same room, start_date, start_time and end_time.
 * @param {Object} input contains the meeting to be created.
 */

export async function validateDuplicatedMeeting(input) {
  const { start_date, start_time, end_time, room } = input;
  const isDuplicated =
    (await Meeting.findOne({
      room,
      start_date,
      active: true,
      $or: [
        {
          $and: [
            { start_time: { $eq: start_time } },
            { end_time: { $eq: end_time } }
          ]
        },
        {
          $and: [
            { start_time: { $lte: start_time } },
            { end_time: { $gte: start_time } }
          ]
        },
        {
          $and: [
            { start_time: { $gt: start_time } },
            { start_time: { $lt: end_time } }
          ]
        }
      ]
    }).countDocuments()) > 0;

  if (isDuplicated) {
    throw new ApolloError(
      "meeting.duplicated",
      "handled_message",
      data.input
    );
  }
}
