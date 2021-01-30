
function getDiv1() {
	return <View>Test</View>;
}

function getDiv2() {
	let content = "";
	for (i = 0; i < 5; i++) {
		content += <View><span>{i + 1}</span></View>;
	}
	return content;
}

function getDiv3() {
	return (
		<View>
			<span>This is the first content.</span>
			<span>This is the second content.</span>
		</View>
	);
}

function getDiv4() {
	let array = [1, 2, 3, 4, 5];
	return (
			<View>
				<div>
					{ array.map(i => <View><span>Item {i}</span></View>).join('') }
				</div>
			</View>
		);
}