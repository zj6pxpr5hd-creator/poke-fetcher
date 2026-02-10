# Pokè-Cache
Client-side caching with freshness and LRU eviction.
Poke-Cache is a small web application that uses the Poke-API to fetch pokemon data, and implements a client-side caching system using localStorage.
The goal of the project was not to build a Pokedex replica but to explore real-world concerns such as data freshness, eviction rules and user-controlled cache invalidation in a front-end only application.


## Why Poke API?

I chose the Poke API because:
- it is beginner-friendly and well documented
- it requires no authentication
- it provides a large and varied dataset (i only used the pokemon endpoint but there are many more), similar to real-world APIs
This allowed me to focus on system design rather than managing APIs limitations 


## Core Features

- Fetch Pokemon data from PokeAPI
- Cache API responses in localStorage
- Refreshes stale data 
- Displays data origin
- Allow manual cache refresh from the UI


## Caching Strategy

This was the core of the project so i will explain in detail how the caching works and the reasoning behind my choices.
The cache is saved in localStorage, a browser feature that lets you store small amounts of key–value data persistently on the client, surviving page reloads and browser restarts. This allows to keep the project fully fron-end.
Each cached entry includes:  
 - data: the actual pokemon data retrieved trought the PokeAPI
 - fetcheAt: timestap of when the data was retrieved from the API
 - lastAccess: timestamp of the most recent usage of the data

The cached data is considered valid for 1 hour after fetching (using the fetchedAt property).
Pokemon Data changes very rarely so there is no need to refresh it more than every hour.
If the cache exceeds 12 entries, the least recently accessed entry is evicted (using the lastAccess property).
Simulates a memory limit in the amout of data I can cache. Using the lastAccess property instead of the fetchedAt property better approximates an LRU eviction stategy while remaining simple.
Accessing cached data updates its lastAccessed value.
Users can manually refresh data by clicking a button.
The UI exposes cache behavior to make the system observable and debuggable.


## What i learned

- implementing a caching strategy in a front-end only application
- writing eviction rules, based on time or on last access
- displaying data neatly
- making technichal decisions based on trade-offs between speed and data freshness
