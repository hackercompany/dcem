const express = require('express');

router = express.Router();

devId = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009', '0010', '0011'];

function binarr(size) {
	a = '';
	for (let i = 0; i < size; i++) {
		a += Math.round(0.01 + Math.random() / 2);
	}
	return a;
}
function getRandomIV(devid = '5678') {
	r = 3 + Math.random() / 2;
	v = Math.round((5 + Math.random() * 20) * 10) / 10;

	return {
		Location: '1234',
		DeviceID: devid,
		Voltage: v,
		Current: Math.round((v / r) * 10) / 10,
		Alarm: binarr(9),
		Gateway: 'G-LSGW86277Y',
		Temperature: Math.round((20 + Math.random() * 20) * 100) / 100,
		Code: '00',
	};
}

router.use('/', (req, res) => {
	// console.log(res.send(req.query));
	let nums = 6,
		result = [];
	if ('nums' in req.query) {
		nums = req.query.nums;
	}

	for (let i = 0; i < nums; i++) {
		result.push(getRandomIV(devId[i]));
	}

	return res.send({ DCEM: result });
});

module.exports = router;
