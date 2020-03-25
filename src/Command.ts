#!/usr/bin/env node
import {CreateCollections, DropCollections} from "./Collections";
import {execSync} from 'child_process';
import {get} from 'shades';
import {pipe, curry} from 'ramda';

/*
    This might become it's own project. Commands store needs
    to be kept here, and rest of the functinality might
    becine own library.
    TODO: 
        - Find the deepest command you can find
        and pass the rest as arugments to the function!.
        - It might become a simple to use style as 
        it gives you an overview of possible actions instantly.
*/

// Grab provided args.
const [,, ... args] = process.argv;

const carryArg = curry((fn: Function, arg: any) => {
    fn(arg);
    return arg;
});
const carriedLog = carryArg(console.log);
const logAndRunCommand = pipe(carriedLog, execSync, console.log);

const setupFaunaDB = () => (logAndRunCommand("docker run -d --rm --name faunadb -p 8443:8443 fauna/faunadb"));
const destroyFaunaDB = () => (logAndRunCommand("docker rm --force faunadb"));
const resumeFaunaDB = () => (logAndRunCommand("docker start faunadb"));

const commandsStore = {
    debug: {
        cwd: pipe(process.cwd, console.log, process.cwd)
    },
    fauna:{
        start: setupFaunaDB,
        resume: resumeFaunaDB,
        cleanStart: pipe(destroyFaunaDB, setupFaunaDB)
    },
    collections: {
        create: CreateCollections,
        drop: DropCollections
    }
};

export const findNestedCommand = (commandChain: Array<string>) => {
    console.log(commandChain);
    // @ts-ignore
    return get(...commandChain)(commandsStore);
};

if(process.env.FAUNA_ENV !== 'test'){
    Promise.resolve(findNestedCommand(args)()).then((result)=>{
        console.log(result);
    }).catch((e)=>{
        console.error('Error at calling the function.',e);
    });
}

