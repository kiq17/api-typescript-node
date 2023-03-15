import * as create from "../cidades/create";
import * as deleteCity from "./delete";
import * as selectCityId from "../cidades/getById";
import * as update from "../cidades/update";
import * as getAll from "../cidades/getAll";
import * as count from "../cidades/count";

export const cidadesProvider = {
    ...create,
    ...deleteCity,
    ...selectCityId,
    ...update,
    ...getAll,
    ...count
};