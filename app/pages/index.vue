<script setup lang="ts">
const features = [
  {
    title: 'Exercise Library',
    description: 'Browse 50+ exercises with detailed instructions, videos, and muscle targeting info.',
    icon: 'i-lucide-library'
  },
  {
    title: 'Video Tutorials',
    description: 'Learn proper form with embedded video demonstrations for every exercise.',
    icon: 'i-lucide-play-circle'
  },
  {
    title: 'Custom Programs',
    description: 'Get a personalized workout program based on your goals, experience, and equipment.',
    icon: 'i-lucide-target'
  },
  {
    title: 'Smart Filtering',
    description: 'Filter exercises by muscle group, difficulty level, and equipment type.',
    icon: 'i-lucide-trending-up'
  }
]

const stats = [
  { label: 'Exercises', value: '50+' },
  { label: 'Muscle Groups', value: '12' },
  { label: 'Video Tutorials', value: '50+' },
  { label: 'Users', value: '10K+' }
]

const categories = [
  { name: 'Strength', icon: 'i-lucide-dumbbell', slug: 'strength' },
  { name: 'Cardio', icon: 'i-lucide-heart-pulse', slug: 'cardio' },
  { name: 'Bodyweight', icon: 'i-lucide-person-standing', slug: 'bodyweight' },
  { name: 'Flexibility', icon: 'i-lucide-stretch-horizontal', slug: 'flexibility' }
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="py-16 sm:py-24">
      <UContainer>
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <UBadge color="primary" variant="subtle" size="lg" class="mb-4">
              Your fitness companion
            </UBadge>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Transform Your Fitness Journey
            </h1>
            <p class="mt-6 text-lg text-muted text-pretty">
              Discover the perfect exercises, learn proper form with video tutorials, and build a
              custom workout program tailored to your goals.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <UButton to="/exercises" label="Browse Exercises" icon="i-lucide-dumbbell" size="lg" />
              <UButton
                to="/program"
                label="Build Your Program"
                color="neutral"
                variant="outline"
                trailing-icon="i-lucide-arrow-right"
                size="lg"
              />
            </div>
          </div>

          <div class="bg-elevated rounded-3xl p-8 border border-default">
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="bg-default rounded-xl p-6 text-center border border-default"
              >
                <div class="text-3xl font-bold text-primary">{{ stat.value }}</div>
                <div class="text-sm text-muted mt-1">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Features -->
    <section id="features" class="py-16 bg-elevated">
      <UContainer>
        <div class="max-w-2xl mx-auto text-center mb-12">
          <p class="text-primary font-semibold mb-2">Features</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-balance">Everything You Need to Succeed</h2>
          <p class="mt-4 text-muted text-pretty">
            From beginner-friendly exercises to advanced training programs, we have all the tools you need.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <UCard v-for="feature in features" :key="feature.title">
            <div class="p-2 rounded-lg bg-primary/10 w-fit mb-4">
              <UIcon :name="feature.icon" class="size-6 text-primary" />
            </div>
            <h3 class="font-semibold text-lg mb-2">{{ feature.title }}</h3>
            <p class="text-muted text-sm">{{ feature.description }}</p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Categories -->
    <section class="py-16">
      <UContainer>
        <div class="max-w-2xl mx-auto text-center mb-12">
          <p class="text-primary font-semibold mb-2">Categories</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-balance">Train Every Muscle Group</h2>
          <p class="mt-4 text-muted text-pretty">
            Our comprehensive exercise library covers all major muscle groups and training styles.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink
            v-for="category in categories"
            :key="category.slug"
            :to="`/exercises?category=${category.slug}`"
            class="group flex flex-col items-center bg-elevated hover:bg-accented rounded-2xl p-8 text-center transition-all border border-default hover:border-primary"
          >
            <UIcon
              :name="category.icon"
              class="size-10 mb-3 text-muted group-hover:text-primary transition-colors"
            />
            <span class="font-medium">{{ category.name }}</span>
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <!-- CTA -->
    <section class="py-16">
      <UContainer>
        <div class="bg-primary rounded-3xl p-10 sm:p-16 text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-inverted text-balance">
            Ready to Start Your Fitness Journey?
          </h2>
          <p class="mt-4 text-inverted/80 max-w-xl mx-auto text-pretty">
            Build your custom workout program in just a few minutes. Tell us your goals, and we will
            create a personalized plan just for you.
          </p>
          <div class="mt-8 flex flex-wrap gap-3 justify-center">
            <UButton to="/program" label="Build My Program" color="neutral" size="lg" />
            <UButton
              to="/exercises"
              label="Browse Exercises First"
              color="neutral"
              variant="outline"
              size="lg"
            />
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
