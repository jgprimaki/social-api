import NotificationModel from "../../models/notification.model";
import MeetingModel from "../../models/meeting.model";
import {
  findAll as genericFindAll,
  documentCount,
  findById as genericFindById,
} from "../generic.service";
import { validateDuplicatedMeeting } from "./validations";

export async function create(input) {
  await validateDuplicatedMeeting(input);

  const meeting = await MeetingModel.create(input);
  return await populate(meeting).execPopulate();
}

export function cancel(id) {
  return populate(
    MeetingModel.findByIdAndUpdate({ _id: id }, { active: false })
  );
}

export function findAll(args) {
  return populate(genericFindAll(MeetingModel, args));
}

export function findById(args) {
  return populate(genericFindById(MeetingModel, args));
}

export function count() {
  return documentCount(MeetingModel);
}

export async function notificationCanceled(id) {
  const meeting = await findById({ id });
  const { members } = meeting;
  const notifications = [];

  members.forEach((user) => {
    notifications.push({
      user,
      color: "error",
      icon: "mdi-calendar-remove-outline",
      type: "meeting_canceled",
      description: createDescription(meeting, "Cancelada"),
    });
  });

  return notifications;
}

export function notificationCreated(input) {
  const { members } = input;
  const notifications = [];

  members.forEach((user) => {
    notifications.push({
      user,
      color: "info",
      icon: "mdi-google-classroom",
      type: "meeting_created",
      description: createDescription(input, "Agendada"),
    });
  });

  return notifications;
}

function populate(document) {
  return document.populate({ path: "user" }).populate({ path: "members" });
}

function createDescription(input, typeName) {
  const { name, start_date, start_time, end_time, room } = input;
  return `<strong>${typeName}</strong> - Reunião <strong>${name}</strong> para o dia ${start_date} entre ${start_time} até ${end_time} na Sala ${
    room === 1 ? "Conferência" : "Térreo"
  }.`;
}
