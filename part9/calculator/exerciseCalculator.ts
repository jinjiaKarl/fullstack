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


export const parseArgumentsForCalculator = (args: Array<string>): CalculatorInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2]);
    if (isNaN(target)) throw new Error('Provided values were not numbers!');
    const exerciseHours = args.slice(3).map(hours => Number(hours));
    if (exerciseHours.some(hours => isNaN(hours))) throw new Error('Provided values were not numbers!');
    return {
        target,
        exerciseHours
    };
};

export const calculateExercises = (exerciseHours: Array<number>, target: number): CalculatorResult => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(hours => hours > 0).length;
    const average = exerciseHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    const rating = success ? 3 : average > target / 2 ? 2 : 1;
    const ratingDescription = rating === 3 ? 'Good job!' : rating === 2 ? 'Not too bad but could be better'
        : 'bad';
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};