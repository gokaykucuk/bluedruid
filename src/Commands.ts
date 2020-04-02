#!/usr/bin/env node
import { execSync } from 'child_process';
import { pipe, curry } from 'rambda';

const carryArg = curry((fn: Function, arg: any) => {
	fn(arg);
	return arg;
});
const carriedLog = carryArg(console.log);
const logAndRunCommand = pipe(carriedLog, execSync, console.log);

export const setupFaunaDB = () => (logAndRunCommand("docker run -d --rm --name faunadb -p 8443:8443 fauna/faunadb"));
export const destroyFaunaDB = () => (logAndRunCommand("docker rm --force faunadb"));
export const resumeFaunaDB = () => (logAndRunCommand("docker start faunadb"));

