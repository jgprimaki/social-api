import Team from "../models/team.model";
import {
  findAll as genericFindAll,
  findById as genericFindById
} from "./generic.service";

export function create(data) {
  return Team.create(data.input);
}

export function findAll(args) {
  return genericFindAll(Team, args);
}

export function findById(args) {
  return genericFindById(Team, args);
}
