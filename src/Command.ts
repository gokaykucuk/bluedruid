#!/usr/bin/env node
import {CreateCollections} from "./Manage";
import {execSync} from 'child_process';
import {get} from 'shades';
const _ = require('lodash');

// Grab provided args.
const [,, ... args] = process.argv;

const faunaStart = () => {
    const command = "sudo docker run -d --rm --name faunadb -p 8443:8443 fauna/faunadb";
    console.log(command);
    const result = execSync(command);
    console.log(result);
};

const command = {
    debug: {
        cwd: _.flow(process.cwd, console.log)
    },
    fauna:{
        start: faunaStart
    },
    db: {
        create:{
            collections: CreateCollections
        }
    }
};

export const findNestedCommand = (commandChain: Array<string>) => {
    const foundCommand = get(commandChain.join('.'));
    return commandChain.reduce((obj: any, prop: string)=>{
    //     return obj && obj[prop];
    // }, command);
    // return foundCommand;
};

findNestedCommand(args);
