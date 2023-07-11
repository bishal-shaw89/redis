# redis

All the commands is case insensitive, we can write in small or caps.

Each data will return in string format

for insert SET key_name `eg: SET name bishal`

for update SET key_name `eg: SET name test`

for show GET key_name `eg: GET name`

for delete DEL key_name `eg: DEL name`

ttl: Time to live (how long the key will be active, by default it is '-1' means forever. we can set expiry in seconds)

expire key_name time_in_seconds `eg: expire name 10` (after 10 seconds the key will expire)

setex key_name time_in_seconds value_for_key (set a key with value and exprire time) `setex name 10 bishal`

lpush array_name value (left push or push the value in starting of the array) `eg: lpush language javascript`

lrange language 0 1 ('language' is the array name, '0 (zero) is the starting index', '1 is the ending index, -1 means all data')

rpush array_name value (right push or push the value at the end of the array) `eg: rpush language php`

lpop array_name (left pop or takeout the first element from the array)

rpop array_name (right pop or takeout the last element from the array)

SADD hobbies 'riding cycle' - (if we create array with SADD, it will be always unique). - (for adding space we need to give space in between the words).

SMEMBERS array_name (for getting all the data). `eg: SMEMBERS hobbies`

SREM array_name value (for deleting value from array). `eg: SREM hobbies 'riding cycle'`

For any command used for hashes prefix 'H' need to be used.
HSET key field value `eg: HSET person name bishal`

HGET key field (for getting a single value). `eg: HGET person name`

HGETALL key (for getting all the values). `eg: HGET person`

HDEL key field (for deleting a single field). `eg: HDEL person age`

HEXISTS key field (to check if the field is exists). `eg: HEXISTS person name`
