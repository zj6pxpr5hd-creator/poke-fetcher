
    export function checkCache(key){
        const cache = JSON.parse(localStorage.getItem(key));
        if( cache !== null){  //checks if pokemon data is in cache
            if(cache.date > (Date.now()-3600)){ //checks how old is cache
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
            time: Date.now()
        };
        
        //if localStorage contains already 12 elements deletes the oldest one to make space for the new data
        if(localStorage.length >= 12){

            //finding oldest data
            let oldestIndex = 0;    //initializes index of oldest data il localStorage
            let oldestDate = localStorage.getItem(localStorage.key(0)).data; //initializes date of oldest data il localStorage
            for(let i=1; i<12; i++){ //scans through localStorage 
                if(localStorage.getItem(localStorage.key(i)).data < oldestDate){  //if data is older than current oldest data updates oldest data
                    oldestIndex = 1;
                    oldestDate = localStorage.getItem(localStorage.key(i)).data;
                }
            }
            localStorage.removeItem(localStorage.key(oldestIndex));  //removes oldest dataset
        }
        localStorage.setItem(key, JSON.stringify(save));    //saves new data
    }