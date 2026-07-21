export interface Exercise {
  id: string
  name: string
  category: 'strength' | 'cardio' | 'flexibility' | 'bodyweight'
  equipment: 'barbell' | 'dumbbell' | 'machine' | 'bodyweight' | 'kettlebell' | 'cable' | 'ez-bar' | 'bands' | 'plate' | 'exercise-ball' | 'landmine' | 'trap-bar' | 'other' | 'none'
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'none'
  muscles: string[]
  description: string
  instructions: string[]
  tips: string[]
  videoUrl: string
}

function ytSearch(name: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} exercise tutorial`)}`
}

export const exercises: Exercise[] = [
  // ---------- CHEST ----------
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Chest', 'Shoulders', 'Triceps'],
    description: 'The classic barbell press for building raw chest strength and mass.',
    instructions: [
      'Lie on a flat bench with eyes under the bar',
      'Grip the bar slightly wider than shoulder-width',
      'Unrack and lower the bar to your mid-chest',
      'Press back up to full lockout'
    ],
    tips: ['Keep your shoulder blades pinned together', 'Drive your feet into the floor for stability'],
    videoUrl: ytSearch('Barbell Bench Press')
  },
  {
    id: 'dumbbell-bench-press',
    name: 'Dumbbell Bench Press',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Chest', 'Shoulders', 'Triceps'],
    description: 'A bench press variation with dumbbells for a greater range of motion.',
    instructions: [
      'Lie on a flat bench holding a dumbbell in each hand',
      'Press the dumbbells up until arms are extended',
      'Lower them slowly to chest level',
      'Press back up without clanking the weights together'
    ],
    tips: ['Let your wrists stay stacked over your elbows', 'Control the descent instead of dropping the weight'],
    videoUrl: ytSearch('Dumbbell Bench Press')
  },
  {
    id: 'incline-barbell-bench-press',
    name: 'Incline Barbell Bench Press',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Chest', 'Shoulders', 'Triceps'],
    description: 'A bench press on an incline that shifts emphasis to the upper chest.',
    instructions: [
      'Set a bench to a 30-45 degree incline',
      'Grip the bar slightly wider than shoulder-width',
      'Lower the bar to your upper chest',
      'Press back up to lockout'
    ],
    tips: ['Avoid setting the incline too steep or shoulders take over', 'Keep elbows at roughly a 45-degree angle'],
    videoUrl: ytSearch('Incline Barbell Bench Press')
  },
  {
    id: 'incline-dumbbell-bench-press',
    name: 'Incline Dumbbell Bench Press',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Chest', 'Shoulders', 'Triceps'],
    description: 'Dumbbell pressing on an incline bench for upper chest development.',
    instructions: [
      'Set a bench to a 30-45 degree incline',
      'Press dumbbells up from shoulder height',
      'Lower with control back to shoulder level',
      'Repeat without losing the arch in your upper back'
    ],
    tips: ['Do not flare elbows out to 90 degrees', 'Squeeze your chest at the top of each rep'],
    videoUrl: ytSearch('Incline Dumbbell Bench Press')
  },
  {
    id: 'decline-bench-press',
    name: 'Decline Bench Press',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Chest', 'Triceps'],
    description: 'A pressing variation on a decline bench that targets the lower chest.',
    instructions: [
      'Secure your legs on a decline bench',
      'Lower the bar to your lower chest',
      'Press up to full lockout',
      'Rack the bar carefully with a spotter if heavy'
    ],
    tips: ['Move slower than flat bench since the range is shorter', 'Keep wrists straight throughout'],
    videoUrl: ytSearch('Decline Bench Press')
  },
  {
    id: 'dumbbell-flyes',
    name: 'Dumbbell Flyes',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Chest'],
    description: 'An isolation move that stretches and squeezes the chest through a wide arc.',
    instructions: [
      'Lie on a flat bench holding dumbbells above your chest',
      'Lower the weights out to the sides with a slight elbow bend',
      'Feel a stretch across your chest',
      'Bring the dumbbells back together over your chest'
    ],
    tips: ['Keep a soft, fixed bend in the elbows throughout', 'Do not let the weights drop below shoulder level'],
    videoUrl: ytSearch('Dumbbell Flyes')
  },
  {
    id: 'incline-dumbbell-flyes',
    name: 'Incline Dumbbell Flyes',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Chest', 'Shoulders'],
    description: 'A fly variation on an incline bench that emphasizes the upper chest.',
    instructions: [
      'Set a bench to a 30-45 degree incline',
      'Hold dumbbells above your chest with a slight elbow bend',
      'Lower the weights out to the sides until you feel a stretch',
      'Bring the dumbbells back together at the top'
    ],
    tips: ['Keep the movement slow and controlled', 'Avoid using momentum to swing the weights up'],
    videoUrl: ytSearch('Incline Dumbbell Flyes')
  },
  {
    id: 'cable-crossover',
    name: 'Cable Crossover',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Chest'],
    description: 'A standing cable move that keeps constant tension on the chest through the full range.',
    instructions: [
      'Set both cable pulleys above head height',
      'Step forward with a slight forward lean',
      'Pull the handles down and together in front of your hips',
      'Return slowly to the starting position'
    ],
    tips: ['Keep a slight bend in your elbows the whole time', 'Squeeze your chest hard at the bottom'],
    videoUrl: ytSearch('Cable Crossover')
  },
  {
    id: 'standing-cable-fly',
    name: 'Standing Cable Fly',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Chest'],
    description: 'A mid-height cable fly for even chest tension from a standing position.',
    instructions: [
      'Set pulleys to chest height',
      'Stand centered between the towers with a staggered stance',
      'Bring the handles together in front of your chest',
      'Return with control to the starting position'
    ],
    tips: ['Lean slightly forward to keep tension off your shoulders', 'Do not let the cables pull your arms back too far'],
    videoUrl: ytSearch('Standing Cable Fly')
  },
  {
    id: 'pec-deck-machine',
    name: 'Pec Deck Machine',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Chest'],
    description: 'A guided machine fly that isolates the chest with minimal technique demands.',
    instructions: [
      'Sit with your back flat against the pad',
      'Place forearms on the pads or grip the handles',
      'Bring your arms together in front of your chest',
      'Return slowly to the stretched position'
    ],
    tips: ['Adjust the seat so handles align with chest height', 'Avoid slamming the pads together at the top'],
    videoUrl: ytSearch('Pec Deck Machine')
  },
  {
    id: 'push-up',
    name: 'Push-Up',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    description: 'The essential bodyweight press for chest and triceps, doable anywhere.',
    instructions: [
      'Start in a plank position with hands under shoulders',
      'Lower your chest toward the floor',
      'Keep your body in a straight line',
      'Push back up to the starting position'
    ],
    tips: ['Keep your core braced so hips do not sag', 'Drop to your knees to regress if needed'],
    videoUrl: ytSearch('Push Up')
  },
  {
    id: 'incline-push-up',
    name: 'Incline Push-Up',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Chest', 'Shoulders', 'Triceps'],
    description: 'An easier push-up variation with hands elevated on a bench or box.',
    instructions: [
      'Place hands on a bench or sturdy elevated surface',
      'Walk feet back into a straight plank line',
      'Lower your chest toward the surface',
      'Push back up to the start'
    ],
    tips: ['The higher the surface, the easier the rep', 'Keep elbows at roughly 45 degrees from your torso'],
    videoUrl: ytSearch('Incline Push Up')
  },
  {
    id: 'chest-dip',
    name: 'Chest Dip',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Chest', 'Triceps', 'Shoulders'],
    description: 'A dip variation leaned forward to shift the load onto the chest.',
    instructions: [
      'Grip parallel bars and support your body with arms extended',
      'Lean your torso forward',
      'Lower until your shoulders are below your elbows',
      'Press back up to full extension'
    ],
    tips: ['The more forward lean, the more chest involvement', 'Use an assisted dip machine if full bodyweight is too hard'],
    videoUrl: ytSearch('Chest Dip')
  },
  {
    id: 'close-grip-dumbbell-press',
    name: 'Close-Grip Dumbbell Press',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Chest', 'Triceps'],
    description: 'A dumbbell press with the weights touching, adding triceps emphasis.',
    instructions: [
      'Lie on a flat bench with dumbbells pressed together above your chest',
      'Lower them together to your sternum',
      'Keep elbows tucked close to your body',
      'Press back up while keeping the dumbbells in contact'
    ],
    tips: ['Squeeze the dumbbells together throughout for extra activation', 'Keep the tempo controlled since balance is harder'],
    videoUrl: ytSearch('Close Grip Dumbbell Press')
  },
  {
    id: 'dumbbell-pullover',
    name: 'Dumbbell Pullover',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Chest', 'Back'],
    description: 'A classic movement that stretches the chest and lats through an overhead arc.',
    instructions: [
      'Lie across a bench with only your upper back supported',
      'Hold one dumbbell with both hands above your chest',
      'Lower it back behind your head in an arc',
      'Pull it back over your chest to the start'
    ],
    tips: ['Keep a slight bend in your elbows the whole set', 'Move through a pain-free range only'],
    videoUrl: ytSearch('Dumbbell Pullover')
  },
  {
    id: 'smith-machine-bench-press',
    name: 'Smith Machine Bench Press',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Chest', 'Shoulders', 'Triceps'],
    description: 'A guided-bar bench press that removes the need to balance the weight.',
    instructions: [
      'Lie on a bench under the fixed bar',
      'Unrack by rotating the bar to unlock it',
      'Lower to your chest and press back up',
      'Rotate to re-rack at the top'
    ],
    tips: ['Position the bench so the bar lines up over your chest', 'Good option for training close to failure safely'],
    videoUrl: ytSearch('Smith Machine Bench Press')
  },
  {
    id: 'svend-press',
    name: 'Svend Press',
    category: 'strength',
    equipment: 'plate',
    difficulty: 'beginner',
    muscles: ['Chest', 'Shoulders'],
    description: 'A plate-squeeze press that keeps constant tension on the inner chest.',
    instructions: [
      'Press two weight plates together at chest height',
      'Extend your arms straight out in front of you',
      'Keep squeezing the plates together throughout',
      'Bring the plates back to your chest and repeat'
    ],
    tips: ['Use lighter plates than you expect - the squeeze is the point', 'Keep your shoulders down away from your ears'],
    videoUrl: ytSearch('Svend Press')
  },
  {
    id: 'neutral-grip-dumbbell-press',
    name: 'Neutral-Grip Dumbbell Press',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Chest', 'Triceps', 'Shoulders'],
    description: 'A palms-facing bench press that is easier on the shoulder joints.',
    instructions: [
      'Lie on a flat bench holding dumbbells with palms facing each other',
      'Lower the dumbbells to the sides of your chest',
      'Press up until arms are extended',
      'Keep the neutral grip throughout the set'
    ],
    tips: ['A good option if the standard grip bothers your shoulders', 'Keep elbows closer to your torso than a normal press'],
    videoUrl: ytSearch('Neutral Grip Dumbbell Press')
  },

  // ---------- BACK ----------
  {
    id: 'conventional-deadlift',
    name: 'Conventional Deadlift',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Lower Back', 'Hamstrings', 'Glutes', 'Back'],
    description: 'The full-body pull that builds more raw strength than almost any other lift.',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Hinge down and grip the bar just outside your legs',
      'Flatten your back and drive through the floor',
      'Lock out standing tall, then lower with control'
    ],
    tips: ['Keep the bar close to your shins and thighs', 'Brace your core hard before every rep'],
    videoUrl: ytSearch('Conventional Deadlift')
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Lats', 'Biceps'],
    description: 'A machine pulldown that builds back width for lifters who cannot yet do pull-ups.',
    instructions: [
      'Sit with thighs secured under the pads',
      'Grip the bar wider than shoulder-width',
      'Pull the bar down to your upper chest',
      'Let it rise back up with control'
    ],
    tips: ['Pull with your elbows, not your hands', 'Avoid leaning back excessively to cheat the weight down'],
    videoUrl: ytSearch('Lat Pulldown')
  },
  {
    id: 'wide-grip-pull-up',
    name: 'Wide-Grip Pull-Up',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Lats', 'Biceps'],
    description: 'A wide-grip bodyweight pull that emphasizes back width.',
    instructions: [
      'Hang from a bar with hands wider than shoulder-width',
      'Pull your chest up toward the bar',
      'Squeeze your shoulder blades together at the top',
      'Lower back down under control'
    ],
    tips: ['Avoid kipping or swinging your legs', 'Use a resistance band for assistance if needed'],
    videoUrl: ytSearch('Wide Grip Pull Up')
  },
  {
    id: 'chin-up',
    name: 'Chin-Up',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Lats', 'Biceps'],
    description: 'An underhand-grip pull-up variation that brings the biceps more into play.',
    instructions: [
      'Hang from a bar with palms facing you, shoulder-width apart',
      'Pull yourself up until your chin clears the bar',
      'Pause briefly at the top',
      'Lower yourself back down with control'
    ],
    tips: ['Usually easier than pull-ups thanks to bicep involvement', 'Keep your core tight to avoid excessive swinging'],
    videoUrl: ytSearch('Chin Up')
  },
  {
    id: 'close-grip-lat-pulldown',
    name: 'Close-Grip Lat Pulldown',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Lats', 'Biceps'],
    description: 'A pulldown variation with a narrow handle that extends the range of motion.',
    instructions: [
      'Attach a close-grip handle to the pulldown cable',
      'Sit and grip with palms facing each other',
      'Pull the handle down toward your upper chest',
      'Return to a full stretch overhead'
    ],
    tips: ['Focus on driving your elbows down and back', 'Keep your torso upright rather than leaning back'],
    videoUrl: ytSearch('Close Grip Lat Pulldown')
  },
  {
    id: 'straight-arm-lat-pulldown',
    name: 'Straight-Arm Lat Pulldown',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Lats'],
    description: 'An isolation pulldown that hits the lats without involving the biceps.',
    instructions: [
      'Grip a straight bar attached to a high pulley',
      'Keep your arms straight throughout',
      'Pull the bar down toward your thighs',
      'Let it rise back up with control'
    ],
    tips: ['Keep a slight, fixed bend in the elbows, not a full lockout', 'Hinge slightly at the hips to keep tension on the lats'],
    videoUrl: ytSearch('Straight Arm Lat Pulldown')
  },
  {
    id: 'bent-over-barbell-row',
    name: 'Bent-Over Barbell Row',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Back', 'Lats', 'Biceps'],
    description: 'A heavy horizontal pull that builds thickness across the entire back.',
    instructions: [
      'Hinge forward at the hips holding a barbell',
      'Keep your back flat and core braced',
      'Pull the bar to your lower ribs',
      'Lower it back down with control'
    ],
    tips: ['Avoid rounding your lower back under load', 'Pull with your elbows rather than your hands'],
    videoUrl: ytSearch('Bent Over Barbell Row')
  },
  {
    id: 'one-arm-dumbbell-row',
    name: 'One-Arm Dumbbell Row',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Back', 'Lats', 'Biceps'],
    description: 'A unilateral row supported on a bench that isolates each side of the back.',
    instructions: [
      'Place one knee and hand on a bench for support',
      'Hold a dumbbell in the opposite hand, arm extended',
      'Pull the dumbbell to your hip',
      'Lower it back down with control'
    ],
    tips: ['Keep your torso parallel to the floor', 'Avoid rotating your shoulders as you row'],
    videoUrl: ytSearch('One Arm Dumbbell Row')
  },
  {
    id: 'seated-cable-row',
    name: 'Seated Cable Row',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Back', 'Upper Back', 'Biceps'],
    description: 'A seated horizontal pull that builds mid-back thickness.',
    instructions: [
      'Sit with feet braced on the platform, knees slightly bent',
      'Grip the handle with arms extended',
      'Pull the handle to your torso, squeezing your shoulder blades',
      'Extend your arms back out with control'
    ],
    tips: ['Keep your torso still rather than rocking back and forth', 'Avoid shrugging your shoulders up toward your ears'],
    videoUrl: ytSearch('Seated Cable Row')
  },
  {
    id: 't-bar-row',
    name: 'T-Bar Row',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Back', 'Upper Back', 'Lats'],
    description: 'A chest-supported or bent-over row using a landmine-style bar for heavy back work.',
    instructions: [
      'Straddle the bar with a chest-supported or bent-over stance',
      'Grip the handles with a neutral or wide grip',
      'Row the weight up toward your torso',
      'Lower it back down under control'
    ],
    tips: ['Keep your chest up and back flat throughout', 'Squeeze your shoulder blades together at the top'],
    videoUrl: ytSearch('T-Bar Row')
  },
  {
    id: 'inverted-row',
    name: 'Inverted Row',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Back', 'Upper Back', 'Biceps'],
    description: 'A horizontal bodyweight pull done under a bar, great for building rowing strength.',
    instructions: [
      'Set a bar at hip height in a rack',
      'Hang underneath it with body straight, heels on the floor',
      'Pull your chest up to the bar',
      'Lower back down with control'
    ],
    tips: ['Raise the bar height to make it easier, lower it to make it harder', 'Keep your body rigid from head to heels'],
    videoUrl: ytSearch('Inverted Row')
  },
  {
    id: 'landmine-row',
    name: 'Landmine Row',
    category: 'strength',
    equipment: 'landmine',
    difficulty: 'intermediate',
    muscles: ['Back', 'Lats', 'Biceps'],
    description: 'A bent-over row using a landmine-anchored barbell for a natural pulling path.',
    instructions: [
      'Anchor a barbell in a landmine attachment',
      'Hinge forward and grip the bar near the sleeve',
      'Row the bar up toward your torso',
      'Lower it back down under control'
    ],
    tips: ['Keep your hips hinged and back flat', 'Pull your elbow past your torso for a full contraction'],
    videoUrl: ytSearch('Landmine Row')
  },
  {
    id: 'machine-row',
    name: 'Machine Row',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Back', 'Upper Back', 'Lats'],
    description: 'A chest-supported machine row that removes lower back strain from the equation.',
    instructions: [
      'Sit or kneel into the chest pad',
      'Grip the handles with arms extended',
      'Pull the handles toward your torso',
      'Extend back out with control'
    ],
    tips: ['Adjust the seat so handles align with your chest', 'Focus on squeezing your shoulder blades together'],
    videoUrl: ytSearch('Machine Row')
  },
  {
    id: 'face-pull',
    name: 'Face Pull',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Upper Back', 'Rear Delts'],
    description: 'A cable pull to face level that strengthens the upper back and rear shoulders.',
    instructions: [
      'Attach a rope to a high pulley',
      'Pull the rope toward your face, elbows high',
      'Externally rotate your hands at the end of the pull',
      'Return with control to the start'
    ],
    tips: ['Use a lighter weight and focus on form', 'Great accessory movement for shoulder health'],
    videoUrl: ytSearch('Face Pull')
  },
  {
    id: 'hyperextension',
    name: 'Hyperextension',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Lower Back', 'Glutes'],
    description: 'A bench-supported extension that strengthens the lower back and glutes.',
    instructions: [
      'Position your hips on the pad with legs secured',
      'Cross your arms over your chest',
      'Lower your torso down toward the floor',
      'Raise back up until your body forms a straight line'
    ],
    tips: ['Avoid hyperextending past a straight line at the top', 'Add a plate to your chest once bodyweight gets easy'],
    videoUrl: ytSearch('Hyperextension')
  },
  {
    id: 'rack-pull',
    name: 'Rack Pull',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Lower Back', 'Back', 'Traps'],
    description: 'A partial deadlift from knee height that overloads the top-end back muscles.',
    instructions: [
      'Set the bar on safety pins at knee height',
      'Grip the bar and set your back flat',
      'Drive through your legs to lock out standing',
      'Lower the bar back to the pins with control'
    ],
    tips: ['Allows heavier loading than a full deadlift', 'Keep your shoulders pulled back throughout'],
    videoUrl: ytSearch('Rack Pull')
  },
  {
    id: 'reverse-grip-lat-pulldown',
    name: 'Reverse-Grip Lat Pulldown',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Lats', 'Biceps'],
    description: 'An underhand-grip pulldown that brings more biceps into a lat-focused pull.',
    instructions: [
      'Grip the bar with palms facing you, shoulder-width apart',
      'Pull the bar down to your upper chest',
      'Squeeze your lats at the bottom',
      'Return to a full stretch overhead'
    ],
    tips: ['Keep your chest up rather than leaning back', 'A good alternative when chin-ups are too hard'],
    videoUrl: ytSearch('Reverse Grip Lat Pulldown')
  },

  // ---------- SHOULDERS ----------
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Shoulders', 'Triceps', 'Core'],
    description: 'A standing barbell press that builds total shoulder strength and stability.',
    instructions: [
      'Hold the bar at shoulder height with hands just outside shoulder-width',
      'Brace your core and squeeze your glutes',
      'Press the bar straight overhead to lockout',
      'Lower it back down to your shoulders with control'
    ],
    tips: ['Move your head back slightly as the bar passes your face', 'Avoid leaning back excessively to press the weight up'],
    videoUrl: ytSearch('Overhead Press')
  },
  {
    id: 'seated-dumbbell-shoulder-press',
    name: 'Seated Dumbbell Shoulder Press',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Shoulders', 'Triceps'],
    description: 'A seated press that isolates the shoulders with less lower-body involvement.',
    instructions: [
      'Sit on a bench with back support, dumbbells at shoulder height',
      'Press the dumbbells overhead until arms extend',
      'Bring them back down to shoulder level',
      'Repeat without arching your lower back excessively'
    ],
    tips: ['Keep your core braced against the backrest', 'Avoid clanking the dumbbells together at the top'],
    videoUrl: ytSearch('Seated Dumbbell Shoulder Press')
  },
  {
    id: 'arnold-press',
    name: 'Arnold Press',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Shoulders', 'Triceps'],
    description: 'A rotating dumbbell press that works all three heads of the shoulder.',
    instructions: [
      'Start with dumbbells in front of your shoulders, palms facing you',
      'Press up while rotating your palms to face forward',
      'Reach full lockout overhead',
      'Reverse the rotation as you lower back down'
    ],
    tips: ['Keep the rotation smooth and controlled', 'Use lighter weight than a standard press to start'],
    videoUrl: ytSearch('Arnold Press')
  },
  {
    id: 'dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Shoulders'],
    description: 'The go-to isolation move for building wider, rounder shoulders.',
    instructions: [
      'Stand holding a dumbbell in each hand at your sides',
      'Raise your arms out to the sides until shoulder height',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Lead with your elbows, not your hands', 'Use a lighter weight to avoid swinging the reps up'],
    videoUrl: ytSearch('Dumbbell Lateral Raise')
  },
  {
    id: 'cable-lateral-raise',
    name: 'Cable Lateral Raise',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Shoulders'],
    description: 'A cable version of the lateral raise that keeps tension on through the bottom of the rep.',
    instructions: [
      'Stand sideways to a low pulley, handle in the far hand',
      'Raise your arm out to the side to shoulder height',
      'Pause at the top',
      'Lower back down with control'
    ],
    tips: ['The cable keeps tension on even at the bottom of the rep', 'Avoid shrugging your shoulder up as you raise'],
    videoUrl: ytSearch('Cable Lateral Raise')
  },
  {
    id: 'front-raise',
    name: 'Front Raise',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Shoulders'],
    description: 'An isolation raise that targets the front head of the shoulder.',
    instructions: [
      'Hold dumbbells in front of your thighs',
      'Raise one or both arms straight out in front to shoulder height',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Avoid using momentum to swing the weight up', 'Keep a slight bend in the elbows throughout'],
    videoUrl: ytSearch('Front Raise')
  },
  {
    id: 'bent-over-reverse-fly',
    name: 'Bent-Over Reverse Fly',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Rear Delts', 'Upper Back'],
    description: 'A bent-over raise that targets the rear delts, often a lagging area.',
    instructions: [
      'Hinge forward at the hips holding dumbbells beneath your chest',
      'Raise your arms out to the sides, squeezing your shoulder blades',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Keep a soft bend in the elbows the whole set', 'Avoid using your lower back to heave the weight up'],
    videoUrl: ytSearch('Bent Over Reverse Fly')
  },
  {
    id: 'smith-machine-shoulder-press',
    name: 'Smith Machine Shoulder Press',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Shoulders', 'Triceps'],
    description: 'A guided-bar overhead press that removes the balance component.',
    instructions: [
      'Sit or stand under the fixed bar at shoulder height',
      'Unrack and press the bar overhead',
      'Lower it back down to shoulder level',
      'Repeat for the full set'
    ],
    tips: ['Position the bench so the bar path clears your face', 'Good option for pushing close to failure safely'],
    videoUrl: ytSearch('Smith Machine Shoulder Press')
  },
  {
    id: 'machine-shoulder-press',
    name: 'Machine Shoulder Press',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Shoulders', 'Triceps'],
    description: 'A fixed-path pressing machine that is easy on the joints and simple to learn.',
    instructions: [
      'Adjust the seat so handles align with shoulder height',
      'Press the handles up until arms extend',
      'Lower back down with control',
      'Repeat for the full set'
    ],
    tips: ['Keep your back flat against the pad', 'Avoid locking out your elbows aggressively'],
    videoUrl: ytSearch('Machine Shoulder Press')
  },
  {
    id: 'machine-reverse-fly',
    name: 'Machine Reverse Fly',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Rear Delts', 'Upper Back'],
    description: 'A chest-supported machine fly that isolates the rear delts.',
    instructions: [
      'Sit facing the pad with chest supported',
      'Grip the handles with arms extended forward',
      'Bring your arms out and back, squeezing your shoulder blades',
      'Return with control to the start'
    ],
    tips: ['Adjust the seat height so handles align with your shoulders', 'Focus on a slow, controlled squeeze rather than heavy weight'],
    videoUrl: ytSearch('Machine Reverse Fly')
  },
  {
    id: 'seated-barbell-shoulder-press',
    name: 'Seated Barbell Shoulder Press',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Shoulders', 'Triceps'],
    description: 'A seated barbell press that removes leg drive for a stricter shoulder movement.',
    instructions: [
      'Sit on a bench with back support, bar at shoulder height',
      'Press the bar straight overhead',
      'Lower it back down to shoulder level',
      'Repeat with a controlled tempo'
    ],
    tips: ['Keep your wrists stacked directly over your elbows', 'Brace your core even though you are seated'],
    videoUrl: ytSearch('Seated Barbell Shoulder Press')
  },
  {
    id: 'single-arm-cable-lateral-raise',
    name: 'Single-Arm Cable Lateral Raise',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'intermediate',
    muscles: ['Shoulders'],
    description: 'A crossbody cable raise that isolates one shoulder at a time.',
    instructions: [
      'Stand sideways to a low pulley, handle in the far hand',
      'Raise your arm across your body and up to shoulder height',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Keep your torso still, letting only the arm move', 'Use a lighter weight than the standard dumbbell version'],
    videoUrl: ytSearch('Single Arm Cable Lateral Raise')
  },
  {
    id: 'standing-dumbbell-front-raise',
    name: 'Standing Dumbbell Front Raise',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Shoulders'],
    description: 'A standing raise that isolates the front deltoid.',
    instructions: [
      'Stand holding dumbbells in front of your thighs',
      'Raise both arms straight out in front to shoulder height',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Alternate arms if lifting both together causes swinging', 'Keep your torso upright throughout'],
    videoUrl: ytSearch('Standing Dumbbell Front Raise')
  },
  {
    id: 'band-pull-apart',
    name: 'Band Pull-Apart',
    category: 'strength',
    equipment: 'bands',
    difficulty: 'beginner',
    muscles: ['Rear Delts', 'Upper Back'],
    description: 'A simple band exercise that strengthens the rear shoulders and improves posture.',
    instructions: [
      'Hold a resistance band with both hands at shoulder height',
      'Pull the band apart by squeezing your shoulder blades',
      'Pause briefly with arms extended out to the sides',
      'Return with control to the start'
    ],
    tips: ['Great warm-up move before pressing exercises', 'Keep your arms straight throughout the pull'],
    videoUrl: ytSearch('Band Pull Apart')
  },
  {
    id: 'plate-front-raise',
    name: 'Plate Front Raise',
    category: 'strength',
    equipment: 'plate',
    difficulty: 'beginner',
    muscles: ['Shoulders'],
    description: 'A front raise using a weight plate for a slightly different grip and feel.',
    instructions: [
      'Hold a weight plate with both hands in front of your thighs',
      'Raise the plate straight out in front to shoulder height',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Keep your arms straight but not locked', 'Avoid arching your back to help the plate up'],
    videoUrl: ytSearch('Plate Front Raise')
  },
  {
    id: 'behind-the-neck-press',
    name: 'Behind-the-Neck Press',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Shoulders', 'Triceps'],
    description: 'An overhead press variation lowered behind the neck for lifters with the mobility for it.',
    instructions: [
      'Sit or stand with the bar resting behind your neck',
      'Press the bar straight overhead',
      'Lower it back down behind your neck with control',
      'Repeat only within a comfortable range of motion'
    ],
    tips: ['Requires good shoulder mobility - skip it if it pinches', 'Use a lighter weight than your front press'],
    videoUrl: ytSearch('Behind The Neck Press')
  },
  {
    id: 'cable-internal-rotation',
    name: 'Cable Internal Rotation',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Shoulders'],
    description: 'A low-load rotator cuff exercise that supports shoulder health.',
    instructions: [
      'Stand sideways to a low pulley with elbow tucked at 90 degrees',
      'Rotate your forearm across your body',
      'Pause briefly at the end of the rotation',
      'Return with control to the start'
    ],
    tips: ['Use very light weight - this is a prehab movement, not a mass builder', 'Keep your elbow pinned to your side throughout'],
    videoUrl: ytSearch('Cable Internal Rotation')
  },

  // ---------- BICEPS ----------
  {
    id: 'standing-barbell-curl',
    name: 'Standing Barbell Curl',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Biceps'],
    description: 'The classic mass-building curl for overall bicep size.',
    instructions: [
      'Stand holding a barbell with an underhand, shoulder-width grip',
      'Curl the bar up toward your shoulders',
      'Squeeze your biceps at the top',
      'Lower back down with control'
    ],
    tips: ['Keep your elbows pinned to your sides', 'Avoid swinging your hips to heave the weight up'],
    videoUrl: ytSearch('Standing Barbell Curl')
  },
  {
    id: 'ez-bar-curl',
    name: 'EZ-Bar Curl',
    category: 'strength',
    equipment: 'ez-bar',
    difficulty: 'beginner',
    muscles: ['Biceps'],
    description: 'A curl using an angled bar that is easier on the wrists than a straight bar.',
    instructions: [
      'Grip the EZ-bar at the angled sections',
      'Curl the bar up toward your shoulders',
      'Squeeze at the top of the movement',
      'Lower back down with control'
    ],
    tips: ['A good option if straight-bar curls bother your wrists', 'Keep your upper arms still throughout'],
    videoUrl: ytSearch('EZ Bar Curl')
  },
  {
    id: 'standing-dumbbell-curl',
    name: 'Standing Dumbbell Curl',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Biceps'],
    description: 'A staple dumbbell curl that lets each arm move independently.',
    instructions: [
      'Stand holding a dumbbell in each hand at your sides',
      'Curl one or both dumbbells up toward your shoulders',
      'Rotate your palms to face up as you curl',
      'Lower back down with control'
    ],
    tips: ['Keep your elbows fixed at your sides', 'Alternate arms if it helps you maintain strict form'],
    videoUrl: ytSearch('Standing Dumbbell Curl')
  },
  {
    id: 'incline-dumbbell-curl',
    name: 'Incline Dumbbell Curl',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Biceps'],
    description: 'A curl performed on an incline bench that stretches the biceps at the bottom.',
    instructions: [
      'Sit back on an incline bench with arms hanging straight down',
      'Curl the dumbbells up toward your shoulders',
      'Squeeze at the top',
      'Lower back down to a full stretch'
    ],
    tips: ['The incline prevents cheating with body momentum', 'Keep your upper arms pinned against the bench'],
    videoUrl: ytSearch('Incline Dumbbell Curl')
  },
  {
    id: 'hammer-curl',
    name: 'Hammer Curl',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Biceps', 'Forearms'],
    description: 'A neutral-grip curl that builds the brachialis and forearms alongside the biceps.',
    instructions: [
      'Stand holding dumbbells with palms facing your torso',
      'Curl the dumbbells up while keeping the neutral grip',
      'Squeeze at the top',
      'Lower back down with control'
    ],
    tips: ['Keep your wrists straight throughout the curl', 'Avoid swinging the weight up with momentum'],
    videoUrl: ytSearch('Hammer Curl')
  },
  {
    id: 'cross-body-hammer-curl',
    name: 'Cross-Body Hammer Curl',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Biceps', 'Forearms'],
    description: 'A hammer curl variation that curls the dumbbell across the body.',
    instructions: [
      'Stand holding dumbbells with a neutral grip',
      'Curl one dumbbell up and across toward the opposite shoulder',
      'Squeeze briefly at the top',
      'Lower back down and repeat on the other side'
    ],
    tips: ['Keep your elbow tucked rather than flaring out', 'Control the weight on the way down'],
    videoUrl: ytSearch('Cross Body Hammer Curl')
  },
  {
    id: 'concentration-curl',
    name: 'Concentration Curl',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Biceps'],
    description: 'A seated single-arm curl that removes momentum for a strict peak contraction.',
    instructions: [
      'Sit on a bench and brace your elbow against your inner thigh',
      'Curl the dumbbell up toward your shoulder',
      'Squeeze hard at the top',
      'Lower back down to a full stretch'
    ],
    tips: ['Keep your torso still throughout the rep', 'Focus on squeezing rather than lifting heavy'],
    videoUrl: ytSearch('Concentration Curl')
  },
  {
    id: 'cable-curl',
    name: 'Cable Curl',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Biceps'],
    description: 'A curl performed on a low pulley that keeps constant tension on the biceps.',
    instructions: [
      'Stand facing a low pulley with a straight or EZ-bar handle',
      'Curl the handle up toward your shoulders',
      'Squeeze at the top',
      'Lower back down with control'
    ],
    tips: ['The cable keeps tension on even at full arm extension', 'Keep your elbows pinned to your sides'],
    videoUrl: ytSearch('Cable Curl')
  },
  {
    id: 'ez-bar-preacher-curl',
    name: 'EZ-Bar Preacher Curl',
    category: 'strength',
    equipment: 'ez-bar',
    difficulty: 'beginner',
    muscles: ['Biceps'],
    description: 'A preacher bench curl that isolates the biceps by locking the upper arms in place.',
    instructions: [
      'Rest your upper arms on the preacher pad',
      'Curl the bar up toward your shoulders',
      'Squeeze at the top',
      'Lower back down to a full stretch'
    ],
    tips: ['The pad prevents any cheating with your shoulders', 'Do not lock out your elbows hard at the bottom'],
    videoUrl: ytSearch('EZ Bar Preacher Curl')
  },
  {
    id: 'barbell-preacher-curl',
    name: 'Barbell Preacher Curl',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Biceps'],
    description: 'A straight-bar version of the preacher curl for strict bicep isolation.',
    instructions: [
      'Rest your upper arms on the preacher pad, gripping the bar',
      'Curl the bar up toward your shoulders',
      'Squeeze at the top',
      'Lower back down to a full stretch'
    ],
    tips: ['Use a lighter weight than your standing curl', 'Keep the rep speed controlled throughout'],
    videoUrl: ytSearch('Barbell Preacher Curl')
  },
  {
    id: 'spider-curl',
    name: 'Spider Curl',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Biceps'],
    description: 'A curl done face-down on an incline bench that isolates the biceps peak.',
    instructions: [
      'Lie face-down on an incline bench with arms hanging',
      'Curl the dumbbells up toward your shoulders',
      'Squeeze hard at the top',
      'Lower back down to a full stretch'
    ],
    tips: ['Keep your upper arms perpendicular to the floor', 'Avoid letting your shoulders round forward'],
    videoUrl: ytSearch('Spider Curl')
  },
  {
    id: 'zottman-curl',
    name: 'Zottman Curl',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Biceps', 'Forearms'],
    description: 'A curl that flips grip at the top, training biceps and forearms in one movement.',
    instructions: [
      'Curl the dumbbells up with palms facing up',
      'Rotate your wrists so palms face down at the top',
      'Lower the dumbbells slowly with the reversed grip',
      'Rotate back to the starting grip at the bottom'
    ],
    tips: ['Control the lowering phase - that is where the forearm work happens', 'Use a lighter weight than a normal curl'],
    videoUrl: ytSearch('Zottman Curl')
  },
  {
    id: 'machine-bicep-curl',
    name: 'Machine Bicep Curl',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Biceps'],
    description: 'A guided curl machine that isolates the biceps with a fixed path.',
    instructions: [
      'Sit and rest your upper arms on the pad',
      'Curl the handles up toward your shoulders',
      'Squeeze at the top',
      'Lower back down with control'
    ],
    tips: ['Adjust the seat so the pivot point lines up with your elbow', 'Avoid jerking the weight up at the start'],
    videoUrl: ytSearch('Machine Bicep Curl')
  },
  {
    id: 'barbell-drag-curl',
    name: 'Barbell Drag Curl',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Biceps'],
    description: 'A curl variation that drags the bar up your torso to reduce shoulder involvement.',
    instructions: [
      'Hold the bar with an underhand grip in front of your thighs',
      'Drag the bar up along your torso, elbows moving back',
      'Curl to the top with elbows behind your torso',
      'Lower back down the same path'
    ],
    tips: ['This keeps tension purely on the biceps rather than the front delts', 'Use a lighter weight than a standard curl'],
    videoUrl: ytSearch('Barbell Drag Curl')
  },
  {
    id: 'reverse-grip-barbell-curl',
    name: 'Reverse-Grip Barbell Curl',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Forearms', 'Biceps'],
    description: 'An overhand-grip curl that shifts emphasis toward the forearms.',
    instructions: [
      'Hold the bar with an overhand, shoulder-width grip',
      'Curl the bar up toward your shoulders',
      'Squeeze at the top',
      'Lower back down with control'
    ],
    tips: ['Expect to use lighter weight than your normal curl', 'Keep your wrists firm rather than letting them bend'],
    videoUrl: ytSearch('Reverse Grip Barbell Curl')
  },
  {
    id: 'alternating-seated-dumbbell-curl',
    name: 'Alternating Seated Dumbbell Curl',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Biceps'],
    description: 'A seated curl done one arm at a time to prevent momentum from creeping in.',
    instructions: [
      'Sit on a bench holding a dumbbell in each hand',
      'Curl one dumbbell up while the other stays down',
      'Lower it back down as you curl the opposite arm',
      'Continue alternating for the full set'
    ],
    tips: ['Sitting removes the ability to swing your hips for momentum', 'Rotate your palm up as you curl for a full contraction'],
    videoUrl: ytSearch('Alternating Seated Dumbbell Curl')
  },

  // ---------- TRICEPS ----------
  {
    id: 'close-grip-bench-press',
    name: 'Close-Grip Bench Press',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Triceps', 'Chest'],
    description: 'A narrow-grip bench press that shifts most of the load onto the triceps.',
    instructions: [
      'Lie on a flat bench with hands just inside shoulder-width',
      'Lower the bar to your lower chest, elbows tucked',
      'Press back up to lockout',
      'Repeat with a controlled tempo'
    ],
    tips: ['Keep elbows tucked rather than flared out', 'Do not grip narrower than shoulder-width - it stresses the wrists'],
    videoUrl: ytSearch('Close Grip Bench Press')
  },
  {
    id: 'ez-bar-skullcrusher',
    name: 'EZ-Bar Skullcrusher',
    category: 'strength',
    equipment: 'ez-bar',
    difficulty: 'intermediate',
    muscles: ['Triceps'],
    description: 'A lying extension that stretches and overloads the triceps hard.',
    instructions: [
      'Lie on a bench holding an EZ-bar above your chest',
      'Bend your elbows to lower the bar toward your forehead',
      'Keep your upper arms stationary',
      'Extend back up to the starting position'
    ],
    tips: ['Keep elbows pointed forward, not flared out', 'Lower the bar just behind your head to protect your face'],
    videoUrl: ytSearch('EZ Bar Skullcrusher')
  },
  {
    id: 'overhead-dumbbell-tricep-extension',
    name: 'Overhead Dumbbell Tricep Extension',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Triceps'],
    description: 'An overhead extension that stretches the long head of the triceps.',
    instructions: [
      'Hold a dumbbell with both hands overhead',
      'Lower it behind your head by bending your elbows',
      'Keep your upper arms close to your ears',
      'Extend back up to full lockout'
    ],
    tips: ['Keep your elbows pointed forward rather than flaring out', 'Use a slow, controlled tempo on the way down'],
    videoUrl: ytSearch('Overhead Dumbbell Tricep Extension')
  },
  {
    id: 'rope-tricep-pushdown',
    name: 'Rope Tricep Pushdown',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Triceps'],
    description: 'A cable pushdown with a rope attachment that allows the hands to split apart at the bottom.',
    instructions: [
      'Grip a rope attached to a high pulley',
      'Push the rope down while spreading your hands apart',
      'Fully extend your arms at the bottom',
      'Return with control to the start'
    ],
    tips: ['Keep your elbows pinned to your sides', 'Avoid leaning forward to add extra body weight to the push'],
    videoUrl: ytSearch('Rope Tricep Pushdown')
  },
  {
    id: 'straight-bar-tricep-pushdown',
    name: 'Straight-Bar Tricep Pushdown',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Triceps'],
    description: 'A cable pushdown with a straight bar for a classic triceps pump.',
    instructions: [
      'Grip a straight bar attached to a high pulley',
      'Push the bar down until your arms fully extend',
      'Pause briefly at the bottom',
      'Return with control to the start'
    ],
    tips: ['Keep your elbows fixed at your sides throughout', 'Avoid using your shoulders to help push the bar down'],
    videoUrl: ytSearch('Straight Bar Tricep Pushdown')
  },
  {
    id: 'tricep-dip',
    name: 'Tricep Dip',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Triceps', 'Chest', 'Shoulders'],
    description: 'An upright dip variation that keeps the triceps as the primary mover.',
    instructions: [
      'Grip parallel bars and support your body with arms extended',
      'Keep your torso upright rather than leaning forward',
      'Lower until your elbows reach about 90 degrees',
      'Press back up to full extension'
    ],
    tips: ['The more upright your torso, the more triceps involvement', 'Use an assisted dip machine if bodyweight dips are too hard'],
    videoUrl: ytSearch('Tricep Dip')
  },
  {
    id: 'bench-dip',
    name: 'Bench Dip',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Triceps', 'Shoulders'],
    description: 'A beginner-friendly dip performed with hands on a bench.',
    instructions: [
      'Place your hands on a bench behind you, legs extended out front',
      'Lower your hips toward the floor by bending your elbows',
      'Keep your elbows pointed backward',
      'Press back up to the starting position'
    ],
    tips: ['Bend your knees to make the movement easier', 'Keep your hips close to the bench throughout'],
    videoUrl: ytSearch('Bench Dip')
  },
  {
    id: 'dumbbell-tricep-kickback',
    name: 'Dumbbell Tricep Kickback',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Triceps'],
    description: 'A bent-over isolation move that squeezes the triceps at full extension.',
    instructions: [
      'Hinge forward with one hand on a bench for support',
      'Hold a dumbbell with your upper arm parallel to the floor',
      'Extend your arm straight back',
      'Return with control to the bent position'
    ],
    tips: ['Keep your upper arm still, moving only from the elbow', 'Avoid swinging the weight up with momentum'],
    videoUrl: ytSearch('Dumbbell Tricep Kickback')
  },
  {
    id: 'one-arm-overhead-dumbbell-extension',
    name: 'One-Arm Overhead Dumbbell Extension',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Triceps'],
    description: 'A single-arm overhead extension that isolates each triceps individually.',
    instructions: [
      'Hold a dumbbell overhead with one arm',
      'Lower it behind your head by bending your elbow',
      'Keep your upper arm close to your ear',
      'Extend back up to full lockout'
    ],
    tips: ['Use your free hand to support your elbow if needed', 'Keep the movement slow to protect the elbow joint'],
    videoUrl: ytSearch('One Arm Overhead Dumbbell Extension')
  },
  {
    id: 'french-press',
    name: 'French Press',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Triceps'],
    description: 'A seated or standing overhead barbell extension for the triceps.',
    instructions: [
      'Hold a barbell overhead with a shoulder-width grip',
      'Lower it behind your head by bending your elbows',
      'Keep your upper arms stationary',
      'Extend back up to full lockout'
    ],
    tips: ['Keep your core braced to protect your lower back', 'Use a spotter when going heavy'],
    videoUrl: ytSearch('French Press Tricep')
  },
  {
    id: 'dumbbell-floor-press',
    name: 'Dumbbell Floor Press',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Triceps', 'Chest'],
    description: 'A floor-based press that limits range of motion to protect the shoulders while overloading triceps.',
    instructions: [
      'Lie on the floor with knees bent, dumbbells at chest level',
      'Press the dumbbells up until arms extend',
      'Lower until your elbows touch the floor',
      'Pause briefly before pressing back up'
    ],
    tips: ['The floor limits the range, which is easier on the shoulders', 'Pause at the bottom rather than bouncing off the floor'],
    videoUrl: ytSearch('Dumbbell Floor Press')
  },
  {
    id: 'close-grip-push-up',
    name: 'Close-Grip Push-Up',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Triceps', 'Chest'],
    description: 'A push-up with hands close together that emphasizes the triceps.',
    instructions: [
      'Start in a plank position with hands close together under your chest',
      'Lower your chest toward your hands',
      'Keep your elbows tucked close to your torso',
      'Push back up to the starting position'
    ],
    tips: ['Drop to your knees to regress if needed', 'Keep your core braced so your hips do not sag'],
    videoUrl: ytSearch('Close Grip Push Up')
  },
  {
    id: 'weighted-dip',
    name: 'Weighted Dip',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    muscles: ['Triceps', 'Chest', 'Shoulders'],
    description: 'A dip with extra weight added via a belt for advanced lifters.',
    instructions: [
      'Attach a weight plate to a dip belt around your waist',
      'Grip parallel bars and support your body with arms extended',
      'Lower until your elbows reach about 90 degrees',
      'Press back up to full extension'
    ],
    tips: ['Master bodyweight dips for reps before adding load', 'Keep your torso upright to bias the triceps'],
    videoUrl: ytSearch('Weighted Dip')
  },
  {
    id: 'cable-overhead-tricep-extension',
    name: 'Cable Overhead Tricep Extension',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Triceps'],
    description: 'An overhead cable extension that keeps constant tension on the long head.',
    instructions: [
      'Face away from a low pulley, rope handle overhead',
      'Lower the rope behind your head by bending your elbows',
      'Keep your upper arms close to your ears',
      'Extend back up to full lockout'
    ],
    tips: ['Step forward slightly to keep the cable path clean', 'Keep elbows pointed forward throughout'],
    videoUrl: ytSearch('Cable Overhead Tricep Extension')
  },
  {
    id: 'lying-barbell-tricep-extension',
    name: 'Lying Barbell Tricep Extension',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Triceps'],
    description: 'A straight-bar lying extension, also known as the skull crusher.',
    instructions: [
      'Lie on a bench holding a barbell above your chest',
      'Bend your elbows to lower the bar toward your forehead',
      'Keep your upper arms stationary',
      'Extend back up to the starting position'
    ],
    tips: ['Use an EZ-bar instead if a straight bar bothers your wrists', 'Lower the bar toward your forehead, not your throat'],
    videoUrl: ytSearch('Lying Barbell Tricep Extension')
  },
  {
    id: 'machine-tricep-extension',
    name: 'Machine Tricep Extension',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Triceps'],
    description: 'A guided extension machine that isolates the triceps with a fixed path.',
    instructions: [
      'Sit and rest your upper arms on the pad',
      'Push the handles down until your arms extend',
      'Pause briefly at the bottom',
      'Return with control to the start'
    ],
    tips: ['Adjust the seat so your elbows line up with the pivot', 'Keep your upper arms still throughout the set'],
    videoUrl: ytSearch('Machine Tricep Extension')
  },

  // ---------- FOREARMS ----------
  {
    id: 'seated-barbell-wrist-curl',
    name: 'Seated Barbell Wrist Curl',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Forearms'],
    description: 'A seated curl that isolates the wrist flexors for forearm size.',
    instructions: [
      'Sit with forearms resting on your thighs, holding a barbell',
      'Let the bar roll down to your fingertips',
      'Curl your wrists to raise the bar back up',
      'Repeat with a controlled tempo'
    ],
    tips: ['Use a light weight - forearms fatigue quickly', 'Keep your forearms pinned to your legs throughout'],
    videoUrl: ytSearch('Seated Barbell Wrist Curl')
  },
  {
    id: 'barbell-reverse-wrist-curl',
    name: 'Barbell Reverse Wrist Curl',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Forearms'],
    description: 'A wrist extension movement that balances out the forearm flexors.',
    instructions: [
      'Sit with forearms resting on your thighs, palms facing down',
      'Let the bar lower toward your fingertips',
      'Extend your wrists to raise the bar back up',
      'Repeat with a controlled tempo'
    ],
    tips: ['Use a much lighter weight than your regular wrist curl', 'Keep the movement slow and deliberate'],
    videoUrl: ytSearch('Barbell Reverse Wrist Curl')
  },
  {
    id: 'dumbbell-wrist-curl',
    name: 'Dumbbell Wrist Curl',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Forearms'],
    description: 'A single-arm wrist curl using a dumbbell for independent forearm work.',
    instructions: [
      'Sit with your forearm resting on your thigh, holding a dumbbell',
      'Let the dumbbell roll down toward your fingertips',
      'Curl your wrist to raise the weight back up',
      'Repeat, then switch arms'
    ],
    tips: ['Isolate one arm at a time to fix imbalances', 'Keep the movement slow and controlled'],
    videoUrl: ytSearch('Dumbbell Wrist Curl')
  },
  {
    id: 'dumbbell-farmers-carry',
    name: "Dumbbell Farmer's Carry",
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Forearms', 'Traps', 'Core'],
    description: 'A loaded carry that builds crushing grip strength and core stability.',
    instructions: [
      'Hold a heavy dumbbell in each hand at your sides',
      'Stand tall with shoulders back',
      'Walk forward for a set distance or time',
      'Set the weights down with control'
    ],
    tips: ['Keep your core braced as if bracing for a punch', 'Avoid letting your shoulders round forward'],
    videoUrl: ytSearch('Dumbbell Farmers Carry')
  },
  {
    id: 'wrist-roller',
    name: 'Wrist Roller',
    category: 'strength',
    equipment: 'none',
    difficulty: 'beginner',
    muscles: ['Forearms'],
    description: 'A rolling device that builds forearm endurance through continuous wrist rotation.',
    instructions: [
      'Hold the roller with both hands, arms extended in front',
      'Rotate your wrists to wind the rope up and lift the weight',
      'Continue winding until the weight reaches the top',
      'Reverse the rotation to lower it back down'
    ],
    tips: ['A dedicated tool - a stick and rope with a weight tied on works too', 'Keep your arms extended rather than bending your elbows'],
    videoUrl: ytSearch('Wrist Roller Forearm')
  },
  {
    id: 'plate-pinch-carry',
    name: 'Plate Pinch Carry',
    category: 'strength',
    equipment: 'plate',
    difficulty: 'intermediate',
    muscles: ['Forearms'],
    description: 'A pinch-grip carry using smooth plates for serious grip strength.',
    instructions: [
      'Pinch two weight plates together, smooth sides out, one in each hand',
      'Stand tall holding the plates at your sides',
      'Walk forward for a set distance or time',
      'Set the plates down with control'
    ],
    tips: ['Pinch grip is much harder than a normal grip - start light', 'Keep your fingers and thumb pressing evenly'],
    videoUrl: ytSearch('Plate Pinch Carry')
  },
  {
    id: 'behind-the-back-barbell-wrist-curl',
    name: 'Behind-the-Back Barbell Wrist Curl',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Forearms'],
    description: 'A standing wrist curl performed with the bar behind the glutes.',
    instructions: [
      'Stand holding a barbell behind you at hip height',
      'Let the bar roll down toward your fingertips',
      'Curl your wrists to raise the bar back up',
      'Repeat with a controlled tempo'
    ],
    tips: ['Keep your arms straight down at your sides', 'Use a lighter weight than a seated wrist curl'],
    videoUrl: ytSearch('Behind The Back Barbell Wrist Curl')
  },
  {
    id: 'cable-wrist-curl',
    name: 'Cable Wrist Curl',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Forearms'],
    description: 'A wrist curl using a low pulley for smooth, constant resistance.',
    instructions: [
      'Kneel or sit facing a low pulley with a bar attachment',
      'Rest your forearms on your thighs',
      'Curl your wrists to pull the bar up',
      'Lower back down with control'
    ],
    tips: ['The cable removes momentum better than free weights', 'Keep reps slow and deliberate'],
    videoUrl: ytSearch('Cable Wrist Curl')
  },
  {
    id: 'kettlebell-farmers-carry',
    name: "Kettlebell Farmer's Carry",
    category: 'strength',
    equipment: 'kettlebell',
    difficulty: 'beginner',
    muscles: ['Forearms', 'Traps', 'Core'],
    description: 'A loaded carry using kettlebells, which challenge grip differently than dumbbells.',
    instructions: [
      'Hold a kettlebell in each hand at your sides',
      'Stand tall with shoulders back',
      'Walk forward for a set distance or time',
      'Set the kettlebells down with control'
    ],
    tips: ['The thick kettlebell handle demands more grip strength', 'Keep your steps short and controlled'],
    videoUrl: ytSearch('Kettlebell Farmers Carry')
  },
  {
    id: 'thick-grip-farmers-carry',
    name: 'Thick-Grip Farmers Carry',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Forearms', 'Traps'],
    description: 'A farmers carry using thick grip attachments to maximize forearm demand.',
    instructions: [
      'Attach thick grips or a towel around each dumbbell handle',
      'Hold a dumbbell in each hand at your sides',
      'Walk forward for a set distance or time',
      'Set the weights down with control'
    ],
    tips: ['Expect to use much lighter weight than a normal carry', 'Grip as hard as possible throughout the walk'],
    videoUrl: ytSearch('Thick Grip Farmers Carry')
  },
  {
    id: 'one-arm-dumbbell-wrist-curl',
    name: 'One-Arm Dumbbell Wrist Curl',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Forearms'],
    description: 'A single-arm wrist curl over a bench for a deeper stretch and stronger squeeze.',
    instructions: [
      'Kneel beside a bench with your forearm resting over the edge',
      'Let the dumbbell roll down toward your fingertips',
      'Curl your wrist to raise it back up',
      'Repeat, then switch arms'
    ],
    tips: ['Let the wrist drop into a full stretch each rep', 'Keep the rest of your arm still throughout'],
    videoUrl: ytSearch('One Arm Dumbbell Wrist Curl')
  },

  // ---------- ABS ----------
  {
    id: 'plank',
    name: 'Plank',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Core', 'Shoulders', 'Back'],
    description: 'An isometric hold that builds core stability and endurance.',
    instructions: [
      'Start in a forearm plank with elbows under your shoulders',
      'Keep your body in a straight line from head to heels',
      'Engage your core and glutes',
      'Hold the position for the desired time'
    ],
    tips: ['Do not let your hips sag or pike up', 'Breathe steadily instead of holding your breath'],
    videoUrl: ytSearch('Plank')
  },
  {
    id: 'side-plank',
    name: 'Side Plank',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Obliques', 'Core'],
    description: 'A lateral plank hold that targets the obliques and core stabilizers.',
    instructions: [
      'Lie on your side, propped up on one forearm',
      'Stack your feet and lift your hips off the floor',
      'Keep your body in a straight line',
      'Hold the position, then repeat on the other side'
    ],
    tips: ['Stack your shoulder directly above your elbow', 'Drop to your knees to regress if needed'],
    videoUrl: ytSearch('Side Plank')
  },
  {
    id: 'crunch',
    name: 'Crunch',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Abs'],
    description: 'The classic ab isolation move, focused on a short range of spinal flexion.',
    instructions: [
      'Lie on your back with knees bent, feet flat',
      'Place your hands lightly behind your head',
      'Curl your shoulders up off the floor',
      'Lower back down with control'
    ],
    tips: ['Avoid pulling on your neck with your hands', 'Focus on curling your ribs toward your hips'],
    videoUrl: ytSearch('Crunch Abs')
  },
  {
    id: 'weighted-crunch',
    name: 'Weighted Crunch',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Abs'],
    description: 'A crunch with added resistance held against the chest for extra ab overload.',
    instructions: [
      'Lie on your back holding a weight plate or dumbbell on your chest',
      'Curl your shoulders up off the floor',
      'Squeeze your abs at the top',
      'Lower back down with control'
    ],
    tips: ['Start with light weight until form is solid', 'Keep the weight close to your chest, not your face'],
    videoUrl: ytSearch('Weighted Crunch')
  },
  {
    id: 'sit-up',
    name: 'Sit-Up',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Abs', 'Hip Flexors'],
    description: 'A full range-of-motion ab exercise that brings the torso all the way up.',
    instructions: [
      'Lie on your back with knees bent, feet anchored',
      'Cross your arms over your chest',
      'Sit all the way up toward your knees',
      'Lower back down with control'
    ],
    tips: ['Move slowly to avoid using momentum', 'Stop partway if you feel your lower back arching'],
    videoUrl: ytSearch('Sit Up')
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg Raise',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    muscles: ['Abs', 'Hip Flexors'],
    description: 'An advanced hanging move that builds serious lower-ab strength.',
    instructions: [
      'Hang from a pull-up bar with arms fully extended',
      'Raise your legs straight up in front of you',
      'Lift until they are parallel to the floor or higher',
      'Lower back down with control'
    ],
    tips: ['Avoid swinging - control the tempo throughout', 'Bend your knees to regress if straight-leg is too hard'],
    videoUrl: ytSearch('Hanging Leg Raise')
  },
  {
    id: 'hanging-knee-raise',
    name: 'Hanging Knee Raise',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Abs', 'Hip Flexors'],
    description: 'A hanging ab move with bent knees, a natural stepping stone to leg raises.',
    instructions: [
      'Hang from a pull-up bar with arms fully extended',
      'Bend your knees and raise them toward your chest',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Avoid using momentum to swing your knees up', 'Keep your shoulders engaged rather than fully relaxed'],
    videoUrl: ytSearch('Hanging Knee Raise')
  },
  {
    id: 'lying-leg-raise',
    name: 'Lying Leg Raise',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Abs', 'Hip Flexors'],
    description: 'A floor-based raise that targets the lower abs without any equipment.',
    instructions: [
      'Lie on your back with legs extended',
      'Raise your legs straight up toward the ceiling',
      'Lower them back down without touching the floor',
      'Repeat for the full set'
    ],
    tips: ['Keep your lower back pressed into the floor', 'Bend your knees slightly if your lower back lifts off the floor'],
    videoUrl: ytSearch('Lying Leg Raise')
  },
  {
    id: 'cable-crunch',
    name: 'Cable Crunch',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Abs'],
    description: 'A kneeling crunch against cable resistance that allows for progressive overload.',
    instructions: [
      'Kneel below a high pulley holding a rope at your head',
      'Crunch your torso down toward your knees',
      'Squeeze your abs at the bottom',
      'Return with control to the start'
    ],
    tips: ['Move from your abs, not your hips', 'Keep the rope close to your head throughout'],
    videoUrl: ytSearch('Cable Crunch')
  },
  {
    id: 'standing-cable-crunch',
    name: 'Standing Cable Crunch',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Abs'],
    description: 'A standing version of the cable crunch for lifters who prefer not to kneel.',
    instructions: [
      'Stand facing away from a high pulley holding a rope at your head',
      'Crunch your torso down and slightly forward',
      'Squeeze your abs at the bottom',
      'Return with control to the start'
    ],
    tips: ['Keep a slight bend in your knees throughout', 'Focus on curling your spine rather than bending at the hips'],
    videoUrl: ytSearch('Standing Cable Crunch')
  },
  {
    id: 'decline-sit-up',
    name: 'Decline Sit-Up',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Abs', 'Hip Flexors'],
    description: 'A sit-up on a decline bench that increases resistance through the range of motion.',
    instructions: [
      'Secure your feet on a decline bench, lying back',
      'Cross your arms over your chest',
      'Sit all the way up',
      'Lower back down with control'
    ],
    tips: ['Increase the incline gradually as you get stronger', 'Avoid yanking yourself up using momentum'],
    videoUrl: ytSearch('Decline Sit Up')
  },
  {
    id: 'russian-twist',
    name: 'Russian Twist',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Obliques', 'Abs'],
    description: 'A rotational core exercise performed in a seated, leaned-back position.',
    instructions: [
      'Sit with knees bent, torso leaned back slightly',
      'Lift your feet off the floor for added difficulty',
      'Rotate your torso to touch the floor on each side',
      'Continue alternating sides'
    ],
    tips: ['Keep your feet on the floor if balance is a struggle', 'Move with control rather than speed'],
    videoUrl: ytSearch('Russian Twist')
  },
  {
    id: 'exercise-ball-crunch',
    name: 'Exercise Ball Crunch',
    category: 'strength',
    equipment: 'exercise-ball',
    difficulty: 'intermediate',
    muscles: ['Abs'],
    description: 'A crunch performed on a stability ball for a deeper stretch at the bottom.',
    instructions: [
      'Lie back on an exercise ball with feet flat on the floor',
      'Cross your arms over your chest or hands behind your head',
      'Curl your torso up off the ball',
      'Lower back down to a full stretch'
    ],
    tips: ['The ball adds an instability challenge on top of the crunch', 'Keep your feet planted wide for a stable base'],
    videoUrl: ytSearch('Exercise Ball Crunch')
  },
  {
    id: 'barbell-rollout',
    name: 'Barbell Rollout',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Abs', 'Core'],
    description: 'A rolling movement using a loaded barbell that demands serious core control.',
    instructions: [
      'Kneel holding a barbell with small plates on the floor',
      'Roll the bar forward, extending your body out',
      'Go as far as you can while keeping your core braced',
      'Pull back to the starting position'
    ],
    tips: ['Stop before your lower back starts to sag', 'Start with a small range and build up over time'],
    videoUrl: ytSearch('Barbell Rollout')
  },
  {
    id: 'pallof-press',
    name: 'Pallof Press',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Core', 'Obliques'],
    description: 'An anti-rotation press that trains the core to resist twisting forces.',
    instructions: [
      'Stand sideways to a cable set at chest height',
      'Hold the handle at your chest with both hands',
      'Press it straight out in front of you',
      'Return with control, resisting the pull to rotate'
    ],
    tips: ['The goal is to resist rotation, not create it', 'Brace your core hard throughout the press'],
    videoUrl: ytSearch('Pallof Press')
  },
  {
    id: 'bicycle-crunch',
    name: 'Bicycle Crunch',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Abs', 'Obliques'],
    description: 'A dynamic crunch that combines rotation with a pedaling leg motion.',
    instructions: [
      'Lie on your back with hands lightly behind your head',
      'Bring one knee up while rotating the opposite elbow toward it',
      'Switch sides in a pedaling motion',
      'Continue alternating for the full set'
    ],
    tips: ['Move with control rather than racing through reps', 'Keep your lower back pressed into the floor'],
    videoUrl: ytSearch('Bicycle Crunch')
  },

  // ---------- OBLIQUES ----------
  // Note: muscleandstrength.com does not list a difficulty/mechanics/equipment
  // tag for this muscle group's listing, so difficulty is set to 'none' below
  // to accurately reflect that the source data does not specify it.
  {
    id: 'dumbbell-side-bend',
    name: 'Dumbbell Side Bend',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'none',
    muscles: ['Obliques'],
    description: 'A standing lateral bend that isolates the obliques on each side.',
    instructions: [
      'Stand holding a dumbbell in one hand at your side',
      'Bend sideways toward the weighted side',
      'Return to standing, then bend slightly to the opposite side',
      'Complete all reps, then switch the dumbbell to the other hand'
    ],
    tips: ['Keep the movement controlled - do not swing the weight', 'Avoid leaning forward or backward as you bend'],
    videoUrl: ytSearch('Dumbbell Side Bend')
  },
  {
    id: 'side-crunch',
    name: 'Side Crunch (Oblique Crunch)',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'none',
    muscles: ['Obliques'],
    description: 'A crunch variation performed on your side to target the obliques directly.',
    instructions: [
      'Lie on your side with knees bent slightly forward',
      'Place your top hand lightly behind your head',
      'Crunch your shoulder up toward your hip',
      'Lower back down, then repeat on the other side'
    ],
    tips: ['Keep the range of motion short and controlled', 'Focus on squeezing the side of your waist'],
    videoUrl: ytSearch('Side Crunch Oblique')
  },
  {
    id: 'wood-chop',
    name: 'Wood Chop',
    category: 'strength',
    equipment: 'none',
    difficulty: 'none',
    muscles: ['Obliques', 'Core'],
    description: 'A rotational chopping motion, often done with a cable or medicine ball, that trains the obliques through rotation.',
    instructions: [
      'Start with your hands together above one shoulder',
      'Rotate your torso to bring your hands down to the opposite hip',
      'Return to the starting position with control',
      'Complete all reps, then switch sides'
    ],
    tips: ['Rotate from your torso, not just your arms', 'Keep your hips relatively stable as you twist'],
    videoUrl: ytSearch('Wood Chop Exercise')
  },
  {
    id: 'landmine-rotation',
    name: 'Landmine Rotation',
    category: 'strength',
    equipment: 'landmine',
    difficulty: 'none',
    muscles: ['Obliques', 'Core'],
    description: 'A rotational core exercise using a landmine-anchored barbell.',
    instructions: [
      'Hold the end of a landmine barbell with both hands in front of you',
      'Rotate the bar down to one side',
      'Bring it back through center to the other side',
      'Continue alternating sides with control'
    ],
    tips: ['Keep your arms relatively straight throughout', 'Rotate through your torso rather than just your shoulders'],
    videoUrl: ytSearch('Landmine Rotation')
  },
  {
    id: 'seated-barbell-twist',
    name: 'Seated Barbell Twist',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'none',
    muscles: ['Obliques', 'Abs'],
    description: 'A seated rotational movement using a barbell across the shoulders.',
    instructions: [
      'Sit holding a barbell across your upper back',
      'Rotate your torso to one side',
      'Rotate back through center to the other side',
      'Continue alternating with control'
    ],
    tips: ['Use a light, unloaded bar to start', 'Keep the movement slow to protect your lower back'],
    videoUrl: ytSearch('Seated Barbell Twist')
  },
  {
    id: 'half-kneeling-cable-chop',
    name: 'Half-Kneeling Cable Chop',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'none',
    muscles: ['Obliques', 'Core'],
    description: 'A kneeling chopping motion against cable resistance that limits hip involvement.',
    instructions: [
      'Kneel on one knee, cable set high to your side',
      'Pull the handle down and across your body',
      'Return with control to the starting position',
      'Complete all reps, then switch sides'
    ],
    tips: ['The half-kneeling stance forces the core to do the work', 'Keep your torso upright rather than leaning'],
    videoUrl: ytSearch('Half Kneeling Cable Chop')
  },
  {
    id: 'tall-kneeling-cable-lift',
    name: 'Tall Kneeling Cable Lift',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'none',
    muscles: ['Obliques', 'Core'],
    description: 'A kneeling lifting motion against a low cable that trains rotation upward.',
    instructions: [
      'Kneel tall, cable set low to your side',
      'Pull the handle up and across your body',
      'Return with control to the starting position',
      'Complete all reps, then switch sides'
    ],
    tips: ['Keep your hips square rather than swiveling', 'Move through your torso, not just your arms'],
    videoUrl: ytSearch('Tall Kneeling Cable Lift')
  },
  {
    id: 'split-stance-cable-chop',
    name: 'Split-Stance Cable Chop',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'none',
    muscles: ['Obliques', 'Core'],
    description: 'A standing chop performed in a staggered stance for added stability demand.',
    instructions: [
      'Stand in a staggered stance, cable set high to your side',
      'Pull the handle down and across your body',
      'Return with control to the starting position',
      'Complete all reps, then switch sides'
    ],
    tips: ['Keep your back leg braced for stability', 'Rotate through your core rather than your arms'],
    videoUrl: ytSearch('Split Stance Cable Chop')
  },
  {
    id: 'side-plank-hip-dip',
    name: 'Side Plank with Hip Dip',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'none',
    muscles: ['Obliques', 'Core'],
    description: 'A side plank variation that adds a small dip and lift of the hips for extra oblique work.',
    instructions: [
      'Set up in a side plank on your forearm',
      'Lower your hips slightly toward the floor',
      'Lift back up to the starting plank position',
      'Complete all reps, then switch sides'
    ],
    tips: ['Keep the dip small and controlled', 'Do not let your top shoulder round forward'],
    videoUrl: ytSearch('Side Plank Hip Dip')
  },
  {
    id: 'low-cable-wood-chop',
    name: 'Low Cable Wood Chop',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'none',
    muscles: ['Obliques', 'Core'],
    description: 'A chopping motion pulling from low to high across the body.',
    instructions: [
      'Stand sideways to a low pulley',
      'Pull the handle up and across to the opposite shoulder',
      'Return with control to the starting position',
      'Complete all reps, then switch sides'
    ],
    tips: ['Pivot your back foot to allow full rotation', 'Keep your arms relatively straight throughout'],
    videoUrl: ytSearch('Low Cable Wood Chop')
  },
  {
    id: 'off-bench-oblique-hold',
    name: 'Off-Bench Oblique Hold',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'none',
    muscles: ['Obliques', 'Core'],
    description: 'A static hold with the upper body hanging off a bench to isolate the obliques.',
    instructions: [
      'Lie on your side on a bench with hips at the edge',
      'Let your upper body hang off the side',
      'Raise your torso back up level with your hips',
      'Hold briefly, then lower and repeat'
    ],
    tips: ['Have a partner brace your legs for stability', 'Start with small ranges of motion'],
    videoUrl: ytSearch('Off Bench Oblique Hold')
  },
  {
    id: 'tall-kneeling-landmine-lift',
    name: 'Tall Kneeling Landmine Lift',
    category: 'strength',
    equipment: 'landmine',
    difficulty: 'none',
    muscles: ['Obliques', 'Core'],
    description: 'A kneeling rotational lift using a landmine-anchored barbell.',
    instructions: [
      'Kneel tall, holding the end of a landmine barbell to one side',
      'Lift and rotate the bar up and across your body',
      'Return with control to the starting position',
      'Complete all reps, then switch sides'
    ],
    tips: ['Keep your hips facing forward throughout', 'Move slowly to control the weight of the bar'],
    videoUrl: ytSearch('Tall Kneeling Landmine Lift')
  },

  // ---------- QUADS ----------
  {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    description: 'The king of lower body exercises for building total leg strength and mass.',
    instructions: [
      'Position the barbell on your upper back',
      'Stand with feet shoulder-width apart',
      'Lower your body by bending at the hips and knees',
      'Drive through your heels to return to standing'
    ],
    tips: ['Keep your chest up and back straight throughout', 'Do not let your knees cave inward'],
    videoUrl: ytSearch('Barbell Back Squat')
  },
  {
    id: 'front-squat',
    name: 'Front Squat',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Quadriceps', 'Core', 'Glutes'],
    description: 'A front-loaded squat variation that emphasizes the quads and upright posture.',
    instructions: [
      'Rest the bar across your front shoulders, elbows high',
      'Stand with feet shoulder-width apart',
      'Squat down keeping your torso upright',
      'Drive through your heels to return to standing'
    ],
    tips: ['Keep your elbows up to prevent the bar from rolling', 'Requires more ankle and wrist mobility than a back squat'],
    videoUrl: ytSearch('Front Squat')
  },
  {
    id: 'dumbbell-goblet-squat',
    name: 'Dumbbell Goblet Squat',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes', 'Core'],
    description: 'A beginner-friendly squat that teaches proper squat mechanics.',
    instructions: [
      'Hold a dumbbell vertically at chest height with both hands',
      'Stand with feet slightly wider than shoulder-width',
      'Squat down keeping your chest up and elbows inside your knees',
      'Drive through your heels to stand back up'
    ],
    tips: ['The weight acts as a counterbalance to help you stay upright', 'Go as deep as your mobility comfortably allows'],
    videoUrl: ytSearch('Dumbbell Goblet Squat')
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    description: 'A machine-based squat pattern that allows safe heavy loading of the legs.',
    instructions: [
      'Sit in the leg press machine with your back flat against the pad',
      'Place your feet shoulder-width apart on the platform',
      'Lower the platform by bending your knees',
      'Press back up without locking your knees'
    ],
    tips: ['Do not let your lower back round off the pad', 'Keep your knees tracking in line with your toes'],
    videoUrl: ytSearch('Leg Press')
  },
  {
    id: 'leg-extension',
    name: 'Leg Extension',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Quadriceps'],
    description: 'A machine isolation move that targets the quads directly.',
    instructions: [
      'Sit in the machine with the pad resting on your shins',
      'Extend your legs until they are straight',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Avoid locking your knees out aggressively', 'Adjust the seat so your knees align with the machine pivot'],
    videoUrl: ytSearch('Leg Extension')
  },
  {
    id: 'dumbbell-lunge',
    name: 'Dumbbell Lunge',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    description: 'A single-leg movement that builds strength, balance, and coordination.',
    instructions: [
      'Hold a dumbbell in each hand at your sides',
      'Step forward into a lunge position',
      'Lower until both knees reach about 90 degrees',
      'Push back to standing and repeat on the other leg'
    ],
    tips: ['Keep your front knee aligned over your ankle', 'Keep your torso upright throughout'],
    videoUrl: ytSearch('Dumbbell Lunge')
  },
  {
    id: 'walking-lunge',
    name: 'Walking Lunge',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    description: 'A moving lunge variation that improves balance and unilateral leg strength.',
    instructions: [
      'Stand tall with feet hip-width apart',
      'Take a large step forward into a lunge',
      'Push off your front foot and step forward with the back leg',
      'Continue alternating legs as you move forward'
    ],
    tips: ['Keep your front knee aligned over your ankle', 'Take controlled steps rather than rushing'],
    videoUrl: ytSearch('Walking Lunge')
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Quadriceps', 'Glutes'],
    description: 'A rear-foot-elevated split squat that heavily challenges balance and single-leg strength.',
    instructions: [
      'Stand a couple feet in front of a bench, one foot resting on it behind you',
      'Hold a dumbbell in each hand',
      'Lower your back knee toward the floor',
      'Push through your front foot to stand back up'
    ],
    tips: ['Keep most of your weight on the front leg', 'Start bodyweight-only until balance improves'],
    videoUrl: ytSearch('Bulgarian Split Squat')
  },
  {
    id: 'machine-hack-squat',
    name: 'Machine Hack Squat',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes'],
    description: 'A guided squat machine that heavily targets the quads with back support.',
    instructions: [
      'Position your shoulders under the pads, back against the support',
      'Place feet shoulder-width apart on the platform',
      'Lower down by bending your knees',
      'Press back up without locking your knees'
    ],
    tips: ['Keep your heels flat on the platform throughout', 'Do not let your knees cave inward'],
    videoUrl: ytSearch('Machine Hack Squat')
  },
  {
    id: 'dumbbell-step-up',
    name: 'Dumbbell Step-Up',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Quadriceps', 'Glutes'],
    description: 'A functional single-leg movement stepping up onto a box or bench.',
    instructions: [
      'Hold a dumbbell in each hand, standing in front of a box',
      'Step one foot fully onto the box',
      'Drive through that leg to stand up on the box',
      'Step back down with control and repeat'
    ],
    tips: ['Use a box height that lets your knee stay behind your toes', 'Avoid pushing off the bottom leg to assist the movement'],
    videoUrl: ytSearch('Dumbbell Step Up')
  },
  {
    id: 'dumbbell-split-squat',
    name: 'Dumbbell Split Squat',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes'],
    description: 'A stationary lunge variation that builds single-leg strength without the balance demands of walking lunges.',
    instructions: [
      'Step one foot forward and one back into a staggered stance',
      'Hold a dumbbell in each hand',
      'Lower your back knee toward the floor',
      'Push back up and repeat all reps before switching legs'
    ],
    tips: ['Keep your torso upright throughout the set', 'Keep the stance long enough that your front knee stays over your ankle'],
    videoUrl: ytSearch('Dumbbell Split Squat')
  },
  {
    id: 'barbell-reverse-lunge',
    name: 'Barbell Reverse Lunge',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Quadriceps', 'Glutes'],
    description: 'A lunge stepping backward with a barbell, which is easier on the knees than a forward lunge.',
    instructions: [
      'Rest a barbell across your upper back',
      'Step one leg backward into a lunge',
      'Lower until your back knee nearly touches the floor',
      'Push through your front foot to return to standing'
    ],
    tips: ['Stepping back reduces the shear stress on the front knee', 'Keep your torso upright throughout'],
    videoUrl: ytSearch('Barbell Reverse Lunge')
  },
  {
    id: 'bodyweight-walking-lunge',
    name: 'Bodyweight Walking Lunge',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    description: 'A no-equipment walking lunge that can be done anywhere.',
    instructions: [
      'Stand tall with feet hip-width apart',
      'Step forward into a lunge, lowering your back knee',
      'Push off your front foot and step forward with the other leg',
      'Continue alternating legs as you move forward'
    ],
    tips: ['Great warm-up or finisher movement requiring no equipment', 'Keep your steps a consistent length for balance'],
    videoUrl: ytSearch('Bodyweight Walking Lunge')
  },
  {
    id: 'bodyweight-squat-jump',
    name: 'Bodyweight Squat Jump',
    category: 'cardio',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes', 'Calves'],
    description: 'An explosive squat variation that builds power and gets the heart rate up.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Squat down to about parallel',
      'Explode upward into a jump',
      'Land softly and immediately squat down for the next rep'
    ],
    tips: ['Land softly by bending your knees on impact', 'Focus on jump height rather than speed at first'],
    videoUrl: ytSearch('Bodyweight Squat Jump')
  },
  {
    id: 'smith-machine-squat',
    name: 'Smith Machine Squat',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes'],
    description: 'A guided-bar squat that removes the balance demands of a free barbell squat.',
    instructions: [
      'Position the bar across your upper back',
      'Stand with feet slightly in front of your body',
      'Lower down by bending your hips and knees',
      'Press back up through your heels'
    ],
    tips: ['Set your feet slightly forward since the bar path is fixed vertically', 'Good option for higher-rep sets close to failure'],
    videoUrl: ytSearch('Smith Machine Squat')
  },
  {
    id: 'sissy-squat',
    name: 'Sissy Squat',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    muscles: ['Quadriceps'],
    description: 'An advanced bodyweight move that isolates the quads through a deep knee-forward lean.',
    instructions: [
      'Hold onto something stable for balance',
      'Rise onto your toes and lean back while bending your knees',
      'Lower until you feel a deep stretch in your quads',
      'Drive back up to the starting position'
    ],
    tips: ['Requires significant knee and quad strength - build up gradually', 'Keep your hips extended throughout the movement'],
    videoUrl: ytSearch('Sissy Squat')
  },
  {
    id: 'barbell-lunge',
    name: 'Barbell Lunge',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    description: 'A loaded lunge with a barbell on the back for added resistance.',
    instructions: [
      'Rest a barbell across your upper back',
      'Step forward into a lunge position',
      'Lower until both knees reach about 90 degrees',
      'Push back to standing and repeat on the other leg'
    ],
    tips: ['Master bodyweight and dumbbell lunges before loading a barbell', 'Keep your core braced throughout for stability'],
    videoUrl: ytSearch('Barbell Lunge')
  },
  {
    id: 'wall-sit',
    name: 'Wall Sit',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Quadriceps'],
    description: 'An isometric hold against a wall that builds quad endurance.',
    instructions: [
      'Lean your back against a wall',
      'Slide down until your knees reach about 90 degrees',
      'Hold the position with thighs parallel to the floor',
      'Slide back up once the set time is complete'
    ],
    tips: ['Keep your knees directly above your ankles', 'Breathe steadily throughout the hold'],
    videoUrl: ytSearch('Wall Sit')
  },

  // ---------- HAMSTRINGS ----------
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back'],
    description: 'A hip-hinge movement that targets the hamstrings and glutes through a deep stretch.',
    instructions: [
      'Stand holding a barbell at hip level',
      'Push your hips back while keeping a slight knee bend',
      'Lower the bar along your legs until you feel a hamstring stretch',
      'Drive your hips forward to return to standing'
    ],
    tips: ['Keep the bar close to your body throughout', 'The movement comes from your hips, not your knees'],
    videoUrl: ytSearch('Romanian Deadlift')
  },
  {
    id: 'dumbbell-stiff-leg-deadlift',
    name: 'Dumbbell Stiff-Leg Deadlift',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back'],
    description: 'A hamstring-focused hinge performed with dumbbells and mostly straight legs.',
    instructions: [
      'Stand holding a dumbbell in each hand',
      'Hinge at the hips with a very slight knee bend',
      'Lower the weights toward your feet until you feel a stretch',
      'Drive your hips forward to return to standing'
    ],
    tips: ['Keep your back flat rather than rounding forward', 'Stop the descent once you feel a strong hamstring stretch'],
    videoUrl: ytSearch('Dumbbell Stiff Leg Deadlift')
  },
  {
    id: 'lying-leg-curl',
    name: 'Lying Leg Curl',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Hamstrings'],
    description: 'A machine isolation move performed face-down that targets the hamstrings.',
    instructions: [
      'Lie face-down on the machine with the pad against your ankles',
      'Curl your heels up toward your glutes',
      'Squeeze at the top',
      'Lower back down with control'
    ],
    tips: ['Avoid lifting your hips off the pad', 'Control the eccentric rather than letting the weight drop'],
    videoUrl: ytSearch('Lying Leg Curl')
  },
  {
    id: 'seated-leg-curl',
    name: 'Seated Leg Curl',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Hamstrings'],
    description: 'A seated version of the leg curl that some lifters find more comfortable on the lower back.',
    instructions: [
      'Sit in the machine with the pad against your shins',
      'Curl your heels down and back toward the seat',
      'Squeeze at the bottom of the movement',
      'Return with control to the start'
    ],
    tips: ['Adjust the machine so your knees align with the pivot point', 'Avoid using momentum to kick the weight down'],
    videoUrl: ytSearch('Seated Leg Curl')
  },
  {
    id: 'single-leg-curl',
    name: 'Single-Leg Curl',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Hamstrings'],
    description: 'A unilateral leg curl that fixes strength imbalances between legs.',
    instructions: [
      'Set up on a leg curl machine, working one leg at a time',
      'Curl your heel toward your glutes',
      'Squeeze at the top',
      'Lower back down, then repeat on the other leg'
    ],
    tips: ['Great for identifying and fixing left-right strength differences', 'Keep your hips pressed into the pad'],
    videoUrl: ytSearch('Single Leg Curl')
  },
  {
    id: 'nordic-hamstring-curl',
    name: 'Nordic Hamstring Curl',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    muscles: ['Hamstrings'],
    description: 'A brutally effective bodyweight curl that builds serious hamstring strength and injury resilience.',
    instructions: [
      'Kneel with your ankles anchored by a partner or pad',
      'Lower your torso forward as slowly as possible',
      'Catch yourself with your hands as you near the floor',
      'Push back up to the starting position'
    ],
    tips: ['Start with a small range of motion and build up over time', 'Use a resistance band for assistance if needed'],
    videoUrl: ytSearch('Nordic Hamstring Curl')
  },
  {
    id: 'good-morning',
    name: 'Good Morning',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Hamstrings', 'Lower Back', 'Glutes'],
    description: 'A hip-hinge with the bar on your back that builds posterior chain strength.',
    instructions: [
      'Rest a barbell across your upper back',
      'Hinge forward at the hips with a slight knee bend',
      'Lower until your torso is close to parallel to the floor',
      'Drive your hips forward to return to standing'
    ],
    tips: ['Use light weight until your hip hinge pattern is solid', 'Keep your back flat throughout the movement'],
    videoUrl: ytSearch('Good Morning Exercise')
  },
  {
    id: 'trap-bar-deadlift',
    name: 'Trap Bar Deadlift',
    category: 'strength',
    equipment: 'trap-bar',
    difficulty: 'beginner',
    muscles: ['Hamstrings', 'Glutes', 'Quadriceps'],
    description: 'A deadlift variation using a hexagonal bar that is easier on the lower back.',
    instructions: [
      'Stand inside the trap bar, feet hip-width apart',
      'Grip the handles and set your back flat',
      'Drive through your legs to stand up',
      'Lower the bar back down with control'
    ],
    tips: ['A great beginner-friendly deadlift variation', 'Keep the bar close to your body throughout'],
    videoUrl: ytSearch('Trap Bar Deadlift')
  },
  {
    id: 'single-leg-romanian-deadlift',
    name: 'Single-Leg Romanian Deadlift',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Hamstrings', 'Glutes'],
    description: 'A balance-challenging hinge that trains the hamstrings unilaterally.',
    instructions: [
      'Stand on one leg holding a dumbbell in the opposite hand',
      'Hinge forward while raising your free leg behind you',
      'Lower until your torso is close to parallel to the floor',
      'Return to standing with control'
    ],
    tips: ['Keep your hips square to the floor throughout', 'Start light until your balance improves'],
    videoUrl: ytSearch('Single Leg Romanian Deadlift')
  },
  {
    id: 'exercise-ball-leg-curl',
    name: 'Exercise Ball Leg Curl',
    category: 'strength',
    equipment: 'exercise-ball',
    difficulty: 'intermediate',
    muscles: ['Hamstrings', 'Glutes', 'Core'],
    description: 'A hamstring curl performed lying on your back with your heels on a stability ball.',
    instructions: [
      'Lie on your back with heels resting on an exercise ball',
      'Lift your hips off the floor',
      'Curl the ball toward your glutes',
      'Extend your legs back out with control'
    ],
    tips: ['Keep your hips lifted throughout the entire set', 'Move slowly to keep the ball from rolling out of control'],
    videoUrl: ytSearch('Exercise Ball Leg Curl')
  },
  {
    id: 'cable-pull-through',
    name: 'Cable Pull-Through',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Hamstrings', 'Glutes'],
    description: 'A hip-hinge pattern using a low cable that teaches the hip hinge with less lower-back stress.',
    instructions: [
      'Face away from a low pulley with a rope between your legs',
      'Hinge forward at the hips, letting the rope pull back',
      'Drive your hips forward to standing',
      'Squeeze your glutes at the top'
    ],
    tips: ['A great way to learn the hip hinge before deadlifting', 'Keep your back flat throughout'],
    videoUrl: ytSearch('Cable Pull Through')
  },
  {
    id: 'kettlebell-single-leg-deadlift',
    name: 'Kettlebell Single-Leg Deadlift',
    category: 'strength',
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    muscles: ['Hamstrings', 'Glutes', 'Core'],
    description: 'A single-leg hinge using a kettlebell that builds balance alongside hamstring strength.',
    instructions: [
      'Stand on one leg holding a kettlebell in the opposite hand',
      'Hinge forward while extending your free leg behind you',
      'Lower until your torso is close to parallel to the floor',
      'Return to standing with control'
    ],
    tips: ['Keep your standing knee slightly bent throughout', 'Move slowly to maintain balance'],
    videoUrl: ytSearch('Kettlebell Single Leg Deadlift')
  },
  {
    id: 'landmine-romanian-deadlift',
    name: 'Landmine Romanian Deadlift',
    category: 'strength',
    equipment: 'landmine',
    difficulty: 'intermediate',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back'],
    description: 'A Romanian deadlift variation using a landmine-anchored barbell for a smooth hinge path.',
    instructions: [
      'Straddle a landmine barbell, holding the end with both hands',
      'Hinge forward at the hips with a slight knee bend',
      'Lower until you feel a hamstring stretch',
      'Drive your hips forward to return to standing'
    ],
    tips: ['The landmine path can feel more natural than a straight bar', 'Keep the bar close to your legs throughout'],
    videoUrl: ytSearch('Landmine Romanian Deadlift')
  },
  {
    id: 'reverse-hyperextension',
    name: 'Reverse Hyperextension',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back'],
    description: 'A hyperextension variation that raises the legs instead of the torso.',
    instructions: [
      'Lie face-down on a bench with hips at the edge, legs hanging',
      'Raise your legs up until they are in line with your torso',
      'Squeeze your glutes and hamstrings at the top',
      'Lower back down with control'
    ],
    tips: ['Avoid using momentum to swing your legs up', 'Keep your upper body braced against the bench'],
    videoUrl: ytSearch('Reverse Hyperextension')
  },
  {
    id: 'glute-ham-raise',
    name: 'Glute-Ham Raise',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    muscles: ['Hamstrings', 'Glutes', 'Lower Back'],
    description: 'An advanced posterior chain exercise performed on a glute-ham developer bench.',
    instructions: [
      'Position your feet against the footplate of a GHD bench',
      'Lower your torso forward with control',
      'Use your hamstrings to pull yourself back up',
      'Squeeze your glutes at the top'
    ],
    tips: ['Very demanding on the hamstrings - progress gradually', 'Use a resistance band for assistance if needed'],
    videoUrl: ytSearch('Glute Ham Raise')
  },

  // ---------- GLUTES ----------
  {
    id: 'barbell-hip-thrust',
    name: 'Barbell Hip Thrust',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Glutes', 'Hamstrings'],
    description: 'The most effective barbell movement for building glute size and strength.',
    instructions: [
      'Sit on the floor with upper back against a bench, bar over your hips',
      'Plant your feet flat, knees bent',
      'Drive your hips up until your body forms a straight line',
      'Lower back down with control'
    ],
    tips: ['Tuck your chin to keep your neck neutral', 'Squeeze your glutes hard at the top of every rep'],
    videoUrl: ytSearch('Barbell Hip Thrust')
  },
  {
    id: 'bodyweight-glute-bridge',
    name: 'Bodyweight Glute Bridge',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Glutes', 'Hamstrings'],
    description: 'A floor-based bridge that is a great entry point to glute training.',
    instructions: [
      'Lie on your back with knees bent, feet flat',
      'Drive your hips up until your body forms a straight line',
      'Squeeze your glutes at the top',
      'Lower back down with control'
    ],
    tips: ['Keep your feet close enough to your glutes to feel the squeeze', 'Avoid arching your lower back excessively'],
    videoUrl: ytSearch('Bodyweight Glute Bridge')
  },
  {
    id: 'barbell-glute-bridge',
    name: 'Barbell Glute Bridge',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Glutes', 'Hamstrings'],
    description: 'A loaded floor bridge that adds resistance once the bodyweight version gets easy.',
    instructions: [
      'Lie on your back with a barbell over your hips',
      'Plant your feet flat, knees bent',
      'Drive your hips up until your body forms a straight line',
      'Lower back down with control'
    ],
    tips: ['Use a pad on the bar to protect your hips', 'Squeeze your glutes hard at the top'],
    videoUrl: ytSearch('Barbell Glute Bridge')
  },
  {
    id: 'single-leg-glute-bridge',
    name: 'Single-Leg Glute Bridge',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Glutes', 'Hamstrings'],
    description: 'A unilateral bridge that increases the demand on each glute individually.',
    instructions: [
      'Lie on your back with one knee bent, the other leg extended',
      'Drive your hips up through the planted foot',
      'Squeeze your glute at the top',
      'Lower back down, then repeat on the other side'
    ],
    tips: ['Keep your hips level rather than letting one side dip', 'Master the two-leg version first'],
    videoUrl: ytSearch('Single Leg Glute Bridge')
  },
  {
    id: 'cable-glute-kickback',
    name: 'Cable Glute Kickback',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Glutes'],
    description: 'A cable isolation move that lets you kick a leg back against resistance.',
    instructions: [
      'Attach an ankle cuff to a low pulley and your ankle',
      'Hinge forward slightly, holding the machine for support',
      'Kick your leg back and up',
      'Return with control to the start'
    ],
    tips: ['Keep your knee slightly bent throughout', 'Avoid arching your back to add extra range'],
    videoUrl: ytSearch('Cable Glute Kickback')
  },
  {
    id: 'standing-glute-kickback-machine',
    name: 'Standing Glute Kickback Machine',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Glutes'],
    description: 'A machine-guided kickback that isolates the glutes with a fixed path.',
    instructions: [
      'Stand and place one foot on the machine platform',
      'Hold the handles for support',
      'Kick the platform back and up',
      'Return with control to the start'
    ],
    tips: ['Keep your torso still, letting only your leg move', 'Focus on squeezing the glute rather than swinging fast'],
    videoUrl: ytSearch('Standing Glute Kickback Machine')
  },
  {
    id: 'banded-glute-bridge',
    name: 'Banded Glute Bridge',
    category: 'strength',
    equipment: 'bands',
    difficulty: 'beginner',
    muscles: ['Glutes', 'Abductors'],
    description: 'A glute bridge with a resistance band above the knees to add outward tension.',
    instructions: [
      'Lie on your back with a band looped above your knees',
      'Push your knees out against the band',
      'Drive your hips up into a bridge',
      'Lower back down with control'
    ],
    tips: ['Keep constant outward pressure on the band throughout', 'Squeeze your glutes hard at the top'],
    videoUrl: ytSearch('Banded Glute Bridge')
  },
  {
    id: 'curtsy-lunge',
    name: 'Curtsy Lunge',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    muscles: ['Glutes', 'Quadriceps'],
    description: 'A cross-behind lunge variation that targets the glutes from a different angle.',
    instructions: [
      'Stand holding a dumbbell in each hand',
      'Step one leg diagonally behind and across the other',
      'Lower into a lunge position',
      'Push back to standing and repeat on the other side'
    ],
    tips: ['Keep your hips facing forward throughout', 'Start bodyweight-only until balance improves'],
    videoUrl: ytSearch('Curtsy Lunge')
  },
  {
    id: 'frog-pump',
    name: 'Frog Pump',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Glutes'],
    description: 'A short-range glute bridge with the soles of the feet together for maximum glute squeeze.',
    instructions: [
      'Lie on your back with the soles of your feet pressed together',
      'Let your knees fall open to the sides',
      'Drive your hips up, squeezing your glutes',
      'Lower back down with control'
    ],
    tips: ['Keep constant tension - do not fully rest at the bottom', 'Focus on a fast squeeze rather than a big range'],
    videoUrl: ytSearch('Frog Pump')
  },
  {
    id: 'monster-walk',
    name: 'Monster Walk',
    category: 'bodyweight',
    equipment: 'bands',
    difficulty: 'beginner',
    muscles: ['Glutes', 'Abductors'],
    description: 'A banded walking drill that fires up the glutes and hip stabilizers.',
    instructions: [
      'Loop a band around your ankles or above your knees',
      'Get into a quarter-squat position',
      'Step diagonally forward, alternating legs',
      'Continue for the desired distance'
    ],
    tips: ['Keep tension on the band throughout - do not let your feet drift together', 'Stay low in the quarter-squat position'],
    videoUrl: ytSearch('Monster Walk Band')
  },
  {
    id: 'single-leg-hip-thrust',
    name: 'Single-Leg Hip Thrust',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Glutes', 'Hamstrings'],
    description: 'A unilateral hip thrust that increases the demand on each glute.',
    instructions: [
      'Sit with your upper back against a bench, one foot planted',
      'Extend the other leg straight out',
      'Drive your hips up through the planted foot',
      'Lower back down, then repeat on the other side'
    ],
    tips: ['Keep your hips level throughout the movement', 'Master the two-leg hip thrust first'],
    videoUrl: ytSearch('Single Leg Hip Thrust')
  },
  {
    id: 'smith-machine-hip-thrust',
    name: 'Smith Machine Hip Thrust',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Glutes', 'Hamstrings'],
    description: 'A hip thrust using a guided bar for a stable, repeatable bar path.',
    instructions: [
      'Sit with your upper back against a bench under the bar',
      'Position the bar over your hips',
      'Drive your hips up until your body forms a straight line',
      'Lower back down with control'
    ],
    tips: ['The fixed bar path can make it easier to load heavy safely', 'Use a pad on the bar to protect your hips'],
    videoUrl: ytSearch('Smith Machine Hip Thrust')
  },
  {
    id: 'banded-lateral-walk',
    name: 'Banded Lateral Walk',
    category: 'bodyweight',
    equipment: 'bands',
    difficulty: 'beginner',
    muscles: ['Glutes', 'Abductors'],
    description: 'A side-stepping drill against band resistance that targets the glute medius.',
    instructions: [
      'Loop a band around your ankles or above your knees',
      'Get into a quarter-squat position',
      'Step sideways, keeping tension on the band',
      'Continue for the desired distance, then reverse direction'
    ],
    tips: ['Keep your toes pointed forward throughout', 'Stay low the entire time rather than standing up between steps'],
    videoUrl: ytSearch('Banded Lateral Walk')
  },

  // ---------- CALVES ----------
  {
    id: 'standing-machine-calf-raise',
    name: 'Standing Machine Calf Raise',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Calves'],
    description: 'A standing machine raise that is the staple calf-building movement.',
    instructions: [
      'Position your shoulders under the pads, balls of feet on the platform',
      'Lower your heels down for a full stretch',
      'Rise up onto your toes as high as possible',
      'Lower back down with control'
    ],
    tips: ['Pause briefly at the top for a stronger contraction', 'Use a full range of motion rather than small pulses'],
    videoUrl: ytSearch('Standing Machine Calf Raise')
  },
  {
    id: 'seated-calf-raise',
    name: 'Seated Calf Raise',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Calves'],
    description: 'A seated raise that targets the soleus with the knee in a bent position.',
    instructions: [
      'Sit with the pad resting on your lower thighs, balls of feet on the platform',
      'Lower your heels down for a full stretch',
      'Raise up onto your toes as high as possible',
      'Lower back down with control'
    ],
    tips: ['The bent-knee position shifts emphasis to the soleus', 'Use a slow tempo to maximize the stretch'],
    videoUrl: ytSearch('Seated Calf Raise')
  },
  {
    id: 'leg-press-calf-raise',
    name: 'Leg Press Calf Raise',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Calves'],
    description: 'A calf raise performed on the leg press machine for heavy loading.',
    instructions: [
      'Sit in the leg press with legs extended, balls of feet on the platform',
      'Lower your heels down for a full stretch',
      'Press through your toes to raise the platform',
      'Lower back down with control'
    ],
    tips: ['Keep your legs mostly straight without locking your knees', 'Use a full range of motion for best results'],
    videoUrl: ytSearch('Leg Press Calf Raise')
  },
  {
    id: 'dumbbell-standing-calf-raise',
    name: 'Dumbbell Standing Calf Raise',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Calves'],
    description: 'A standing raise using dumbbells for a simple, equipment-light calf builder.',
    instructions: [
      'Stand holding dumbbells at your sides, balls of feet on a raised surface',
      'Lower your heels down for a stretch',
      'Rise up onto your toes as high as possible',
      'Lower back down with control'
    ],
    tips: ['Hold onto something for balance if needed', 'Use a step or plate to increase your range of motion'],
    videoUrl: ytSearch('Dumbbell Standing Calf Raise')
  },
  {
    id: 'bodyweight-standing-calf-raise',
    name: 'Bodyweight Standing Calf Raise',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Calves'],
    description: 'A no-equipment calf raise that can be done anywhere with a step.',
    instructions: [
      'Stand with the balls of your feet on a step, heels hanging off',
      'Lower your heels down for a stretch',
      'Rise up onto your toes as high as possible',
      'Lower back down with control'
    ],
    tips: ['Hold a wall or railing for balance', 'Add reps or slow the tempo since there is no external load'],
    videoUrl: ytSearch('Bodyweight Standing Calf Raise')
  },
  {
    id: 'donkey-calf-raise',
    name: 'Donkey Calf Raise',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Calves'],
    description: 'A bent-over calf raise variation that changes the angle of loading on the calf.',
    instructions: [
      'Bend forward at the hips, hands on a support for balance',
      'Position the balls of your feet on a raised surface',
      'Rise up onto your toes as high as possible',
      'Lower back down for a full stretch'
    ],
    tips: ['The bent-over position changes the angle of stretch and tension', 'Add weight across your lower back once bodyweight gets easy'],
    videoUrl: ytSearch('Donkey Calf Raise')
  },
  {
    id: 'smith-machine-calf-raise',
    name: 'Smith Machine Calf Raise',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Calves'],
    description: 'A standing calf raise using a guided bar for stable heavy loading.',
    instructions: [
      'Position the bar across your upper back, balls of feet on a raised block',
      'Lower your heels down for a stretch',
      'Rise up onto your toes as high as possible',
      'Lower back down with control'
    ],
    tips: ['The fixed bar path lets you focus purely on the calf squeeze', 'Use a full range of motion each rep'],
    videoUrl: ytSearch('Smith Machine Calf Raise')
  },
  {
    id: 'standing-barbell-calf-raise',
    name: 'Standing Barbell Calf Raise',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Calves'],
    description: 'A free-weight calf raise with a barbell across the back.',
    instructions: [
      'Rest a barbell across your upper back',
      'Position the balls of your feet on a raised surface',
      'Rise up onto your toes as high as possible',
      'Lower back down for a full stretch'
    ],
    tips: ['Have a spotter or safety setup when going heavy', 'Keep your torso upright throughout the set'],
    videoUrl: ytSearch('Standing Barbell Calf Raise')
  },
  {
    id: 'single-leg-calf-raise',
    name: 'Single-Leg Calf Raise',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Calves'],
    description: 'A one-legged raise that doubles the load on each calf compared to a two-leg version.',
    instructions: [
      'Stand on one foot with the ball of your foot on a step',
      'Lower your heel down for a stretch',
      'Rise up onto your toes as high as possible',
      'Lower back down, then repeat on the other side'
    ],
    tips: ['Hold a wall or railing for balance', 'Add a dumbbell in hand once bodyweight gets easy'],
    videoUrl: ytSearch('Single Leg Calf Raise')
  },
  {
    id: 'seated-dumbbell-calf-raise',
    name: 'Seated Dumbbell Calf Raise',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Calves'],
    description: 'A seated raise using a dumbbell on the knee for simple soleus training.',
    instructions: [
      'Sit with a dumbbell resting on one knee, ball of foot on a block',
      'Lower your heel down for a stretch',
      'Rise up onto your toes as high as possible',
      'Lower back down with control'
    ],
    tips: ['Use your hand to stabilize the dumbbell on your knee', 'Keep the movement slow for a better contraction'],
    videoUrl: ytSearch('Seated Dumbbell Calf Raise')
  },

  // ---------- TRAPS ----------
  {
    id: 'barbell-shrug',
    name: 'Barbell Shrug',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Traps'],
    description: 'A simple shoulder shrug with a barbell for building trap thickness.',
    instructions: [
      'Stand holding a barbell in front of your thighs',
      'Shrug your shoulders straight up toward your ears',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Avoid rolling your shoulders - move straight up and down', 'Do not use your arms to help lift the weight'],
    videoUrl: ytSearch('Barbell Shrug')
  },
  {
    id: 'dumbbell-shrug',
    name: 'Dumbbell Shrug',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Traps'],
    description: 'A dumbbell version of the shrug that allows a slightly greater range of motion.',
    instructions: [
      'Stand holding a dumbbell in each hand at your sides',
      'Shrug your shoulders straight up toward your ears',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Keep your arms straight throughout the movement', 'Squeeze your traps at the top of each rep'],
    videoUrl: ytSearch('Dumbbell Shrug')
  },
  {
    id: 'barbell-upright-row',
    name: 'Barbell Upright Row',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Traps', 'Shoulders'],
    description: 'A vertical pulling movement that builds the traps and side delts together.',
    instructions: [
      'Stand holding a barbell with a shoulder-width grip',
      'Pull the bar straight up toward your chin, elbows high',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Keep the bar close to your body as it rises', 'Use a grip width that feels comfortable on your shoulders'],
    videoUrl: ytSearch('Barbell Upright Row')
  },
  {
    id: 'cable-shrug',
    name: 'Cable Shrug',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Traps'],
    description: 'A shrug performed on a low cable for constant tension throughout the rep.',
    instructions: [
      'Stand facing a low pulley holding a straight bar',
      'Shrug your shoulders straight up',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['The cable keeps tension on even at the bottom of the rep', 'Avoid rolling your shoulders forward or back'],
    videoUrl: ytSearch('Cable Shrug')
  },
  {
    id: 'trap-bar-farmers-walk',
    name: "Trap Bar Farmer's Walk",
    category: 'strength',
    equipment: 'trap-bar',
    difficulty: 'beginner',
    muscles: ['Traps', 'Forearms', 'Core'],
    description: 'A heavy loaded carry using a trap bar that builds traps and overall strength.',
    instructions: [
      'Stand inside a loaded trap bar and grip the handles',
      'Stand up tall, keeping your shoulders back',
      'Walk forward for a set distance or time',
      'Set the bar down with control'
    ],
    tips: ['Keep your chest up and shoulders back throughout', 'Take controlled steps rather than rushing'],
    videoUrl: ytSearch('Trap Bar Farmers Walk')
  },
  {
    id: 'snatch-grip-high-pull',
    name: 'Snatch-Grip High Pull',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'advanced',
    muscles: ['Traps', 'Shoulders', 'Back'],
    description: 'An explosive pulling movement borrowed from Olympic lifting that builds the traps and power.',
    instructions: [
      'Grip the bar wide, standing over it like a deadlift',
      'Pull the bar explosively off the floor',
      'Shrug and pull your elbows high as the bar rises',
      'Lower back down with control and reset'
    ],
    tips: ['Requires solid deadlift technique as a base', 'Focus on speed off the floor rather than just strength'],
    videoUrl: ytSearch('Snatch Grip High Pull')
  },
  {
    id: 'behind-the-back-barbell-shrug',
    name: 'Behind-the-Back Barbell Shrug',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'beginner',
    muscles: ['Traps'],
    description: 'A shrug variation with the bar held behind the body for a slightly different angle.',
    instructions: [
      'Stand holding a barbell behind you at hip level',
      'Shrug your shoulders straight up',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Keep your arms straight throughout', 'Use a lighter weight than your front shrug to start'],
    videoUrl: ytSearch('Behind The Back Barbell Shrug')
  },
  {
    id: 'kettlebell-sumo-deadlift-high-pull',
    name: 'Kettlebell Sumo Deadlift High Pull',
    category: 'strength',
    equipment: 'kettlebell',
    difficulty: 'intermediate',
    muscles: ['Traps', 'Shoulders', 'Glutes'],
    description: 'A combination movement that pairs a sumo deadlift with an upright row pull.',
    instructions: [
      'Stand wide over a kettlebell with a sumo stance',
      'Deadlift the kettlebell up between your legs',
      'Pull it up toward your chin as it rises',
      'Lower back down with control and reset'
    ],
    tips: ['Keep the kettlebell close to your body throughout', 'Drive through your legs before pulling with your arms'],
    videoUrl: ytSearch('Kettlebell Sumo Deadlift High Pull')
  },
  {
    id: 'seated-dumbbell-shrug',
    name: 'Seated Dumbbell Shrug',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Traps'],
    description: 'A seated shrug variation that removes any lower-body momentum from the lift.',
    instructions: [
      'Sit on a bench holding a dumbbell in each hand',
      'Shrug your shoulders straight up toward your ears',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Sitting isolates the traps from the rest of your body', 'Keep your torso upright throughout'],
    videoUrl: ytSearch('Seated Dumbbell Shrug')
  },
  {
    id: 'overhead-barbell-shrug',
    name: 'Overhead Barbell Shrug',
    category: 'strength',
    equipment: 'barbell',
    difficulty: 'intermediate',
    muscles: ['Traps', 'Shoulders'],
    description: 'A shrug performed with the bar held overhead, targeting the upper traps from a different angle.',
    instructions: [
      'Press a barbell overhead to full lockout',
      'Shrug your shoulders up toward your ears while keeping arms locked',
      'Pause briefly at the top',
      'Lower back down with control'
    ],
    tips: ['Use lighter weight than a standard shrug - overhead stability is the limiting factor', 'Keep your core braced throughout'],
    videoUrl: ytSearch('Overhead Barbell Shrug')
  },

  // ---------- ADDUCTORS ----------
  {
    id: 'hip-adduction-machine',
    name: 'Hip Adduction Machine',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Adductors'],
    description: 'A seated machine that isolates the inner thigh muscles.',
    instructions: [
      'Sit in the machine with pads against your inner thighs',
      'Squeeze your legs together against the resistance',
      'Pause briefly at the point of full contraction',
      'Return with control to the start'
    ],
    tips: ['Adjust the range so it feels like a full stretch at the start', 'Avoid using momentum to slam the pads together'],
    videoUrl: ytSearch('Hip Adduction Machine')
  },
  {
    id: 'cable-hip-adduction',
    name: 'Cable Hip Adduction',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Adductors'],
    description: 'A standing cable move that trains the inner thigh through hip adduction.',
    instructions: [
      'Attach an ankle cuff to a low pulley and your ankle',
      'Stand sideways to the machine, leg out to the side',
      'Pull your leg across your body',
      'Return with control to the start'
    ],
    tips: ['Keep your standing leg slightly bent for stability', 'Hold onto the machine for balance if needed'],
    videoUrl: ytSearch('Cable Hip Adduction')
  },
  {
    id: 'copenhagen-plank',
    name: 'Copenhagen Plank',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    muscles: ['Adductors', 'Core'],
    description: 'A demanding side plank variation with the top leg supported on a bench, popular in athletic training.',
    instructions: [
      'Lie on your side with your top foot resting on a bench',
      'Prop yourself up on your bottom forearm',
      'Raise your hips so your body forms a straight line',
      'Hold the position, then repeat on the other side'
    ],
    tips: ['Very demanding - regress by bending the bottom knee if needed', 'Keep your hips lifted throughout the hold'],
    videoUrl: ytSearch('Copenhagen Plank')
  },
  {
    id: 'side-lying-adductor-raise',
    name: 'Side-Lying Adductor Raise',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Adductors'],
    description: 'A simple floor exercise that isolates the inner thigh of the bottom leg.',
    instructions: [
      'Lie on your side with your bottom leg straight and top leg crossed over',
      'Raise your bottom leg up toward the ceiling',
      'Pause briefly at the top',
      'Lower back down, then repeat before switching sides'
    ],
    tips: ['Keep the movement slow and controlled', 'Point your toes forward rather than up'],
    videoUrl: ytSearch('Side Lying Adductor Raise')
  },
  {
    id: 'sumo-squat',
    name: 'Sumo Squat',
    category: 'strength',
    equipment: 'dumbbell',
    difficulty: 'beginner',
    muscles: ['Adductors', 'Glutes', 'Quadriceps'],
    description: 'A wide-stance squat that places extra emphasis on the inner thighs.',
    instructions: [
      'Stand with feet wide, toes pointed out, holding a dumbbell',
      'Squat down keeping your chest up',
      'Descend until your thighs are close to parallel',
      'Drive through your heels to stand back up'
    ],
    tips: ['Keep your knees tracking over your toes', 'Hold the weight close to your body for balance'],
    videoUrl: ytSearch('Sumo Squat')
  },

  // ---------- ABDUCTORS ----------
  {
    id: 'hip-abduction-machine',
    name: 'Hip Abduction Machine',
    category: 'strength',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Abductors'],
    description: 'A seated machine that isolates the outer hip and glute medius.',
    instructions: [
      'Sit in the machine with pads against your outer thighs',
      'Push your legs outward against the resistance',
      'Pause briefly at the point of full contraction',
      'Return with control to the start'
    ],
    tips: ['Avoid using momentum to force the weight out', 'Keep your back flat against the pad throughout'],
    videoUrl: ytSearch('Hip Abduction Machine')
  },
  {
    id: 'cable-hip-abduction',
    name: 'Cable Hip Abduction',
    category: 'strength',
    equipment: 'cable',
    difficulty: 'beginner',
    muscles: ['Abductors'],
    description: 'A standing cable move that trains the outer hip through hip abduction.',
    instructions: [
      'Attach an ankle cuff to a low pulley and your ankle',
      'Stand sideways to the machine',
      'Lift your leg out and away from your body',
      'Return with control to the start'
    ],
    tips: ['Keep your torso upright rather than leaning', 'Hold onto the machine for balance if needed'],
    videoUrl: ytSearch('Cable Hip Abduction')
  },
  {
    id: 'side-lying-clam',
    name: 'Side-Lying Clam',
    category: 'bodyweight',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Abductors', 'Glutes'],
    description: 'A gentle hip exercise that activates the outer glutes, popular in warm-ups and rehab.',
    instructions: [
      'Lie on your side with knees bent and stacked, feet together',
      'Keep your feet touching and open your top knee like a clamshell',
      'Pause briefly at the top',
      'Lower back down, then repeat before switching sides'
    ],
    tips: ['Keep your hips stacked rather than rolling backward', 'A great activation move before squats or lunges'],
    videoUrl: ytSearch('Side Lying Clam')
  },
  {
    id: 'mini-band-lateral-walk',
    name: 'Mini-Band Lateral Walk',
    category: 'bodyweight',
    equipment: 'bands',
    difficulty: 'beginner',
    muscles: ['Abductors', 'Glutes'],
    description: 'A short-band walking drill that targets the outer hip abductors.',
    instructions: [
      'Loop a mini-band around your ankles',
      'Get into a slight squat position',
      'Step sideways, keeping tension on the band',
      'Continue for the desired distance, then reverse direction'
    ],
    tips: ['Keep your toes pointed forward throughout', 'Stay low the whole time rather than standing up between steps'],
    videoUrl: ytSearch('Mini Band Lateral Walk')
  },

  // ---------- CARDIO ----------
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    category: 'cardio',
    equipment: 'other',
    difficulty: 'beginner',
    muscles: ['Calves', 'Full Body'],
    description: 'A classic conditioning tool that builds cardiovascular fitness and calf endurance.',
    instructions: [
      'Hold the rope handles at hip height',
      'Swing the rope overhead and jump as it passes your feet',
      'Land softly on the balls of your feet',
      'Continue at a steady rhythm'
    ],
    tips: ['Keep jumps small and low to the ground', 'Use your wrists to turn the rope, not your whole arms'],
    videoUrl: ytSearch('Jump Rope')
  },
  {
    id: 'burpee',
    name: 'Burpee',
    category: 'cardio',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Full Body'],
    description: 'A full-body conditioning move combining a squat, plank, push-up, and jump.',
    instructions: [
      'Squat down and place your hands on the floor',
      'Jump your feet back into a plank and perform a push-up',
      'Jump your feet back up to your hands',
      'Jump straight up with arms overhead'
    ],
    tips: ['Scale back by removing the push-up or the jump if needed', 'Keep a steady pace rather than rushing your form'],
    videoUrl: ytSearch('Burpee')
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'cardio',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Core', 'Full Body'],
    description: 'A fast-paced plank variation that combines core work with a cardio challenge.',
    instructions: [
      'Start in a plank position with hands under your shoulders',
      'Drive one knee toward your chest',
      'Quickly switch legs in a running motion',
      'Continue alternating at a steady pace'
    ],
    tips: ['Keep your hips low and core braced throughout', 'Slow down if your hips start bouncing up and down'],
    videoUrl: ytSearch('Mountain Climbers')
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'cardio',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Full Body'],
    description: 'A simple full-body movement that is a staple warm-up and cardio exercise.',
    instructions: [
      'Stand with feet together, arms at your sides',
      'Jump your feet out while raising your arms overhead',
      'Jump back to the starting position',
      'Repeat at a steady rhythm'
    ],
    tips: ['Land softly by bending your knees slightly', 'Keep a consistent pace rather than rushing'],
    videoUrl: ytSearch('Jumping Jacks')
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    category: 'cardio',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Core'],
    description: 'A running-in-place drill that raises the heart rate and works the hip flexors.',
    instructions: [
      'Stand tall with feet hip-width apart',
      'Drive one knee up toward your chest',
      'Quickly switch legs in a running motion',
      'Continue alternating at a fast pace'
    ],
    tips: ['Pump your arms to help drive the pace', 'Land on the balls of your feet'],
    videoUrl: ytSearch('High Knees')
  },
  {
    id: 'box-jump',
    name: 'Box Jump',
    category: 'cardio',
    equipment: 'other',
    difficulty: 'intermediate',
    muscles: ['Quadriceps', 'Glutes'],
    description: 'An explosive jumping movement onto a raised box that builds power and conditioning.',
    instructions: [
      'Stand facing a sturdy box with feet shoulder-width apart',
      'Swing your arms back and dip into a quarter squat',
      'Explode upward, landing softly on the box',
      'Step back down and reset for the next rep'
    ],
    tips: ['Choose a box height you can land on with soft knees', 'Step down instead of jumping down to save your joints'],
    videoUrl: ytSearch('Box Jump')
  },
  {
    id: 'rowing-machine',
    name: 'Rowing Machine',
    category: 'cardio',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Back', 'Quadriceps', 'Full Body'],
    description: 'A low-impact cardio machine that trains the legs, back, and arms together.',
    instructions: [
      'Strap your feet in and grip the handle',
      'Drive through your legs first, then lean back and pull',
      'Extend your arms, then hinge forward and bend your knees to reset',
      'Repeat in a smooth, continuous rhythm'
    ],
    tips: ['Legs, then back, then arms - reverse the order on the way back', 'Keep your back flat rather than rounding forward'],
    videoUrl: ytSearch('Rowing Machine')
  },
  {
    id: 'battle-ropes',
    name: 'Battle Ropes',
    category: 'cardio',
    equipment: 'other',
    difficulty: 'intermediate',
    muscles: ['Shoulders', 'Core', 'Full Body'],
    description: 'A high-intensity rope exercise that builds conditioning and upper body endurance.',
    instructions: [
      'Hold one end of a heavy rope in each hand',
      'Get into a quarter-squat athletic stance',
      'Wave the ropes up and down alternately as fast as you can',
      'Continue for the desired time'
    ],
    tips: ['Keep your core braced throughout the set', 'Stay low in your stance rather than standing tall'],
    videoUrl: ytSearch('Battle Ropes')
  },
  {
    id: 'stair-climber',
    name: 'Stair Climber',
    category: 'cardio',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Quadriceps', 'Glutes', 'Calves'],
    description: 'A low-impact cardio machine that simulates climbing stairs endlessly.',
    instructions: [
      'Step onto the machine and hold the rails lightly for balance',
      'Set a comfortable pace and step height',
      'Push through your whole foot with each step',
      'Continue for the desired time'
    ],
    tips: ['Avoid leaning heavily on the rails - let your legs do the work', 'Stand tall rather than hunching forward'],
    videoUrl: ytSearch('Stair Climber')
  },
  {
    id: 'sled-push',
    name: 'Sled Push',
    category: 'cardio',
    equipment: 'other',
    difficulty: 'intermediate',
    muscles: ['Quadriceps', 'Glutes', 'Full Body'],
    description: 'A loaded pushing exercise that builds leg drive and conditioning simultaneously.',
    instructions: [
      'Grip the sled handles with arms extended',
      'Drive through your legs to push the sled forward',
      'Take short, powerful steps',
      'Continue for the desired distance'
    ],
    tips: ['Keep your chest up rather than collapsing forward', 'Start with lighter loads to learn the technique'],
    videoUrl: ytSearch('Sled Push')
  },
  {
    id: 'kettlebell-swing',
    name: 'Kettlebell Swing',
    category: 'cardio',
    equipment: 'kettlebell',
    difficulty: 'beginner',
    muscles: ['Glutes', 'Hamstrings', 'Core', 'Shoulders'],
    description: 'A dynamic hip-hinge movement that builds power and cardiovascular endurance.',
    instructions: [
      'Stand with feet wider than shoulder-width, kettlebell in front of you',
      'Hinge at the hips and grip the kettlebell with both hands',
      'Swing the kettlebell back between your legs',
      'Explosively drive your hips forward to swing it to shoulder height'
    ],
    tips: ['Power comes from your hips, not your arms', 'Keep your core braced throughout'],
    videoUrl: ytSearch('Kettlebell Swing')
  },
  {
    id: 'assault-bike',
    name: 'Assault Bike',
    category: 'cardio',
    equipment: 'machine',
    difficulty: 'beginner',
    muscles: ['Full Body'],
    description: 'A fan bike that engages both arms and legs for brutal conditioning work.',
    instructions: [
      'Sit on the bike and grip the moving handles',
      'Pedal while pushing and pulling the handles',
      'Maintain a steady or interval pace',
      'Continue for the desired time'
    ],
    tips: ['The harder you push, the more resistance you feel', 'Great for short, intense interval work'],
    videoUrl: ytSearch('Assault Bike')
  },
  {
    id: 'star-jumps',
    name: 'Star Jumps',
    category: 'cardio',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Full Body'],
    description: 'An explosive jumping jack variation that spreads the limbs into a star shape.',
    instructions: [
      'Start in a quarter-squat with arms at your sides',
      'Jump up, spreading your arms and legs out wide',
      'Land softly back in the quarter-squat',
      'Repeat at a steady pace'
    ],
    tips: ['Land with bent knees to absorb the impact', 'Keep a rhythm rather than pausing between jumps'],
    videoUrl: ytSearch('Star Jumps')
  },
  {
    id: 'skater-jumps',
    name: 'Skater Jumps',
    category: 'cardio',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Quadriceps', 'Glutes', 'Adductors'],
    description: 'A lateral bounding movement that builds agility and single-leg power.',
    instructions: [
      'Start on one leg in a slight squat',
      'Push off and jump laterally onto the other leg',
      'Land softly and immediately push off in the other direction',
      'Continue alternating sides'
    ],
    tips: ['Land softly with a bent knee each time', 'Start with smaller hops before increasing distance'],
    videoUrl: ytSearch('Skater Jumps')
  },
  {
    id: 'bear-crawl',
    name: 'Bear Crawl',
    category: 'cardio',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Core', 'Shoulders', 'Full Body'],
    description: 'A crawling pattern on hands and feet that builds core stability and conditioning.',
    instructions: [
      'Get on your hands and feet with knees slightly off the floor',
      'Move your opposite hand and foot forward together',
      'Continue alternating sides as you crawl forward',
      'Keep your hips low throughout'
    ],
    tips: ['Keep your back flat rather than piking your hips up', 'Take small controlled steps rather than lunging forward'],
    videoUrl: ytSearch('Bear Crawl')
  },

  // ---------- FLEXIBILITY ----------
  {
    id: 'standing-hamstring-stretch',
    name: 'Standing Hamstring Stretch',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Hamstrings'],
    description: 'A simple standing stretch that loosens tight hamstrings.',
    instructions: [
      'Stand tall and place one heel on a low surface, leg straight',
      'Hinge forward at the hips, keeping your back flat',
      'Hold the stretch as you feel tension in the back of your leg',
      'Switch legs and repeat'
    ],
    tips: ['Avoid rounding your back to reach further', 'Hold for 20-30 seconds per side'],
    videoUrl: ytSearch('Standing Hamstring Stretch')
  },
  {
    id: 'standing-quad-stretch',
    name: 'Standing Quad Stretch',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Quadriceps'],
    description: 'A classic standing stretch for the front of the thigh.',
    instructions: [
      'Stand tall, holding a wall or support for balance',
      'Bend one knee and grab your ankle behind you',
      'Pull your heel gently toward your glutes',
      'Hold, then switch legs'
    ],
    tips: ['Keep your knees close together throughout', 'Avoid arching your lower back to increase the stretch'],
    videoUrl: ytSearch('Standing Quad Stretch')
  },
  {
    id: 'kneeling-hip-flexor-stretch',
    name: 'Kneeling Hip Flexor Stretch',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Hip Flexors'],
    description: 'A lunge-based stretch that opens up tight hip flexors from sitting.',
    instructions: [
      'Kneel on one knee with the other foot planted in front',
      'Shift your weight forward while keeping your torso upright',
      'Feel the stretch through the front of your back hip',
      'Hold, then switch sides'
    ],
    tips: ['Squeeze the glute of your back leg to deepen the stretch', 'Keep your front knee behind your toes'],
    videoUrl: ytSearch('Kneeling Hip Flexor Stretch')
  },
  {
    id: 'cat-cow-stretch',
    name: 'Cat-Cow Stretch',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Lower Back', 'Core'],
    description: 'A gentle flowing movement that mobilizes the entire spine.',
    instructions: [
      'Start on your hands and knees',
      'Arch your back and drop your belly toward the floor',
      'Round your spine up toward the ceiling',
      'Continue flowing between the two positions'
    ],
    tips: ['Move with your breath - inhale for cow, exhale for cat', 'Keep the movement slow and controlled'],
    videoUrl: ytSearch('Cat Cow Stretch')
  },
  {
    id: 'childs-pose',
    name: "Child's Pose",
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Lower Back', 'Lats'],
    description: 'A resting stretch that gently lengthens the back and hips.',
    instructions: [
      'Kneel and sit back onto your heels',
      'Reach your arms forward and lower your chest toward the floor',
      'Relax your shoulders and let your back stretch',
      'Hold the position while breathing deeply'
    ],
    tips: ['Widen your knees if it feels more comfortable', 'A great reset stretch between sets or workouts'],
    videoUrl: ytSearch('Childs Pose Stretch')
  },
  {
    id: 'downward-dog',
    name: 'Downward Dog',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Hamstrings', 'Calves', 'Shoulders'],
    description: 'A yoga staple that stretches the hamstrings, calves, and shoulders together.',
    instructions: [
      'Start on your hands and knees',
      'Lift your hips up and back to form an inverted V',
      'Press your heels toward the floor',
      'Hold while breathing steadily'
    ],
    tips: ['Bend your knees slightly if your hamstrings are very tight', 'Spread your fingers wide for a stable base'],
    videoUrl: ytSearch('Downward Dog Stretch')
  },
  {
    id: 'seated-forward-fold',
    name: 'Seated Forward Fold',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Hamstrings', 'Lower Back'],
    description: 'A seated stretch that lengthens the hamstrings and lower back together.',
    instructions: [
      'Sit with legs extended straight in front of you',
      'Hinge forward from your hips, reaching toward your feet',
      'Keep your back as flat as possible',
      'Hold the stretch while breathing steadily'
    ],
    tips: ['Reach for your shins or ankles, not necessarily your toes', 'Avoid forcing the stretch - ease into it gradually'],
    videoUrl: ytSearch('Seated Forward Fold Stretch')
  },
  {
    id: 'butterfly-stretch',
    name: 'Butterfly Stretch',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Adductors'],
    description: 'A seated stretch that opens up the inner thighs and hips.',
    instructions: [
      'Sit with the soles of your feet pressed together',
      'Let your knees drop out toward the floor',
      'Gently press your knees down with your elbows',
      'Hold the stretch while breathing steadily'
    ],
    tips: ['Sit up tall rather than rounding your back', 'Never bounce your knees - ease into the stretch'],
    videoUrl: ytSearch('Butterfly Stretch')
  },
  {
    id: 'shoulder-cross-body-stretch',
    name: 'Shoulder Cross-Body Stretch',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Shoulders'],
    description: 'A simple stretch that loosens up the rear and side of the shoulder.',
    instructions: [
      'Bring one arm straight across your chest',
      'Use your other arm to gently pull it closer',
      'Hold the stretch as you feel tension in your shoulder',
      'Switch arms and repeat'
    ],
    tips: ['Keep the pulling arm relaxed rather than yanking', 'Keep your shoulders down away from your ears'],
    videoUrl: ytSearch('Shoulder Cross Body Stretch')
  },
  {
    id: 'triceps-overhead-stretch',
    name: 'Triceps Overhead Stretch',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Triceps'],
    description: 'An overhead stretch that lengthens the triceps and lat on one side.',
    instructions: [
      'Raise one arm overhead and bend the elbow',
      'Reach your hand down toward your opposite shoulder blade',
      'Use your other hand to gently press the elbow back',
      'Hold, then switch arms'
    ],
    tips: ['Keep your torso upright rather than leaning to one side', 'Ease into the stretch rather than forcing it'],
    videoUrl: ytSearch('Triceps Overhead Stretch')
  },
  {
    id: 'piriformis-stretch',
    name: 'Piriformis Stretch',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Glutes'],
    description: 'A seated or lying stretch that targets the deep glute muscles.',
    instructions: [
      'Lie on your back and cross one ankle over the opposite knee',
      'Pull the uncrossed leg toward your chest',
      'Feel the stretch deep in your glute',
      'Hold, then switch sides'
    ],
    tips: ['Keep your lower back flat on the floor throughout', 'Breathe steadily rather than holding your breath'],
    videoUrl: ytSearch('Piriformis Stretch')
  },
  {
    id: 'calf-wall-stretch',
    name: 'Calf Wall Stretch',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Calves'],
    description: 'A standing stretch against a wall that lengthens the calf muscles.',
    instructions: [
      'Stand facing a wall with hands pressed against it',
      'Step one foot back, keeping the heel on the floor',
      'Lean forward until you feel a stretch in your calf',
      'Hold, then switch legs'
    ],
    tips: ['Keep your back heel flat on the floor throughout', 'Bend the back knee slightly to target a different part of the calf'],
    videoUrl: ytSearch('Calf Wall Stretch')
  },
  {
    id: 'cobra-stretch',
    name: 'Cobra Stretch',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Abs', 'Lower Back'],
    description: 'A gentle backbend that stretches the abdominal muscles and opens the chest.',
    instructions: [
      'Lie face-down with hands under your shoulders',
      'Press your chest up while keeping your hips on the floor',
      'Hold the position while breathing steadily',
      'Lower back down with control'
    ],
    tips: ['Keep your shoulders down away from your ears', 'Only press up as far as feels comfortable'],
    videoUrl: ytSearch('Cobra Stretch')
  },
  {
    id: 'worlds-greatest-stretch',
    name: "World's Greatest Stretch",
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Hip Flexors', 'Hamstrings', 'Shoulders'],
    description: 'A multi-part mobility flow that hits the hips, hamstrings, and thoracic spine in one sequence.',
    instructions: [
      'Step into a deep lunge position',
      'Place both hands inside your front foot',
      'Rotate your torso and reach one arm toward the ceiling',
      'Return to center and repeat on the other side'
    ],
    tips: ['Move slowly through each part of the sequence', 'Great as a dynamic warm-up before training'],
    videoUrl: ytSearch('Worlds Greatest Stretch')
  },
  {
    id: 'pigeon-pose',
    name: 'Pigeon Pose',
    category: 'flexibility',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Glutes', 'Hip Flexors'],
    description: 'A deep hip-opening yoga pose that targets the glutes and hip rotators.',
    instructions: [
      'From all fours, bring one knee forward behind your wrist',
      'Extend your other leg straight back behind you',
      'Lower your hips toward the floor',
      'Hold, then switch sides'
    ],
    tips: ['Use a cushion under your hip if it does not reach the floor', 'Keep your hips as square as possible'],
    videoUrl: ytSearch('Pigeon Pose Stretch')
  }
]

export const categories = ['all', 'strength', 'cardio', 'flexibility', 'bodyweight'] as const
export const equipmentTypes = ['all', 'barbell', 'dumbbell', 'machine', 'bodyweight', 'kettlebell', 'cable', 'ez-bar', 'bands', 'plate', 'exercise-ball', 'landmine', 'trap-bar', 'other', 'none'] as const
export const difficultyLevels = ['all', 'beginner', 'intermediate', 'advanced', 'none'] as const

// Shared broad muscle-group buckets used by both the exercise browser filters
// and the program generator, mapping each dominant body part to the detailed
// muscle tags used on individual exercises.
export const muscleFilterGroups = [
  { label: 'Chest', values: ['Chest'] },
  { label: 'Back', values: ['Back', 'Lats', 'Upper Back', 'Lower Back', 'Traps'] },
  { label: 'Shoulders', values: ['Shoulders', 'Rear Delts'] },
  { label: 'Arms', values: ['Biceps', 'Triceps', 'Forearms'] },
  { label: 'Core', values: ['Abs', 'Obliques', 'Core'] },
  { label: 'Legs', values: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves', 'Adductors', 'Abductors', 'Hip Flexors'] },
  { label: 'Full Body', values: ['Full Body'] }
] as const

// Equipment bucket for filter rows (exercises browser, exercise picker) - detailed
// equipment/muscle values are still shown as-is on exercise cards and in the modal.
export const equipmentFilterGroups = [
  { label: 'Barbell', values: ['barbell'] },
  { label: 'Dumbbell', values: ['dumbbell'] },
  { label: 'Machine', values: ['machine'] },
  { label: 'Bodyweight', values: ['bodyweight'] },
  { label: 'Kettlebell', values: ['kettlebell'] },
  { label: 'Cable', values: ['cable'] },
  { label: 'Bands', values: ['bands'] },
  { label: 'Exercise Ball', values: ['exercise-ball'] },
  { label: 'Other', values: ['ez-bar', 'landmine', 'trap-bar', 'plate', 'other'] },
  { label: 'None', values: ['none'] }
]

export type Category = typeof categories[number]
export type Equipment = typeof equipmentTypes[number]
export type Difficulty = typeof difficultyLevels[number]

// Shared display helpers used anywhere an Exercise's category/equipment/difficulty is shown.
export function formatLabel(value: string): string {
  if (value === 'ez-bar') return 'EZ Bar'
  return value.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function formatDifficulty(value: string): string {
  if (value === 'none') return 'Unrated'
  return formatLabel(value)
}

export function getDifficultyColor(difficulty: string): 'success' | 'warning' | 'error' | 'neutral' {
  switch (difficulty) {
    case 'beginner': return 'success'
    case 'intermediate': return 'warning'
    case 'advanced': return 'error'
    default: return 'neutral'
  }
}

export function getCategoryIcon(category: string): string {
  switch (category) {
    case 'strength': return 'i-lucide-dumbbell'
    case 'cardio': return 'i-lucide-heart-pulse'
    case 'bodyweight': return 'i-lucide-person-standing'
    case 'flexibility': return 'i-lucide-stretch-horizontal'
    default: return 'i-lucide-activity'
  }
}
