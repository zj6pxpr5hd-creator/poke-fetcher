
    export function checkCache(key){
        const cache = JSON.parse(localStorage.getItem(key));
        if( cache !== null){  //checks if pokemon data is in cache
            if(cache.fetchedAt > (Date.now()-3600*1000)){ //checks how old is cache
                return true;    //if its less than 1h old is ok
            }else{
                localStorage.removeItem(key);  //if its older removes it from cache
            }
        }
        return false; // if its not in cache or is too old returns false
    }


    export function saveCache(key, data){ //saves pokemon data in cache with time of fetching

        // object to save contains the time of fetching and the pokemon data
        const save = {  
            data: data,
            fetchedAt: Date.now(),
            lastAccessed: Date.now()
        };
        
        //if localStorage contains already 12 elements deletes the oldest one to make space for the new data
        while(localStorage.length >= 12){

            //finding oldest data
            let oldestIndex = 0;    //initializes index of oldest data il localStorage
            let oldestDate = JSON.parse(localStorage.getItem(localStorage.key(0))).lastAccessed; //initializes date of oldest data il localStorage
            for(let i=1; i<localStorage.length; i++){ //scans through localStorage 
                if(JSON.parse(localStorage.getItem(localStorage.key(i))).lastAccessed < oldestDate){  //if data is older than current oldest data updates oldest data
                    oldestIndex = i;
                    oldestDate = JSON.parse(localStorage.getItem(localStorage.key(i))).lastAccessed;
                }
            }
            localStorage.removeItem(localStorage.key(oldestIndex));  //removes oldest dataset
        }
        localStorage.setItem(key, JSON.stringify(save));    //saves new data
    }

    //retrieves pokemon data from cache based on assigned key
    export function retrieveDataFromCache(key){
        let el = JSON.parse(localStorage.getItem(key));
        el.lastAccessed = Date.now(); // updates last retrieval time
        localStorage.setItem(key, JSON.stringify(el));
        return el;
    }