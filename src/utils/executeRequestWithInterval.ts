const executeRequestsWithInterval = (
	request: () => void,
	curParadigmDuration: number,
	curParadigmTrials: number,
	intervalTime: number
) => {
	let predictTimes = 0;
	const now = Date.now();
	console.log(
		'curParadigmDuration',
		curParadigmDuration,
		'curParadigmTrials',
		curParadigmTrials,
		'intervalTime',
		intervalTime
	);
	/**第一次请求 */
	setTimeout(() => {
		console.log(Date.now() - now, '第一次请求');
		request();
	}, curParadigmDuration);
	/**第二次及之后的请求 */
	setTimeout(() => {
		const timer = setInterval(() => {
			predictTimes++;
			if (predictTimes === curParadigmTrials) {
				clearInterval(timer);
			}
			console.log(Date.now() - now, '第二次及之后的请求');
			request();
		}, curParadigmDuration + intervalTime);
	}, curParadigmDuration);
};

export default executeRequestsWithInterval;
