export interface Exercise {
  id: string
  name: string
  category: 'strength' | 'cardio' | 'flexibility' | 'bodyweight'
  equipment: 'barbell' | 'dumbbell' | 'machine' | 'bodyweight' | 'kettlebell' | 'cable'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  muscles: string[]
  description: string
  instructions: string[]
  tips: string[]
  videoUrl: string
}

export const exercises: Exercise[] = [
  {
    id: 'barbell-squat',
    name: 'Barbell Back Squat',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    description: 'The barbell back squat is a compound exercise that targets the entire lower body. It is one of the most effective exercises for building leg strength and muscle mass.',
    instructions: [
      'Position the barbell on your upper back, resting on your trapezius muscles',
      'Stand with feet shoulder-width apart, toes slightly pointed out',
      'Take a deep breath and brace your core',
      'Lower your body by bending at the hips and knees simultaneously',
      'Descend until your thighs are parallel to the ground or lower',
      'Drive through your heels to return to the starting position'
    ],
    tips: [
      'Keep your chest up and back straight throughout the movement',
      'Do not let your knees cave inward',
      'Maintain a neutral spine position'
    ],
    videoUrl: 'https://www.youtube.com/embed/bEv6CCg2BC8'
  },
  {
    id: 'deadlift',
    name: 'Conventional Deadlift',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Back', 'Glutes', 'Hamstrings', 'Core', 'Forearms'],
    description: 'The deadlift is a fundamental compound movement that works nearly every muscle in your body. It is essential for building overall strength and power.',
    instructions: [
      'Stand with feet hip-width apart, barbell over mid-foot',
      'Bend at the hips and knees to grip the bar just outside your legs',
      'Flatten your back and engage your lats',
      'Take a deep breath and brace your core',
      'Drive through your legs while keeping the bar close to your body',
      'Lock out at the top by squeezing your glutes'
    ],
    tips: [
      'Keep the bar as close to your body as possible',
      'Do not round your lower back',
      'Think about pushing the floor away rather than pulling the bar up'
    ],
    videoUrl: 'https://www.youtube.com/embed/op9kVnSso6Q'
  },
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Chest', 'Shoulders', 'Triceps'],
    description: 'The bench press is a classic upper body exercise that primarily targets the chest muscles while also working the shoulders and triceps.',
    instructions: [
      'Lie on a flat bench with your eyes under the bar',
      'Grip the bar slightly wider than shoulder-width',
      'Unrack the bar and position it over your chest',
      'Lower the bar to your mid-chest in a controlled manner',
      'Press the bar back up to the starting position'
    ],
    tips: [
      'Keep your shoulder blades retracted and depressed',
      'Maintain a slight arch in your lower back',
      'Keep your feet flat on the floor for stability'
    ],
    videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg'
  },
  {
    id: 'pull-ups',
    name: 'Pull-Ups',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Back', 'Biceps', 'Core'],
    description: 'Pull-ups are one of the best bodyweight exercises for developing upper body strength, particularly in the back and biceps.',
    instructions: [
      'Hang from a pull-up bar with hands slightly wider than shoulder-width',
      'Engage your core and squeeze your shoulder blades together',
      'Pull yourself up until your chin is above the bar',
      'Lower yourself back down with control'
    ],
    tips: [
      'Avoid swinging or using momentum',
      'Focus on pulling your elbows down to your sides',
      'Start with assisted variations if needed'
    ],
    videoUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g'
  },
  {
    id: 'push-ups',
    name: 'Push-Ups',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    description: 'Push-ups are a fundamental bodyweight exercise that builds upper body and core strength. They can be done anywhere without equipment.',
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Keep your body in a straight line from head to heels',
      'Lower your chest toward the ground by bending your elbows',
      'Push back up to the starting position'
    ],
    tips: [
      'Keep your core tight throughout the movement',
      'Do not let your hips sag or pike up',
      'Modify on knees if needed to maintain proper form'
    ],
    videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4'
  },
  {
    id: 'dumbbell-rows',
    name: 'Dumbbell Rows',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Back', 'Biceps', 'Rear Delts'],
    description: 'Dumbbell rows are an excellent unilateral exercise for building back strength and correcting muscle imbalances.',
    instructions: [
      'Place one knee and hand on a bench for support',
      'Hold a dumbbell in the opposite hand with arm extended',
      'Pull the dumbbell up toward your hip, keeping elbow close to your body',
      'Lower the weight with control and repeat'
    ],
    tips: [
      'Keep your back flat and parallel to the ground',
      'Avoid rotating your torso as you row',
      'Focus on squeezing your shoulder blade at the top'
    ],
    videoUrl: 'https://www.youtube.com/embed/pYcpY20QaE8'
  },
  {
    id: 'lunges',
    name: 'Walking Lunges',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    description: 'Walking lunges are a functional lower body exercise that improves balance, coordination, and leg strength.',
    instructions: [
      'Stand tall with feet hip-width apart',
      'Take a large step forward with one leg',
      'Lower your body until both knees are bent at 90 degrees',
      'Push off your front foot and step forward with the back leg',
      'Continue alternating legs'
    ],
    tips: [
      'Keep your front knee aligned over your ankle',
      'Maintain an upright torso throughout',
      'Take controlled steps, not rushed'
    ],
    videoUrl: 'https://www.youtube.com/embed/L8fvypPrzzs'
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Core', 'Shoulders', 'Back'],
    description: 'The plank is an isometric core exercise that builds stability and endurance in the entire core musculature.',
    instructions: [
      'Start in a forearm plank position with elbows under shoulders',
      'Keep your body in a straight line from head to heels',
      'Engage your core and glutes',
      'Hold the position for the desired time'
    ],
    tips: [
      'Do not let your hips sag or rise',
      'Keep breathing steadily throughout',
      'Look at the floor to maintain neutral neck position'
    ],
    videoUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw'
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Shoulders', 'Triceps', 'Core'],
    description: 'The overhead press is a compound pushing movement that builds strong, well-developed shoulders.',
    instructions: [
      'Stand with feet shoulder-width apart, holding the bar at shoulder height',
      'Grip the bar slightly wider than shoulder-width',
      'Brace your core and squeeze your glutes',
      'Press the bar straight overhead until arms are fully extended',
      'Lower the bar back to the starting position with control'
    ],
    tips: [
      'Keep your core tight to protect your lower back',
      'Move your head back slightly as the bar passes your face',
      'Lock out fully at the top of each rep'
    ],
    videoUrl: 'https://www.youtube.com/embed/2yjwXTZQDDI'
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back'],
    description: 'The Romanian deadlift is a hip-hinge movement that targets the posterior chain, particularly the hamstrings and glutes.',
    instructions: [
      'Stand with feet hip-width apart, holding a barbell at hip level',
      'Push your hips back while maintaining a slight bend in your knees',
      'Lower the bar along your legs until you feel a stretch in your hamstrings',
      'Drive your hips forward to return to the starting position'
    ],
    tips: [
      'Keep the bar close to your body throughout',
      'Maintain a flat back - do not round',
      'The movement comes from your hips, not your knees'
    ],
    videoUrl: 'https://www.youtube.com/embed/7AaaYhMqfys'
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Back', 'Biceps', 'Rear Delts'],
    description: 'The lat pulldown is a machine-based exercise that effectively targets the latissimus dorsi muscles of the back.',
    instructions: [
      'Sit at the lat pulldown machine with thighs secured under the pads',
      'Grip the bar wider than shoulder-width with palms facing away',
      'Pull the bar down to your upper chest while squeezing your shoulder blades',
      'Slowly return the bar to the starting position'
    ],
    tips: [
      'Do not lean back excessively',
      'Focus on pulling with your elbows, not your hands',
      'Control the weight on the way up'
    ],
    videoUrl: 'https://www.youtube.com/embed/CAwf7n6Luuc'
  },
  {
    id: 'goblet-squat',
    name: 'Goblet Squat',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes', 'Core'],
    description: 'The goblet squat is a beginner-friendly squat variation that helps develop proper squat mechanics.',
    instructions: [
      'Hold a dumbbell or kettlebell at chest height with both hands',
      'Stand with feet slightly wider than shoulder-width',
      'Push your hips back and bend your knees to squat down',
      'Keep your chest up and elbows inside your knees',
      'Drive through your heels to stand back up'
    ],
    tips: [
      'The weight acts as a counterbalance to help you stay upright',
      'Go as deep as your mobility allows',
      'Keep your weight distributed evenly across your feet'
    ],
    videoUrl: 'https://www.youtube.com/embed/MeIiIdhvXT4'
  },
  {
    id: 'dips',
    name: 'Dips',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Chest', 'Triceps', 'Shoulders'],
    description: 'Dips are a compound bodyweight exercise that builds upper body pushing strength.',
    instructions: [
      'Grip parallel bars and lift yourself to the starting position',
      'Lower your body by bending your elbows until upper arms are parallel to the floor',
      'Keep elbows close to your body for triceps focus, or flare out for chest',
      'Push yourself back up to the starting position'
    ],
    tips: [
      'Lean slightly forward to target the chest more',
      'Keep your core engaged throughout',
      'Control the descent - do not drop quickly'
    ],
    videoUrl: 'https://www.youtube.com/embed/2z8JmcrW-As'
  },
  {
    id: 'bicep-curl',
    name: 'Dumbbell Bicep Curl',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Biceps', 'Forearms'],
    description: 'The dumbbell bicep curl is an isolation exercise that targets the biceps muscles.',
    instructions: [
      'Stand with feet shoulder-width apart, holding dumbbells at your sides',
      'Keep your elbows close to your body',
      'Curl the weights up toward your shoulders, rotating your palms up',
      'Squeeze at the top and lower with control'
    ],
    tips: [
      'Do not swing the weights or use momentum',
      'Keep your upper arms stationary',
      'Control the eccentric (lowering) portion'
    ],
    videoUrl: 'https://www.youtube.com/embed/ykJmrZ5v0Oo'
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    description: 'The leg press is a machine-based exercise that allows you to safely load the legs with heavy weight.',
    instructions: [
      'Sit in the leg press machine with your back flat against the pad',
      'Place your feet shoulder-width apart on the platform',
      'Release the safety handles and lower the platform by bending your knees',
      'Press the platform back up without locking your knees'
    ],
    tips: [
      'Do not let your lower back round off the pad',
      'Keep your knees in line with your toes',
      'Adjust foot position to target different muscles'
    ],
    videoUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ'
  },
  {
    id: 'kettlebell-swing',
    name: 'Kettlebell Swing',
    category: 'cardio',
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    muscles: ['Glutes', 'Hamstrings', 'Core', 'Shoulders'],
    description: 'The kettlebell swing is a dynamic hip-hinge movement that builds power and cardiovascular endurance.',
    instructions: [
      'Stand with feet wider than shoulder-width, kettlebell in front of you',
      'Hinge at the hips and grip the kettlebell with both hands',
      'Swing the kettlebell back between your legs',
      'Explosively drive your hips forward to swing the kettlebell to shoulder height',
      'Let the kettlebell swing back down and repeat'
    ],
    tips: [
      'Power comes from your hips, not your arms',
      'Keep your core braced throughout',
      'Do not squat - this is a hip hinge movement'
    ],
    videoUrl: 'https://www.youtube.com/embed/YSxHifyI6s8'
  }
]

export const categories = ['all', 'strength', 'cardio', 'flexibility', 'bodyweight'] as const
export const equipmentTypes = ['all', 'barbell', 'dumbbell', 'machine', 'bodyweight', 'kettlebell', 'cable'] as const
export const difficultyLevels = ['all', 'beginner', 'intermediate', 'advanced'] as const

export type Category = typeof categories[number]
export type Equipment = typeof equipmentTypes[number]
export type Difficulty = typeof difficultyLevels[number]
