#!/usr/bin/env node
import {CreateCollections, DropCollections} from "./Collections";
import {execSync} from 'child_process';
import {get} from 'shades';
import * as _ from 'lodash';

// Grab provided args.
const [,, ... args] = process.argv;

const faunaStart = () => {
    const command = "sudo docker run -d --rm --name faunadb -p 8443:8443 fauna/faunadb";
    console.log(command);
    const result = execSync(command);
    console.log(result);
};

const commandsStore = {
    debug: {
        cwd: _.flow(process.cwd, console.log, process.cwd)
    },
    fauna:{
        start: faunaStart
    },
    collections: {
        create: CreateCollections,
        drop: DropCollections
    }
};

export const findNestedCommand = (commandChain: Array<string>) => {
    // @ts-ignore
    return get(...commandChain)(commandsStore);
};

if(process.env.NODE_ENV !== 'test'){
    findNestedCommand(args)();
}

