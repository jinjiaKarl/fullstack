//  npm run ts-node -- index.ts
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises,parseArgumentsForCalculator } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weightKg  = Number(req.query.weight);
  const heightCm = Number(req.query.height);
  if (isNaN(heightCm) || isNaN(weightKg)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }
  const bmi = calculateBmi(heightCm, weightKg);
  res.send({ weight: weightKg, height: heightCm, bmi });
});

app.post('/exercises', (req, res) => {
  // type assertion
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const dailyExercises = req.body.daily_exercises as Array<string>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const dailyTarget = req.body.target as string;

  if (!dailyExercises || !dailyTarget) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }
  try {
    const input = ['npm', 'run', dailyTarget, ...dailyExercises];
    const { target, exerciseHours } = parseArgumentsForCalculator(input);
    const result = calculateExercises(exerciseHours, target);
    res.send(result);
  }catch (e: unknown){
    if (e instanceof Error) {
      res.status(400).send({ error: e.message });
    } else {
      res.status(400).send({ error: 'malformatted parameters' });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});