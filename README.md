# Google Code Jam Stats
Website for examining statistics of Google Code Jam rounds

## Why?
There are some great website already up (e.g. https://a2oj.com/CodeJamTools/ and
https://www.go-hero.net/jam), but they only provide data for rounds up to the
year 2017. This website uses the new Google Competitions API, which was launched
in 2018, to collect and display some statistics about past rounds.

## Development
The project uses these technologies:
* `Python 3.6` for retrieving round data
* `React + TypeScript` for the frontend

The script `scores.py` is used to download and save data about a given Google
Code Jam round. It downloads the scoreboard 200 entries at a time, because (at
least when I developed this), the API seemed to allow getting at most 200
entries with one request. So the script retrieves the data in windows of size
200 until all the results are downloaded.

To run the script, use the command line `python scores.py <round_id>`, where
`round_id` is the ID of the round and can be extracted from the URL of the
contest, which you want to download the data for. For example, the URL of the
Qualification Round 2019 is
`https://codingcompetitions.withgoogle.com/codejam/round/0000000000051705`. The
ID of this round in this case is `0000000000051705`. 

The folder `client/` holds the client code. It is written using React and
TypeScript. The actual data, downloaded by the mentioned script is stored in
`client/public/round_data/` and served as a static resource. It would, of
course, be better to use a database, but this website is hosted on Github Pages,
which only allows static sites.

You can run the app locally by opening a terminal in the `client/` folder and
running `npm start`.