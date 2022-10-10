type InputBmi = {
    heightCm: number,
    weightKg: number
}

const parseArgumentsForBmi = (args: Array<string>): InputBmi => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    const heightCm = Number(args[2]);
    const weightKg = Number(args[3]);   
    if (isNaN(heightCm) || isNaN(weightKg)) throw new Error('Provided values were not numbers!');
    return {
        heightCm,
        weightKg
    }
}

const calculateBmi = (heightCm: number, weightKg: number): string => {
    const bmi =  weightKg / Math.pow(heightCm / 100, 2);
    if (bmi < 15) {
        return 'Very severely underweight';
      } else if (bmi > 15 && bmi < 16) {
        return 'Severely underweight';
      } else if (bmi > 16 && bmi < 18.5) {
        return 'Underweight';
      } else if (bmi > 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
      } else if (bmi > 25 && bmi < 30) {
        return 'Overweight';
      } else if (bmi > 30 && bmi < 35) {
        return 'Obese Class I (Moderately obese)';
      } else if (bmi > 35 && bmi < 40) {
        return 'Obese Class II (Severely obese)';
      } else {
        return 'Obese Class III (Very severely obese)	';
      }
}

try {
    const { heightCm, weightKg } = parseArgumentsForBmi(process.argv);
    console.log(calculateBmi(heightCm, weightKg));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}