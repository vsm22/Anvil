# Scrobbletree

Scrobbletree is a web app for music exploration. The purpose of the app is to allow users to search for and get info about music artists and to browse related artists using information amalgamated from remote APIs. The project was created to demonstrate usage of a particular technology stack - a *Spring Boot* back-end with a *React* front-end using *Flux* and *React Router 4*.

## Repo Structure

*src\main\java\vsm22\scrobbletree* - back-end components using Java and Spring Boot
*src\main\js* - front-end components using React
*src\main\resources* - static resources

## Project Design Notes
### Back-end (Java with Spring Boot)

The back-end is built with *Spring Boot* and is meant to both serve the static resources for the front-end and to act as the REST API amalgamating data from remote resources and serving it as formatted JSON.

The front end is served as a static page, leaving client-side rendering, including path resolution to be handled by *React* and *React Router*. The front-controller, contained in the `MainController` class, is thus configured to return the static index.html page for all valid path requests, with the specific path resolution for each particular function of the app left to be handled by the *React Router*.

The REST API function of the back-end is fulfilled by the `MainRestController` class, which returns data amalgamated from remote resources as formatted JSON. The JSON served by this component is decoupled from the data received from the remote resources via the separation of the business logic into *Remote Resource Accessor* classes which obtain and parse data from remote resources, and a `DataBuilder` class, which amalgamates the obtained data, builds a local representation, and delivers it as JSON via the `MainRestController`. The following diagram provides an overview of the components involved in the back-end logic.

![Back-end diagram](https://image.ibb.co/ikV9Ga/scrobbletree_rest_diagram.png)

The dashed boxes in in the illustration indicate the two major component blocks - the *Data Builder*, which is responsible for providing formatted data to the client via the *Rest Controller*, and the *Remote Resource Accessors and Parsers* which request data from the remote APIs and provide it to the *Data Builder*. The separation into these two component blocks ensures loose coupling between the front-end and the remote resources. The *Data Builder* acts as a mediating element: should the backend be updated with additional or different remote resources, the front-end can still receive the data format it expects; conversely, should the front-end be changed to expect a different data format, this can be accommodated without affecting how the app queries the remote resources.

Because the structure of the data received from the remote resources may not be uniform (for example the “biography” field from some artist queries may be missing), a guard was required to ensure local representation of the data can still be constructed. This was accomplished by providing the local data representation with constructors that take a *map* as an argument. Because a  *map* argument can allow the constructor to check for the availability of arguments and use only the ones available and needed, it allows the data class to be decoupled from the parser - if data fields are added to or removed from either the parser or the data class, the code will not break because the constructor can check which arguments are available before constructing the data object.

Both a server-side and client-side caches are used. The server-side cache is handled by Spring using Spring’s `@Cacheable` annotation and `ConcurrentHashMap` for the default cache store. The client-side cache is implemented as a hash table within the data stores, and is maintained with a last-accessed time-based expiry implementation.

### Front-end (JavaScript with React, Flux, and React-Router 4)

The front-end is built with *React* using *Flux* and *React-Router 4*. The components are organized in a hierarchical tree and mounted in response to url paths resolved by the *React Router*. Data propagation through the app is implemented using a *Flux* model.

The following diagram outlines the data propagation

![Flux diagram](https://image.ibb.co/kNgzGa/scrobbletree_flux_diagram.png)

In this model, the data used by the application resides as *state* in the *Data Stores* and flows into the *Component Tree* via props. The *Main Flux Container* is the main entry point into the application, rendered in *index.js* as the root of the *React DOM* and acts as the glue between the *React Component Tree*, the *Action Dispatcher*, and the *Data Stores*. It maintains a dictionary of hooks for *Dispatcher Actions* and *Data Store States* and provides these hooks to the *Component Tree*. Whenever an event occurs in the component tree, such as the user searching for an artist, the event triggers an *Action* in the *Action Dispatcher*. The action is propagated to the *Data Stores*, which execute their business logic and update their state according to the *Action Type*. When the *Data Stores* are updated, the *Component Tree* is re-rendered, reflecting the new data state.  
