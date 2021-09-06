# Fish factory

truck branch is for truck

master branch is for factory.

## Build for production  

Remember: Fix the config for the api. Need to read that thing...

``` bash
$docker build . -f Dockerfile.prod -t mattiaskjellsson/omegalax-front2:[truck | factory]

$docker push mattiaskjellsson/omegalax-front2:[factory | truck]
```
