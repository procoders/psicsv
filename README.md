# PSI CSV Tool

[![](https://www.procoders.tech/art/pro-powered.png)](http://procoders.tech/)

PSI CSV Tool enriches a list of urls in csv with Google Page Speed Index data

- [Installation](#installation)
- [Usage](#usage)
- [Authors](#authors)

**Warning**: Google Page Speed has strong anti-scraping policies, they may blacklist ips making unauthenticated or unusual requests


## Installation

You have to check that [Node.js](https://nodejs.org/en/download) is installed


## Usage
### Enrich the data

1. Put csv with companies list from Crunchbase *with URL column* to `data/` folder
2. Run via `npx` in Terminal

```
npx @procoders/psicsv -f data/<your_file_name>.csv
```


## For developers

### Run from sources
0. First You have to check that [Node.js](https://nodejs.org/en/download) is installed
1. Run the terminal console and checkout the project by  `git clone https://github.com/procoders/psicsv.git`
1. Go to project folder by `cd ~/psicsv` 
2. Install all the packages by running `npm i` 

### Userful articles
* https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/

### TODO:
* [Autopublish](https://sergiodxa.com/articles/github-actions-npm-publish/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Authors

[Procoders.TECH](https://procoders.tech)

We gear IT up!

> Procoders mission is to ship meaningful code, all our partners come from referrals, and our pricing model is transparent and fair. Drop us a line and let’s start a conversation right now. 

[![](https://www.procoders.tech/art/pro-powered.png)](http://procoders.tech/)
