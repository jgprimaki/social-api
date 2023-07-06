import User from "../models/user.model";
import {
  findAll as genericFindAll,
  createOrUpdateOne as genericCreateOrUpdateOne
} from "./generic.service";

export async function createOrUpdate(args) {
  const { input: obj } = args;
  await genericCreateOrUpdateOne(User, obj, {
    keycloak_uuid: obj.keycloak_uuid
  });

  return findById(obj);
}

export async function update(args) {
  const { input: obj } = args;
  await User.findOneAndUpdate(
    { keycloak_uuid: obj.keycloak_uuid },
    { theme_dark: obj.theme_dark }
  );
}

export function findAll(args) {
  return populate(genericFindAll(User, args));
}

export function findById(user) {
  return populate(User.findOne({ keycloak_uuid: user.keycloak_uuid }));
}

function populate(document) {
  return document.populate({ path: "cake_teams" }).populate({ path: "teams" });
}
