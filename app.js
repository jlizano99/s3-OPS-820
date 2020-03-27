const list = require('./list.json')

const https = require('https')
const Stream = require('stream').Transform

const fs = require('fs')

const makePromise = (url) => new Promise((res) => {
	https.request(`https://www.sportsbookreview.com${url}`, (response) => {
		var data = new Stream();

        response.on('data', function(chunk) {
        data.push(chunk);
        });

        response.on('end', function() {
        fs.writeFileSync(`migrated${url}`, data.read());
        });
	}).end(() => console.log('end') || res());
})

const test = async (index) => {
	if(index >= list.length) return

	const url = list[index] && list[index].url

	console.log(url, 'url')

	await makePromise(url).then()

	test(index + 1)
}

test(0)