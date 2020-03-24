#  Bluedruid

Bluedruid is a FaunaDB orm library. The has few aims;
 - Simple accessor or writer functions to use in everyday cases(ex: finding an element by a property)
 - A schema helper that lets us describe the state of the database in a consistent way
 - Making it easier to create complex indexes(ex: autocomplete index)
 
The focus is not supporting everything *fauna* package provides, but to rather
limit them in a more relational friendly way.

# Tutorial

Here will be some steps how to get up and running. Some examples will follow below.
 
## Installation

```npm install --save bluedruid```

### Docker without `sudo`

https://docs.docker.com/install/linux/linux-postinstall/

# How to use

Bluedruid has 2 main components;
- A command line tool `bdo` which lets you quickly do operations on collections level. Creating defined collections, do deleting them would be examples.
- A set of functions(will be referred as library) that let's you interact with FaunaDB without dealing with FQL or GraphQL.

## bdo

`bdo` command line tool has the following commands available.

### debug
- `debug cwd`: Prints the cwd as seen by the library.
### fauna
- `fauna start`: Prints and runs the command needed for starting faunadb docker image.(`docker run -d --rm --name faunadb -p 8443:8443 fauna/faunadb`)
- `fauna cleanStart`: Resets faunadb container.

### collections
Note all operations under collections only modify the collections defined
in `collections.yml` file.
- `collections create`: Creates collections defined in `./db/collections.yml`
- `collections drop`: Drops th ecollections defined in `./db/collections.yml`

## Library

Library functions are defined in 2 main categories;
- `Read`: A collection of functions related with reading data from faunadb.
- `Write`: A collection of functions related with writing data to faunadb.

### Read

- `GetAllDocuments`:
- `GetElementByRef`:
- `MatchParamOnIndex`:
- `GetRefsByParams`:
- `MatchParamsByByIndex`:

### Write

- `CreateDocument`: