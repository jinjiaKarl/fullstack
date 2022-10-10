// interface can be extended
interface CalculatorResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface CalculatorInput {
    target: number;
    exerciseHours: Array<number>;
}


const parseArgumentsForCalculator= (args: Array<string>): CalculatorInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2]);
    if (isNaN(target)) throw new Error('Provided values were not numbers!');
    const exerciseHours = args.slice(3).map(hours => Number(hours));
    if (exerciseHours.some(hours => isNaN(hours))) throw new Error('Provided values were not numbers!');
    return {
        target,
        exerciseHours
    }
}

const calculateExercises = (exerciseHours: Array<number>, target: number): CalculatorResult => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(hours => hours > 0).length;
    const average = exerciseHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    const rating = success ? 3 : average > target / 2 ? 2 : 1;
    const ratingDescription = rating === 3 ? 'Good job!' : rating === 2 ? 'Not too bad but could be better'
        : 'You should really try harder';
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const { target, exerciseHours } = parseArgumentsForCalculator(process.argv);
    console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}