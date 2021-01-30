// node.exe jsx2jquery.js < jsx.jsx

function expandExpression(input) {
	let expStartIndex = input.indexOf('{');
	let expEndIndex = input.indexOf('}', expStartIndex);

	while (expStartIndex >= 0 && expEndIndex >= 0) {
		let stringBeforeExp = input.substring(0, expStartIndex);
		let stringWithinExp = input.substring(expStartIndex + 1, expEndIndex);
		let stringAfterExp = input.substring(expEndIndex + 1);

		input = stringBeforeExp + '" + (' + stringWithinExp + ') + "' + stringAfterExp;

		expStartIndex = input.indexOf('{');
		expEndIndex = input.indexOf('}', expStartIndex);
	}

	return input;
}

function getViewRange(input) {
	let startIndex = -1;
	let endIndex = -1;
	let lastStartIndex = -1;
	let depth = 0;

	lastStartIndex = input.indexOf("<View");
	while (lastStartIndex >= 0) {
		startIndex = lastStartIndex;
		lastStartIndex = input.indexOf("<View", startIndex + 1);
	}
	if (startIndex < 0) {
		return undefined;
	}

	endIndex = input.indexOf("</View>", startIndex);
	if (endIndex < 0) {
		return undefined;
	}

	return {
		startIndex: startIndex,
		endIndex: endIndex + 7
	}
}

function jsx2jquery(input) {
	let viewRange = getViewRange(input);

	while (viewRange != undefined) {
		let stringBeforeView = input.substring(0, viewRange.startIndex);
		let stringWithinView = input.substring(viewRange.startIndex, viewRange.endIndex);
		let stringAfterView = input.substring(viewRange.endIndex, input.length);

		stringWithinView = expandExpression(stringWithinView.replace(/<View/g, "<div").replace(/<\/View>/g, "</div>").replace(/[\s]+/g, " "));
		input = stringBeforeView + "$(\"" + expandExpression(stringWithinView) + "\").html()" + stringAfterView;

		viewRange = getViewRange(input);
	}

	return input;
}


var lines = "";

var reader = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

reader.on('line', function (line) {
	lines += line + "\n";
});

process.stdin.on('end', function () {
	var result = jsx2jquery(lines);
	console.log(result);
});

