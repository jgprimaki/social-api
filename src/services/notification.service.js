import NotificationModel from "../models/notification.model";
import {
  findAll as genericFindAll,
  findById as genericFindById,
} from "./generic.service";

export function create(notification) {
  return NotificationModel.create({ ...notification, active: true });
}

export function findAll(args) {
  return populate(genericFindAll(NotificationModel, args));
}

export function findById(args) {
  return populate(genericFindById(NotificationModel, args));
}

function populate(document) {
  return document.populate({ path: "user" });
}

export function deactivateNotification(args) {
  return NotificationModel.findByIdAndUpdate(
    { _id: args.id },
    { active: false }
  );
}
