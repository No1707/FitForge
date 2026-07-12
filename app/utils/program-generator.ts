import type { ProgramFormData, GeneratedProgram, WorkoutDay, ProgramExercise } from './program-types'

const exercisesByGoalAndMuscle: Record<string, Record<string, ProgramExercise[]>> = {
  muscle_building: {
    chest: [
      { name: 'Barbell Bench Press', sets: 4, reps: '8-12', rest: '90s' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '60s' }
    ],
    back: [
      { name: 'Barbell Rows', sets: 4, reps: '8-12', rest: '90s' },
      { name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Dumbbell Rows', sets: 3, reps: '10-12', rest: '60s' }
    ],
    legs: [
      { name: 'Barbell Back Squat', sets: 4, reps: '8-12', rest: '120s' },
      { name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: '90s' },
      { name: 'Leg Press', sets: 3, reps: '12-15', rest: '60s' }
    ],
    shoulders: [
      { name: 'Overhead Press', sets: 4, reps: '8-12', rest: '90s' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '45s' },
      { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '45s' }
    ],
    arms: [
      { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Tricep Pushdowns', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: '45s' }
    ],
    core: [
      { name: 'Hanging Leg Raises', sets: 3, reps: '12-15', rest: '45s' },
      { name: 'Cable Crunches', sets: 3, reps: '15-20', rest: '45s' }
    ]
  },
  strength: {
    chest: [
      { name: 'Barbell Bench Press', sets: 5, reps: '3-5', rest: '180s' },
      { name: 'Close Grip Bench', sets: 3, reps: '6-8', rest: '120s' }
    ],
    back: [
      { name: 'Deadlift', sets: 5, reps: '3-5', rest: '180s' },
      { name: 'Weighted Pull-ups', sets: 4, reps: '5-8', rest: '120s' }
    ],
    legs: [
      { name: 'Barbell Back Squat', sets: 5, reps: '3-5', rest: '180s' },
      { name: 'Front Squat', sets: 3, reps: '5-8', rest: '120s' }
    ],
    shoulders: [
      { name: 'Overhead Press', sets: 5, reps: '3-5', rest: '180s' },
      { name: 'Push Press', sets: 3, reps: '5-8', rest: '120s' }
    ],
    arms: [
      { name: 'Close Grip Bench', sets: 3, reps: '6-8', rest: '90s' },
      { name: 'Barbell Curls', sets: 3, reps: '6-8', rest: '90s' }
    ],
    core: [
      { name: 'Ab Wheel Rollouts', sets: 3, reps: '8-10', rest: '60s' },
      { name: 'Plank', sets: 3, reps: '45-60s hold', rest: '45s' }
    ]
  },
  fat_loss: {
    chest: [
      { name: 'Push-ups', sets: 3, reps: '15-20', rest: '30s' },
      { name: 'Dumbbell Bench Press', sets: 3, reps: '12-15', rest: '45s' }
    ],
    back: [
      { name: 'Dumbbell Rows', sets: 3, reps: '12-15', rest: '45s' },
      { name: 'Lat Pulldowns', sets: 3, reps: '12-15', rest: '45s' }
    ],
    legs: [
      { name: 'Goblet Squats', sets: 3, reps: '15-20', rest: '45s' },
      { name: 'Walking Lunges', sets: 3, reps: '12 each leg', rest: '45s' },
      { name: 'Kettlebell Swings', sets: 4, reps: '20', rest: '30s' }
    ],
    shoulders: [
      { name: 'Dumbbell Shoulder Press', sets: 3, reps: '12-15', rest: '45s' },
      { name: 'Lateral Raises', sets: 3, reps: '15-20', rest: '30s' }
    ],
    arms: [
      { name: 'Dumbbell Curls', sets: 2, reps: '12-15', rest: '30s' },
      { name: 'Tricep Dips', sets: 2, reps: '12-15', rest: '30s' }
    ],
    core: [
      { name: 'Mountain Climbers', sets: 3, reps: '30s', rest: '15s' },
      { name: 'Plank', sets: 3, reps: '45s hold', rest: '30s' },
      { name: 'Russian Twists', sets: 3, reps: '20 total', rest: '30s' }
    ]
  },
  endurance: {
    chest: [{ name: 'Push-ups', sets: 4, reps: '20-30', rest: '30s' }],
    back: [{ name: 'Inverted Rows', sets: 4, reps: '15-20', rest: '30s' }],
    legs: [
      { name: 'Bodyweight Squats', sets: 4, reps: '25-30', rest: '30s' },
      { name: 'Jump Squats', sets: 3, reps: '15-20', rest: '30s' },
      { name: 'Walking Lunges', sets: 3, reps: '20 each leg', rest: '30s' }
    ],
    shoulders: [{ name: 'Pike Push-ups', sets: 3, reps: '15-20', rest: '30s' }],
    arms: [
      { name: 'Diamond Push-ups', sets: 3, reps: '15-20', rest: '30s' },
      { name: 'Chin-ups', sets: 3, reps: 'AMRAP', rest: '45s' }
    ],
    core: [
      { name: 'Plank', sets: 3, reps: '60-90s hold', rest: '30s' },
      { name: 'Bicycle Crunches', sets: 3, reps: '30 total', rest: '30s' },
      { name: 'Dead Bug', sets: 3, reps: '20 total', rest: '30s' }
    ]
  },
  general_fitness: {
    chest: [
      { name: 'Push-ups', sets: 3, reps: '12-15', rest: '45s' },
      { name: 'Dumbbell Bench Press', sets: 3, reps: '10-12', rest: '60s' }
    ],
    back: [
      { name: 'Dumbbell Rows', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: '60s' }
    ],
    legs: [
      { name: 'Goblet Squats', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Walking Lunges', sets: 3, reps: '10 each leg', rest: '45s' }
    ],
    shoulders: [
      { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '45s' }
    ],
    arms: [
      { name: 'Dumbbell Curls', sets: 2, reps: '10-12', rest: '45s' },
      { name: 'Tricep Pushdowns', sets: 2, reps: '10-12', rest: '45s' }
    ],
    core: [
      { name: 'Plank', sets: 3, reps: '30-45s hold', rest: '30s' },
      { name: 'Dead Bug', sets: 3, reps: '10 each side', rest: '30s' }
    ]
  }
}

const splitsByDays: Record<number, { name: string; muscles: string[] }[]> = {
  2: [
    { name: 'Full Body A', muscles: ['chest', 'back', 'legs', 'core'] },
    { name: 'Full Body B', muscles: ['shoulders', 'arms', 'legs', 'core'] }
  ],
  3: [
    { name: 'Push', muscles: ['chest', 'shoulders', 'arms'] },
    { name: 'Pull', muscles: ['back', 'arms', 'core'] },
    { name: 'Legs', muscles: ['legs', 'core'] }
  ],
  4: [
    { name: 'Upper A', muscles: ['chest', 'back', 'shoulders'] },
    { name: 'Lower A', muscles: ['legs', 'core'] },
    { name: 'Upper B', muscles: ['chest', 'back', 'arms'] },
    { name: 'Lower B', muscles: ['legs', 'core'] }
  ],
  5: [
    { name: 'Chest & Triceps', muscles: ['chest', 'arms'] },
    { name: 'Back & Biceps', muscles: ['back', 'arms'] },
    { name: 'Legs', muscles: ['legs', 'core'] },
    { name: 'Shoulders', muscles: ['shoulders', 'core'] },
    { name: 'Full Body', muscles: ['chest', 'back', 'legs'] }
  ],
  6: [
    { name: 'Push A', muscles: ['chest', 'shoulders', 'arms'] },
    { name: 'Pull A', muscles: ['back', 'arms'] },
    { name: 'Legs A', muscles: ['legs', 'core'] },
    { name: 'Push B', muscles: ['chest', 'shoulders', 'arms'] },
    { name: 'Pull B', muscles: ['back', 'arms'] },
    { name: 'Legs B', muscles: ['legs', 'core'] }
  ]
}

const tipsByGoal: Record<string, string[]> = {
  muscle_building: [
    'Aim for progressive overload - increase weight or reps each week',
    'Eat in a slight caloric surplus (200-300 calories above maintenance)',
    'Get 7-9 hours of sleep for optimal recovery',
    'Consume 1.6-2.2g of protein per kg of bodyweight daily'
  ],
  strength: [
    'Focus on compound movements with heavy weights',
    'Rest 3-5 minutes between heavy sets for full recovery',
    'Deload every 4-6 weeks to prevent overtraining',
    'Track your lifts and aim to beat previous records'
  ],
  fat_loss: [
    'Maintain a moderate caloric deficit (300-500 calories below maintenance)',
    'Keep protein high to preserve muscle mass (2g per kg bodyweight)',
    'Add 2-3 cardio sessions per week for additional calorie burn',
    'Stay consistent - sustainable fat loss takes time'
  ],
  endurance: [
    'Focus on higher rep ranges with shorter rest periods',
    'Incorporate circuit training for improved cardiovascular fitness',
    'Stay hydrated before, during, and after workouts',
    'Gradually increase workout duration over time'
  ],
  general_fitness: [
    'Balance strength training with cardiovascular exercise',
    'Focus on movement quality over quantity',
    'Listen to your body and take rest days when needed',
    'Make fitness a sustainable part of your lifestyle'
  ]
}

export function generateProgram(formData: ProgramFormData): GeneratedProgram {
  const splits = splitsByDays[formData.daysPerWeek] || splitsByDays[3]
  const goalExercises = exercisesByGoalAndMuscle[formData.goal] || exercisesByGoalAndMuscle.general_fitness

  const schedule: WorkoutDay[] = splits.map((split, index) => {
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const exercises: ProgramExercise[] = []

    split.muscles.forEach(muscle => {
      const muscleExercises = goalExercises[muscle] || []
      const selectedExercises = muscleExercises.slice(0, 2)
      exercises.push(...selectedExercises)
    })

    return {
      day: dayNames[index % 7],
      focus: split.name,
      exercises: exercises.slice(0, 6)
    }
  })

  const tips = tipsByGoal[formData.goal] || tipsByGoal.general_fitness

  const goalLabels: Record<string, string> = {
    muscle_building: 'Muscle Building',
    strength: 'Strength',
    fat_loss: 'Fat Loss',
    endurance: 'Endurance',
    general_fitness: 'General Fitness'
  }

  return {
    name: `${formData.name}'s ${goalLabels[formData.goal]} Program`,
    goal: goalLabels[formData.goal],
    schedule,
    tips
  }
}
