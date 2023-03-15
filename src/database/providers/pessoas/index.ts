import * as create from "../pessoas/create";
import * as deleteCity from "./delete";
import * as selectCityId from "../pessoas/getById";
import * as update from "../pessoas/update";
import * as getAll from "../pessoas/getAll";
import * as count from "../pessoas/count";

export const pessoasProvider = {
    ...create,
    ...deleteCity,
    ...selectCityId,
    ...update,
    ...getAll,
    ...count
};