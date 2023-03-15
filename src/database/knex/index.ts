import { knex } from "knex";
import { development, production, test } from "../knex/Environment";


const getState = (value: String) => {
    switch (value) {
        case "development":
            return development;
        case "production":
            return production;
        case "test":
            return test;
        default:
            return development;
    }
};

export const Knex = knex(getState(""));