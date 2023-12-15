let generatedNumbers = [];

// const generateNumbers = (minRange, maxRange, count = 0) => {
//     let title = `Numbers Between ${minRange} - ${maxRange}:`
//     let newNumbers = [];
//     for (let index = minRange; index < maxRange;) {
//         newNumbers.push(index);
//         index = index + count;
//     }
//     let obj = {};
//     obj["title"] = title;
//     obj["activity"] = newNumbers.join(" ");
//     generatedNumbers.push(obj);
// };

// for (let index = 1; index < 21;) {
//     generateNumbers(index, index + 10, 1);
//     index = index + 10;
// }

const numberToText = (num) => {
    const numberWords = [
        "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"
    ];

    if (num >= 0 && num <= 20) {
        return numberWords[num];
    } else {
        return num.toString(); // Fallback to the original number if it's outside the mapped range
    }
};

// const generateNumbersText = (minRange, maxRange, count = 0) => {
//     let title = `Numbers Spellings Between ${minRange} - ${maxRange}:`
//     let newNumbers = [];
//     for (let index = minRange; index < maxRange;) {
//         newNumbers.push(numberToText(index));
//         index = index + count;
//     }
//     let obj = {};
//     obj["title"] = title;
//     obj["spellings"] = true;
//     obj["activity"] = newNumbers.join(" ");
//     generatedNumbers.push(obj);
// };

// for (let index = 1; index < 21;) {
//     generateNumbersText(index, index + 5, 1);
//     index = index + 5;
// }

const generateAdditionExpression = () => {
    for (let index = 0; index < 11; index++) {
        let title = "Addition Of Two Numbers:";
        let firstNumber = index;
        let secondNumber = index;
        const solution = firstNumber + secondNumber;
        let expression = `${firstNumber} + ${secondNumber} = ${solution} `;
        expression = expression + `First number: ${firstNumber} in the mind. `;
        expression = expression + `Second number: ${secondNumber} fingers up. `;
        expression = expression + `After ${firstNumber} from mind count fingers: `;
        let countingNumber = firstNumber;
        while(secondNumber > 0) {
            countingNumber = countingNumber + 1;
            // expression = expression + numberToText(countingNumber) + " ";
            expression = expression + countingNumber + " ";
            secondNumber = secondNumber - 1;
        }
        expression = expression + `Final Answer is ${countingNumber}.`;
        let obj = {};
        obj["title"] = title;
        obj["additions"] = true;
        obj["activity"] = expression;
        generatedNumbers.push(obj);
    }
};
generateAdditionExpression();

export default generatedNumbers;
