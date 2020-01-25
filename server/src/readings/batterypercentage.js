function pos(val, arr = []) {
	// arr is in descending order
	let i;
	for (i = 0; i < arr.length; i++) {
		if (val >= arr[i]) {
			// console.log(val, i);

			return i;
		}
	}
	// console.log(val, i);
	return i;
}

function batteryPercentage(voltage) {
	voltage = Math.round(voltage * 100) / 100;
	if ([50.92, 25.46, 12.73, 6.37].includes(voltage)) {
		// console.log(voltage, '100%');
		return '100%';
	}

	let battType = pos(voltage, [51.0, 50.92, 25.46, 12.73, 6.37, 5]);
	if (battType == 0) return 'Too High';
	else if (battType >= 6) return 'Too Low';
	let res = pos(
		voltage,
		{
			0: [51.0, 50.92, 50.48, 50.0, 49.48, 48.96, 48.4, 47.84, 47.24, 46.64, 46.04, 46.0],
			1: [26.0, 25.46, 25.24, 25.0, 24.74, 24.48, 24.2, 23.92, 23.62, 23.32, 23.02, 23.0],
			2: [13.0, 12.73, 12.62, 12.5, 12.37, 12.24, 12.1, 11.96, 11.81, 11.66, 11.51, 11.0],
			3: [7.0, 6.37, 6.31, 6.25, 6.19, 6.12, 6.05, 5.98, 5.91, 5.83, 5.75, 5.0],
		}[battType - 2]
	);

	const ans = ['Too High', '100%', '90%', '80%', '70%', '60%', '50%', '40%', '30%', '20%', '10%', '0%', 'Too Low'][
		res
	];
	// console.log(voltage, res, battType, ans);
	return ans;
}

module.exports = batteryPercentage;
