import CakeTeam from "../models/cakeTeam.model";
import {
  findAll as genericFindAll,
  findById as genericFindById
} from "./generic.service";

export function create(data) {
  return CakeTeam.create(data.input);
}

export function findAll(args) {
  return populate(genericFindAll(CakeTeam, args));
}

export function findById(args) {
  return populate(genericFindById(CakeTeam, args));
}

function populate(document) {
  return document.populate({ path: "cake_schedule" });
}
